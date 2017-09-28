const foos = ['foo 1', 'foo 2', 'foo 3'];

function getAllFoo() {
  return new Promise((resolve) => {
    resolve(foos);
  });
}

function createFoo(name) {
  foos.push(name);
  return new Promise((resolve) => {
    resolve(name);
  });
}

module.exports = {
  getAllFoo,
  createFoo,
};
