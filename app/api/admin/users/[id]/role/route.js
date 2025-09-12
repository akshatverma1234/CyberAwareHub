import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";
import { auth } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function PATCH(req, { params }) {
  try {
    const { userId: currentUserId, sessionClaims } = await auth();

    if (!currentUserId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const role =
      sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role;
    if (role !== "cyberhub_admin") {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const { id } = params;
    const { role: newRole } = await req.json();

    // Prevent demoting yourself
    if (id === currentUserId && newRole !== "cyberhub_admin") {
      return NextResponse.json(
        { error: "You cannot remove your own admin role" },
        { status: 400 }
      );
    }

    // Update role in Clerk public metadata
    await clerkClient.users.updateUser(id, {
      publicMetadata: { role: newRole },
    });

    return NextResponse.json({
      success: true,
      message: `User role updated to ${newRole}`,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      { error: "Failed to update role", details: error.message },
      { status: 500 }
    );
  }
}
