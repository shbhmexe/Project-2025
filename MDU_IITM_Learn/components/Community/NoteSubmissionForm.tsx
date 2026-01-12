"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { showToast } from "@/components/ui/toast-provider";

interface NoteSubmissionFormProps {
    onNoteAdded?: (note: any) => void;
}

const NoteSubmissionForm = ({ onNoteAdded }: NoteSubmissionFormProps) => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        unit: "",
        link: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            showToast.error("Please sign in to submit notes.");
            return;
        }
        setIsLoading(true);

        try {
            const res = await fetch("/api/community/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to submit");

            const { data } = await res.json();
            showToast.success("Notes submitted successfully! 🎉");
            setFormData({ title: "", subject: "", unit: "", link: "" });

            // Notify parent to update the list
            if (onNoteAdded && data) {
                onNoteAdded(data);
            }
        } catch (err) {
            showToast.error("Failed to submit. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Share Your Notes
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Data Structures Unit 1 Hand-written"
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Subject
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Data Structures"
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Unit (Optional)
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Unit 1"
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            value={formData.unit}
                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Link (Google Drive / PDF)
                    </label>
                    <input
                        type="url"
                        required
                        placeholder="https://drive.google.com/..."
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-black dark:bg-white text-white dark:text-black px-4 py-3 font-semibold transition hover:opacity-80 disabled:opacity-50"
                >
                    {isLoading ? "Submitting..." : "Submit Notes"}
                </button>
            </form>
        </div>
    );
};

export default NoteSubmissionForm;
