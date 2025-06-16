// middleware.js
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/forum(.*)",
  "/api/dashboard(.*)", // ✅ make sure API is protected too
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth.protect(); // ✅ Enforce session for Clerk v6+
  }
});

export const config = {
  matcher: [
    // Protect all relevant routes, skip Next.js internals
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)", // includes /api/dashboard
  ],
};
