/**
 * Environment configuration for API services
 * This file provides a centralized way to access environment variables with proper typing and defaults
 */

// Resume Processing API Configuration
export const RESUME_API = {
  // Base URL for resume processing service
  BASE_URL: process.env.RESUME_API_URL || 'https://api.example.com/resume',
  // API key for resume processing service
  API_KEY: process.env.RESUME_API_KEY || '',
  // Whether to use mock data when API key is not provided
  USE_MOCK: process.env.RESUME_API_USE_MOCK !== 'false',
  // Timeout for API requests in milliseconds
  TIMEOUT: parseInt(process.env.RESUME_API_TIMEOUT || '10000'),
};

// Job Matching API Configuration
export const JOB_MATCHING_API = {
  // Base URL for job matching service
  BASE_URL: process.env.JOB_MATCHING_API_URL || 'https://api.example.com/job-matching',
  // API key for job matching service
  API_KEY: process.env.JOB_MATCHING_API_KEY || '',
  // Whether to use mock data when API key is not provided
  USE_MOCK: process.env.JOB_MATCHING_API_USE_MOCK !== 'false',
  // Timeout for API requests in milliseconds
  TIMEOUT: parseInt(process.env.JOB_MATCHING_API_TIMEOUT || '10000'),
};

// Application Analysis API Configuration
export const APPLICATION_ANALYSIS_API = {
  // Base URL for application analysis service
  BASE_URL: process.env.APPLICATION_ANALYSIS_API_URL || 'https://api.example.com/application-analysis',
  // API key for application analysis service
  API_KEY: process.env.APPLICATION_ANALYSIS_API_KEY || '',
  // Whether to use mock data when API key is not provided
  USE_MOCK: process.env.APPLICATION_ANALYSIS_API_USE_MOCK !== 'false',
  // Timeout for API requests in milliseconds
  TIMEOUT: parseInt(process.env.APPLICATION_ANALYSIS_API_TIMEOUT || '10000'),
};

// AI Service Configuration (e.g., OpenAI for various AI features)
export const AI_SERVICE = {
  // API key for AI service
  API_KEY: process.env.OPENAI_API_KEY || '',
  // Whether to use mock data when API key is not provided
  USE_MOCK: !process.env.OPENAI_API_KEY,
  // Model to use for AI service
  MODEL: process.env.AI_MODEL || 'gpt-3.5-turbo',
  // Timeout for API requests in milliseconds
  TIMEOUT: parseInt(process.env.AI_SERVICE_TIMEOUT || '30000'),
};

// File Upload Service Configuration (e.g., Cloudinary)
export const FILE_UPLOAD_SERVICE = {
  // Cloud name for Cloudinary
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  // API key for Cloudinary
  API_KEY: process.env.CLOUDINARY_API_KEY || '',
  // API secret for Cloudinary
  API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  // Whether to use mock data when API keys are not provided
  USE_MOCK: !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET,
  // Folder to upload files to
  FOLDER: process.env.FILE_UPLOAD_FOLDER || 'hiring-platform',
};

// Feature flags for enabling/disabling features
export const FEATURE_FLAGS = {
  // Whether to enable resume parsing
  ENABLE_RESUME_PARSING: process.env.ENABLE_RESUME_PARSING !== 'false',
  // Whether to enable job matching
  ENABLE_JOB_MATCHING: process.env.ENABLE_JOB_MATCHING !== 'false',
  // Whether to enable application analysis
  ENABLE_APPLICATION_ANALYSIS: process.env.ENABLE_APPLICATION_ANALYSIS !== 'false',
}; 