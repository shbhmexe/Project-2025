import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mduiitmlearn.vercel.app"; // Change this to your actual domain when deploying

  return [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/notes`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/syllabus`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/cgpa`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/pyqs`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString() },
  ];
}
