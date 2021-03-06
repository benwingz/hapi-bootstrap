const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const hapiswaggerd = require('hapi-swaggered');
const hapiswaggeredui = require('hapi-swaggered-ui');
const Hapijwt = require('hapi-auth-jwt2');
const hapicors = require('hapi-cors');
const hapiI18n = require('hapi-basic-i18n');
const Path = require('path');
const good = require('good');

const routes = require('./routes');
const env = require('./config/env');

const mongoose = require('mongoose');

mongoose.connect(env.DATABASE);

const server = new Hapi.Server({ debug: { request: ['error'] } });
server.connection({ port: process.env.PORT || 8080, host: 'localhost' });

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
      title: 'Hapi matching API',
      path: '/documentation',
      authorization: { // see above
        field: 'Authorization',
        scope: 'header',
        placeholder: 'Enter your jwt token here',
      },
      swaggerOptions: {},
    },
  },
  {
    register: good,
    options: {
      ops: {
        interval: 1000,
      },
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            response: '*',
            error: '*',
          }],
        },
        {
          module: 'good-console',
        }, 'stdout'],
      },
    },
  },
], (err) => {
  server.auth.strategy('jwt', 'jwt', {
    key: env.authentication.secret,
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
