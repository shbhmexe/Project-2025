
import SectionTitle from "../Common/SectionTitle";
import { AnimatedTerminal } from "./AnimatedTerminal";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const terminalLines = [
  { text: "what-we-offer --list", prefix: "$", prefixColor: "text-emerald-400" },
  { text: "Handwritten Notes", prefix: "✓", prefixColor: "text-emerald-400", textColor: "text-zinc-400" },
  { text: "Previous Year Questions (PYQs)", prefix: "✓", prefixColor: "text-emerald-400", textColor: "text-zinc-400" },
  { text: "Lab Manuals & Practicals", prefix: "✓", prefixColor: "text-emerald-400", textColor: "text-zinc-400" },
  { text: "EDG Sheets", prefix: "✓", prefixColor: "text-emerald-400", textColor: "text-zinc-400" },
  { text: "100% Syllabus-Based Content", prefix: "✓", prefixColor: "text-emerald-400", textColor: "text-zinc-400" },
  { text: "stats --students", prefix: "$", prefixColor: "text-emerald-400" },
  { text: "Semesters: 1-8", prefix: "📚", textColor: "text-zinc-400" },
  { text: "Students: 1000+", prefix: "👥", textColor: "text-zinc-400" },
  { text: "Resources: 500+", prefix: "📄", textColor: "text-zinc-400" },
];

const AboutSectionOne = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2 ">
              <SectionTitle
                title="What We Offer"
                paragraph=""
                mb="44px"
              />

              <div className="max-w-[570px] -mt-8 mb-8">
                <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                  At <span className="text-blue-400 font-semibold">MDU IITM LEARN</span>, we provide a comprehensive collection of{" "}
                  <span className="text-blue-400 font-semibold">MDU & IITM B.Tech study materials</span> designed to help students excel in their academics. Our platform includes{" "}
                  <span className="text-blue-400 font-semibold">handwritten notes</span>, <span className="text-blue-400 font-semibold">previous year question papers (PYQs)</span>, lab manuals, and EDG sheets—all tailored specifically to your syllabus.
                </p>
              </div>

              <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Hand Written" />
                    <List text="PYQs" />
                    <List text="Lab Manuals" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="EDG Sheets" />
                    <List text="100% Syllabus-Based" />
                    <List text="Assignments & Files Making" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <AnimatedTerminal
                  title="mdu-iitm-learn ~ terminal"
                  lines={terminalLines}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
