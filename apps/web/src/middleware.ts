import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/community", "/marketplace"];
const authRoutes = ["/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;

  if (protectedRoutes.includes(pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  if (authRoutes.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/community", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/community", "/marketplace", "/auth"],
};
