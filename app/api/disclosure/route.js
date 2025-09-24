import { NextResponse } from "next/server";
import connectDB from "@/app/api/lib/connectDB";
import ResponsibleDisclosure from "@/app/api/model/disclosure.model";
import { z } from "zod";
import xss from "xss";

const disclosureSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  vulnerabilityType: z
    .string()
    .min(1, "Vulnerability Type is required")
    .max(100),
  vulnSummary: z.string().min(1, "Vulnerability Summary is required").max(2500),
  affectedUrl: z.string().min(1, "Affected URL(s) is required").max(10000),
  description: z.string().min(1, "Description is required").max(20000),
  reproduce: z.string().min(1, "Steps to Reproduce are required").max(10000),
  poc: z
    .string()
    .url("Proof of Concept must be a valid URL")
    .min(1, "Proof of Concept is required")
    .max(500),
  status: z
    .enum(["pending", "triaged", "resolved", "invalid"])
    .default("pending"),
});

export async function POST(req) {
  try {
    await connectDB();
    const rawData = await req.json();
    const validatedData = disclosureSchema.parse(rawData);

    const sanitizedData = {
      ...validatedData,
      name: xss(validatedData.name),
      email: xss(validatedData.email),
      vulnerabilityType: xss(validatedData.vulnerabilityType),
      vulnSummary: xss(validatedData.vulnSummary),
      affectedUrl: xss(validatedData.affectedUrl),
      description: xss(validatedData.description),
      reproduce: xss(validatedData.reproduce),
      poc: xss(validatedData.poc),
      status: "pending",
    };

    const newReport = await ResponsibleDisclosure.create(sanitizedData);
    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to submit report" },
      { status: 500 }
    );
  }
}
