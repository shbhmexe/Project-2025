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
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                <Zap className="h-7 w-7 text-emerald-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Main Features
              </h2>
            </div>
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
