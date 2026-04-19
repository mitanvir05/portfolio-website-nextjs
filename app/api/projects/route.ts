import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

// Fetch all projects (for your frontend portfolio)
export async function GET() {
    try {
        await connectDB();
        const projects = await Project.find({}).sort({ createdAt: -1 });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}

// Create a new project (for your secure admin dashboard)
export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // Create the project in the database
        const project = await Project.create(body);

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        );
    }
}