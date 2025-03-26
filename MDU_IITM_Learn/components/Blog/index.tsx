import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";
import Link from "next/link";

const Blog = () => {
  // Only display the 3 latest blogs on homepage
  const latestBlogs = blogData.slice(0, 3);
  
  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="Stay Ahead with Expert Study Tips & Exam Strategies!"
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {latestBlogs.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link 
            href="/blog"
            className="rounded-md bg-primary px-8 py-3 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
          >
            More Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
