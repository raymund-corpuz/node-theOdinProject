const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "practice_db",
  password: "111111",
  port: "5432",
});
