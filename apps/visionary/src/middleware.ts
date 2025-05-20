import { type NextRequest, NextResponse } from 'next/server';
import api from '@/lib/api';
import { Session, User } from '@reloop/auth/client';

export default async function authMiddleware(request: NextRequest) {
  try {
    const { data } = await api<{ session: Session; user: User }>(
      '/api/shield/v1/get-session',
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      },
    );
    if (!data?.session) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    if (data.user.activeOrganization && data.user.activeMode) {
      return NextResponse.redirect(
        new URL(
          `/${data.user.activeOrganization}/${data.user.activeMode}`,
          request.url,
        ),
      );
      //return NextResponse.next();
    }
  } catch (e) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/'],
};
