"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ResumeUploader from "../components/ResumeUploader";
import JobMatchingSystem from "../components/JobMatchingSystem";
import ApplicationAnalyzer from "../components/ApplicationAnalyzer";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [parsedResumeData, setParsedResumeData] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      fetchProfileData();
    }
  }, [status, router]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      // Simulate API call to fetch profile data
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock profile data - in production, this would be fetched from your API
      const mockProfile = {
        id: "1",
        userId: session?.user?.id,
        bio: "Senior Frontend Developer with 5+ years of experience in building responsive web applications. Passionate about user experience and clean code.",
        location: "San Francisco, CA",
        website: "https://johndoe.dev",
        resume: "resume.pdf", // This would be a URL to the stored resume
        skills: ["JavaScript", "TypeScript", "React.js", "Node.js", "HTML/CSS", "Git", "Agile Development", "UI/UX Design", "API Integration"],
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
        ]
      };

      setProfile(mockProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeProcessed = (data) => {
    setParsedResumeData(data);
    // In a real app, you would also update the profile with this data
  };

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profile Not Set Up</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't set up your profile yet. Create a profile to start applying for jobs and get matched with opportunities.
            </p>
            <Link 
              href="/profile/edit" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{session?.user?.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
                {profile.location && (
                  <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {profile.location}
                  </p>
                )}
                {profile.website && (
                  <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      {profile.website}
                    </a>
                  </p>
                )}
              </div>
              <div className="mt-4 md:mt-0">
                <Link 
                  href="/profile/edit" 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
            
            {profile.bio && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">About</h2>
                <p className="text-gray-600 dark:text-gray-400">{profile.bio}</p>
              </div>
            )}
            
            {profile.skills && profile.skills.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile Details
              </button>
              <button
                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                  activeTab === 'resume'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('resume')}
              >
                Resume
              </button>
              <button
                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                  activeTab === 'job-matches'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('job-matches')}
              >
                Job Matches
              </button>
              <button
                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                  activeTab === 'application-analyzer'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('application-analyzer')}
              >
                Application Analyzer
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'profile' && (
              <div>
                <div className="space-y-6">
                  {profile.experience && profile.experience.length > 0 && (
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Experience</h2>
                      <div className="space-y-6">
                        {profile.experience.map((exp, index) => (
                          <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                            <h3 className="text-md font-medium text-gray-900 dark:text-white">{exp.position}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{exp.company}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{exp.date}</p>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'resume' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resume</h2>
                  {profile.resume ? (
                    <div className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        You have already uploaded a resume. You can view, update, or analyze it below.
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center">
                          <svg className="h-8 w-8 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{profile.resume}</span>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      You haven't uploaded a resume yet. Upload one to improve your job matches and applications.
                    </p>
                  )}
                  
                  <div className="mt-6">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                      {profile.resume ? "Update Resume" : "Upload Resume"}
                    </h3>
                    <ResumeUploader 
                      existingResume={profile.resume}
                      onResumeProcessed={handleResumeProcessed}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'job-matches' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Job Matches</h2>
                <JobMatchingSystem 
                  candidateSkills={profile.skills}
                  candidateExperience={profile.experience}
                />
              </div>
            )}
            
            {activeTab === 'application-analyzer' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Application Analyzer</h2>
                <ApplicationAnalyzer />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 