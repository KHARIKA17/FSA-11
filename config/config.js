require("dotenv").config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.sqlite",
    logQueryParameters: true,
    benchmark: true,
    logging: true,
  },
  test: {
    dialect: "sqlite",
    storage: "./db-test.sqlite",
    logQueryParameters: true,
    benchmark: true,
    logging: true,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: true,
  },
};
