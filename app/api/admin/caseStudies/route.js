import { NextResponse } from "next/server";
import dbConnect from "@/app/api/lib/connectDB";
import CaseStudy from "@/app/api/model/caseStudy.model";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  await dbConnect();
  const caseStudies = await CaseStudy.find().sort({ createdAt: -1 });
  return NextResponse.json(caseStudies);
}

export async function POST(req) {
  const { userId, sessionClaims } = auth();

  try {
    const body = await req.json();
    await dbConnect();
    const newCaseStudy = await CaseStudy.create(body);

    return NextResponse.json(newCaseStudy, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
