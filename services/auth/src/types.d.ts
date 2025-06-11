import { DatabaseInstance } from '@reloop/db/pg';
import { RedisInstance } from '@reloop/db/redis';
import type { AuthInstance } from './plugins/auth';

declare module 'fastify' {
  interface FastifyInstance {
    db: DatabaseInstance;
    auth: AuthInstance;
    redis: RedisInstance;
  }
}
