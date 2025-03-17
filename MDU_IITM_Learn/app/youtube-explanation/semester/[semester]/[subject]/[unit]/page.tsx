"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const videoLinks: Record<string, Record<string, string>> = {
  "Mathematics-I": {
    "1": "https://youtu.be/sHSlfJugXe4?si=UuR95RMmok5Z_qaZ",
    "2": "https://www.youtube.com/watch?v=pfN1_rrEEuw",
    "3": "https://www.youtube.com/watch?v=_6oRqxY6O5w",
    "4": "https://www.youtube.com/watch?v=cZkscKSX_9I",
    "Beta Gamma Function": "https://www.youtube.com/watch?v=ffNpqBVyYew",
    "Evolutes and Involutes": "https://www.youtube.com/watch?v=WBVtY0J-b54",
    "Maclaurin Series": "https://youtu.be/nS29gTQj8lo?si=WyNep0aQHUWP8t5t",
    "Taylor Series": "https://www.youtube.com/watch?v=0bHky1ocA1Y",
    "Inner Space Product": "https://www.youtube.com/watch?v=2e03K_056t0",
    "Revision All Unit": "https://youtube.com/playlist?list=PL-vEH_IPWrhBjbOkN4PWzhyJpdLloDB_L&si=YkOwZTJ8Zzn1Emsy"
  },
  "Semiconductor-Physics": {
    "1": "https://www.youtube.com/watch?v=3QQWi8Rtaxg&list=PLbEcQ5OsD1QWPzPxBFaVTzsHIY1yF0DU6",
    "2": "https://www.youtube.com/watch?v=o-WGSVrsS_Y&list=PLY19sFAAjnoMQr_-4_fKx82Gv-wfu0FnR",
    "3": "https://www.youtube.com/watch?v=b28Kg0o2iT8&list=PL3qvHcrYGy1u112gfsHycdWaLTVRt8ame&index=47",
    "4": "https://www.youtube.com/watch?v=8vNs1b3NP8A&list=PL3qvHcrYGy1u112gfsHycdWaLTVRt8ame&index=37"
  },
  "Basic-Electrical-Engineering": {
    "1": "https://www.youtube.com/watch?v=63gk5V0FtUo&list=PLohtAIfLLw8c5V9dTc4S1auZUfjDYarbM&index=11",
    "2": "https://www.youtube.com/watch?v=nt6anUZjfxM&list=PLohtAIfLLw8f53yvI4ue84hn4k_vqiIWX",
    "3": "https://www.youtube.com/watch?v=SWHJqYVro5o&list=PLohtAIfLLw8fFa2TGj3ZjUvS42nWFUQK3",
    "4": "https://www.youtube.com/watch?v=IbHHMWUQaB0&list=PL9RcWoqXmzaL1q8tiuQwo0p7xL2aV_bNe",
    "Electrical ONE SHOT": "https://www.youtube.com/playlist?list=PL-vEH_IPWrhAda9e2l6QtfYQASGFA5yPS"
  },
  English:{
    "1": "https://www.youtube.com/watch?v=wMb-CQSKLiA&list=PL3qvHcrYGy1sU_1nMMVrfFEhYROpQtVXV",
    "2": "https://www.youtube.com/watch?v=5EWrcsK3q7g",
  }
};

export default function VideoPage() {
  const params = useParams() ?? {};
  const router = useRouter();
  const [dotCount, setDotCount] = useState(0);

  // ✅ Decode unit to handle spaces
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject ?? "";
  const unit = decodeURIComponent(Array.isArray(params.unit) ? params.unit[0] : params.unit ?? "");

  const videoUrl = videoLinks[subject]?.[unit] || null;

  useEffect(() => {
    if (!videoUrl) {
      router.replace("/youtube-explanation/semester");
      return;
    }

    const interval = setInterval(() => {
      setDotCount((prev) => (prev < 5 ? prev + 1 : 0));
    }, 500);

    // ✅ Open video in new tab after 3.5 seconds
    const timeout = setTimeout(() => {
      window.open(videoUrl, "_blank");
      router.back();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [videoUrl, router]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen 
        bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black 
        text-black dark:text-white transition-all duration-300"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Redirecting to <span className="text-red-600">YouTube </span>
        <span className="inline-block sm:inline">{".".repeat(dotCount)}</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="relative w-16 h-16"
      >
        <div className="absolute w-full h-full border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
          className="w-10 h-10 bg-blue-600 rounded-full absolute top-3 left-3"
        />
      </motion.div>
    </div>
  );
}
