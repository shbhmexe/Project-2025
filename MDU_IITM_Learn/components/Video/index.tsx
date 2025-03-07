"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";

import ModalVideo from "react-modal-video";

const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="hidden md:block h-[2px] w-full bg-transparent  mt-[-150px] overflow-hidden relative mb-10">
        <div className="h-full w-full animate-glowMedian mb-4"></div>
      </div>

      <div className="container mt-16">
        <SectionTitle

          title="We Are Here to Help You Succeed!"
          paragraph=""
          center
          mb="50px"

        />

        <div className="flex justify-center px-4">
          <div className="max-w-3xl text-center">
            {/* Light: Gray-700 | Dark: Gray-300 */}
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
              Struggling to find quality study materials for your{" "}
              <span className="text-blue-400 font-semibold">B.Tech courses</span> ? We’ve got you covered!
              Our platform offers well-structured{" "}
              <span className="text-blue-400 font-semibold">handwritten notes</span>,{" "}
              <span className="text-blue-400 font-semibold">previous year question papers (PYQs)</span>,{" "}
              <span className="text-blue-400 font-semibold">lab manuals</span>, and{" "}
              <span className="text-blue-400 font-semibold">EDG sheets</span> all tailored specifically for{" "}
              <span className="text-blue-400 font-semibold">MDU & IITM students</span>.
            </p>

            {/* Light: Gray-500 | Dark: Gray-400 */}
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-500 dark:text-gray-400 leading-relaxed mt-4">
              Whether you’re preparing for exams or practicals, our syllabus-aligned resources ensure{" "}
              <span className="text-blue-400 font-semibold">efficient learning</span> and{" "}
              <span className="text-blue-400 font-semibold">better grades</span>. Study anytime, anywhere with{" "}
              <span className="text-blue-400 font-semibold">instant digital access</span> and stay ahead in your academic journey.
            </p>
          </div>
        </div>


      </div>

      <ModalVideo
        channel="/"
        autoplay={false}
        start={false}
        isOpen={false}
        videoId="/"
        onClose={() => setOpen(true)}
      />

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full"></div>
    </section>
  );
};

export default Video;
