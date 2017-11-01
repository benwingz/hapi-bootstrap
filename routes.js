const Joi = require('joi');
const FooController = require('./foo/foo.controller');

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: (request, reply) => {
        reply(request.i18n('startupMessage') + request.info.host);
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
    path: '/foo',
    config: {
      auth: 'jwt',
      handler: (request, reply) => {
        FooController.createFoo(request, reply);
      },
      description: 'Post a foo',
      notes: 'Return foo posted',
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().description('Your foo name'),
        },
      },
    },
  });
  server.route({
    method: 'GET',
    path: '/foo',
    config: {
      handler: (request, reply) => {
        FooController.getAllFoo(request, reply);
      },
      description: 'Get all foo',
      notes: 'Return all foo',
      tags: ['api'],
    },
  });
};
