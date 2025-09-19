import { NextResponse } from "next/server";
import dbConnect from "@/app/api/lib/connectDB";
import Story from "@/app/api/model/communityCaseStudy.model";
import sendEmail from "../../lib/emailService";
import CaseStudyApprovalEmail from "../../lib/storyApprovalEmail";
import CaseStudyRejectionEmail from "../../lib/storyRejectionEmail";
import checkAdmin from "../../lib/checkAdmin/checkAdmin";

export async function PATCH(req, { params }) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);
    if (adminCheck) {
      return adminCheck;
    }
    await dbConnect();

    const { id } = await params;
    const { status, email, name } = await req.json();

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
      await sendEmail(
        email,
        `Good news! Your case study "${caseStudyTitle}" is now live 🚀`,
        "Congratulations! Your community case study has been approved and is now live on Cyber Awareness Hub.",
        CaseStudyApprovalEmail(name || "User", caseStudyTitle)
      );
    } else if (status === "rejected") {
      await sendEmail(
        email,
        `Your case study "${caseStudyTitle}" was not approved this time`,
        "Thank you for your submission. Unfortunately, your case study was not approved this time. Please try again with another case study.",
        CaseStudyRejectionEmail(name || "User", caseStudyTitle)
      );
    }

    return NextResponse.json({ success: true, caseStudy: updated });
  } catch (error) {
    console.error("Error updating case study:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);
    if (adminCheck) {
      return adminCheck;
    }
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
