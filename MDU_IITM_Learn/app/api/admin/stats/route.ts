import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import Project from "@/models/Project";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        // Check if user is admin
        if (!session || !(session.user as any)?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        // Get counts
        const [totalNotes, pendingNotes, totalProjects, pendingProjects, totalUsers] = await Promise.all([
            Note.countDocuments(),
            Note.countDocuments({ isApproved: false }),
            Project.countDocuments(),
            Project.countDocuments({ isApproved: false }),
            // Get users count from NextAuth's users collection
            (async () => {
                const mongoose = await import("mongoose");
                const db = mongoose.connection.db;
                if (db) {
                    const usersCollection = db.collection("users");
                    return usersCollection.countDocuments();
                }
                return 0;
            })(),
        ]);

        return NextResponse.json({
            success: true,
            stats: {
                totalNotes,
                pendingNotes,
                totalProjects,
                pendingProjects,
                totalUsers,
            },
        });
    } catch (error) {
        console.error("Stats API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
