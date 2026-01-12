"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Pages that should NOT show the breadcrumb (main nav pages)
const excludedPaths = [
    "/",
    "/notes",
    "/Syllabus",
    "/pyqs",
    "/youtube-explanation/semester",
    "/cgpa",
];

// Custom page name mappings for prettier display
const pageNameMap: { [key: string]: string } = {
    "community": "Community",
    "notes": "Notes",
    "projects": "Projects",
    "contact": "Contact",
    "about": "About",
    "blog": "Blog",
    "privacy-policy": "Privacy Policy",
    "Terms-Conditions": "Terms & Conditions",
    "auth": "Sign In",
    "signin": "Sign In",
};

export default function MobileBreadcrumb() {
    const pathname = usePathname();

    // Check if current path should be excluded
    const shouldHide = excludedPaths.some((path) => {
        if (path === "/") return pathname === "/";
        return pathname === path || pathname?.startsWith(path + "/");
    });

    // Get page name from pathname
    const getPageName = () => {
        if (!pathname) return "";
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length === 0) return "Home";

        // Get the last meaningful segment
        const lastSegment = segments[segments.length - 1];

        // Check for custom mapping first
        if (pageNameMap[lastSegment]) {
            return pageNameMap[lastSegment];
        }

        // Capitalize and format
        return lastSegment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    if (shouldHide) return null;

    return (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/30">
            <div className="container mx-auto px-4 py-3 flex items-center">
                <nav className="flex items-center gap-2 text-sm">
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-emerald-400 transition-colors font-medium"
                    >
                        Home
                    </Link>
                    <span className="text-emerald-500">&gt;</span>
                    <span className="text-emerald-500 font-medium truncate max-w-[200px]">
                        {getPageName()}
                    </span>
                </nav>
            </div>
        </div>
    );
}
