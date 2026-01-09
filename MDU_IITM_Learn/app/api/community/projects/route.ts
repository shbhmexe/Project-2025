import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
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
            author: session.user.name || session.user.email || "Anonymous",
            isApproved: true
        });

        return NextResponse.json({ success: true, data: newProject }, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const projects = await Project.find({ isApproved: true }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
