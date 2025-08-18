const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "100px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
        data-wow-delay=".1s"
        style={{ maxWidth: width, marginBottom: mb }}
      >
        <h2 className=" text-3xl font-bold !leading-tight text-foreground sm:text-4xl md:text-[45px] mb-4 mt-[-50px]">
          {title}
        </h2>
        <p className="text-base !leading-relaxed text-muted-foreground md:text-lg mt-10 ">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
