import { NextResponse } from "next/server";
import { z } from "zod";
import xss from "xss";
import dbConnect from "@/app/api/lib/connectDB";
import CaseStudy from "@/app/api/model/caseStudy.model";
import { getAuth } from "@clerk/nextjs/server";
import checkAdmin from "../../lib/checkAdmin/checkAdmin";

const caseStudySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  title: z.string().min(1, "Title is required").max(200),
  image: z.string().url("Image must be a valid URL").optional(),
  summary: z.string().min(1, "Summary is required").max(500),
  impact: z.string().max(5000).optional().default(""),
  lesson: z.string().max(5000).optional().default(""),
});

export async function GET(req) {
  try {
    await dbConnect();

    const caseStudies = await CaseStudy.find().sort({ createdAt: -1 });
    return NextResponse.json(caseStudies, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);
    if (adminCheck) {
      return adminCheck;
    }

    await dbConnect();

    const rawData = await req.json();
    console.log("📥 Received Data:", rawData);

    // ✅ Validate with Zod
    const validatedData = caseStudySchema.parse(rawData);

    // ✅ Sanitize inputs
    const sanitizedData = {
      ...validatedData,
      name: xss(validatedData.name),
      title: xss(validatedData.title),
      summary: xss(validatedData.summary),
      impact: validatedData.impact ? xss(validatedData.impact) : "",
      lesson: validatedData.lesson ? xss(validatedData.lesson) : "",
    };

    const newCaseStudy = await CaseStudy.create(sanitizedData);

    return NextResponse.json(newCaseStudy, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Validation issues:", error.issues);
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Failed to create case study" },
      { status: 500 }
    );
  }
}
