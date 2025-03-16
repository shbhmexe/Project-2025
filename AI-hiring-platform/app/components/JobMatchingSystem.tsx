"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getJobMatches } from "../lib/api";
import { FEATURE_FLAGS } from "../lib/env";

interface Skill {
  name: string;
  weight?: number;
  match?: boolean;
}

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  score: number;
  matchedSkills: Skill[];
  missingSkills: Skill[];
  type: string;
  createdAt: string;
}

interface JobMatchingSystemProps {
  candidateSkills?: string[];
  candidateExperience?: any[];
}

export default function JobMatchingSystem({ candidateSkills = [], candidateExperience = [] }: JobMatchingSystemProps) {
  const [loading, setLoading] = useState(true);
  const [matchedJobs, setMatchedJobs] = useState<JobMatch[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if job matching is enabled
    if (!FEATURE_FLAGS.ENABLE_JOB_MATCHING) {
      setError("Job matching is currently disabled by the administrator.");
      setLoading(false);
      return;
    }

    if (candidateSkills.length > 0) {
      fetchMatchedJobs();
    } else {
      setLoading(false);
    }
  }, [candidateSkills]);

  const fetchMatchedJobs = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Get job matches from API
      const jobs = await getJobMatches(candidateSkills, candidateExperience);
      setMatchedJobs(jobs);
      
      // Select the first job by default if there are matches
      if (jobs.length > 0) {
        setSelectedJob(jobs[0]);
      }
    } catch (error) {
      console.error("Error fetching matched jobs:", error);
      setError("Failed to fetch job matches. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleJobSelect = (job: JobMatch) => {
    setSelectedJob(job);
  };

  const renderJobTypeBadge = (type: string) => {
    const typeClasses: Record<string, string> = {
      FULL_TIME: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      PART_TIME: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      CONTRACT: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      INTERNSHIP: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      TEMPORARY: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
    };

    const typeLabels: Record<string, string> = {
      FULL_TIME: "Full Time",
      PART_TIME: "Part Time",
      CONTRACT: "Contract",
      INTERNSHIP: "Internship",
      TEMPORARY: "Temporary"
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeClasses[type] || "bg-gray-100 text-gray-800"}`}>
        {typeLabels[type] || type}
      </span>
    );
  };

  const renderScoreBadge = (score: number) => {
    let colorClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    if (score >= 90) {
      colorClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    } else if (score >= 75) {
      colorClass = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    } else if (score >= 60) {
      colorClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        {score}% Match
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-8 w-8 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500 dark:text-gray-400">Finding your best job matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg p-4">
        <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">Error</h3>
        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!FEATURE_FLAGS.ENABLE_JOB_MATCHING) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Job Matching Disabled</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          The job matching feature is currently disabled. Please contact the administrator for more information.
        </p>
      </div>
    );
  }

  if (candidateSkills.length === 0) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">No skills available for matching</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          Upload your resume or add skills to your profile to get personalized job matches.
        </p>
      </div>
    );
  }

  if (matchedJobs.length === 0) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">No job matches found</h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          We couldn't find any jobs that match your skills and experience. Try updating your profile with more skills or check back later for new job postings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">AI-Powered Job Matches</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Based on your skills and experience, we've found {matchedJobs.length} jobs that match your profile
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Jobs List */}
          <div className="md:w-1/2 border-r border-gray-200 dark:border-gray-700">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {matchedJobs.map((job) => (
                <div 
                  key={job.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${
                    selectedJob?.id === job.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                  }`}
                  onClick={() => handleJobSelect(job)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{job.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{job.location}</span>
                        <span>•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Posted {formatDate(job.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {renderScoreBadge(job.score)}
                      {renderJobTypeBadge(job.type)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Job Match Details */}
          <div className="md:w-1/2 p-4">
            {selectedJob ? (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{selectedJob.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedJob.company}</p>
                  </div>
                  <div>
                    {renderScoreBadge(selectedJob.score)}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Match Analysis</h4>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Compatibility Score: {selectedJob.score}%</span>
                      <div className="ml-2 flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600" 
                          style={{ width: `${selectedJob.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedJob.score >= 90 ? (
                        'You are an excellent match for this position. Your skills and experience align very well with the job requirements.'
                      ) : selectedJob.score >= 75 ? (
                        'You are a good match for this position. Your profile matches most of the key requirements for this role.'
                      ) : selectedJob.score >= 60 ? (
                        'You meet many of the requirements, but there are some skill gaps. Consider highlighting your strengths in your application.'
                      ) : (
                        'You match some of the requirements, but there are significant skill gaps. This role might be challenging but could offer growth opportunities.'
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Matching Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.matchedSkills.map((skill, index) => (
                      <span key={`match-${index}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedJob.missingSkills.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Missing Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.missingSkills.map((skill, index) => (
                        <span key={`missing-${index}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Consider highlighting similar skills or experience in your application, or taking courses to learn these skills.
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end space-x-4">
                  <Link 
                    href={`/jobs/${selectedJob.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Select a job to see match details</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click on a job from the list to see how well your skills match its requirements
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 