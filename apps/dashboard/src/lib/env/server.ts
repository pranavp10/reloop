import { z } from 'zod'

export type ServerEnv = z.infer<typeof serverEnvSchema>

export const serverEnvSchema = z.object({
  USE_SCREEN_SIZE_INDICATOR: z.boolean().default(false),
})

const serverEnv = serverEnvSchema.parse({
  USE_SCREEN_SIZE_INDICATOR: process.env.USE_SCREEN_SIZE_INDICATOR,
} satisfies Record<keyof ServerEnv, string | undefined>)

export default serverEnv
