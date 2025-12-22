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
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
              <Newspaper className="h-7 w-7 text-emerald-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Our Latest Blogs
            </h2>
          </div>
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
              className="w-full"
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
            <InteractiveHoverButton className="shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] px-8 py-3">
              More Blogs
            </InteractiveHoverButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
