import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/CGPA";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "MDU, IITM, DITM, MVSIT & AKIDO B.Tech Notes, EDG Sheets & PYQs – Best Study Resources",
  description: 
  "Access Maharshi Dayanand University (MDU) and IITM Janakpuri B.Tech student notes, PYQs, syllabus, study resources, EDGE sheets, lab manuals, and practical files in one place! Students of DITM, MVSIT, AKIDO, and other affiliated colleges can find all semester and all-year notes, including assignments and future updates, to help excel in their studies.",

    keywords:
    "MDU IITM Notes, PYQs, Syllabus, Study Material, EDGE Sheets, Practical Files, MDU Rohtak, BTech Notes, IPU, Semester Notes, Engineering Study Material, Previous Year Questions, IITM Janakpuri, Free Study Resources, MDU Exam Prep DITM, MVSIT, AKIDO, Maharshi Dayanand University (MDU)",  
  authors: [
    {
      name: "Shubham Shukla",
      url: "https://mduiitmlearn.vercel.app", // ✅ Ensure HTTPS is included
    },
  ],
  openGraph: {
    title: "MDU, IITM, DITM, MVSIT & AKIDO B.Tech Notes, EDG Sheets & PYQs – Best Study Resources",
    description:
      "Get semester-wise study resources, previous year questions, and notes in one place.",
    url: "https://mduiitmlearn.vercel.app",
    siteName: "MDU ROHTAK IITM JANAKPURI",
    images: [
      {
        url: "https://mduiitmlearn.vercel.app/logo/brand1.png", // ✅ Full URL required for SEO
        width: 1200,
        height: 630,
        alt: "MDU IITM Study Resources",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDU IITM Notes & PYQs – Learn Smarter, Not Harder",
    description:
      "Access MDU IITM notes, PYQs, syllabus, study resources, EDGE sheets, and practical files in one place!",
    images: [
      "https://mduiitmlearn.vercel.app/logo/1.png", // ✅ Full URL for Twitter Cards
    ],
  },
  robots: "index, follow",
};



export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}
