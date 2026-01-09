"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

const NoteSubmissionForm = () => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        unit: "",
        link: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            alert("Please sign in to submit notes.");
            return;
        }
        setStatus("loading");

        try {
            const res = await fetch("/api/community/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to submit");

            setStatus("success");
            setFormData({ title: "", subject: "", unit: "", link: "" });
        } catch (err) {
            setStatus("error");
            setErrorMsg("Something went wrong. Please try again.");
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

                {status === "error" && <p className="mb-4 text-red-500">{errorMsg}</p>}
                {status === "success" && <p className="mb-4 text-green-500">Notes submitted successfully!</p>}

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-md bg-primary px-4 py-3 text-white transition hover:bg-primary/90 disabled:opacity-50"
                >
                    {status === "loading" ? "Submitting..." : "Submit Notes"}
                </button>
            </form>
        </div>
    );
};

export default NoteSubmissionForm;
