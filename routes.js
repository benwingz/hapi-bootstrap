const Joi = require('joi');

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: (request, reply) => {
        reply(`Skilvioo user api running at ${request.info.host}`);
      },
      description: 'Initial endoint to test if the API is up and running',
      notes: 'Return path of the API',
      tags: ['api'],
    },
  });

  server.route({
    method: 'GET',
    path: '/protected',
    config: {
      auth: 'jwt',
      handler: (request, reply) => {
        reply('This is a protected route');
      },
      description: 'Hit a JWT protected endpoint',
      notes: 'Return a protected message',
      tags: ['api'],
    },
  });

  server.route({
    method: 'POST',
    path: '/hello',
    config: {
      handler: (request, reply) => {
        const name = request.payload.name || request.query.name || 'skilvioo';
        reply(`Hello ${name}!`);
      },
      description: 'Post a User',
      notes: 'Return user formated with UUID',
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().description('Your name'),
        },
        query: {
          name: Joi.string().description('Your name'),
        },
      },
    },
  });
};
