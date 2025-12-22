import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Page | Comprehensive Handwritten Notes for MDU and IITM BTech Courses Students.",
  description: "Comprehensive Handwritten Notes for MDU and IITM BTech Courses Students.",
  // other metadata
};

const ContactPage = () => {
  return (
    <div className="mt-10">
      <Breadcrumb
        pageName="Contact Page"
        description="If you have any questions, suggestions, or feedback, feel free to reach out to us.
      We would love to hear from you!"
      />
      <Contact />
    </div>

  );
};

export default ContactPage;
