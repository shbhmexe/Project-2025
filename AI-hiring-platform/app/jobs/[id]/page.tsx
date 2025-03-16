"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

// Format date to readable format
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Job type badge component
function JobTypeBadge({ type }: { type: string }) {
  const typeClasses: { [key: string]: string } = {
    FULL_TIME: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    PART_TIME: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    CONTRACT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    INTERNSHIP: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    REMOTE: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
  };
  
  const typeLabels: { [key: string]: string } = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
    REMOTE: "Remote"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeClasses[type] || "bg-gray-100 text-gray-800"}`}>
      {typeLabels[type] || type}
    </span>
  );
}

interface JobDetailPageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const jobId = params.id;
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyStatus, setApplyStatus] = useState({
    isSubmitting: false,
    success: false,
    error: ""
  });
  
  // Form state for application
  const [application, setApplication] = useState({
    coverLetter: "",
    experience: ""
  });

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      // Simulate API call to fetch job details
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock job data
      setJob({
        id: jobId,
        title: "Senior Frontend Developer",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA (Remote Option)",
        type: "FULL_TIME",
        salary: "$120,000 - $150,000",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        description: `
          We are looking for an experienced Frontend Developer to join our team.
          
          As a Senior Frontend Developer, you will be responsible for implementing visual elements and user interactions that users see and interact with in a web application. You'll work closely with our UI/UX designers and backend developers to create a seamless user experience.
          
          Your work will directly impact our users and help us create an engaging and efficient platform.
        `,
        requirements: `
          - 5+ years of experience in frontend development
          - Strong proficiency in JavaScript, HTML, CSS
          - Experience with React.js and Next.js
          - Understanding of UI/UX design principles
          - Experience with responsive design and cross-browser compatibility
          - Knowledge of modern frontend build pipelines and tools
          - Experience with RESTful APIs and GraphQL
          - Bachelor's degree in Computer Science or related field (or equivalent experience)
        `,
        benefits: `
          - Competitive salary and equity package
          - Health, dental, and vision insurance
          - 401(k) with employer match
          - Unlimited PTO
          - Remote work options
          - Professional development budget
          - Home office stipend
          - Team retreats twice a year
        `
      });
    } catch (err) {
      console.error("Error fetching job:", err);
      setError("Failed to load job details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (sessionStatus !== "authenticated") {
      router.push(`/auth/signin?callbackUrl=/jobs/${jobId}`);
      return;
    }

    // Check if user is a job seeker
    if (session.user.role !== "JOB_SEEKER") {
      setApplyStatus({
        isSubmitting: false,
        success: false,
        error: "Only job seekers can apply for jobs."
      });
      return;
    }

    setApplyStatus({
      isSubmitting: true,
      success: false,
      error: ""
    });

    try {
      // Simulate API call to submit application
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setApplyStatus({
        isSubmitting: false,
        success: true,
        error: ""
      });
      
      // Close modal after success message is shown
      setTimeout(() => {
        setShowApplyModal(false);
        // Reset form
        setApplication({
          coverLetter: "",
          experience: ""
        });
      }, 2000);
    } catch (err) {
      console.error("Error applying for job:", err);
      setApplyStatus({
        isSubmitting: false,
        success: false,
        error: "Failed to submit application. Please try again."
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Error</h1>
          <p className="text-gray-700 dark:text-gray-300">{error || "Job not found"}</p>
          <Link href="/jobs" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/jobs" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Jobs
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h1>
              <div className="text-gray-600 dark:text-gray-400 mb-2">{job.company}</div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {job.location}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Posted on {formatDate(job.createdAt)}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  {job.salary}
                </span>
                <JobTypeBadge type={job.type} />
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setShowApplyModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply Now
              </button>
              {session?.user?.role === "RECRUITER" && (
                <Link
                  href={`/jobs/${job.id}/edit`}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Job
                </Link>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Job Description</h2>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{job.description}</div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Requirements</h2>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{job.requirements}</div>
            </div>
            
            {job.benefits && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Benefits</h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{job.benefits}</div>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Job Overview</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</h4>
                  <p className="text-gray-900 dark:text-white">{job.company}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
                  <p className="text-gray-900 dark:text-white">{job.location}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Type</h4>
                  <p className="text-gray-900 dark:text-white">
                    <JobTypeBadge type={job.type} />
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Salary</h4>
                  <p className="text-gray-900 dark:text-white">{job.salary}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Posted Date</h4>
                  <p className="text-gray-900 dark:text-white">{formatDate(job.createdAt)}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Apply for This Job
                </button>
              </div>
              
              <div className="mt-4">
                <button
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  Save Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-80"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Apply for {job.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Complete the form below to submit your application to {job.company}.
                      </p>
                    </div>
                    
                    {applyStatus.error && (
                      <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md text-sm">
                        {applyStatus.error}
                      </div>
                    )}
                    
                    {applyStatus.success ? (
                      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-green-500 dark:text-green-400 mb-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="font-medium">Application Submitted!</p>
                        <p className="mt-1 text-sm">Your application for {job.title} has been successfully submitted. You can track it from your dashboard.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleApply} className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Cover Letter
                          </label>
                          <textarea
                            name="coverLetter"
                            id="coverLetter"
                            rows={5}
                            required
                            value={application.coverLetter}
                            onChange={handleApplicationChange}
                            placeholder="Tell the employer why you're interested in this position and what makes you a good fit."
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Relevant Experience
                          </label>
                          <textarea
                            name="experience"
                            id="experience"
                            rows={4}
                            required
                            value={application.experience}
                            onChange={handleApplicationChange}
                            placeholder="Describe your relevant experience for this position."
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                          />
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="resume"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor="resume" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Use my profile resume
                          </label>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {applyStatus.success ? (
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleApply}
                      disabled={applyStatus.isSubmitting}
                      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${
                        applyStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {applyStatus.isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplyModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 