import { clerkMiddleware } from "@clerk/nextjs/server";
import "server-only";
export default clerkMiddleware();

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  // for some reason this is failing my deployment.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
