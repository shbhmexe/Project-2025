"use client";

import { motion } from "framer-motion";
import { Bell, Send } from "lucide-react";
import { useState } from "react";

const NewsLatterBox = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Subscribed successfully! Check your email.");
        setFormData({ name: "", email: "" });
      } else {
        setMessage(`❌ ${data.error || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("❌ Network error, please try again.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative z-10 rounded-2xl bg-card border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] p-8 sm:p-11 lg:p-8 xl:p-11 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
            <Bell className="h-5 w-5 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold leading-tight text-foreground">
            Subscribe to receive <span className="text-emerald-400">future updates</span>
          </h3>
        </div>
        <p className="mb-6 border-b border-emerald-500/20 pb-6 text-base leading-relaxed text-muted-foreground">
          Enter your details to subscribe to our newsletter.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="mb-4 w-full rounded-xl border border-emerald-500/20 bg-background px-6 py-3 text-base text-foreground outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="mb-4 w-full rounded-xl border border-emerald-500/20 bg-background px-6 py-3 text-base text-foreground outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all"
          />
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-5 flex w-full cursor-pointer items-center justify-center gap-2 px-9 py-4 text-base font-semibold rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {loading ? "Subscribing..." : "Subscribe"}
          </motion.button>
        </form>
        {message && (
          <p className={`text-center text-base leading-relaxed mb-4 ${message.startsWith("✅") ? "text-emerald-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
        <p className="text-center text-sm leading-relaxed text-muted-foreground">
          No spam guaranteed, So please don't send any spam mail.
        </p>
      </div>
    </motion.div>
  );
};

export default NewsLatterBox;
