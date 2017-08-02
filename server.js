const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const hapiswaggerd = require('hapi-swaggered');
const hapiswaggeredui = require('hapi-swaggered-ui');
const Hapijwt = require('hapi-auth-jwt-simple');
const hapicors = require('hapi-cors');
const jwt = require('jsonwebtoken');

const routes = require('./routes');
const env = require('./config/env');

const server = new Hapi.Server();
server.connection({ port: 2999, host: 'localhost' });

server.register([
  Inert,
  Vision,
  {
    register: hapicors,
    options: {
      headers: ['authorization', 'content-type'],
      origins: ['*'],
      methods: ['POST, GET, OPTIONS, PUT, DELETE'],
    },
  },
  {
    register: hapiswaggerd,
    options: {
      endpoint: '/swagger-doc',
    },
  },
  {
    register: Hapijwt,
  },
  {
    register: hapiswaggeredui,
    options: {
      title: 'Skilvioo matching API',
      path: '/documentation',
      authorization: { // see above
        field: 'Authorization',
        scope: 'header',
        placeholder: 'Enter your jwt token here',
      },
      swaggerOptions: {},
    },
  },
], (err) => {
  server.auth.strategy('jwt', 'jwt', {
    validateFunc: (token, request, callback) => {
      jwt.verify(token, env[process.env.ENV].authentication.secret, (error, decoded) => {
        if (error) {
          return callback(err);
        }
        return callback(null, true, decoded);
      });
    },
  });
  if (err) throw err;
  routes(server);
  server.start((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server running at:', server.info.uri);
    }
  });
});
