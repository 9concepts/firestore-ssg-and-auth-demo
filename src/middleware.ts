import { NextRequest, NextResponse } from "next/server";

const verify = async (idToken: string) => {
  const apiKey = process.env.FIREBASE_WEB_API_KEY;
  const body = JSON.stringify({ idToken });

  return await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_REST_API_URL}/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );
};

export async function middleware(request: NextRequest) {
  const idToken = request.cookies.get("session")?.value || "";
  const response = await verify(idToken);

  if (!response.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
