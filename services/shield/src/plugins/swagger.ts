import fastifySwagger from '@fastify/swagger';
import scalar from '@scalar/fastify-api-reference';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Voice Thought API',
        version: '1.0.0',
      },
    },
  });

  fastify.register(scalar, {
    routePrefix: '/api/shield/docs',
    configuration: {
      theme: 'default',
    },
  });
});
