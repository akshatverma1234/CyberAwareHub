import { NextResponse } from "next/server";

const checkAdmin = (auth) => {
  // Check if user is authenticated
  if (!auth?.userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  // Check if user has admin role
  const isAdmin = auth.sessionClaims?.metadata?.role === "cyberhub_admin";

  if (!isAdmin) {
    return NextResponse.json(
      {
        error: "Access forbidden. Admin privileges required.",
      },
      { status: 403 }
    );
  }

  // Return null if user is admin (no error)
  return null;
};
export default checkAdmin;
