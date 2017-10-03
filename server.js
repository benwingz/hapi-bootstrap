const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const hapiswaggerd = require('hapi-swaggered');
const hapiswaggeredui = require('hapi-swaggered-ui');
const Hapijwt = require('hapi-auth-jwt2');
const hapicors = require('hapi-cors');
const hapiI18n = require('hapi-basic-i18n');
const Path = require('path');

const routes = require('./routes');
const env = require('./config/env');

const server = new Hapi.Server();
server.connection({ port: 2999, host: 'localhost' });

server.register([
  Inert,
  Vision,
  {
    register: hapiI18n,
    options: {
      locale_path: Path.join(__dirname, './assets/i18n/'),
      default_language: 'FR',
      available_languages: ['FR'],
    },
  },
  {
    register: hapicors,
    options: {
      headers: ['authorization', 'content-type'],
      origins: ['*'],
      methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
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
    validateFunc: (decoded, request, callback) => {
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
      throw error;
    }
  });
});
module.exports = server;
