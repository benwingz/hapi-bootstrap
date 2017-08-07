function getAllFoo() {
  const foos = ['foo 1', 'foo 2', 'foo 3'];
  return new Promise((resolve) => {
    resolve(foos);
  });
}

module.exports = {
  getAllFoo,
};
