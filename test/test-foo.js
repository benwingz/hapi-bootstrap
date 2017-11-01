const jwt = require('jsonwebtoken');
const server = require('../server');
const env = require('../config/env.js');
const userFixtures = require('./fixtures-user');

const describe = require('mocha').describe;
const before = require('mocha').before;
const after = require('mocha').after;
const it = require('mocha').it;
const assert = require('chai').assert;

let user;
let token;

describe('Foo', () => {
  before((doneBefore) => {
    userFixtures.mockUser().then((_user) => {
      user = _user;
      const secret = env.authentication.secret;
      token = jwt.sign(user, secret);
      doneBefore();
    });
  });
  after((doneAfter) => {
    userFixtures.eraseMockUser().then(() => {
      doneAfter();
    });
  });
  describe('GET API initial endpoint', () => {
    it('should get api initial url', (doneIt) => {
      const req = {
        method: 'GET',
        url: '/',
      };
      server.inject(req, (res) => {
        assert.equal(res.statusCode, 200);
        const port = process.env.PORt || '8080';
        assert.equal(res.result, `Hapi bootstrap api est disponible à l'adresse localhost:${port}`);
        doneIt();
      });
    });
  });
  describe('GET All foo', () => {
    it('should get a list of 3 foo', (doneIt) => {
      const req = {
        method: 'GET',
        url: '/foo',
        headers: {
          authorization: token,
        },
      };
      server.inject(req, (res) => {
        assert.equal(res.statusCode, 200);
        assert.isArray(res.result);
        doneIt();
      });
    });
  });
  describe('POST Foo', () => {
    it('Should create a foo and return the record', (doneIt) => {
      const req = {
        method: 'POST',
        url: '/foo',
        payload: JSON.stringify({
          name: 'Foo test',
        }),
        headers: {
          authorization: token,
        },
      };
      server.inject(req, (res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.result.name, 'Foo test');
        doneIt();
      });
    });
  });
});
