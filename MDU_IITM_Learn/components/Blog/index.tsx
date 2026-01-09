"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Blog = () => {
  // Only display the 3 latest blogs on homepage
  const latestBlogs = blogData.slice(0, 3);

  return (
    <section
      id="blog"
      className="bg-background py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight text-zinc-900 dark:!text-white whitespace-nowrap">
            Our Latest Blogs
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Stay Ahead with Expert Study Tips & Exam Strategies!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
          {latestBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className={`w-full ${index === 2 ? "hidden lg:block" : ""}`}
            >
              <SingleBlog blog={blog} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link href="/blog">
            <InteractiveHoverButton className="w-full sm:w-auto flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] px-8 py-3">
              <span className="inline-flex items-center">
                More Blogs
              </span>
            </InteractiveHoverButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
