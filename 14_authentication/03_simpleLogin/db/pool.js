const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "simpleauth_db",
  password: "111111",
  port: 5432,
});
