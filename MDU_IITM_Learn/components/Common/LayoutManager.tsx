"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import MobileBreadcrumb from "@/components/Common/MobileBreadcrumb";

export default function LayoutManager({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    if (isAdminPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <MobileBreadcrumb />
            {children}
            <Footer />
            <ScrollToTop />
        </>
    );
}
