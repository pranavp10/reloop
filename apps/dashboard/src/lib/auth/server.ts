import { cache } from 'react';
import { headers } from 'next/headers';

import { Session } from 'better-auth';
import api from '@/lib/api';

export const getCurrentUser = cache(async () => {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get('cookie') || '';
  try {
    const { data: session } = await api<Session>('/api/auth/v1/get-session', {
      baseURL: requestHeaders.get('x-url-origin') || '',
      headers: { cookie },
    });
    return session;
  } catch (e) {
    return undefined;
  }
});
