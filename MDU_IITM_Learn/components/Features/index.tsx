"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
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
              Main Features
            </h2>
            <p className="text-muted-foreground md:text-lg">
              We provide high-quality, exam-focused study materials designed specifically for MDU & IITM B.Tech students. From handwritten notes to lab manuals, we ensure you have everything you need to excel in your studies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <SingleFeature key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
