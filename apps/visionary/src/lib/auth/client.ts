'use client';

import { createAuthClient } from '@reloop/auth/client';

export const authClient = createAuthClient({
  apiBaseUrl: `${process.env.NEXT_PUBLIC_WEB_URL}/api/shield/v1` || '',
});

export const {
  getSession,
  signIn,
  signOut,
  signUp,
  useSession,
  organization,
  updateUser,
  apiKey,
} = authClient;
