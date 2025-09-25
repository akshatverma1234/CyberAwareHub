import { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../lib/connectDB";
import ResponsibleDisclosure from "../../model/disclosure.model";
import { NextResponse } from "next/server";
import checkAdmin from "../../lib/checkAdmin/checkAdmin";

export async function GET(req) {
  try {
    const auth = getAuth(req);
    const adminCheck = checkAdmin(auth);
    if (adminCheck) {
      return adminCheck;
    }

    const origin = req.headers.get("origin");

    if (origin !== "http://localhost:3000/") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    await connectDB();

    const reports = await ResponsibleDisclosure.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        reports: reports,
        count: reports.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}
