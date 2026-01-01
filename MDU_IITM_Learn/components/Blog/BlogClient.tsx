"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LightPillar from "@/components/LightPillar";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import { Blog } from "@/types/blog";

export default function BlogClient({
    currentBlogs,
    page,
    totalPages
}: {
    currentBlogs: Blog[],
    page: number,
    totalPages: number
}) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

    return (
        <div className="relative overflow-hidden">
            {/* Background Animation for Dark Mode */}
            {/* Background Animation for Dark Mode */}
            {/* <div className="absolute inset-0 -z-30 bg-background" /> */}
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
                className="relative z-10"
            >
                <div className="mt-10 bg-transparent text-foreground">
                    <Breadcrumb
                        pageName="Blog"
                        description="Unlock the power of structured learning with insightful study techniques, expertly crafted to enhance your academic performance."
                    />

                    <section className="pb-[120px] pt-[120px]">
                        <div className="container">
                            <div className="-mx-4 flex flex-wrap justify-center">
                                {currentBlogs.map((blog) => (
                                    <div
                                        key={blog.id}
                                        className="w-full px-4 mb-10 md:w-2/3 lg:w-1/2 xl:w-1/3"
                                    >
                                        <SingleBlog blog={blog} />
                                    </div>
                                ))}
                            </div>

                            <div className="wow fadeInUp -mx-4 flex flex-wrap" data-wow-delay=".15s">
                                <div className="w-full px-4">
                                    <ul className="flex items-center justify-center pt-8">
                                        <li className="mx-1">
                                            <Link
                                                href={page > 1 ? `/blog?page=${page - 1}` : `/blog?page=1`}
                                                className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-muted px-4 text-sm text-muted-foreground transition hover:bg-emerald-500 hover:text-white ${page <= 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                                            >
                                                Prev
                                            </Link>
                                        </li>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                            <li key={pageNum} className="mx-1">
                                                <Link
                                                    href={`/blog?page=${pageNum}`}
                                                    className={`flex h-9 min-w-[36px] items-center justify-center rounded-md ${pageNum === page
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-muted text-muted-foreground hover:bg-emerald-500 hover:text-white'
                                                        } px-4 text-sm transition`}
                                                >
                                                    {pageNum}
                                                </Link>
                                            </li>
                                        ))}

                                        <li className="mx-1">
                                            <Link
                                                href={page < totalPages ? `/blog?page=${page + 1}` : `/blog?page=${totalPages}`}
                                                className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-muted px-4 text-sm text-muted-foreground transition hover:bg-emerald-500 hover:text-white ${page >= totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                                            >
                                                Next
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </motion.main>
        </div>
    );
}
