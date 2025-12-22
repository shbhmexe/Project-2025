import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

// Metadata for SEO and proper site branding
export const metadata = {
  title: {
    default: "MDU IITM LEARN - B.Tech Notes, PYQs & Study Materials",
    template: "%s | MDU IITM LEARN"
  },
  description: "Comprehensive collection of MDU & IITM B.Tech study materials including handwritten notes, previous year questions (PYQs), lab manuals, and EDG sheets.",
  applicationName: "MDU IITM LEARN",
  keywords: ["MDU notes", "IITM notes", "B.Tech study materials", "PYQs", "handwritten notes", "engineering notes"],
  authors: [{ name: "MDU IITM LEARN Team" }],
  creator: "MDU IITM LEARN",
  publisher: "MDU IITM LEARN",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mduiitmlearn.vercel.app",
    siteName: "MDU IITM LEARN",
    title: "MDU IITM LEARN - B.Tech Notes & Study Materials",
    description: "Your one-stop platform for MDU & IITM B.Tech notes, PYQs, and study resources.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MDU IITM LEARN Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MDU IITM LEARN - B.Tech Notes & Study Materials",
    description: "Your one-stop platform for MDU & IITM B.Tech notes, PYQs, and study resources.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`bg-background text-foreground selection:bg-primary/20 selection:text-primary ${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
