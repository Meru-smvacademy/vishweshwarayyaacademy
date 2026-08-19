import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Scoped strictly to protected admin routes. Public routes (/, /about/*,
  // /courses/*, /results, /contact, /admission-enquiry, /scholarship/*,
  // /gallery, /about/infrastructure, /legal/*, /api/*, etc.) never match
  // this pattern and are unaffected by this middleware.
  matcher: ["/admin/dashboard/:path*"],
};
