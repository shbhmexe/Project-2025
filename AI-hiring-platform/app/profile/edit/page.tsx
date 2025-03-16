"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfileEditPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Form state
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    website: ""
  });
  
  // Skills management
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  
  // Experience management
  const [experiences, setExperiences] = useState<Array<{
    id: string;
    company: string;
    position: string;
    date: string;
    description: string;
  }>>([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
      // Simulate API call to fetch existing profile data
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
            id: "exp1",
            company: "Tech Innovations Inc",
            position: "Frontend Developer",
            date: "2018 - Present",
            description: "Developed and maintained web applications using React.js and TypeScript."
          },
          {
            id: "exp2",
            company: "Startup Solutions",
            position: "Software Engineering Intern",
            date: "Summer 2017",
            description: "Built responsive web interfaces and implemented API integrations."
          }
        ]
      };
      
      // Initialize form with existing data
      setFormData({
        bio: mockProfile.bio || "",
        location: mockProfile.location || "",
        website: mockProfile.website || ""
      });
      
      setSkills(mockProfile.skills || []);
      setExperiences(mockProfile.experience || []);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleAddExperience = () => {
    const newExperience = {
      id: `exp${Date.now()}`,
      company: "",
      position: "",
      date: "",
      description: ""
    };
    setExperiences(prev => [...prev, newExperience]);
  };

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setExperiences(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      // Validate required fields
      if (!formData.bio.trim()) {
        setError("Please provide a bio.");
        setIsSubmitting(false);
        return;
      }
      
      // Create the profile data object
      const profileData = {
        ...formData,
        skills,
        experience: experiences
      };
      
      // Simulate API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Profile data to save:", profileData);
      // In a real app, you would send this data to your API
      // await fetch('/api/profile', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profileData)
      // });
      
      setSuccess(true);
      
      // Redirect to profile page after a short delay
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <Link href="/profile" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Profile
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Update your profile information</p>
        </div>
        
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-l-4 border-red-500">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-l-4 border-green-500">
            Profile saved successfully! Redirecting to profile page...
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio *
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              required
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Write a short bio about yourself"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State, Country"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Skills
            </label>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                  >
                    <span className="sr-only">Remove {skill}</span>
                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex mt-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a skill (e.g. JavaScript, React)"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Press Enter to add a skill or click the Add button
            </p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Experience
              </label>
              <button
                type="button"
                onClick={handleAddExperience}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Experience
              </button>
            </div>
            
            {experiences.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No experience added yet. Click the button above to add your work experience.
              </p>
            ) : (
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience Details</h3>
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor={`position-${exp.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Position *
                        </label>
                        <input
                          type="text"
                          id={`position-${exp.id}`}
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                          required
                          placeholder="Job Title"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`company-${exp.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Company *
                        </label>
                        <input
                          type="text"
                          id={`company-${exp.id}`}
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                          required
                          placeholder="Company Name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor={`date-${exp.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date Range
                      </label>
                      <input
                        type="text"
                        id={`date-${exp.id}`}
                        value={exp.date}
                        onChange={(e) => handleExperienceChange(exp.id, 'date', e.target.value)}
                        placeholder="e.g. 2018 - Present or Jan 2019 - Dec 2020"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`description-${exp.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        id={`description-${exp.id}`}
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                        rows={3}
                        placeholder="Describe your role and achievements"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <Link
              href="/profile"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || success}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                (isSubmitting || success) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 