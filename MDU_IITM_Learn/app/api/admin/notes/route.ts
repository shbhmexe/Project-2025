import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";

// GET: Fetch all notes (admin only)
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !(session.user as any)?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const notes = await Note.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json({ success: true, notes });
    } catch (error) {
        console.error("Admin notes GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH: Update note status (approve/reject)
export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !(session.user as any)?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, isApproved } = await request.json();

        if (!id || typeof isApproved !== "boolean") {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();

        const note = await Note.findByIdAndUpdate(
            id,
            { isApproved },
            { new: true }
        );

        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, note });
    } catch (error) {
        console.error("Admin notes PATCH error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE: Delete a note
export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !(session.user as any)?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
        }

        await dbConnect();

        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Note deleted" });
    } catch (error) {
        console.error("Admin notes DELETE error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
