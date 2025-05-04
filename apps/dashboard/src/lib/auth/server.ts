import { cache } from "react";
import { headers } from "next/headers";

import { betterFetch } from "@better-fetch/fetch";

import type { Session } from "@reloop/auth";
import publicEnv from "@/lib/env/client";

export const getCurrentUser = cache(async () => {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie") || "";

  const { data: session } = await betterFetch<Session>(
    `${publicEnv.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
    {
      baseURL: requestHeaders.get("x-url-origin") || "",
      headers: { cookie },
    },
  );

  return session;
});
