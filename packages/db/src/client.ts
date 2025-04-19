import postgres from 'postgres'

import env from './env'

const globalForDb = globalThis as unknown as {
  client: postgres.Sql | undefined
}

const client =
  globalForDb.client ??
  postgres(env.DATABASE_URL as string, {
    max: 100,
    idle_timeout: 20,
  })

if (env.NODE_ENV !== 'production') {
  globalForDb.client = client
}

export default client
