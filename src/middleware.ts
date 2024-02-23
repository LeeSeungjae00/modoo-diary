import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request });
  if(!session){
    return NextResponse.rewrite(new URL("/login", request.url))
  }

  const response = NextResponse.next()
  response.headers.set('Authorization', `Bearer ${session.accessToken}`)

  return response
}

export const config = {
  matcher : [
    "/java/api/:path*"
  ]
}