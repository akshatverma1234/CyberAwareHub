import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const checkAdmin = (auth) => {
  if (!auth.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const isAdmin = auth.sessionClaims?.metadata?.role === "cyberhub_admin";
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
};
export default checkAdmin;
