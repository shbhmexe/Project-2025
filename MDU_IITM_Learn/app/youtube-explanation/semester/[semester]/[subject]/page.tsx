"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const unitsBySubject: Record<string, string[]> = {
  "Mathematics-I": [
    "1",
    "2",
    "3",
    "4",
    "Beta Gamma Function",
    "Evolutes and Involutes",
    "Taylor Series",
    "Maclaurin Series",
    "Inner Space Product",
    "Revision All Unit",
  ],
  "Semiconductor-Physics": ["1", "2", "3", "4"],
  English: ["1", "2"],
  "Basic-Electrical-Engineering": ["1", "2", "3", "4", "Electrical ONE SHOT"],
};

export default function UnitPage() {
  const params = useParams() ?? {};
  const router = useRouter();

  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject ?? "";
  const semester = Array.isArray(params.semester) ? params.semester[0] : params.semester ?? "";

  if (!subject || !unitsBySubject[subject]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold">Invalid Subject</h1>
        <p>Please go back and select a valid subject.</p>
      </div>
    );
  }

  const units = unitsBySubject[subject];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black text-black dark:text-white px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 transition-all duration-300"
      >
        Select Your <span className="text-blue-600 transition-all duration-300">Unit</span> :
      </motion.h1>

      {/* ✅ 3-LINE RESPONSIVE GRID LAYOUT ✅ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl">
        {units.map((unit, index) => (
          <motion.button
            key={unit}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
            onClick={() => router.push(`/youtube-explanation/semester/${semester}/${subject}/${unit}`)}
          >
            {unit}
          </motion.button>
        ))}
      </div>

      {/* Divider */}
      {/* <div className="w-4/5 md:w-2/3 border-t border-gray-400 dark:border-gray-600 mt-20"></div> */}

      {/* ⚠️ Caution Message */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-4 text-center"
      >
        <h2 className="text-lg font-semibold flex items-center justify-center gap-2">
          ⚠️ Caution Before Opening Notes
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          For a <strong>better experience</strong>, install an <strong>AdBlocker extension</strong> on <strong>desktop</strong>
          or use <strong>Private DNS</strong> on <strong>mobile</strong>:
        </p>

        <p className="text-sm font-semibold mt-1">
          DNS: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">dns.adguard.com</code>
        </p>
      </motion.div> */}
    </motion.div>
  );
}
