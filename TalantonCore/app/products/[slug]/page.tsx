import { getAllProducts, getProductBySlug } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const stockStatus = product.inventory > 20 
    ? { label: 'In Stock', color: 'text-green-600' }
    : product.inventory > 0 
    ? { label: 'Low Stock', color: 'text-yellow-600' }
    : { label: 'Out of Stock', color: 'text-red-600' };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <span className="text-gray-400 text-xl">Product Image</span>
              </div>

              <div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded">
                    {product.category}
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  ${product.price.toFixed(2)}
                </h2>

                <p className="text-gray-700 text-lg mb-6">
                  {product.description}
                </p>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium">Availability:</span>
                    <span className={`font-bold ${stockStatus.color}`}>
                      {stockStatus.label}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium">Stock Quantity:</span>
                    <span className="font-bold text-gray-900">
                      {product.inventory} units
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Last Updated:</span>
                    <span className="text-gray-900">
                      {new Date(product.lastUpdated).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  disabled={product.inventory === 0}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                    product.inventory > 0
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>ISR Note:</strong> This page is statically generated at build time and automatically 
            regenerated every 60 seconds when accessed, ensuring fresh product data while maintaining 
            excellent performance.
          </p>
        </div>
      </main>
    </div>
  );
}
