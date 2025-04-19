import { z } from "zod";

const envSchema = z.object({
  WEB_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
});

const env = envSchema.parse(process.env);

export default env;
