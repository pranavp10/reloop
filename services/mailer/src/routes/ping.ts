import type { FastifyPluginAsync } from 'fastify'

export default (async (fastify) => {
  fastify.get('/ping', async (_, reply) => {
    try {
      reply.status(200).send('pong')
    } catch (error) {
      fastify.log.error('Error handling /ping request:', error)

      reply.status(500).send({ error: 'Failed to process the request.' })
    }
  })
}) satisfies FastifyPluginAsync
