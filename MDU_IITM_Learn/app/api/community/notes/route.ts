import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
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
            author: session.user.name || session.user.email || "Anonymous",
            isApproved: true
        });

        return NextResponse.json({ success: true, data: newNote }, { status: 201 });
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const notes = await Note.find({ isApproved: true }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
