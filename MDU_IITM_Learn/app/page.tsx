import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Cgpa from "@/components/CGPA";
import Dashboard from "@/components/Dashboard";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "mduiitmlearn - B.Tech Notes & Study Materials",
  description:
    "Access Maharshi Dayanand University (MDU) and IITM Janakpuri B.Tech student notes, PYQs, syllabus, study resources, EDGE sheets, lab manuals, and practical files in one place! Students of DITM, MVSIT, AKIDO, and other affiliated colleges can find all semester and all-year notes, including assignments and future updates, to help excel in their studies.",

  keywords:
    "MDU IITM Notes, mduiitmlearn, PYQs, Syllabus, Study Material, EDGE Sheets, Practical Files, MDU Rohtak, BTech Notes, IPU, Semester Notes, Engineering Study Material, Previous Year Questions, IITM Janakpuri, Free Study Resources, MDU Exam Prep DITM, MVSIT, AKIDO, Maharshi Dayanand University (MDU), MDU Rohtak notes, IITM Janakpuri notes, B.Tech 1st Year notes, CSE notes, MDU syllabus 2025, MDU question papers, engineering physics notes, engineering chemistry notes, maths 1 notes, B.Tech syllabus, free engineering notes, university notes, exam preparation",
  authors: [
    {
      name: "Shubham Shukla",
      url: "https://www.mduiitmlearn.app", // ✅ Ensure HTTPS is included
    },
  ],
  openGraph: {
    title: "mduiitmlearn - MDU, IITM, DITM, MVSIT & AKIDO B.Tech Notes, EDG Sheets & PYQs",
    description:
      "Get semester-wise study resources, previous year questions, and notes in one place.",
    url: "https://www.mduiitmlearn.app",
    siteName: "mduiitmlearn",
    images: [
      {
        url: "https://www.mduiitmlearn.app/images/logo/logomain.png", // ✅ Full URL required for SEO
        width: 1200,
        height: 630,
        alt: "mduiitmlearn Study Resources",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mduiitmlearn - Learn Smarter, Not Harder",
    description:
      "Access MDU IITM notes, PYQs, syllabus, study resources, EDGE sheets, and practical files in one place!",
    images: [
      "https://www.mduiitmlearn.app/images/logo/logomain.png", // ✅ Full URL for Twitter Cards
    ],
  },
  robots: "index, follow",
};



export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Dashboard />
      <Features />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Cgpa />
      <Blog />
      <Contact hideFormOnMobile={true} />
    </>
  );
}
