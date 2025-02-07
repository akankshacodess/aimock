import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

export default clerkMiddleware();
//   (auth, req) => {
//   if (isProtectedRoute(req)) auth().protect();
// }

export const config = {
  matcher: [
    // Skip Next.js internals and static files (avoids headers() error)
    "/((?!_next|.*\\..*).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
