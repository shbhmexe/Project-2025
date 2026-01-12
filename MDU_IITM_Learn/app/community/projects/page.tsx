"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ProjectSubmissionForm from "@/components/Community/ProjectSubmissionForm";
import CommunityClientWrapper from "@/components/Community/CommunityClientWrapper";
import { showToast } from "@/components/ui/toast-provider";

interface Project {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    githubLink?: string;
    demoLink?: string;
    author: string;
    authorEmail: string;
    isApproved: boolean;
    createdAt: string;
}

export default function ProjectsPage() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/community/projects");
            const { data } = await res.json();
            setProjects(data || []);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleProjectAdded = (newProject: Project) => {
        setProjects((prev) => [newProject, ...prev]);
    };

    const handleDelete = async (projectId: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        setDeletingId(projectId);
        try {
            const res = await fetch(`/api/community/projects?id=${projectId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || "Failed to delete");
            }

            // Remove from local state
            setProjects((prev) => prev.filter((p) => p._id !== projectId));
            showToast.success("Project deleted successfully! 🗑️");
        } catch (error: any) {
            showToast.error(error.message || "Failed to delete project");
        } finally {
            setDeletingId(null);
        }
    };

    const isOwner = (project: Project) => {
        return session?.user?.email && project.authorEmail === session.user.email;
    };

    return (
        <CommunityClientWrapper
            title="Project Showcase"
            description="A gallery of amazing projects built by MDU & IITM students. Show off your skills and get noticed!"
        >
            <div className="container mx-auto px-4 mt-8 lg:mt-0">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Left Col: Grid of Projects */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-black dark:text-white">Featured Projects</h2>
                        </div>

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                <p className="mt-4 text-body-color dark:text-body-color-dark">Loading projects...</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.map((project) => (
                                        <div key={project._id} className="group relative flex flex-col p-6 bg-white dark:bg-gray-dark rounded-xl shadow-one border border-stroke dark:border-stroke-dark transition hover:shadow-two dark:hover:shadow-gray-2">
                                            {/* Delete button for owner */}
                                            {isOwner(project) && (
                                                <button
                                                    onClick={() => handleDelete(project._id)}
                                                    disabled={deletingId === project._id}
                                                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 disabled:opacity-50"
                                                    title="Delete this project"
                                                >
                                                    {deletingId === project._id ? (
                                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    )}
                                                </button>
                                            )}

                                            <div className="flex-1">
                                                <div className={`flex flex-wrap items-center justify-between gap-2 mb-2 ${isOwner(project) ? "pr-10" : ""}`}>
                                                    <h3 className="font-bold text-lg text-black dark:text-white group-hover:text-primary transition-colors truncate">
                                                        {project.title}
                                                    </h3>
                                                    {!project.isApproved && (
                                                        <span className="text-[10px] bg-yellow/10 text-yellow px-2 py-0.5 rounded border border-yellow/20 font-medium whitespace-nowrap">
                                                            Pending Approval by Admin
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-sm text-body-color dark:text-body-color-dark mb-4 line-clamp-3">{project.description}</p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.techStack.map((tech, i) => (
                                                        <span key={i} className="text-xs px-2 py-1 bg-gray-light dark:bg-bg-color-dark rounded-md text-body-color dark:text-body-color-dark border border-stroke dark:border-stroke-dark">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-stroke dark:border-stroke-dark flex items-center justify-between">
                                                <span className="text-xs text-body-color dark:text-body-color-dark">
                                                    By {project.author}
                                                    {isOwner(project) && <span className="ml-1 text-primary">(You)</span>}
                                                </span>
                                                <div className="flex gap-3">
                                                    {project.githubLink && (
                                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-body-color hover:text-black dark:hover:text-white transition">
                                                            Git
                                                        </a>
                                                    )}
                                                    {project.demoLink && (
                                                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                                                            Live Demo
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {projects.length === 0 && (
                                    <div className="text-center py-12 bg-white dark:bg-gray-dark rounded-lg border border-dashed border-stroke dark:border-stroke-dark">
                                        <p className="text-body-color dark:text-body-color-dark">No projects yet. Show us what you've built!</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Right Col: Submission Form */}
                    <div>
                        <div className="sticky top-24">
                            <ProjectSubmissionForm onProjectAdded={handleProjectAdded} />
                        </div>
                    </div>
                </div>
            </div>
        </CommunityClientWrapper>
    );
}
