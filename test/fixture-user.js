const utils = require('../common/utils');

const driver = utils.createDriver();
const session = driver.session();


function mockUser() {
  return session.run(`MERGE (u:User { 
    id: "d8078fc8-9795-414d-9111-fbf8499487ee",
    firstname: "prenom",
    lastname: "nom",
    phone: "0627330274",
    email: "fixtures@domain.com",
    password: "48e62d5cfce9826479511669cfb97869b5e08c7c20da0a0fec00e499f73d9985cf097943e8c3ebcf7fd432ff1aa74774650be34844a3a745097920ae51f98b1a",
    salt: "b55df175e8c3f3212b457fbdd3dcafbb" }) 
    RETURN u`)
    .then(user => utils.parse(user, true));
}

module.exports = {
  mockUser,
};
