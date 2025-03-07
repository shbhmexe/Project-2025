import Head from "next/head";
import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BTech Notes - MDU & IITM</title>
        <meta name="description" content="Get comprehensive handwritten notes for MDU and IITM BTech students." />
        <meta name="keywords" content="BTech Notes, MDU Notes, IITM Notes, Engineering Notes" />
        <meta name="author" content="Shubham Shukla" />
        <meta property="og:title" content="BTech Notes - MDU & IITM" />
        <meta property="og:description" content="Comprehensive handwritten notes for BTech students." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo/ogimage.png" />
        <meta property="og:url" content="https://mduiitmlearn.vercel.app" />
        <meta name="meta:description" content="Comprehensive handwritten notes for BTech students." />

        {/* ✅ Structured Data JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MDU IITM Learn",
          "url": "https://mduiitmlearn.vercel.app/",
          "description": "Get semester-wise notes, PYQs, EDG sheets, practical files, and lab manuals for MDU, IITM, DITM, MVSIT, and AKIDO.",
          "publisher": {
            "@type": "Organization",
            "name": "MDU IITM Learn",
            "logo": {
              "@type": "ImageObject",
              "url": "https://mduiitmlearn.vercel.app/logo.png",
              "width": 600,
              "height": 600
            }
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://mduiitmlearn.vercel.app/search?q={search_term}",
            "query-input": "required name=search_term"
          },
          "hasPart": [
            {
              "@type": "CollectionPage",
              "name": "Notes",
              "url": "https://mduiitmlearn.vercel.app/notes"
            },
            {
              "@type": "CollectionPage",
              "name": "Previous Year Questions",
              "url": "https://mduiitmlearn.vercel.app/pyqs"
            },
            {
              "@type": "CollectionPage",
              "name": "Syllabus",
              "url": "https://mduiitmlearn.vercel.app/syllabus"
            }
          ],
          "educationalOrganization": {
            "@type": "CollegeOrUniversity",
            "name": [
              "Maharshi Dayanand University (MDU)",
              "IITM Janakpuri",
              "DITM",
              "MVSIT",
              "AKIDO College"
            ],
            "sameAs": [
              "https://mdu.ac.in/",
              "https://iitmjanakpuri.com/"
            ]
          },
          "mainEntity": {
            "@type": "EducationalContent",
            "name": "Semester-wise Study Resources",
            "educationalLevel": "Undergraduate",
            "hasPart": [
              {
                "@type": "CreativeWork",
                "name": "Semester 1 Notes",
                "url": "https://mduiitmlearn.vercel.app/notes/semester-1"
              },
              {
                "@type": "CreativeWork",
                "name": "Semester 2 Notes",
                "url": "https://mduiitmlearn.vercel.app/notes/semester-2"
              }
            ]
          }
        }) }} />
        
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
