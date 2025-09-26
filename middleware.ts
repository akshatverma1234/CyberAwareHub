import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/contact",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  const { pathname } = req.nextUrl;

  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  if (isAdminRoute(req)) {
    if (!session?.sessionId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (session?.sessionClaims?.metadata?.role !== "cyberhub_admin") {
      console.warn(
        `Unauthorized admin access attempt from ${ip} to ${pathname}`
      );
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // if (isApiRoute(req) && pathname.startsWith("/api/admin/")) {
  //   if (session?.sessionClaims?.metadata?.role !== "cyberhub_admin") {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  //   }
  // }

  const response = NextResponse.next();
  response.headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, nosnippet, noarchive"
  );

  if (isAdminRoute(req)) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
  }

  return response;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
