import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET the settings
export async function GET() {
    try {
        await connectDB();
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({ resumeUrl: "" }); // Create one if it doesn't exist
        }
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

// UPDATE the resume
export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();
        const file = formData.get("resume") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Upload PDF to Cloudinary
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const resumeUrl = await new Promise<string>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "portfolio/settings",
                    resource_type: "raw", // <--- CRITICAL FOR PDFs
                    public_id: "Muhaimin_Tanvir_Resume.pdf", // <--- ADD THIS: Forces the exact filename
                    overwrite: true // <--- ADD THIS: Replaces the old resume instead of creating a new one
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result?.secure_url as string);
                }
            );
            uploadStream.end(buffer);
        });

        // Update the single Settings document
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({ resumeUrl });
        } else {
            settings.resumeUrl = resumeUrl;
        }
        await settings.save();

        return NextResponse.json(settings, { status: 200 });
    } catch (error) {
        console.error("Resume upload error:", error);
        return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
    }
}