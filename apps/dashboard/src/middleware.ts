import { type NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";

import type { Session, User } from "@reloop/auth";

export default async function authMiddleware(request: NextRequest) {
  const { data } = await betterFetch<{ session: Session; user: User }>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );
  if (!data?.session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (data.user.activeOrganization && data.user.activeMode) {
    return NextResponse.redirect(
      new URL(
        `/${data.user.activeOrganization}/${data.user.activeMode}`,
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dev/:path*", "/marketing/:path*", "/onboarding/:path*", "/"],
};
