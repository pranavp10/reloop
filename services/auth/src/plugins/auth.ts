import { createAuth } from '@reloop/auth/server';
import fp from 'fastify-plugin';

import { env } from '../utils/env';

const auth = createAuth({ authSecret: env.AUTH_SECRET, isCli: true });
export type AuthInstance = typeof auth;

export default fp(
  async function fastifyAuth(fastify) {
    if (fastify.auth) {
      return;
    }
    try {
      fastify.decorate('auth', auth);
    } catch (error) {
      if (error instanceof Error) {
        fastify.log.error(`Auth Plugin Error: ${error.message}`, error);
      } else {
        fastify.log.error('Auth Plugin Error: Unknown error', error);
      }
      throw error;
    }
  },
  { name: 'auth' },
);
