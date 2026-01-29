"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import menuData from "./menuData";
import { AuthButton } from "./AuthButton";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useScroll, useMotionValueEvent, AnimatePresence, motion } from "motion/react";

export function ResizableHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        setMounted(true);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    });

    // Filter out submenu items for simple nav items
    const navItems = menuData
        .filter(item => item.path) // Only items with direct paths
        .map((item) => ({
            name: item.title,
            link: item.path || "#",
        }));

    if (!mounted) return null;

    const logoSrc = (theme === "dark" || resolvedTheme === "dark")
        ? "/images/logo/logomain.png"
        : "/images/logo/logowhite.png";

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed inset-x-0 top-0 z-[9999]"
                >
                    <div className="mx-auto max-w-7xl px-4 pt-4">
                        <div className={cn(
                            "flex items-center justify-between rounded-full px-4 py-2",
                            "bg-background/80 backdrop-blur-lg border border-border/50 shadow-lg"
                        )}>
                            {/* Logo */}
                            <Link href="/" className="flex items-center">
                                <div className="relative w-[100px] sm:w-[120px] aspect-[180/100]">
                                    <Image
                                        src={logoSrc}
                                        alt="Logo"
                                        fill
                                        className={cn(
                                            "object-contain",
                                            (theme === "dark" || resolvedTheme === "dark") ? "mix-blend-screen" : "mix-blend-multiply"
                                        )}
                                        unoptimized
                                    />
                                </div>
                            </Link>

                            {/* Desktop Nav Items */}
                            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                                {navItems.map((item, idx) => (
                                    <Link
                                        key={`nav-${idx}`}
                                        href={item.link}
                                        className="px-3 py-2 text-sm text-foreground/80 hover:text-primary transition-colors rounded-full hover:bg-accent"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>

                            {/* Desktop Actions */}
                            <div className="hidden lg:flex items-center gap-3">
                                <ThemeToggler />
                                <AuthButton />
                            </div>

                            {/* Mobile Toggle */}
                            <div className="flex lg:hidden items-center gap-3">
                                <ThemeToggler />
                                <MobileNavToggle
                                    isOpen={isMobileMenuOpen}
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                />
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-2 rounded-xl bg-background/95 backdrop-blur-lg border border-border/50 p-4 shadow-lg lg:hidden"
                                >
                                    <div className="flex flex-col gap-2">
                                        {menuData.map((item, idx) => (
                                            <Link
                                                key={`mobile-nav-${idx}`}
                                                href={item.path || "#"}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="px-4 py-3 text-foreground/80 hover:text-primary hover:bg-accent rounded-lg transition-colors"
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                        <div className="pt-4 border-t border-border/50">
                                            <AuthButton />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
