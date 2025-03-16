"use client";

import { useState } from "react";
import { analyzeApplication } from "../lib/api";
import { FEATURE_FLAGS } from "../lib/env";

interface AnalysisResult {
  score: number;
  keywordMatches: {
    matched: Array<{
      keyword: string;
      context: string;
      importance: number;
    }>;
    missing: Array<{
      keyword: string;
      importance: number;
      suggestion?: string;
    }>;
  };
  suggestions: string[];
  overallFeedback: string;
}

interface ApplicationAnalyzerProps {
  jobDescription?: string;
  resumeText?: string;
}

export default function ApplicationAnalyzer({ jobDescription, resumeText }: ApplicationAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [jobDescInput, setJobDescInput] = useState(jobDescription || "");
  const [resumeInput, setResumeInput] = useState(resumeText || "");
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    // Check if feature is enabled
    if (!FEATURE_FLAGS.ENABLE_APPLICATION_ANALYSIS) {
      setError("Application analysis is currently disabled by the administrator.");
      return;
    }

    if (!jobDescInput.trim()) {
      setError("Please enter a job description to analyze against.");
      return;
    }

    if (!resumeInput.trim()) {
      setError("Please enter your resume text for analysis.");
      return;
    }

    setError("");
    setIsAnalyzing(true);

    try {
      // Call the API service to analyze the application
      const result = await analyzeApplication(jobDescInput, resumeInput);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing application:", error);
      setError("Failed to analyze your application. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderScoreMeter = (score: number) => {
    let colorClass = "bg-red-600";
    let textColor = "text-red-700 dark:text-red-300";
    
    if (score >= 90) {
      colorClass = "bg-green-600";
      textColor = "text-green-700 dark:text-green-300";
    } else if (score >= 75) {
      colorClass = "bg-blue-600";
      textColor = "text-blue-700 dark:text-blue-300";
    } else if (score >= 60) {
      colorClass = "bg-yellow-500";
      textColor = "text-yellow-700 dark:text-yellow-300";
    }
    
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Match Score</span>
          <span className={`text-sm font-medium ${textColor}`}>{score}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${score}%` }}></div>
        </div>
      </div>
    );
  };

  const renderImportanceIndicator = (importance: number) => {
    const dots = [];
    for (let i = 0; i < 5; i++) {
      dots.push(
        <div 
          key={i} 
          className={`w-2 h-2 rounded-full ${i < importance ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-200 dark:bg-gray-600'}`}
        ></div>
      );
    }
    
    return (
      <div className="flex space-x-1" title={`Importance: ${importance}/5`}>
        {dots}
      </div>
    );
  };

  // If the feature is disabled, show a message
  if (!FEATURE_FLAGS.ENABLE_APPLICATION_ANALYSIS) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Application Analysis Disabled</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          The application analysis feature is currently disabled. Please contact the administrator for more information.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Application Analyzer</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Compare your resume against a job description to see how well you match and get improvement suggestions
          </p>
        </div>
        
        {!analysisResult && (
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                rows={5}
                value={jobDescInput}
                onChange={(e) => setJobDescInput(e.target.value)}
                placeholder="Paste the full job description here..."
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="resumeText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Resume
              </label>
              <textarea
                id="resumeText"
                rows={8}
                value={resumeInput}
                onChange={(e) => setResumeInput(e.target.value)}
                placeholder="Paste your resume content here..."
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm rounded-md">
                {error}
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : "Analyze Application"}
              </button>
            </div>
          </div>
        )}
        
        {analysisResult && (
          <div className="p-6">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Analysis Results</h3>
              <button
                onClick={() => setAnalysisResult(null)}
                className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                New Analysis
              </button>
            </div>
            
            {renderScoreMeter(analysisResult.score)}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Matched Keywords
                </h4>
                
                {analysisResult.keywordMatches.matched.length > 0 ? (
                  <ul className="space-y-3">
                    {analysisResult.keywordMatches.matched.map((match, index) => (
                      <li key={`match-${index}`} className="flex">
                        <div className="mr-2 mt-1 flex-shrink-0">
                          {renderImportanceIndicator(match.importance)}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{match.keyword}</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{match.context}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No keyword matches found. Try updating your resume with industry-specific terminology.
                  </p>
                )}
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                  </svg>
                  Missing Keywords
                </h4>
                
                {analysisResult.keywordMatches.missing.length > 0 ? (
                  <ul className="space-y-3">
                    {analysisResult.keywordMatches.missing.map((missing, index) => (
                      <li key={`missing-${index}`} className="flex">
                        <div className="mr-2 mt-1 flex-shrink-0">
                          {renderImportanceIndicator(missing.importance)}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{missing.keyword}</span>
                          {missing.suggestion && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{missing.suggestion}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Great job! Your resume includes all the key terms from the job description.
                  </p>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
                Improvement Suggestions
              </h4>
              
              <ul className="space-y-2">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <li key={`suggestion-${index}`} className="flex items-start">
                    <span className="flex-shrink-0 text-indigo-600 dark:text-indigo-400 mr-1.5">•</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Overall Feedback</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {analysisResult.overallFeedback}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 