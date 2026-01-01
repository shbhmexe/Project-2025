import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { id, title, image, paragraph, author, tags, publishDate } = blog;
  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-card border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-500/40 transition-all duration-300">
        <Link
          href={`/blog-details/${id}`}
          className="relative block aspect-[37/22] w-full overflow-hidden"
        >
          <span className="absolute right-4 top-4 z-20 inline-flex items-center justify-center rounded-full bg-emerald-500/90 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold capitalize text-white shadow-lg">
            {tags[0]}
          </span>
          <Image
            src={image}
            alt="image"
            fill
            priority
            className="group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href={`/blog-details/${id}`}
              className="mb-4 block text-xl font-bold text-foreground hover:text-emerald-400 transition-colors sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b border-emerald-500/20 pb-6 text-base font-medium text-muted-foreground">
            {paragraph}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-emerald-500/20 pr-5 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-emerald-500/30">
                  <Image src={author.image} alt="author" fill priority unoptimized />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-foreground">
                  By {author.name}
                </h4>
                <p className="text-xs text-emerald-400">{author.designation}</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-foreground">
                Date
              </h4>
              <p className="text-xs text-muted-foreground">{publishDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
