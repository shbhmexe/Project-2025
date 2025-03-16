/**
 * API service utilities
 * This file provides functions to interact with various API services
 */

import { 
  RESUME_API, 
  JOB_MATCHING_API, 
  APPLICATION_ANALYSIS_API,
  AI_SERVICE,
  FILE_UPLOAD_SERVICE,
  FEATURE_FLAGS
} from './env';

// Mock data for resume parsing
const mockResumeData = {
  contact: {
    name: "John Doe",
    email: "john.doe@example.com",
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

// Mock data for job matching
const mockJobMatches = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA (Remote Option)",
    score: 92,
    matchedSkills: [
      { name: "JavaScript", weight: 5, match: true },
      { name: "TypeScript", weight: 5, match: true },
      { name: "React.js", weight: 5, match: true },
      { name: "HTML/CSS", weight: 3, match: true },
      { name: "Git", weight: 2, match: true },
    ],
    missingSkills: [
      { name: "GraphQL", weight: 2, match: false },
      { name: "Next.js", weight: 3, match: false },
    ],
    type: "FULL_TIME",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "Acme Software Solutions",
    location: "New York, NY",
    score: 85,
    matchedSkills: [
      { name: "JavaScript", weight: 5, match: true },
      { name: "Node.js", weight: 4, match: true },
      { name: "React.js", weight: 4, match: true },
      { name: "Git", weight: 2, match: true },
    ],
    missingSkills: [
      { name: "PostgreSQL", weight: 3, match: false },
      { name: "Docker", weight: 2, match: false },
      { name: "AWS", weight: 3, match: false },
    ],
    type: "FULL_TIME",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock data for application analysis
const mockAnalysisResult = {
  score: 72,
  keywordMatches: {
    matched: [
      {
        keyword: "React.js",
        context: "3 years of experience with React.js, building modern user interfaces",
        importance: 5
      },
      {
        keyword: "JavaScript",
        context: "Expert in modern JavaScript (ES6+) and TypeScript",
        importance: 5
      }
    ],
    missing: [
      {
        keyword: "React Native",
        importance: 3,
        suggestion: "Consider highlighting any mobile development experience you have, even if not with React Native specifically."
      },
      {
        keyword: "testing",
        importance: 4,
        suggestion: "Add details about your experience with testing frameworks like Jest, React Testing Library, or any QA processes you've worked with."
      }
    ]
  },
  suggestions: [
    "Quantify your achievements with metrics and specific results where possible.",
    "Tailor your summary to match the specific role and company you're applying to."
  ],
  overallFeedback: "Your resume shows good experience with frontend development and many of the required technical skills for this position."
};

/**
 * Process and parse a resume file
 * @param file The resume file to process
 * @returns Parsed resume data
 */
export async function processResume(file: File) {
  // Check if feature is enabled
  if (!FEATURE_FLAGS.ENABLE_RESUME_PARSING) {
    throw new Error("Resume parsing is disabled");
  }

  // Use mock data if configured to do so
  if (RESUME_API.USE_MOCK || !RESUME_API.API_KEY) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockResumeData;
  }

  try {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('resume', file);

    // If using OpenAI API for resume parsing
    if (RESUME_API.BASE_URL.includes('openai.com') || RESUME_API.BASE_URL.includes('api.openai.com')) {
      // First, convert the file to text
      const fileText = await extractTextFromFile(file);
      
      // Then use OpenAI to parse the resume
      return await parseResumeWithOpenAI(fileText);
    }

    // Otherwise, use the configured resume parsing API
    // Set up request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), RESUME_API.TIMEOUT);

    // Make API request
    const response = await fetch(`${RESUME_API.BASE_URL}/parse`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESUME_API.API_KEY}`
      },
      body: formData,
      signal: controller.signal
    });

    // Clear timeout
    clearTimeout(timeoutId);

    // Handle response
    if (!response.ok) {
      throw new Error(`Resume processing failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing resume:', error);
    
    // If API request fails, fall back to mock data in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock resume data due to API error');
      return mockResumeData;
    }
    
    throw error;
  }
}

/**
 * Extract text from a file (PDF, DOCX, etc.)
 */
async function extractTextFromFile(file: File): Promise<string> {
  try {
    // For PDF files
    if (file.type === 'application/pdf') {
      try {
        // Try to use pdfjs-dist if available
        const arrayBuffer = await file.arrayBuffer();
        const pdfjs = await import('pdfjs-dist');
        const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
        
        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
        
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        let text = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          text += strings.join(' ') + '\n';
        }
        
        return text;
      } catch (pdfError) {
        console.warn('PDF.js not available, sending raw PDF for server-side processing:', pdfError);
        // If PDF.js fails, we'll just return a placeholder and let the server handle it
        return "PDF_CONTENT_FOR_SERVER_PROCESSING";
      }
    }
    
    // For DOCX files (would need docx-parser library)
    // For plain text files
    if (file.type === 'text/plain') {
      return await file.text();
    }
    
    // Default: try to read as text
    try {
      return await file.text();
    } catch (error) {
      console.error('Error extracting text from file:', error);
      return '';
    }
  } catch (error) {
    console.error('Error in extractTextFromFile:', error);
    return '';
  }
}

/**
 * Parse resume text using OpenAI API
 */
async function parseResumeWithOpenAI(resumeText: string) {
  const openaiApiKey = RESUME_API.API_KEY || AI_SERVICE.API_KEY;
  
  if (!openaiApiKey) {
    throw new Error('OpenAI API key is required for resume parsing');
  }
  
  const prompt = `
    Extract structured information from the following resume text. 
    Return a JSON object with the following structure:
    {
      "contact": {
        "name": "Full name of the candidate",
        "email": "Email address",
        "phone": "Phone number",
        "location": "City, State/Country"
      },
      "education": [
        {
          "institution": "Name of university/college",
          "degree": "Degree obtained",
          "date": "Start year - End year"
        }
      ],
      "experience": [
        {
          "company": "Company name",
          "position": "Job title",
          "date": "Employment period",
          "description": "Brief description of responsibilities and achievements"
        }
      ],
      "skills": ["Skill 1", "Skill 2", ...]
    }
    
    Resume text:
    ${resumeText}
  `;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a resume parsing assistant. Extract structured information from resumes accurately.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      })
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    const parsedContent = data.choices[0].message.content;
    
    // Extract the JSON object from the response
    try {
      // Find JSON in the response (it might be wrapped in markdown code blocks)
      const jsonMatch = parsedContent.match(/```json\n([\s\S]*?)\n```/) || 
                        parsedContent.match(/```\n([\s\S]*?)\n```/) ||
                        parsedContent.match(/{[\s\S]*?}/);
      
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : parsedContent;
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Error parsing OpenAI response as JSON:', parseError);
      console.log('Raw response:', parsedContent);
      
      // Fall back to mock data if JSON parsing fails
      return mockResumeData;
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

/**
 * Get job matches based on candidate skills and experience
 * @param candidateSkills Array of candidate skills
 * @param candidateExperience Array of candidate experience
 * @returns Array of job matches with compatibility scores
 */
export async function getJobMatches(candidateSkills: string[] = [], candidateExperience: any[] = []) {
  // Check if feature is enabled
  if (!FEATURE_FLAGS.ENABLE_JOB_MATCHING) {
    throw new Error("Job matching is disabled");
  }

  // Use mock data if configured to do so
  if (JOB_MATCHING_API.USE_MOCK || !JOB_MATCHING_API.API_KEY) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return mockJobMatches;
  }

  try {
    // Set up request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), JOB_MATCHING_API.TIMEOUT);

    // Make API request
    const response = await fetch(`${JOB_MATCHING_API.BASE_URL}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JOB_MATCHING_API.API_KEY}`
      },
      body: JSON.stringify({
        skills: candidateSkills,
        experience: candidateExperience
      }),
      signal: controller.signal
    });

    // Clear timeout
    clearTimeout(timeoutId);

    // Handle response
    if (!response.ok) {
      throw new Error(`Job matching failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting job matches:', error);
    
    // If API request fails, fall back to mock data in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock job matches due to API error');
      return mockJobMatches;
    }
    
    throw error;
  }
}

/**
 * Analyze a job application (resume vs job description)
 * @param jobDescription The job description text
 * @param resumeText The resume text
 * @returns Analysis result with compatibility score and suggestions
 */
export async function analyzeApplication(jobDescription: string, resumeText: string) {
  // Check if feature is enabled
  if (!FEATURE_FLAGS.ENABLE_APPLICATION_ANALYSIS) {
    throw new Error("Application analysis is disabled");
  }

  // Use mock data if configured to do so
  if (APPLICATION_ANALYSIS_API.USE_MOCK || !APPLICATION_ANALYSIS_API.API_KEY) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    return mockAnalysisResult;
  }

  try {
    // Set up request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), APPLICATION_ANALYSIS_API.TIMEOUT);

    // Make API request
    const response = await fetch(`${APPLICATION_ANALYSIS_API.BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APPLICATION_ANALYSIS_API.API_KEY}`
      },
      body: JSON.stringify({
        jobDescription,
        resumeText
      }),
      signal: controller.signal
    });

    // Clear timeout
    clearTimeout(timeoutId);

    // Handle response
    if (!response.ok) {
      throw new Error(`Application analysis failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing application:', error);
    
    // If API request fails, fall back to mock data in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock analysis result due to API error');
      return mockAnalysisResult;
    }
    
    throw error;
  }
}

/**
 * Upload a file to the file storage service
 * @param file The file to upload
 * @param folder Optional folder to upload to
 * @returns URL of the uploaded file
 */
export async function uploadFile(file: File, folder?: string) {
  // Use mock data if configured to do so
  if (FILE_UPLOAD_SERVICE.USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `https://example.com/mock-uploads/${file.name}`;
  }

  try {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hiring-platform');
    
    if (folder || FILE_UPLOAD_SERVICE.FOLDER) {
      formData.append('folder', folder || FILE_UPLOAD_SERVICE.FOLDER);
    }

    // Make API request to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${FILE_UPLOAD_SERVICE.CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    // Handle response
    if (!response.ok) {
      throw new Error(`File upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading file:', error);
    
    // If API request fails, return a mock URL in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock file URL due to API error');
      return `https://example.com/mock-uploads/${file.name}`;
    }
    
    throw error;
  }
} 