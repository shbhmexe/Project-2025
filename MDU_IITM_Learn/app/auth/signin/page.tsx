"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
    return (
        <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[500px] rounded-xl bg-white px-6 py-10 shadow-lg dark:bg-zinc-900 sm:p-[60px]">
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
                            <p className="mb-11 text-center text-base font-medium text-body-color">
                                BTech Notes Platform - Sign in to access your account
                            </p>

                            {/* Google Sign In Button */}
                            <button
                                onClick={() => signIn("google", { callbackUrl: "/" })}
                                className="mb-6 flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white px-6 py-4 text-base font-medium text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
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
                                Continue with Google
                            </button>

                            {/* Divider */}
                            <div className="mb-6 flex items-center justify-center">
                                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                                <p className="w-full px-5 text-center text-base font-medium text-body-color">
                                    Quick and secure login
                                </p>
                                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                            </div>

                            {/* Info */}
                            <p className="text-center text-sm text-body-color">
                                By signing in, you agree to our{" "}
                                <Link href="/Terms-Conditions" className="text-primary hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy-policy" className="text-primary hover:underline">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decorations */}
            <div className="absolute left-0 top-0 z-[-1]">
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
                        <rect width="1440" height="969" fill="#090E34" />
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
                            <stop offset="1" stopColor="#10B981" stopOpacity="0" />
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
                            <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
}
