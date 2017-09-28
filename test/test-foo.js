const jwt = require('jsonwebtoken');
const server = require('../server');
const env = require('../config/env.js');
const userFixtures = require('./fixtures-user');

const describe = require('mocha').describe;
const before = require('mocha').before;
const it = require('mocha').it;
const assert = require('chai').assert;

let user;
let token;

describe('Foo', () => {
  before((doneBefore) => {
    userFixtures.mockUser().then((_user) => {
      user = _user;
      const secret = env[process.env.ENV].authentication.secret[0];
      token = jwt.sign(user, secret);
      doneBefore();
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
        assert.equal(res.result.length, 3);
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
        assert.equal(res.result, 'Foo test');
        doneIt();
      });
    });
  });
});
