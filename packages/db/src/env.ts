import * as v from 'valibot';

export const envSchema = v.object({
  DB_POSTGRES_URL: v.pipe(v.string(), v.minLength(1)),
  DB_REDIS_URL: v.pipe(v.string(), v.minLength(1)),
});

export const env = v.parse(envSchema, process.env);
