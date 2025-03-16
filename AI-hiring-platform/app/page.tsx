"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMemo, memo } from "react";

// Memoize the code example component to prevent unnecessary re-renders
const CodeExample = memo(() => (
  <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
      <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
        <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
          JobMatch.tsx
        </div>
        <div className="border-r border-gray-600/10 px-4 py-2">
          ResumeParser.tsx
        </div>
      </div>
    </div>
    <div className="px-6 pt-6 pb-14 bg-gray-900">
      <pre className="text-[0.8125rem] leading-6 text-gray-300">
        <code>
          <span className="text-indigo-400">{"function "}</span>
          <span className="text-yellow-300">{"matchJobsWithCandidate"}</span>
          <span className="text-gray-300">{"(candidate, jobs) {"}</span>
          <br />
          <span className="pl-4 text-gray-300">{"  // Calculate compatibility scores"}</span>
          <br />
          <span className="pl-4 text-indigo-400">{"  const "}</span>
          <span className="text-gray-300">{"matches = jobs.map(job => {"}</span>
          <br />
          <span className="pl-8 text-indigo-400">{"    const "}</span>
          <span className="text-gray-300">{"score = calculateMatchScore("}</span>
          <br />
          <span className="pl-12 text-gray-300">{"candidate.skills,"}</span>
          <br />
          <span className="pl-12 text-gray-300">{"job.requiredSkills"}</span>
          <br />
          <span className="pl-8 text-gray-300">{");"}</span>
          <br />
          <span className="pl-8 text-indigo-400">{"    return "}</span>
          <span className="text-gray-300">{"{...job, score};"}</span>
          <br />
          <span className="pl-4 text-gray-300">{"  });"}</span>
          <br />
          <br />
          <span className="pl-4 text-indigo-400">{"  return "}</span>
          <span className="text-gray-300">{"matches.sort((a, b) => b.score - a.score);"}</span>
          <br />
          <span className="text-gray-300">{"}"}</span>
        </code>
      </pre>
    </div>
  </div>
));

// Memoize the feature item component
const FeatureItem = memo(({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="relative pl-16">
    <dt className="text-base font-semibold leading-7 text-gray-900">
      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
        {icon}
      </div>
      {title}
    </dt>
    <dd className="mt-2 text-base leading-7 text-gray-600">
      {description}
    </dd>
  </div>
));

export default function Home() {
  const { data: session } = useSession();

  // Memoize these functions to prevent recalculation on each render
  const getStartedLink = useMemo(() => {
    if (!session) {
      return "/auth/signup"; // Not logged in, go to signup
    }
    
    // Logged in, redirect based on role
    if (session.user.role === "RECRUITER") {
      return "/dashboard/recruiter";
    } else if (session.user.role === "JOB_SEEKER") {
      return "/dashboard/candidate";
    } else {
      return "/profile"; // Default fallback
    }
  }, [session]);

  // Memoize button text
  const getStartedText = useMemo(() => {
    if (!session) {
      return "Get started";
    }
    return "Go to Dashboard";
  }, [session]);

  // Pre-define SVG icons to avoid recreating them on each render
  const featureIcons = useMemo(() => [
    <svg key="1" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>,
    <svg key="2" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>,
    <svg key="3" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>,
    <svg key="4" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ], []);

  // Memoize feature data
  const features = useMemo(() => [
    {
      title: "Intelligent Resume Processing",
      description: "Our AI extracts key information from resumes, making it easy to understand candidate qualifications at a glance.",
      icon: featureIcons[0]
    },
    {
      title: "Smart Job-Candidate Matching",
      description: "Our matching algorithm connects candidates with jobs based on skills, experience, and preferences.",
      icon: featureIcons[1]
    },
    {
      title: "Applicant Tracking System",
      description: "Keep track of applications, interviews, and candidate communications in one centralized system.",
      icon: featureIcons[2]
    },
    {
      title: "Secure Authentication",
      description: "Role-based access control ensures that recruiters and job seekers have appropriate permissions.",
      icon: featureIcons[3]
    }
  ], [featureIcons]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  AI-Powered Hiring Platform
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Connect recruiters and job seekers through an intelligent, AI-powered ecosystem. 
                  Our platform uses advanced algorithms to match the right candidates with the right opportunities.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href={getStartedLink}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    prefetch={true}
                  >
                    {getStartedText}
                  </Link>
                  <Link href="/jobs" className="text-sm font-semibold leading-6 text-gray-900" prefetch={true}>
                    Browse jobs <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div className="shadow-xl md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" aria-hidden="true" />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <CodeExample />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Intelligent Recruitment</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to find the perfect match
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform uses AI to streamline the hiring process, making it easier for recruiters to find qualified candidates and for job seekers to find their dream jobs.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature, index) => (
                <FeatureItem 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-100">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to transform your hiring process?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of companies and job seekers who are already using our platform to find their perfect match.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={getStartedLink}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                prefetch={true}
              >
                {getStartedText}
              </Link>
              <Link href="/jobs" className="text-sm font-semibold leading-6 text-gray-900" prefetch={true}>
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
