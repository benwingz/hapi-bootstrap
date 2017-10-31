const dev = require('./dev');
const prod = require('./prod');

let env = null;
switch (process.env.ENV) {
  case 'DEV':
    env = dev;
    break;
  case 'PROD':
    env = prod;
    break;
  default:
    env = dev;
}

module.exports = env;
