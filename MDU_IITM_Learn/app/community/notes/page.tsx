"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import NoteSubmissionForm from "@/components/Community/NoteSubmissionForm";
import CommunityClientWrapper from "@/components/Community/CommunityClientWrapper";
import { showToast } from "@/components/ui/toast-provider";

interface Note {
    _id: string;
    title: string;
    subject: string;
    unit?: string;
    link: string;
    author: string;
    authorEmail: string;
    isApproved: boolean;
    createdAt: string;
}

export default function NotesPage() {
    const { data: session } = useSession();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await fetch("/api/community/notes");
            const { data } = await res.json();
            setNotes(data || []);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNoteAdded = (newNote: Note) => {
        setNotes((prev) => [newNote, ...prev]);
    };

    const handleDelete = async (noteId: string) => {
        if (!confirm("Are you sure you want to delete this note?")) return;

        setDeletingId(noteId);
        try {
            const res = await fetch(`/api/community/notes?id=${noteId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || "Failed to delete");
            }

            // Remove from local state
            setNotes((prev) => prev.filter((n) => n._id !== noteId));
            showToast.success("Note deleted successfully! 🗑️");
        } catch (error: any) {
            showToast.error(error.message || "Failed to delete note");
        } finally {
            setDeletingId(null);
        }
    };

    const isOwner = (note: Note) => {
        return session?.user?.email && note.authorEmail === session.user.email;
    };

    return (
        <CommunityClientWrapper
            title="Community Notes"
            description="Access handwritten notes shared by top students from MDU & IITM. Upload your own to help the community!"
        >
            <div className="container mx-auto px-4 mt-8 lg:mt-0">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Left Col: List of Notes */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-black dark:text-white">Recent Uploads</h2>
                            <span className="text-sm text-body-color dark:text-body-color-dark">{notes.length} notes available</span>
                        </div>

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                <p className="mt-4 text-body-color dark:text-body-color-dark">Loading notes...</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {notes.map((note) => (
                                    <div key={note._id} className="p-6 bg-white dark:bg-gray-dark rounded-xl shadow-one border border-stroke dark:border-stroke-dark transition hover:shadow-two dark:hover:shadow-gray-dark">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-1 text-black dark:text-white">{note.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-body-color dark:text-body-color-dark">
                                                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{note.subject}</span>
                                                    <span>•</span>
                                                    <span>{note.unit || "General"}</span>
                                                    {!note.isApproved && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-[10px] bg-yellow/10 text-yellow px-2 py-0.5 rounded border border-yellow/20 font-medium whitespace-nowrap">
                                                                Pending Approval by Admin
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                <p className="text-xs text-body-color dark:text-body-color-dark mt-2">
                                                    Shared by {note.author}
                                                    {isOwner(note) && <span className="ml-2 text-primary">(You)</span>}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={note.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-semibold hover:opacity-80 transition whitespace-nowrap"
                                                >
                                                    View PDF
                                                </a>
                                                {isOwner(note) && (
                                                    <button
                                                        onClick={() => handleDelete(note._id)}
                                                        disabled={deletingId === note._id}
                                                        className="inline-flex items-center justify-center w-10 h-10 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 disabled:opacity-50"
                                                        title="Delete this note"
                                                    >
                                                        {deletingId === note._id ? (
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
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {notes.length === 0 && (
                                    <div className="text-center py-12 bg-white dark:bg-gray-dark rounded-lg border border-dashed border-stroke dark:border-stroke-dark">
                                        <p className="text-body-color dark:text-body-color-dark">No notes found yet. Be the first to share!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Col: Submission Form */}
                    <div>
                        <div className="sticky top-24">
                            <NoteSubmissionForm onNoteAdded={handleNoteAdded} />
                            <div className="mt-6 p-4 bg-yellow/10 border border-yellow/20 rounded-lg text-sm text-yellow">
                                <strong>Tip:</strong> Earn karma points by sharing high-quality notes. Help your juniors ace their exams!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommunityClientWrapper>
    );
}
