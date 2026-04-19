import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(req: Request) {
    try {
        await connectDB();

        const formData = await req.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const techStackString = formData.get("techStack") as string;
        const liveLink = formData.get("liveLink") as string;
        const githubLink = formData.get("githubLink") as string; // <-- ADDED THIS BACK
        const frontendLink = formData.get("frontendLink") as string;
        const backendLink = formData.get("backendLink") as string;
        const imageFile = formData.get("image") as File | null;

        const techStack = techStackString
            ? techStackString.split(",").map((t) => t.trim()).filter(Boolean)
            : [];

        let imageUrl = "";

        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            imageUrl = await new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "portfolio" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url as string);
                    }
                );
                uploadStream.end(buffer);
            });
        }

        const project = await Project.create({
            title,
            description,
            techStack,
            liveLink,
            githubLink, // <-- ADDED THIS BACK
            frontendLink,
            backendLink,
            imageUrl,
            featured: true,
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Project creation error:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}