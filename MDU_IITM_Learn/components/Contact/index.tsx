"use client";
import { motion } from "framer-motion";
import { Mail, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import NewsLatterBox from "./NewsLatterBox";
import { useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const Contact = ({ hideFormOnMobile = false }: { hideFormOnMobile?: boolean }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus("All fields are required.");
      setShowStatus(true);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      if (response.status === 201) {
        setStatus("Form submitted successfully! We will reach out to you soon.");
        setShowStatus(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.message || "Something went wrong!");
        setShowStatus(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Internal Server Error.");
      setShowStatus(true);
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28 bg-transparent">
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
            Get in Touch
          </h2>
        </motion.div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            {/* Form Visibility Controlled by Prop */}
            <div className={hideFormOnMobile ? "hidden md:block" : "block"}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12 rounded-2xl bg-card border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              >
                <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                  Need Help? <span className="text-emerald-400">Open a Ticket</span>
                </h2>
                <p className="mb-12 text-base font-medium text-muted-foreground">
                  Our support team will get back to you ASAP via email.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label className="mb-3 block text-sm font-medium text-emerald-400">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full rounded-xl border border-emerald-500/20 bg-background px-6 py-3 text-base text-foreground outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label className="mb-3 block text-sm font-medium text-emerald-400">
                          Your Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full rounded-xl border border-emerald-500/20 bg-background px-6 py-3 text-base text-foreground outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label className="mb-3 block text-sm font-medium text-emerald-400">
                          Your Message
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={5}
                          placeholder="Enter your Message"
                          className="w-full resize-none rounded-xl border border-emerald-500/20 bg-background px-6 py-3 text-base text-foreground outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all"
                        ></textarea>
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-9 py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all"
                      >
                        <Send className="h-5 w-5" />
                        Submit
                      </motion.button>
                    </div>
                  </div>
                </form>

                {showStatus && status && (
                  <p className={`mt-6 text-center font-semibold text-lg ${status.includes('successfully') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {status}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Mobile View: Route Button - Only shown if hideFormOnMobile is true */}
            {hideFormOnMobile && (
              <div className="block md:hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="mb-12 rounded-2xl bg-card border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] px-8 py-12 text-center"
                >
                  <h3 className="mb-4 text-xl font-bold text-foreground">
                    Have Questions?
                  </h3>
                  <p className="mb-8 text-base text-muted-foreground">
                    Click below to get in touch with our team directly.
                  </p>
                  <Link href="/contact">
                    <InteractiveHoverButton className="w-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                      <span className="inline-flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        <span>Contact Us</span>
                      </span>
                    </InteractiveHoverButton>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          <div className={`w-full px-4 lg:w-5/12 xl:w-4/12 ${hideFormOnMobile ? "hidden md:block" : "block"}`}>
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
