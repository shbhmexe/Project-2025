import { getAllProducts } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // SSR: Always fetch fresh data

export default async function Dashboard() {
  const products = await getAllProducts();

  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.inventory > 0 && p.inventory <= 10);
  const outOfStockProducts = products.filter(p => p.inventory === 0);
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.inventory), 0);
  const totalInventoryUnits = products.reduce((sum, p) => sum + p.inventory, 0);

  const categoryStats = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = { count: 0, value: 0 };
    }
    acc[product.category].count += 1;
    acc[product.category].value += product.price * product.inventory;
    return acc;
  }, {} as Record<string, { count: number; value: number }>);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <Link href="/admin" className="text-blue-600 hover:text-blue-800">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>SSR Note:</strong> This page uses Server-Side Rendering to fetch live data on every 
            request, ensuring you always see the most up-to-date inventory information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Inventory</h3>
            <p className="text-3xl font-bold text-gray-900">{totalInventoryUnits}</p>
            <p className="text-sm text-gray-500 mt-1">units</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Inventory Value</h3>
            <p className="text-3xl font-bold text-green-600">${totalInventoryValue.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Average Price</h3>
            <p className="text-3xl font-bold text-gray-900">
              ${(products.reduce((sum, p) => sum + p.price, 0) / totalProducts).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Low Stock Alert ({lowStockProducts.length})
              </h2>
            </div>
            <div className="p-6">
              {lowStockProducts.length > 0 ? (
                <div className="space-y-4">
                  {lowStockProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <Link
                          href={`/products/${product.slug}`}
                          className="font-medium text-gray-900 hover:text-blue-600"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        {product.inventory} left
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No low stock products</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Out of Stock ({outOfStockProducts.length})
              </h2>
            </div>
            <div className="p-6">
              {outOfStockProducts.length > 0 ? (
                <div className="space-y-4">
                  {outOfStockProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <Link
                          href={`/products/${product.slug}`}
                          className="font-medium text-gray-900 hover:text-blue-600"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Out of stock
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">All products in stock</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Category Breakdown</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(categoryStats).map(([category, stats]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      Products: <span className="font-medium text-gray-900">{stats.count}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Value: <span className="font-medium text-green-600">${stats.value.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Last Updated</h3>
              <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
            </div>
            <p className="text-sm text-gray-600">
              Refresh the page to see updated data
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
