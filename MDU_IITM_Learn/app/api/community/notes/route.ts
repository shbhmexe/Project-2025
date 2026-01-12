import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const { title, subject, link, unit } = body;

        if (!title || !subject || !link) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newNote = await Note.create({
            title,
            subject,
            unit,
            link,
            author: session.user.name || session.user.email.split("@")[0],
            authorEmail: session.user.email, // Store email for ownership verification
            isApproved: false
        });

        return NextResponse.json({ success: true, data: newNote }, { status: 201 });
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        await dbConnect();

        let query: any = { isApproved: true };

        // If user is logged in, show their own pending notes too
        if (session?.user?.email) {
            query = {
                $or: [
                    { isApproved: true },
                    { authorEmail: session.user.email }
                ]
            };
        }

        const notes = await Note.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { searchParams } = new URL(req.url);
        const noteId = searchParams.get("id");

        if (!noteId) {
            return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
        }

        // Find the note first
        const note = await Note.findById(noteId);

        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        // Check ownership - only allow delete if authorEmail matches
        if (note.authorEmail !== session.user.email) {
            return NextResponse.json({ error: "Forbidden: You can only delete your own notes" }, { status: 403 });
        }

        // Delete the note
        await Note.findByIdAndDelete(noteId);

        return NextResponse.json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
