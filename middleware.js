import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/api/:function*", "/Users"],
};

const secret = process.env.NEXTAUTH_SECRET;

export default async function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith("/api/") &&
    !request.nextUrl.pathname.startsWith("/api/auth")
  ) {
    const token = await getToken({ req: request, secret });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  } else {
    // Use withAuth for other routes specified in the matcher
    return withAuth(
      function (request) {
        // Any specific logic for authenticated routes can go here
        return NextResponse.next();
      },
      {
        callbacks: {
          authorized: ({ token }) => !!token,
        },
      }
    )(request);
  }
}
