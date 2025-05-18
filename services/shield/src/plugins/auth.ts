import fp from 'fastify-plugin';

import { createAuth } from '@reloop/auth/server';
import { env } from '../utils/env';

export default fp(
  async function fastifyAuth(fastify) {
    if (fastify.auth) {
      return;
    }
    try {
      fastify.decorate('auth', createAuth({ authSecret: env.AUTH_SECRET }));
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
