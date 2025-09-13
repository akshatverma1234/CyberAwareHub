import { NextResponse } from "next/server";
import dbConnect from "@/app/api/lib/connectDB";
import Story from "@/app/api/model/communityCaseStudy.model"; // ✅ fixed import

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const { status } = await req.json();

    const updated = await Story.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Community Story not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, caseStudy: updated });
  } catch (error) {
    console.error("Error updating case study:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const { id } = params;
    const deleted = await Story.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Community Case study deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting case study:", err);
    return NextResponse.json(
      { error: "Failed to delete case study" },
      { status: 500 }
    );
  }
}
