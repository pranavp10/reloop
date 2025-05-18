import { pg } from '@reloop/db/pg';
import { redis } from '@reloop/db/redis';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { customSession } from 'better-auth/plugins';
import { config } from './config';

export interface AuthOptions {
  webUrl?: string;
  authSecret?: string;
  isCli?: boolean;
}

export const createAuth = ({ webUrl, authSecret, isCli }: AuthOptions) => {
  return betterAuth({
    ...config,
    database: isCli
      ? drizzleAdapter(pg, {
          provider: 'pg',
          usePlural: true,
        })
      : undefined,
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
    secret: authSecret || config.secret,
    trustedOrigins: webUrl ? [webUrl] : config.trustedOrigins,
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
};
