const PROD = {
  DATABASE: process.env.DATABASE_URI,
  authentication: {
    secret: [process.env.SECRET],
  },
};

module.exports = PROD;
