import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto py-20 text-center">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Blog Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      <Link 
        href="/blog"
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-blue-700 transition"
      >
        Return to Blog
      </Link>
    </div>
  );
} 