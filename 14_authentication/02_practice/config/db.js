const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "passport_practice_db",
  password: "111111",
  port: 5432,
});
