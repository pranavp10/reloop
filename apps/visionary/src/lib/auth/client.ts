'use client';

import { publicEnv } from '@/lib/env';
import { createAuthClient } from '@reloop/auth/client';

export const authClient = createAuthClient({
  apiBaseUrl: publicEnv.NEXT_PUBLIC_WEB_URL,
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
