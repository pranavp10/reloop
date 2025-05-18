import {
  organizationClient,
  adminClient,
  apiKeyClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins';
import { createAuthClient as createBetterAuthClient } from 'better-auth/react';
import { createAuth } from './server';

const auth = createAuth({});

export type AuthInstance = typeof auth;
export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;

export const createAuthClient = ({ apiBaseUrl }: { apiBaseUrl: string }) =>
  createBetterAuthClient({
    baseURL: apiBaseUrl,
    plugins: [
      organizationClient(),
      adminClient(),
      apiKeyClient(),
      inferAdditionalFields<AuthInstance>(),
    ],
  });
