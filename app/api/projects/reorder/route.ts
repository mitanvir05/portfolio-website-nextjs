import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { items } = await req.json(); // Array of { id, order }

    // Efficiently update multiple projects at once
    const bulkOps = items.map((item: { id: string; order: number }) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } }
      }
    }));

    await Project.bulkWrite(bulkOps);

    return NextResponse.json({ message: "Reordered successfully" }, { status: 200 });
  } catch (error) {
    console.error("Reorder error:", error);
    return NextResponse.json({ error: "Failed to reorder projects" }, { status: 500 });
  }
}