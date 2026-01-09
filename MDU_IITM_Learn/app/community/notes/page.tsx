import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import NoteSubmissionForm from "@/components/Community/NoteSubmissionForm";
import CommunityClientWrapper from "@/components/Community/CommunityClientWrapper";

async function getNotes() {
    await dbConnect();
    const notes = await Note.find({ isApproved: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(notes));
}

export const dynamic = 'force-dynamic';

export default async function NotesPage() {
    const notes = await getNotes();

    return (
        <CommunityClientWrapper
            title="Community Notes"
            description="Access handwritten notes shared by top students from MDU & IITM. Upload your own to help the community!"
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Left Col: List of Notes */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-black dark:text-white">Recent Uploads</h2>
                            <span className="text-sm text-body-color dark:text-body-color-dark">{notes.length} notes available</span>
                        </div>

                        <div className="grid gap-4">
                            {notes.map((note: any) => (
                                <div key={note._id} className="p-6 bg-white dark:bg-gray-dark rounded-xl shadow-one border border-stroke dark:border-stroke-dark transition hover:shadow-two dark:hover:shadow-gray-dark">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg mb-1 text-black dark:text-white">{note.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-body-color dark:text-body-color-dark">
                                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{note.subject}</span>
                                                <span>•</span>
                                                <span>{note.unit || "General"}</span>
                                            </div>
                                            <p className="text-xs text-body-color dark:text-body-color-dark mt-2">Shared by {note.author.split('@')[0]}</p>
                                        </div>
                                        <a href={note.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition whitespace-nowrap shadow-submit dark:shadow-submit-dark">
                                            View PDF
                                        </a>
                                    </div>
                                </div>
                            ))}
                            {notes.length === 0 && (
                                <div className="text-center py-12 bg-white dark:bg-gray-dark rounded-lg border border-dashed border-stroke dark:border-stroke-dark">
                                    <p className="text-body-color dark:text-body-color-dark">No notes found yet. Be the first to share!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Col: Submission Form */}
                    <div>
                        <div className="sticky top-24">
                            <NoteSubmissionForm />
                            <div className="mt-6 p-4 bg-yellow/10 border border-yellow/20 rounded-lg text-sm text-yellow">
                                <strong>Tip:</strong> Earn karma points by sharing high-quality notes. Help your juniors ace their exams!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommunityClientWrapper>
    )
}
