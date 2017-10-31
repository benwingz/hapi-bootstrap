const PROD = {
  DATABASE: {
    URI: process.env.DATABASE_URI,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
  },
  authentication: {
    secret: [process.env.SECRET_SKILVIOO_FORMATION, process.env.SECRET_SKILVIOO_CORE],
  },
};

module.exports = PROD;
