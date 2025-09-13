import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/connectDB";
import CaseStudy from "@/app/api/model/caseStudy.model";

export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const caseStudy = await CaseStudy.findById(id);

    if (!caseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(caseStudy, { status: 200 });
  } catch (err) {
    console.error("Error fetching case study:", err);
    return NextResponse.json(
      { error: "Failed to fetch case study" },
      { status: 500 }
    );
  }
}
export async function PATCH(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const body = await req.json();

    const updated = await CaseStudy.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("Error updating case study:", err);
    return NextResponse.json(
      { error: "Failed to update case study" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const deleted = await CaseStudy.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Case study deleted successfully" },
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
