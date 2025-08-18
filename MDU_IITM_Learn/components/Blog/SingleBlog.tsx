import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { id, title, image, paragraph, author, tags, publishDate } = blog;
  return (
    <>
      <div
        className="wow fadeInUp group relative overflow-hidden rounded-md card hover:shadow-md duration-300"
        data-wow-delay=".1s"
      >
        <Link
          href={`/blog-details/${id}`}
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-primary-foreground shadow">
            {tags[0]}
          </span>
          <Image src={image} alt="image" fill priority />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href={`/blog-details/${id}`}
              className="mb-4 block text-xl font-bold text-foreground hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b border-border pb-6 text-base font-medium text-muted-foreground">
            {paragraph}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-border pr-5 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={author.image} alt="author" fill priority />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-foreground">
                  By {author.name}
                </h4>
                <p className="text-xs text-muted-foreground">{author.designation}</p>
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
