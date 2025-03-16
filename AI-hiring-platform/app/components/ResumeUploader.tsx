"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { processResume, uploadFile } from "../lib/api";
import { FEATURE_FLAGS } from "../lib/env";

interface ResumeUploaderProps {
  onResumeProcessed?: (parsedData: any) => void;
  existingResume?: string | null;
}

interface Education {
  institution?: string;
  degree?: string;
  date?: string;
  fieldOfStudy?: string;
}

interface Experience {
  company?: string;
  position?: string;
  date?: string;
  description?: string;
}

interface ParsedResumeData {
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  education?: Education[];
  experience?: Experience[];
  skills?: string[];
}

export default function ResumeUploader({ onResumeProcessed, existingResume }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    // If resume parsing is disabled, show a message
    if (!FEATURE_FLAGS.ENABLE_RESUME_PARSING) {
      setUploadError("Resume parsing is currently disabled by the administrator.");
      return;
    }

    // Retrieve existing parsed data if there is an existing resume
    if (existingResume) {
      fetchExistingResumeData();
    }
  }, [existingResume, session]);

  const fetchExistingResumeData = async () => {
    try {
      // In a real app, you would fetch the parsed data from your API
      // For now, we'll simulate it with a mock
      const mockParsedData = {
        contact: {
          name: session?.user?.name || "User Name",
          email: session?.user?.email || "user@example.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA"
        },
        education: [
          {
            institution: "Stanford University",
            degree: "Bachelor of Science in Computer Science",
            date: "2014 - 2018"
          }
        ],
        experience: [
          {
            company: "Tech Innovations Inc",
            position: "Frontend Developer",
            date: "2018 - Present",
            description: "Developed and maintained web applications using React.js and TypeScript."
          },
          {
            company: "Startup Solutions",
            position: "Software Engineering Intern",
            date: "Summer 2017",
            description: "Built responsive web interfaces and implemented API integrations."
          }
        ],
        skills: [
          "JavaScript", "TypeScript", "React.js", "Node.js", "HTML/CSS", 
          "Git", "Agile Development", "UI/UX Design", "API Integration"
        ]
      };
      
      setParsedData(mockParsedData);
      if (onResumeProcessed) {
        onResumeProcessed(mockParsedData);
      }
    } catch (error) {
      console.error("Error fetching existing resume data:", error);
      setUploadError("Failed to load existing resume data. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadError("");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateFile(droppedFile);
    }
  };

  const validateFile = (fileToValidate: File) => {
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(fileToValidate.type)) {
      setUploadError("Please upload a valid document (PDF or Word)");
      return;
    }
    
    // Check file size (5MB max)
    if (fileToValidate.size > 5 * 1024 * 1024) {
      setUploadError("File size should be less than 5MB");
      return;
    }
    
    setFile(fileToValidate);
    setUploadError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file to upload");
      return;
    }

    setUploading(true);
    setUploadError("");
    
    try {
      // Create form data for the API request
      const formData = new FormData();
      formData.append("resume", file);
      
      // Call the resume parsing API
      const response = await fetch("/api/resume/parse", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process resume");
      }
      
      const data = await response.json();
      console.log("Resume parsed successfully:", data);
      
      // Set the parsed data
      setParsedData(data.parsedData);
      setUploadSuccess(true);
      
      if (onResumeProcessed) {
        onResumeProcessed(data.parsedData);
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      setUploadError(error instanceof Error ? error.message : "Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="hidden"
        />
        
        <div className="mx-auto flex justify-center mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {file ? file.name : "Drag & drop your resume or click to browse"}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Supports PDF and Word documents (max 5MB)
        </p>
      </div>
      
      {uploadError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm rounded-md">
          {uploadError}
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          disabled={!file || uploading || !FEATURE_FLAGS.ENABLE_RESUME_PARSING}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            (!file || uploading || !FEATURE_FLAGS.ENABLE_RESUME_PARSING) ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : "Upload & Process Resume"}
        </button>
      </div>
      
      {uploadSuccess && parsedData && (
        <div className="mt-8 border border-green-200 dark:border-green-900 rounded-lg overflow-hidden">
          <div className="bg-green-50 dark:bg-green-900/30 px-4 py-3 border-b border-green-200 dark:border-green-900">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Resume processed successfully!</h3>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="py-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{parsedData.contact?.name || 'Name not found'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{parsedData.contact?.email || 'Email not found'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{parsedData.contact?.phone || 'Phone not found'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{parsedData.contact?.location || 'Location not found'}</p>
                </div>
              </div>
            </div>
            
            <div className="py-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Education</h4>
              {Array.isArray(parsedData.education) ? (
                parsedData.education.map((edu: Education, index: number) => (
                  <div key={`edu-${index}`} className="mb-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{edu.institution || 'Institution not specified'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.degree || 'Degree not specified'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{edu.date || 'Dates not specified'}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No education information found</p>
              )}
            </div>
            
            <div className="py-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Experience</h4>
              {Array.isArray(parsedData.experience) ? (
                parsedData.experience.map((exp: Experience, index: number) => (
                  <div key={`exp-${index}`} className="mb-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{exp.position || 'Position not specified'}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{exp.company || 'Company not specified'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{exp.date || 'Dates not specified'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.description || 'No description available'}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No experience information found</p>
              )}
            </div>
            
            <div className="py-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Skills</h4>
              {Array.isArray(parsedData.skills) && parsedData.skills.length > 0 ? (
                parsedData.skills.map((skill: string, index: number) => (
                  <span key={`skill-${index}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No skills found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}