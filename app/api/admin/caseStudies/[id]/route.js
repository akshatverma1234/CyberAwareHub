import { NextResponse } from "next/server";
import { z } from "zod";
import xss from "xss";
import { getAuth } from "@clerk/nextjs/server";
import CaseStudy from "@/app/api/model/caseStudy.model";
import { auth } from "@clerk/nextjs/server";
import checkAdmin from "@/app/api/lib/checkAdmin/checkAdmin";
import connectDB from "@/app/api/lib/connectDB";

const caseStudySchema = z.object({
  name: z.string().min(1, "Name is required").max(100).optional(),
  title: z.string().min(1, "Title is required").max(200).optional(),
  image: z.string().url("Image must be a valid URL").optional(),
  summary: z.string().min(1, "Summary is required").max(500).optional(),
  impact: z.string().max(1000).optional(),
  lesson: z.string().max(1000).optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
});

export async function GET(req, { params }) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);
    if (adminCheck) {
      return adminCheck;
    }

    await connectDB();
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
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);

    if (adminCheck) {
      return adminCheck;
    }

    await connectDB();
    const { id } = params;
    const rawData = await req.json();

    const validatedData = caseStudySchema.partial().parse(rawData);

    const sanitizedData = {
      ...validatedData,
      name: validatedData.name ? xss(validatedData.name) : undefined,
      title: validatedData.title ? xss(validatedData.title) : undefined,
      summary: validatedData.summary ? xss(validatedData.summary) : undefined,
      impact: validatedData.impact ? xss(validatedData.impact) : undefined,
      lesson: validatedData.lesson ? xss(validatedData.lesson) : undefined,
    };

    const updated = await CaseStudy.findByIdAndUpdate(id, sanitizedData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.issues },
        { status: 400 }
      );
    }
    console.error("Error updating case study:", err);
    return NextResponse.json(
      { error: "Failed to update case study" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);

    if (adminCheck) {
      return adminCheck;
    }

    await connectDB();

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
