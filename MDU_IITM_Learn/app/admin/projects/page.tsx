"use client";

import { useState, useEffect } from "react";

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

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/admin/projects");
            const data = await res.json();
            if (data.success) {
                setProjects(data.projects);
            }
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (projectId: string) => {
        setActionLoading(projectId);
        try {
            const res = await fetch(`/api/admin/projects`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: projectId, isApproved: true }),
            });
            if (res.ok) {
                setProjects((prev) =>
                    prev.map((p) => (p._id === projectId ? { ...p, isApproved: true } : p))
                );
            }
        } catch (error) {
            console.error("Failed to approve project:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (projectId: string) => {
        setActionLoading(projectId);
        try {
            const res = await fetch(`/api/admin/projects`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: projectId, isApproved: false }),
            });
            if (res.ok) {
                setProjects((prev) =>
                    prev.map((p) => (p._id === projectId ? { ...p, isApproved: false } : p))
                );
            }
        } catch (error) {
            console.error("Failed to reject project:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (projectId: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        setActionLoading(projectId);
        try {
            const res = await fetch(`/api/admin/projects?id=${projectId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setProjects((prev) => prev.filter((p) => p._id !== projectId));
            }
        } catch (error) {
            console.error("Failed to delete project:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const filteredProjects = projects.filter((project) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "pending" && !project.isApproved) ||
            (filter === "approved" && project.isApproved);

        const matchesSearch =
            search === "" ||
            project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase()) ||
            project.author.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                        <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
                <div className="flex gap-2">
                    {(["all", "pending", "approved"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === f
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-800 text-gray-400 hover:text-white"
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-sm">
                <span className="text-gray-400">
                    Total: <span className="text-white font-medium">{projects.length}</span>
                </span>
                <span className="text-gray-400">
                    Pending: <span className="text-yellow-400 font-medium">{projects.filter((p) => !p.isApproved).length}</span>
                </span>
                <span className="text-gray-400">
                    Approved: <span className="text-emerald-400 font-medium">{projects.filter((p) => p.isApproved).length}</span>
                </span>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.length === 0 ? (
                    <div className="col-span-2 text-center py-12 text-gray-400">
                        No projects found
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <div
                            key={project._id}
                            className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                                    <p className="text-gray-400 text-sm mt-1">{project.author}</p>
                                </div>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.isApproved
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-yellow-500/10 text-yellow-400"
                                        }`}
                                >
                                    {project.isApproved ? "Approved" : "Pending"}
                                </span>
                            </div>

                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                <div className="flex gap-2">
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    )}
                                    {project.demoLink && (
                                        <a
                                            href={project.demoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    {!project.isApproved ? (
                                        <button
                                            onClick={() => handleApprove(project._id)}
                                            disabled={actionLoading === project._id}
                                            className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-lg hover:bg-emerald-500/20 transition disabled:opacity-50"
                                        >
                                            Approve
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleReject(project._id)}
                                            disabled={actionLoading === project._id}
                                            className="px-3 py-1.5 bg-yellow-500/10 text-yellow-400 text-sm font-medium rounded-lg hover:bg-yellow-500/20 transition disabled:opacity-50"
                                        >
                                            Unapprove
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        disabled={actionLoading === project._id}
                                        className="px-3 py-1.5 bg-red-500/10 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/20 transition disabled:opacity-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
