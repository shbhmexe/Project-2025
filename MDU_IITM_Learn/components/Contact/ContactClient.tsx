"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LightPillar from "@/components/LightPillar";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

export default function ContactClient() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

    return (
        <div className="relative overflow-hidden">
            {/* Background Animation for Dark Mode */}
            <div className="absolute inset-0 -z-30 bg-background" />
            {isDarkMode && (
                <div className="absolute inset-0 -z-20 hidden lg:block overflow-hidden opacity-20 pointer-events-none">
                    <LightPillar
                        topColor="#10b981"
                        bottomColor="#059669"
                        intensity={0.8}
                        rotationSpeed={0.2}
                        glowAmount={0.003}
                        pillarWidth={2.0}
                        pillarHeight={0.3}
                        noiseIntensity={0.5}
                        pillarRotation={45}
                        interactive={false}
                        mixBlendMode="normal"
                    />
                </div>
            )}

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 min-h-screen"
            >
                <div className="mt-10 bg-transparent text-foreground">
                    <Breadcrumb
                        pageName="Contact Page"
                        description="If you have any questions, suggestions, or feedback, feel free to reach out to us. We would love to hear from you!"
                    />
                    <Contact />
                </div>
            </motion.main>
        </div>
    );
}
