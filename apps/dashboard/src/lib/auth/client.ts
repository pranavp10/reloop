"use client";

import { createAuthClient } from "better-auth/react";

import {
  organizationClient,
  adminClient,
  apiKeyClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import publicEnv from "@/lib/env/client";
import auth from "@reloop/auth";

export const authClient = createAuthClient({
  baseURL: publicEnv.NEXT_PUBLIC_WEB_URL,
  plugins: [
    organizationClient(),
    adminClient(),
    apiKeyClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const {
  getSession,
  signIn,
  signOut,
  signUp,
  useSession,
  organization,
  updateUser,
} = authClient;
