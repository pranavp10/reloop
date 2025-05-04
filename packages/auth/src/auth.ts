import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  apiKey,
  admin,
  organization,
  bearer,
  openAPI,
  jwt,
  customSession,
} from "better-auth/plugins";

import db, { redis } from "@reloop/db";

import env from "./env";

export const config = {
  user: {
    additionalFields: {
      activeMode: {
        type: "string",
        required: false,
        defaultValue: "dev",
        input: true,
      },
      activeOrganization: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },

  secondaryStorage: {
    get: async (key) => {
      const value = await redis.get(key);
      return value ? value : null;
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, { EX: ttl });
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
    },
  },
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
    apiKey({
      defaultPrefix: "rl",
      enableMetadata: true,
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  trustedOrigins: [env.NEXT_PUBLIC_WEB_URL],
  advanced: {
    cookiePrefix: "reloop",
  },
} satisfies BetterAuthOptions;

const auth = betterAuth({
  ...config,
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
          console.log("An unknown error occurred");
        }
        return {
          user: { ...user },
          session,
        };
      }
    }, config),
  ],
});

export type AuthType = typeof auth;
export { auth as default };
