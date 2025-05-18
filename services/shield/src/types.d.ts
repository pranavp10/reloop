import { DatabaseInstance } from '@reloop/db/pg';
import { RedisInstance } from '@reloop/db/redis';
import { AuthInstance } from '@reloop/auth/server';

declare module 'fastify' {
  interface FastifyInstance {
    db: DatabaseInstance;
    auth: AuthInstance;
    redis: RedisInstance;
  }
}
