"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { showToast } from "@/components/ui/toast-provider";

interface ProjectSubmissionFormProps {
    onProjectAdded?: (project: any) => void;
}

const ProjectSubmissionForm = ({ onProjectAdded }: ProjectSubmissionFormProps) => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        demoLink: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            showToast.error("Please sign in to submit projects.");
            return;
        }
        setIsLoading(true);

        const payload = {
            ...formData,
            techStack: formData.techStack.split(",").map((t) => t.trim()),
        };

        try {
            const res = await fetch("/api/community/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to submit");

            const { data } = await res.json();
            showToast.success("Project submitted successfully! 🚀");
            setFormData({ title: "", description: "", techStack: "", githubLink: "", demoLink: "" });

            // Notify parent to update the list
            if (onProjectAdded && data) {
                onProjectAdded(data);
            }
        } catch (err) {
            showToast.error("Failed to submit project. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rounded-lg border border-stroke bg-white p-8 shadow-one dark:border-stroke-dark dark:bg-gray-dark">
            <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Showcase Your Project
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Project Name
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full rounded-md border border-stroke bg-[#F8F8F8] px-4 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-stroke-dark dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Tech Stack (Comma separated)
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="React, Node.js, MongoDB"
                        className="w-full rounded-md border border-stroke bg-[#F8F8F8] px-4 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-stroke-dark dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Description
                    </label>
                    <textarea
                        required
                        rows={3}
                        className="w-full rounded-md border border-stroke bg-[#F8F8F8] px-4 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-stroke-dark dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            GitHub Link
                        </label>
                        <input
                            type="url"
                            required
                            className="w-full rounded-md border border-stroke bg-[#F8F8F8] px-4 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-stroke-dark dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary"
                            value={formData.githubLink}
                            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Demo Link (Optional)
                        </label>
                        <input
                            type="url"
                            className="w-full rounded-md border border-stroke bg-[#F8F8F8] px-4 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-stroke-dark dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary"
                            value={formData.demoLink}
                            onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-black dark:bg-white text-white dark:text-black px-4 py-3 text-base font-semibold transition duration-300 hover:opacity-80 disabled:opacity-50"
                >
                    {isLoading ? "Submitting..." : "Submit Project"}
                </button>
            </form>
        </div>
    );
};

export default ProjectSubmissionForm;
