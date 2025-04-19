'use client'

import { createAuthClient } from 'better-auth/react'

import env from '@/lib/env/client'

const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_WEB_URL,
})

export const { getSession, signIn, signOut } = authClient
