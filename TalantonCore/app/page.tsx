import { getAllProducts } from '@/lib/db';
import ProductList from '@/components/ProductList';
import Link from 'next/link';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
          <nav className="flex gap-4">
            <Link href="/recommendations" className="text-blue-600 hover:text-blue-800">Recommendations</Link>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
            <Link href="/admin" className="text-blue-600 hover:text-blue-800">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ProductList initialProducts={products} />
      </main>
    </div>
  );
}
