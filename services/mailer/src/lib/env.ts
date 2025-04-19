import { config } from "dotenv";
import { z } from "zod";

config({ path: ".env", override: true });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  PORT: z.coerce.number().optional(),
  WEB_URL: z.string().min(1),
  DATABASE_URL: z.string().url().min(1),
});

const env = envSchema.parse(process.env);

export default env;
