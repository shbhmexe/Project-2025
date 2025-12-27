"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LightPillar from "@/components/LightPillar";
import ShinyText from "@/components/ui/ShinyText";
import dynamic from "next/dynamic";

// Dynamic import for Antigravity (client-only, uses Three.js)
const Antigravity = dynamic(() => import("@/components/Antigravity"), {
  ssr: false,
});

const TRUSTED_AVATARS = ["A", "S", "R", "P", "K"];

const Hero = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(200);

  useEffect(() => {
    setMounted(true);
    const updateCount = () => {
      setParticleCount(window.innerWidth >= 768 ? 800 : 200);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");
  const isLightMode = mounted && !isDarkMode;

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="absolute inset-0 -z-30 bg-background" />

        {/* Dark Mode: LightPillar Animation */}
        {isDarkMode && (
          <div className="absolute inset-0 -z-20 overflow-hidden opacity-30 pointer-events-none">
            <LightPillar
              topColor="#10b981"
              bottomColor="#059669"
              intensity={1.0}
              rotationSpeed={0.3}
              glowAmount={0.005}
              pillarWidth={3.0}
              pillarHeight={0.4}
              noiseIntensity={0.5}
              pillarRotation={30}
              interactive={false}
              mixBlendMode="normal"
            />
            {/* Bottom fade mask - reduced height to allow animation to show clearly */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-transparent to-transparent z-[1] pointer-events-none" />
          </div>
        )}

        {/* Light Mode: Antigravity Animation */}
        {isLightMode && (
          <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
            <Antigravity
              count={particleCount}
              magnetRadius={6}
              ringRadius={7}
              waveSpeed={0.4}
              waveAmplitude={0.5}
              particleSize={0.4}
              lerpSpeed={0.04}
              color="#3b82f6"
              autoAnimate={true}
              particleVariance={0.5}
            />
          </div>
        )}
        <meta name="google-site-verification" content="wyzLSCVE6q08S-47RMTg-6M3tybRAmxVyRU3WOrVLLY" />
        <div className="container relative z-20">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >

                {/* DARK MODE TITLE - Full version */}
                {isDarkMode && (
                  <h1 className="mt-10 mb-6 text-[28px] font-bold leading-tight sm:-mt-20 sm:text-5xl md:text-6xl lg:text-7xl">
                    {/* Line 1 (Desktop) */}
                    <span className="hidden sm:block mb-2">Comprehensive</span>

                    {/* Line 2 (Desktop) / Line 1 (Mobile) */}
                    <span className="inline-block">
                      <ShinyText
                        text="Handwritten Notes"
                        speed={3}
                        className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent"
                      />{" "}
                      for
                    </span>

                    <br />

                    {/* Line 3 (Desktop) / Line 2 (Mobile) */}
                    <span className="inline-block">
                      <span className="sm:hidden">
                        <ShinyText
                          text="MDU & IITM"
                          speed={3}
                          className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent"
                        />{" "}
                        BTech
                      </span>
                      <span className="hidden sm:inline">
                        <ShinyText
                          text="MDU Rohtak and IITM"
                          speed={3}
                          className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent"
                        />
                      </span>
                    </span>

                    <br />

                    {/* Line 4 (Desktop) / Line 3 (Mobile) */}
                    <span className="hidden sm:inline">BTech Courses</span>
                    <br className="hidden sm:block" />
                    <span className="hidden sm:inline">Students.</span>
                    <span className="sm:hidden">Students.</span>
                  </h1>
                )}

                {/* LIGHT MODE TITLE - Short 2 line version with branding */}
                {isLightMode && (
                  <h1 className="mt-32 mb-6 text-[26px] font-bold leading-tight sm:mt-16 sm:text-4xl md:text-5xl lg:text-6xl">
                    <span className="block whitespace-nowrap mb-4">
                      <ShinyText
                        text="B.Tech Notes"
                        speed={3}
                        className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent"
                      />{" "}
                      Made Easy
                    </span>
                    <span className="block whitespace-nowrap">
                      for{" "}
                      <ShinyText
                        text="MDU & IITM"
                        speed={3}
                        className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent"
                      />{" "}
                      Students
                    </span>
                  </h1>
                )}

                {/* Description - different for light/dark mode */}
                {isDarkMode && (
                  <p className="mb-8 text-base font-medium text-muted-foreground sm:text-lg md:text-xl lg:text-2xl">
                    Our platform offers a comprehensive collection of handwritten notes, previous year papers, and other essential study materials to help you excel in your BTech journey.
                  </p>
                )}
                {isLightMode && (
                  <p className="mb-8 text-base font-medium text-muted-foreground sm:text-lg md:text-xl">
                    Your Personal Gateway to Academic Excellence. <br className="hidden sm:block" />
                    Access premium notes, PYQs, and resources tailored for success.
                  </p>
                )}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">

                  {/* 🔥 Get Notes Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex w-full justify-center sm:w-auto"
                  >
                    <Link
                      href="/notes"
                      className="group relative inline-flex w-full max-w-[340px] items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] ring-1 ring-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] focus-visible:outline-none sm:w-auto sm:max-w-none sm:px-7 sm:py-3.5"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="relative z-10">Get Notes</span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
                      />
                    </Link>
                  </motion.div>


                  {/* 📜 Get PYQs Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex w-full justify-center sm:w-auto"
                  >
                    <Link
                      href="/pyqs"
                      className="group relative inline-flex w-full max-w-[340px] items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-emerald-500/50 bg-emerald-500/10 px-8 py-4 text-base font-bold text-emerald-400 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] focus-visible:outline-none sm:w-auto sm:max-w-none sm:px-7 sm:py-3.5"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="relative z-10">Get PYQs</span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
                      />
                    </Link>
                  </motion.div>

                </div>

                {/* 📺 Get YouTube Explanation Button */}

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative mx-auto flex w-full justify-center sm:w-fit"
                >
                  <Link
                    href="/youtube-explanation/semester"
                    className="group relative mt-5 mb-[-10px] inline-flex w-full max-w-[340px] items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-red-500/50 bg-red-500/10 px-8 py-4 text-base font-bold text-red-400 backdrop-blur-sm transition-all duration-300 hover:border-red-400 hover:bg-red-500/20 hover:text-red-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] focus-visible:outline-none sm:w-auto sm:max-w-none"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="relative z-10">Get YouTube Explanation</span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-red-400/20 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
                    />
                  </Link>

                </motion.div>

                {/* ✅ Social proof */}
                <div className="mt-6 flex items-center justify-center">
                  <div className="inline-flex flex-col items-center gap-2 sm:rounded-full sm:border sm:border-border/60 sm:bg-background/70 sm:px-4 sm:py-2 sm:shadow-sm sm:backdrop-blur-sm sm:flex-row sm:gap-3">
                    <div aria-hidden="true" className="flex items-center -space-x-2">
                      {TRUSTED_AVATARS.map((initial) => (
                        <div
                          key={initial}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-cyan-500/25 text-[11px] font-semibold text-foreground ring-2 ring-background shadow-sm sm:h-9 sm:w-9 sm:text-xs"
                        >
                          {initial}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-foreground/80 sm:text-base">
                      Trusted by{" "}
                      <span className="font-semibold text-foreground">
                        1000+ students
                      </span>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* //hero section svg - Hidden */}
        <div className="absolute right-0 top-0 z-[-1] hidden">
          <svg
            className="bgradient-to-r from-blue-500 to-purple-500"
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] hidden">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
