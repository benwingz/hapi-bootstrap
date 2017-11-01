const Foo = require('./foo.model');

function getAllFoo() {
  return new Promise((resolve) => {
    resolve(Foo.find({}));
  });
}

function createFoo(name) {
  const newFoo = new Foo({
    name,
  });
  return newFoo.save();
}

module.exports = {
  getAllFoo,
  createFoo,
};
