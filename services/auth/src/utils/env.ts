import * as v from 'valibot';

export const defaultConfig = {
  PORT: 8080,
  HOST: 'localhost',
};

const createPortSchema = ({ defaultPort }: { defaultPort: number }) =>
  v.pipe(
    v.optional(v.string(), `${defaultPort}`),
    v.transform((s) => parseInt(s, 10)),
    v.integer(),
    v.minValue(0),
    v.maxValue(65535),
  );

export const envSchema = v.object({
  PORT: createPortSchema({ defaultPort: defaultConfig.PORT }),
  HOST: v.pipe(v.optional(v.string(), defaultConfig.HOST), v.minLength(1)),
  AUTH_SECRET: v.pipe(v.string(), v.minLength(1)),
  DB_REDIS_URL: v.pipe(v.string(), v.minLength(1)),
  DB_POSTGRES_URL: v.string(),
});

export const env = v.parse(envSchema, process.env);
