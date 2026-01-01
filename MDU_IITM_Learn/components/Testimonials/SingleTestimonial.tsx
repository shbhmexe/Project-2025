import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import { Star } from "lucide-react";

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  const ratingIcons = Array.from({ length: star }, (_, index) => (
    <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
  ));

  return (
    <div className="w-full h-full">
      <div className="h-full bg-card rounded-2xl border border-emerald-500/20 p-8 shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-500/40 transition-all duration-300 lg:px-5 xl:px-8">
        <div className="mb-5 flex items-center space-x-1">{ratingIcons}</div>
        <p className="mb-8 border-b border-emerald-500/20 pb-8 text-base leading-relaxed text-muted-foreground">
          "{content}
        </p>
        <div className="flex items-center">
          <div className="relative mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full border-2 border-emerald-500/30">
            <Image src={image} alt={name} fill unoptimized />
          </div>
          <div className="w-full">
            <h3 className="mb-1 text-lg font-semibold text-foreground lg:text-base xl:text-lg">
              {name}
            </h3>
            <p className="text-sm text-emerald-400">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;
