import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isProtectedRoute = createRouteMatcher([
  "/talks/create",
  "/talks/:id/edit",
  "/user-profile",
]);
const isRedactorRoute = createRouteMatcher(["/blog/create", "/blog/update"]);

export default clerkMiddleware(async (auth, req) => {
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);

  const { sessionClaims } = await auth();

  if (isAdminRoute(req)) {
    if (sessionClaims?.metadata?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (isRedactorRoute(req)) {
    if (
      sessionClaims?.metadata?.role !== "redactor" &&
      sessionClaims?.metadata?.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next({
    headers,
  });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
