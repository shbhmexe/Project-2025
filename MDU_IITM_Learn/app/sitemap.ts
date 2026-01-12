import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mduiitmlearn.app"; // Change this to your actual domain when deploying

  return [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/Aboutpage`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/auth/signin`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/blog`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/blog-details`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/cgpa`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/community/notes`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/community/projects`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/notes`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/pyqs`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/Syllabus`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/Terms-Conditions`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/youtube-explanation/semester`, lastModified: new Date().toISOString() },
  ];
}
