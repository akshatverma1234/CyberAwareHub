"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ViewTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when component mounts or path changes
    const trackView = async () => {
      try {
        await fetch("/api/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: pathname,
          }),
        });
      } catch (error) {
        // Silent fail - don't break the app if tracking fails
        console.debug("View tracking failed:", error);
      }
    };

    // Only track valid pages (not API routes, etc.)
    if (
      pathname &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/_next")
    ) {
      trackView();
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ViewTracker;
