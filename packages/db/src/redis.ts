import { createClient, type RedisClientType } from 'redis';
import { env } from './env';

export const redis: RedisClientType = createClient({
  url: env.DB_REDIS_URL,
});

export type RedisInstance = typeof redis;
