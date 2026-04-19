import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
type RouteParams = { params: Promise<{ id: string }> };

// GET a specific project by ID to populate the edit form
export async function GET(req: Request, { params }: RouteParams) {
    try {
        await connectDB();
        const { id } = await params; // Await the params

        const project = await Project.findById(id);
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

// UPDATE a project
export async function PATCH(req: Request, { params }: RouteParams) {
    try {
        await connectDB();
        const { id } = await params; // Await the params
        const contentType = req.headers.get("content-type") || "";

        // 1. JSON request (like toggling the featured star)
        if (contentType.includes("application/json")) {
            const body = await req.json();
            const updatedProject = await Project.findByIdAndUpdate(id, { $set: body }, { new: true });
            return NextResponse.json(updatedProject, { status: 200 });
        }

        // 2. FormData request (from the Edit form)
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const techStackString = formData.get("techStack") as string;
        const liveLink = formData.get("liveLink") as string;
        const githubLink = formData.get("githubLink") as string;
        const frontendLink = formData.get("frontendLink") as string;
        const backendLink = formData.get("backendLink") as string;
        const imageFiles = formData.getAll("images") as File[];

        const techStack = techStackString ? techStackString.split(",").map((t) => t.trim()).filter(Boolean) : [];

        const updateData: any = {
            title, description, techStack, liveLink, githubLink, frontendLink, backendLink
        };

        if (imageFiles && imageFiles.length > 0) {
            const uploadPromises = imageFiles.map(async (file) => {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                return new Promise<string>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: "portfolio" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result?.secure_url as string);
                        }
                    );
                    uploadStream.end(buffer);
                });
            });
            updateData.imageUrls = await Promise.all(uploadPromises);
        }

        const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json(updatedProject, { status: 200 });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

// DELETE a specific project
export async function DELETE(req: Request, { params }: RouteParams) {
    try {
        await connectDB();
        const { id } = await params; // Await the params

        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) return NextResponse.json({ error: "Project not found" }, { status: 404 });
        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}