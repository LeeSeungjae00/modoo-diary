import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/write", "/my"];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const session = await getToken({ req: request });

  if (!session && protectedRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  if (!session) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Authorization", `Bearer ${session.accessToken}`);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: ["/java/api/:path*", "/write", "/my", "/auth"],
};
