"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LightPillar from "@/components/LightPillar";

export default function SignInPage() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

    return (
        <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
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

            <div className="container relative z-10">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[500px] rounded-2xl bg-white px-6 py-10 shadow-2xl transition-all duration-300 dark:border dark:border-emerald-500/20 dark:bg-zinc-900/80 dark:backdrop-blur-xl sm:p-[60px] dark:shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                            {/* Logo */}
                            <div className="mb-8 flex justify-center">
                                <Link href="/">
                                    <Image
                                        src="/images/logo/logo-transparent.png"
                                        alt="Logo"
                                        width={150}
                                        height={80}
                                        className="h-auto w-[120px]"
                                        unoptimized
                                    />
                                </Link>
                            </div>

                            <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                Welcome to MDU IITM Learn
                            </h3>
                            <p className="mb-11 text-center text-base font-medium text-body-color dark:text-gray-400">
                                BTech Notes Platform - Sign in to access your account
                            </p>

                            {/* Google Sign In Button */}
                            <button
                                onClick={() => signIn("google", { callbackUrl: "/" })}
                                className="group mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white px-6 py-4 text-base font-medium text-gray-700 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-50 hover:shadow-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                    Continue with Google
                                </span>
                            </button>

                            {/* Divider */}
                            <div className="mb-6 flex items-center justify-center">
                                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/20 dark:bg-zinc-700 sm:block"></span>
                                <p className="w-full px-5 text-center text-sm font-medium text-body-color dark:text-gray-500">
                                    Quick and secure login
                                </p>
                                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/20 dark:bg-zinc-700 sm:block"></span>
                            </div>

                            {/* Info */}
                            <p className="text-center text-sm text-body-color dark:text-gray-400">
                                By signing in, you agree to our{" "}
                                <Link href="/Terms-Conditions" className="text-emerald-600 hover:underline dark:text-emerald-400">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy-policy" className="text-emerald-600 hover:underline dark:text-emerald-400">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decorations - subtle emerald version */}
            {!isDarkMode && (
                <div className="absolute left-0 top-0 z-[-1] opacity-50">
                    <svg
                        width="1440"
                        height="969"
                        viewBox="0 0 1440 969"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <mask
                            id="mask0_95:1005"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="1440"
                            height="969"
                        >
                            <rect width="1440" height="969" fill="#F0FDF4" />
                        </mask>
                        <g mask="url(#mask0_95:1005)">
                            <path
                                opacity="0.1"
                                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                                fill="url(#paint0_linear_95:1005)"
                            />
                            <path
                                opacity="0.1"
                                d="M1324.5 755.5L1086.96 297.978L935.625 535.926L1324.5 755.5Z"
                                fill="url(#paint1_linear_95:1005)"
                            />
                        </g>
                        <defs>
                            <linearGradient
                                id="paint0_linear_95:1005"
                                x1="1178.4"
                                y1="151.853"
                                x2="780.959"
                                y2="453.581"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#10B981" />
                                <stop offset="1" stopColor="#34D399" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_95:1005"
                                x1="1178.4"
                                y1="151.853"
                                x2="780.959"
                                y2="453.581"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#10B981" />
                                <stop offset="1" stopColor="#34D399" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            )}
        </section>
    );
}
