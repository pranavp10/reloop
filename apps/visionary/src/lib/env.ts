import { object, string, parse } from 'valibot';

const publicEnvSchema = object({
  NEXT_PUBLIC_WEB_URL: string(),
  NEXT_PUBLIC_API_URL: string(),
});

export const publicEnv = parse(publicEnvSchema, {
  NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
  NEXT_PUBLIC_SHIELD_URL: process.env.NEXT_PUBLIC_API_URL,
});
