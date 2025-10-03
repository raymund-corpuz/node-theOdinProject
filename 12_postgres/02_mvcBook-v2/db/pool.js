const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "bookcollect_db2",
  password: "111111",
  port: 5432,
});
