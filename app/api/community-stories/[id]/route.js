import { NextResponse } from "next/server";
import { z } from "zod";
import xss from "xss";
import dbConnect from "@/app/api/lib/connectDB";
import Story from "@/app/api/model/communityCaseStudy.model";
import sendEmail from "../../lib/emailService";
import CaseStudyApprovalEmail from "../../lib/storyApprovalEmail";
import CaseStudyRejectionEmail from "../../lib/storyRejectionEmail";
import checkAdmin from "../../lib/checkAdmin/checkAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { generateRejectionNote, generateSummary } from "../../lib/aiService";

const updateSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  email: z.string().email("Invalid email address").optional(),
  name: z.string().optional(),
});

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const story = await Story.findById(id).lean();

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(story, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch story" },
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
    await dbConnect();

    const { id } = params;
    const rawData = await req.json();

    const validatedData = updateSchema.parse(rawData);
    const { status, email, name } = validatedData;

    if (!status || !email) {
      return NextResponse.json(
        { error: "Status and email are required" },
        { status: 400 }
      );
    }

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

    const caseStudyTitle = updated.title;

    if (status === "approved") {
      const aiApprovalNote = await generateSummary(caseStudyTitle);
      await sendEmail(
        email,
        `Good news! Your case study "${caseStudyTitle}" is now live 🚀`,
        aiApprovalNote,
        CaseStudyApprovalEmail(name || "User", caseStudyTitle, aiApprovalNote)
      );
    } else if (status === "rejected") {
      const aiRejectionNote = await generateRejectionNote(caseStudyTitle);
      await sendEmail(
        email,
        `Your case study "${caseStudyTitle}" was not approved this time`,
        aiRejectionNote,
        CaseStudyRejectionEmail(name || "User", caseStudyTitle, aiRejectionNote)
      );
    }

    return NextResponse.json({ success: true, caseStudy: updated });
  } catch (error) {
    console.error("Error updating case study:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);
    if (adminCheck) return adminCheck;

    await dbConnect();

    const { id } = params;
    const deleted = await Story.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Case study deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting case study:", err);
    return NextResponse.json(
      { error: "Failed to delete case study" },
      { status: 500 }
    );
  }
}
