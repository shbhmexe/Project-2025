import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const { title, description, techStack, githubLink, demoLink } = body;

        if (!title || !description || !techStack || !githubLink) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newProject = await Project.create({
            title,
            description,
            techStack: Array.isArray(techStack) ? techStack : [techStack],
            githubLink,
            demoLink,
            author: session.user.name || session.user.email.split("@")[0],
            authorEmail: session.user.email, // Store email for ownership verification
            isApproved: false
        });

        return NextResponse.json({ success: true, data: newProject }, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        await dbConnect();

        let query: any = { isApproved: true };

        // If user is logged in, show their own pending projects too
        if (session?.user?.email) {
            query = {
                $or: [
                    { isApproved: true },
                    { authorEmail: session.user.email }
                ]
            };
        }

        const projects = await Project.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
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
        const projectId = searchParams.get("id");

        if (!projectId) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        // Find the project first
        const project = await Project.findById(projectId);

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Check ownership - only allow delete if authorEmail matches
        if (project.authorEmail !== session.user.email) {
            return NextResponse.json({ error: "Forbidden: You can only delete your own projects" }, { status: 403 });
        }

        // Delete the project
        await Project.findByIdAndDelete(projectId);

        return NextResponse.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
