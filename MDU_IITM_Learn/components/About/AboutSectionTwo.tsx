import { AnimatedTerminal } from "./AnimatedTerminal";

const terminalLines = [
  { text: "features --premium", prefix: "$", prefixColor: "text-emerald-400" },
  { text: "Assignments & File Making", prefix: "★", prefixColor: "text-yellow-400", textColor: "text-zinc-400" },
  { text: "Premier Support 24/7", prefix: "★", prefixColor: "text-yellow-400", textColor: "text-zinc-400" },
  { text: "Free Access to All Notes", prefix: "★", prefixColor: "text-yellow-400", textColor: "text-zinc-400" },
  { text: "access --type", prefix: "$", prefixColor: "text-emerald-400" },
  { text: "Cost: FREE", prefix: "🆓", textColor: "text-zinc-400" },
  { text: "Updates: Regular", prefix: "🔄", textColor: "text-zinc-400" },
  { text: "Access: Anywhere", prefix: "📱", textColor: "text-zinc-400" },
  { text: 'echo "Happy Learning!"', prefix: "$", prefixColor: "text-emerald-400" },
  { text: "Happy Learning! 🎓", prefix: "", textColor: "text-emerald-400" },
];

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2 order-2 lg:order-1">
            <div
              className="wow fadeInUp relative mx-auto mb-12 max-w-[500px] lg:m-0 lg:ml-0"
              data-wow-delay=".15s"
            >
              <AnimatedTerminal
                title="mdu-iitm-learn ~ features"
                lines={terminalLines}
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-1/2 order-1 lg:order-2">
            <div className="wow fadeInUp max-w-[470px] mb-12 lg:mb-0" data-wow-delay=".2s">
              <div className="mb-8 p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/10 sm:bg-transparent sm:border-0 sm:p-0 sm:mb-9">
                <h3 className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl flex items-center">
                  <span className="sm:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 mr-3 text-sm">01</span>
                  Assignments & Files Making
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed opacity-80 sm:opacity-100">
                  helps you manage, organize, and streamline all your assignment-related tasks, ensuring smooth progress and timely submissions.
                </p>
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/10 sm:bg-transparent sm:border-0 sm:p-0 sm:mb-9">
                <h3 className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl flex items-center">
                  <span className="sm:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 mr-3 text-sm">02</span>
                  Premier support
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed opacity-80 sm:opacity-100">
                  Premier Support offers dedicated assistance for resolving complex issues quickly, ensuring priority service, and providing tailored solutions for enhanced performance and efficiency.
                </p>
              </div>

              <div className="mb-1 p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/10 sm:bg-transparent sm:border-0 sm:p-0">
                <h3 className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl flex items-center">
                  <span className="sm:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 mr-3 text-sm">03</span>
                  Free Access to Notes
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed opacity-80 sm:opacity-100">
                  MDU IITM Notes for BTech provides free access to a wide range of study materials, helping students easily find and utilize the notes they need for their coursework.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
