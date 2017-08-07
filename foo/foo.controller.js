const FooService = require('./foo.service');

function getAllFoo(request, reply) {
  FooService.getAllFoo()
    .then((foos) => {
      reply(foos);
    }).catch((error) => {
      reply({ detail: error }).code(520);
    });
}

module.exports = {
  getAllFoo,
};
