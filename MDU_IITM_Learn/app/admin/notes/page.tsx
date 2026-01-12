"use client";

import { useState, useEffect } from "react";

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

export default function AdminNotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await fetch("/api/admin/notes");
            const data = await res.json();
            if (data.success) {
                setNotes(data.notes);
            }
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (noteId: string) => {
        setActionLoading(noteId);
        try {
            const res = await fetch(`/api/admin/notes`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: noteId, isApproved: true }),
            });
            if (res.ok) {
                setNotes((prev) =>
                    prev.map((n) => (n._id === noteId ? { ...n, isApproved: true } : n))
                );
            }
        } catch (error) {
            console.error("Failed to approve note:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (noteId: string) => {
        setActionLoading(noteId);
        try {
            const res = await fetch(`/api/admin/notes`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: noteId, isApproved: false }),
            });
            if (res.ok) {
                setNotes((prev) =>
                    prev.map((n) => (n._id === noteId ? { ...n, isApproved: false } : n))
                );
            }
        } catch (error) {
            console.error("Failed to reject note:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (noteId: string) => {
        if (!confirm("Are you sure you want to delete this note?")) return;

        setActionLoading(noteId);
        try {
            const res = await fetch(`/api/admin/notes?id=${noteId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setNotes((prev) => prev.filter((n) => n._id !== noteId));
            }
        } catch (error) {
            console.error("Failed to delete note:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const filteredNotes = notes.filter((note) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "pending" && !note.isApproved) ||
            (filter === "approved" && note.isApproved);

        const matchesSearch =
            search === "" ||
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.subject.toLowerCase().includes(search.toLowerCase()) ||
            note.author.toLowerCase().includes(search.toLowerCase());

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
                        placeholder="Search notes..."
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
                    Total: <span className="text-white font-medium">{notes.length}</span>
                </span>
                <span className="text-gray-400">
                    Pending: <span className="text-yellow-400 font-medium">{notes.filter((n) => !n.isApproved).length}</span>
                </span>
                <span className="text-gray-400">
                    Approved: <span className="text-emerald-400 font-medium">{notes.filter((n) => n.isApproved).length}</span>
                </span>
            </div>

            {/* Notes Table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Title</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Subject</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Author</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Date</th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNotes.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        No notes found
                                    </td>
                                </tr>
                            ) : (
                                filteredNotes.map((note) => (
                                    <tr key={note._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-white font-medium">{note.title}</p>
                                                {note.unit && <p className="text-gray-400 text-sm">{note.unit}</p>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{note.subject}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-white">{note.author}</p>
                                                <p className="text-gray-400 text-sm">{note.authorEmail}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${note.isApproved
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : "bg-yellow-500/10 text-yellow-400"
                                                    }`}
                                            >
                                                {note.isApproved ? "Approved" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {new Date(note.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={note.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-400 hover:text-white transition"
                                                    title="View"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                                {!note.isApproved ? (
                                                    <button
                                                        onClick={() => handleApprove(note._id)}
                                                        disabled={actionLoading === note._id}
                                                        className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded transition disabled:opacity-50"
                                                        title="Approve"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleReject(note._id)}
                                                        disabled={actionLoading === note._id}
                                                        className="p-2 text-yellow-400 hover:bg-yellow-500/10 rounded transition disabled:opacity-50"
                                                        title="Unapprove"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                        </svg>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(note._id)}
                                                    disabled={actionLoading === note._id}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded transition disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
