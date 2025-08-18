import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="card p-6 hover:shadow-md transition-shadow">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/60 text-primary">
            {icon}
          </div>
          <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl lg:text-xl xl:text-2xl">
            {title}
          </h3>
          <p className="text-base font-medium leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleFeature;
