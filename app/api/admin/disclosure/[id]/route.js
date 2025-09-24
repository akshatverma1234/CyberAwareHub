import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import z from "zod";
import checkAdmin from "@/app/api/lib/checkAdmin/checkAdmin";
import connectDB from "@/app/api/lib/connectDB";
import ResponsibleDisclosure from "@/app/api/model/disclosure.model";

const statusSchema = z.object({
  status: z.enum(["pending", "triaged", "resolved", "invalid"]),
  email: z.string().email().optional(),
  name: z.string().optional(),
});

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Report ID is required" },
        { status: 400 }
      );
    }

    const report = await ResponsibleDisclosure.findById(id);

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, report }, { status: 200 });
  } catch (err) {
    console.error("Error fetching report:", err);
    return NextResponse.json(
      { error: "Failed to fetch report" },
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

    if (!id) {
      return NextResponse.json(
        { error: "Report ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status, email, name } = body;

    const validatedData = statusSchema.parse({ status, email, name });

    const updatePayload = {
      status: validatedData.status,

      ...(validatedData.status === "resolved" && { approvedDate: new Date() }),
    };

    const updatedReport = await ResponsibleDisclosure.findByIdAndUpdate(
      id,
      updatePayload,
      {
        status: validatedData.status,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReport) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Optional: Send notification email to reporter
    if (validatedData.email && validatedData.name) {
      try {
        // You can implement email notification here
        console.log(
          `Status updated to ${status} for ${validatedData.name} (${validatedData.email})`
        );
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Report status updated successfully",
        report: updatedReport,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Error updating report status:", error);
    return NextResponse.json(
      { error: "Failed to update report status" },
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

    if (!id) {
      return NextResponse.json(
        { error: "Report ID is required" },
        { status: 400 }
      );
    }

    const deletedReport = await ResponsibleDisclosure.findByIdAndDelete(id);

    if (!deletedReport) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Report deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting report:", error);
    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 }
    );
  }
}
