const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "membersonly_db1",
  password: "111111",
  port: 5432,
});
