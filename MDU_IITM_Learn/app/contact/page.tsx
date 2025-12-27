import { Metadata } from "next";
import ContactClient from "@/components/Contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Comprehensive Handwritten Notes for MDU and IITM BTech Courses Students.",
  description: "If you have any questions, suggestions, or feedback, feel free to reach out to us.",
};

const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;
