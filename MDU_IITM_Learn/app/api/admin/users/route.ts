import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import Project from "@/models/Project";
import mongoose from "mongoose";

// GET: Fetch all users with their notes and projects count
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !(session.user as any)?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        // Get users from NextAuth's users collection
        const db = mongoose.connection.db;
        if (!db) {
            return NextResponse.json({ error: "Database not connected" }, { status: 500 });
        }

        const usersCollection = db.collection("users");
        const rawUsers = await usersCollection.find({}).toArray();

        // Get notes and projects counts per user email
        const notesAggregation = await Note.aggregate([
            { $group: { _id: "$authorEmail", count: { $sum: 1 } } },
        ]);

        const projectsAggregation = await Project.aggregate([
            { $group: { _id: "$authorEmail", count: { $sum: 1 } } },
        ]);

        const notesCounts = new Map(notesAggregation.map((n) => [n._id, n.count]));
        const projectsCounts = new Map(projectsAggregation.map((p) => [p._id, p.count]));

        const users = rawUsers.map((user) => ({
            _id: user._id.toString(),
            name: user.name || "Unknown",
            email: user.email,
            image: user.image,
            createdAt: user.createdAt || user._id.getTimestamp(),
            notesCount: notesCounts.get(user.email) || 0,
            projectsCount: projectsCounts.get(user.email) || 0,
        }));

        // Sort by createdAt descending
        users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error("Admin users GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
