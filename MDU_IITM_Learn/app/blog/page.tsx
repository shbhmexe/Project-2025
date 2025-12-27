import blogData from "@/components/Blog/blogData";
import { Metadata } from "next";
import BlogClient from "@/components/Blog/BlogClient";

export const metadata: Metadata = {
  title: "Blog Page | Comprehensive Handwritten Notes for MDU and IITM BTech Courses Students.",
  description: "Comprehensive Handwritten Notes for MDU and IITM BTech Courses Students.",
};

const Blog = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // Await searchParams as required in Next.js 15
  const resolvedSearchParams = await searchParams;

  // Get the current page from the URL query parameters, default to 1
  const page = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page as string) : 1;

  // Number of blogs per page
  const blogsPerPage = 6;

  // Calculate total number of pages
  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  // Get the blogs for the current page
  const startIndex = (page - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = blogData.slice(startIndex, endIndex);

  return (
    <BlogClient
      currentBlogs={currentBlogs}
      page={page}
      totalPages={totalPages}
    />
  );
};

export default Blog;
