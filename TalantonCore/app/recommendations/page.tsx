import { getAllProducts } from '@/lib/db';
import Link from 'next/link';
import AddToWishlistButton from '@/components/AddToWishlistButton';

export default async function RecommendationsPage() {
  // Server Component - data fetched on server
  const allProducts = await getAllProducts();
  
  // Get top 6 products based on inventory (popular items)
  const recommendedProducts = allProducts
    .filter(p => p.inventory > 0)
    .sort((a, b) => b.inventory - a.inventory)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Recommended Products</h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
            <Link href="/admin" className="text-blue-600 hover:text-blue-800">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-800">
            <strong>Server Components Note:</strong> This page demonstrates React Server Components. 
            The product data is fetched on the server, but the "Add to Wishlist" buttons are 
            interactive Client Components, showcasing hybrid server/client rendering.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Products Just for You</h2>
          <p className="text-gray-600">
            Based on availability and popularity, here are our top recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                      {product.name}
                    </h3>
                  </Link>
                  {/* Client Component for interactivity */}
                  <AddToWishlistButton productId={product.id} productName={product.name} />
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {product.inventory} available
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                    {product.category}
                  </span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recommendedProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No recommendations available at the moment.</p>
            <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              Browse All Products →
            </Link>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Why These Products?</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Currently in stock and available for immediate purchase</li>
            <li>Popular items based on inventory turnover</li>
            <li>High-quality products across various categories</li>
            <li>Recommended based on current availability trends</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
