import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

// GET: Fetch all projects (admin only)
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !(session.user as any)?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const projects = await Project.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json({ success: true, projects });
    } catch (error) {
        console.error("Admin projects GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH: Update project status (approve/reject)
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

        const project = await Project.findByIdAndUpdate(
            id,
            { isApproved },
            { new: true }
        );

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, project });
    } catch (error) {
        console.error("Admin projects PATCH error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE: Delete a project
export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !(session.user as any)?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        await dbConnect();

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Project deleted" });
    } catch (error) {
        console.error("Admin projects DELETE error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
