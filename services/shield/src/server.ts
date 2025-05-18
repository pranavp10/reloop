import Fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import { dirname, join } from 'node:path';
import fastifyCors from '@fastify/cors';

import { env } from './utils/env';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function server() {
  const fastify = Fastify({ logger: true });

  fastify.register(fastifyCors, {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Request-ID', 'X-Rate-Limit-Remaining'],
    credentials: true,
    maxAge: 86400,
  });

  fastify.register(autoLoad, {
    dir: join(__dirname, 'plugins'),
  });

  fastify.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    options: {
      prefix: '/api/v1/shield',
    },
  });

  try {
    const address = await fastify.listen({
      port: Number(env.PORT),
      host: env.HOST,
    });

    console.log(`Server listening at ${address}`);
  } catch (error) {
    if (error instanceof Error) {
      fastify.log.error(`Failed to start server: ${error.message}`);
    } else {
      fastify.log.error('Failed to start server due to an unknown error.');
    }

    process.exit(1);
  }
}
