"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

// Dummy applications data
const dummyApplications = [
  {
    id: "app1",
    jobTitle: "Frontend Developer",
    company: "Tech Solutions Inc.",
    status: "PENDING",
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    jobId: "1"
  },
  {
    id: "app2",
    jobTitle: "UX Designer",
    company: "Creative Studio",
    status: "REVIEWED",
    appliedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    jobId: "3"
  },
  {
    id: "app3",
    jobTitle: "Data Scientist",
    company: "AI Innovations",
    status: "INTERVIEW",
    appliedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    jobId: "5"
  }
];

// Dummy recommended jobs
const dummyRecommendedJobs = [
  {
    id: "4",
    title: "DevOps Specialist",
    company: "Cloud Solutions",
    matchScore: 85
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "Data Systems Ltd.",
    matchScore: 78
  }
];

// Format date to readable format
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Status badge component
function StatusBadge({ status }) {
  const statusClasses = {
    PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    REVIEWED: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    INTERVIEW: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    REJECTED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    ACCEPTED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
  };

  const statusLabels = {
    PENDING: "Pending",
    REVIEWED: "Reviewed",
    INTERVIEW: "Interview",
    REJECTED: "Rejected",
    ACCEPTED: "Accepted"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || "bg-gray-100 text-gray-800"}`}>
      {statusLabels[status] || status}
    </span>
  );
}

export default function CandidateDashboard() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in or not a job seeker
    if (sessionStatus === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (sessionStatus === "authenticated" && session.user.role !== "JOB_SEEKER") {
      router.push("/dashboard/recruiter");
      return;
    }

    // Fetch data when session is available
    if (sessionStatus === "authenticated") {
      fetchDashboardData();
    }
  }, [sessionStatus, session, router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 800));
      setApplications(dummyApplications);
      setRecommendedJobs(dummyRecommendedJobs);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (sessionStatus === "loading" || loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Candidate Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applications Section */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Your Applications</h2>
              <Link href="/jobs" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                Find more jobs
              </Link>
            </div>
            
            {applications.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No applications yet</p>
                <Link 
                  href="/jobs" 
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {applications.map(application => (
                  <li key={application.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link 
                          href={`/jobs/${application.jobId}`} 
                          className="text-lg font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                        >
                          {application.jobTitle}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{application.company}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Applied on {formatDate(application.appliedAt)}
                        </p>
                      </div>
                      <StatusBadge status={application.status} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Right Column Widgets */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Completion</h2>
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">40% Complete</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">40/100</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center text-gray-500 dark:text-gray-400">
                <svg className="mr-2 h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Basic information
              </li>
              <li className="flex items-center text-gray-500 dark:text-gray-400">
                <svg className="mr-2 h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Resume upload
              </li>
              <li className="flex items-center text-gray-500 dark:text-gray-400">
                <svg className="mr-2 h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Skills information
              </li>
              <li className="flex items-center text-gray-500 dark:text-gray-400">
                <svg className="mr-2 h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Work experience
              </li>
            </ul>
            <Link 
              href="/profile/edit" 
              className="mt-4 inline-block text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Complete your profile →
            </Link>
          </div>
          
          {/* Recommended Jobs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recommended for You</h2>
            {recommendedJobs.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No recommendations yet</p>
            ) : (
              <ul className="space-y-3">
                {recommendedJobs.map(job => (
                  <li key={job.id}>
                    <Link 
                      href={`/jobs/${job.id}`} 
                      className="block p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-md font-medium text-indigo-600 dark:text-indigo-400">{job.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {job.matchScore}% Match
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 