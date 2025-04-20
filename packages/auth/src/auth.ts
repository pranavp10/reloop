import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  username,
  apiKey,
  admin,
  organization,
  bearer,
  openAPI,
  jwt,
} from "better-auth/plugins";

import db from "@reloop/db";

import env from "./env";

export const config = {
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {},
  plugins: [
    jwt(),
    openAPI(),
    bearer(),
    organization(),
    admin(),
    apiKey(),
    username(),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  trustedOrigins: [env.WEB_URL],
  advanced: {
    cookiePrefix: "acme",
  },
} satisfies BetterAuthOptions;

const auth = betterAuth(config);

export type AuthType = typeof auth;
export { auth as default };
