"use client";

import { useState } from "react";

export default function CandidateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    skills: "",
    experience: "",
    resumeText: "",
    resumeFile: null as File | null,
  });

  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, resumeFile: file, resumeText: "" }); // ✅ If file is uploaded, remove text
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("linkedin", formData.linkedin);
      formDataToSend.append("skills", formData.skills); // ✅ FIXED: String format
      formDataToSend.append("experience", formData.experience);

      if (formData.resumeFile) {
        formDataToSend.append("resumeFile", formData.resumeFile);
      } else if (formData.resumeText.trim() !== "") {
        formDataToSend.append("resumeText", formData.resumeText);
      }

      console.log("🔹 Sending FormData to API...", formDataToSend);

      const response = await fetch("/api/candidate", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server responded with ${response.status}: ${errorData.error}`);
      }

      const result = await response.json();
      alert(result.message);

      setFormData({
        name: "",
        email: "",
        linkedin: "",
        skills: "",
        experience: "",
        resumeText: "",
        resumeFile: null,
      });
      setFileName("");

    } catch (error) {
      console.error("🔥 Fetch Error:", error);
      alert("Error submitting form. Please check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Candidate Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-300" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-300" />
        <input type="text" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} required className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-300" />
        <textarea name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} required className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-300"></textarea>
        <textarea name="experience" placeholder="Experience Summary" value={formData.experience} onChange={handleChange} required className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-300"></textarea>

        {/* ✅ File Upload with Filename Display */}
        <div className="bg-gray-700 p-2 rounded">
          <label className="block text-white">Upload Resume (PDF or paste text)</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="w-full p-2 border rounded bg-gray-600 text-white" />
          {fileName && <p className="text-sm text-green-400 mt-1">📄 {fileName}</p>}
        </div>

        {/* ✅ Resume Text Input (Optional) */}
        {!formData.resumeFile && (
          <textarea name="resumeText" placeholder="Or paste resume text here" value={formData.resumeText} onChange={handleChange} className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-300"></textarea>
        )}

        <button type="submit" disabled={uploading || !formData.name || !formData.email || !formData.linkedin || (!formData.resumeFile && !formData.resumeText)} className={`w-full py-2 rounded ${uploading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white`}>
          {uploading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
