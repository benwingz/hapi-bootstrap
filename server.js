const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const hapiswaggerd = require('hapi-swaggered');
const hapiswaggeredui = require('hapi-swaggered-ui');
const Hapijwt = require('hapi-auth-jwt2');
const hapicors = require('hapi-cors');

const routes = require('./routes');
const env = require('./config/env');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.register([
  Inert,
  Vision,
  {
    register: hapicors,
    options: {
      headers: ['Authorization'],
      origins: ['*'],
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
    key: env[process.env.ENV].authentication.secret,
    verifyFunc: (decoded, request, callback) => {
      // do your checks to see if the person is valid
      if (!decoded) {
        return callback(null, false);
      }
      return callback(null, true);
    },
    verifyOptions: { algorithms: ['HS256'] },
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
