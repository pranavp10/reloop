import { cache } from 'react';
import { headers } from 'next/headers';

import { Session } from 'better-auth';
import axios from 'axios';

export const getCurrentUser = cache(async () => {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get('cookie') || '';

  const { data: session } = await axios<Session>(`/auth/get-session`, {
    baseURL: requestHeaders.get('x-url-origin') || '',
    headers: { cookie },
  });

  return session;
});
