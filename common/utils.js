const env = require('../config/env');
const neo4j = require('neo4j-driver').v1;
const parser = require('parse-neo4j');

/**
 * @returns {Driver}
 */
function createDriver() {
  const params = env.DATABASE;
  return neo4j.driver(params.URI, neo4j.auth.basic(params.USER, params.PASSWORD));
}

/**
 * @param {} data - neo4j results
 * @param {Boolean} isSingleRow
 */
function parse(data, isSingleRow) {
  return isSingleRow === true
    ? parser.parse(data)[0] || parser.parse(data)
    : parser.parse(data);
}

function closeNeo4j(driver, session) {
  session.close();
  driver.close();
}

function Neo4jException(message) {
  this.message = message;
  this.name = 'Neo4j Exception';
}


module.exports = {
  createDriver,
  parse,
  closeNeo4j,
  Neo4jException,
};
