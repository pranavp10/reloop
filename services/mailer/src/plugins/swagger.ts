import fp from 'fastify-plugin'
import fastifySwagger from '@fastify/swagger'
import scalar from '@scalar/fastify-api-reference'

import { version } from '../../package.json'

export default fp(async (fastify) => {
  if (process.env.NODE_ENV !== 'local') {
    return
  }

  fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Mailer API',
        version,
      },
    },
  })

  fastify.register(scalar, {
    routePrefix: '/api/docs',
  })
})
