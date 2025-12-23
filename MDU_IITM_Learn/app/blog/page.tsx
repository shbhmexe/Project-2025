import SingleBlog from "@/components/Blog/SingleBlog";
import blogData from "@/components/Blog/blogData";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Page | Comprehensive Handwritten Notes for MDU and IITM BTech Courses Students.",
  description: "Comprehensive Handwritten Notes for MDU and IITM BTech Courses Students.",
};

const Blog = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  // Get the current page from the URL query parameters, default to 1
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;

  // Number of blogs per page
  const blogsPerPage = 6;

  // Calculate total number of pages
  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  // Get the blogs for the current page
  const startIndex = (page - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = blogData.slice(startIndex, endIndex);

  return (
    <div className="mt-10 bg-background text-foreground">
      <Breadcrumb
        pageName="Blog Grid"
        description="Unlock the power of structured learning with insightful study techniques, expertly crafted to enhance your academic performance."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>

          <div
            className="wow fadeInUp -mx-4 flex flex-wrap"
            data-wow-delay=".15s"
          >
            <div className="w-full px-4">
              <ul className="flex items-center justify-center pt-8">
                <li className="mx-1">
                  <Link
                    href={page > 1 ? `/blog?page=${page - 1}` : `/blog?page=1`}
                    className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-muted px-4 text-sm text-muted-foreground transition hover:bg-primary hover:text-primary-foreground ${page <= 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    Prev
                  </Link>
                </li>

                {/* Generate page numbers dynamically */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <li key={pageNum} className="mx-1">
                    <Link
                      href={`/blog?page=${pageNum}`}
                      className={`flex h-9 min-w-[36px] items-center justify-center rounded-md ${pageNum === page
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'
                        } px-4 text-sm transition`}
                    >
                      {pageNum}
                    </Link>
                  </li>
                ))}

                <li className="mx-1">
                  <Link
                    href={page < totalPages ? `/blog?page=${page + 1}` : `/blog?page=${totalPages}`}
                    className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-muted px-4 text-sm text-muted-foreground transition hover:bg-primary hover:text-primary-foreground ${page >= totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    Next
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
