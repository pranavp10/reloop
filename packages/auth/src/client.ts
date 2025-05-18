import { betterAuth } from 'better-auth';
import {
  organizationClient,
  adminClient,
  apiKeyClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins';
import { customSession } from 'better-auth/plugins';
import { createAuthClient as createBetterAuthClient } from 'better-auth/react';
import { config } from './config';

const auth = betterAuth({
  ...config,
  secret: config.secret,
  trustedOrigins: config.trustedOrigins,
  plugins: [
    ...(config.plugins ?? []),
    customSession(async ({ user, session }) => {
      try {
        return {
          user: { ...user },
          session,
        };
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        } else {
          console.log('An unknown error occurred');
        }
        return {
          user: { ...user },
          session,
        };
      }
    }, config),
  ],
});

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
