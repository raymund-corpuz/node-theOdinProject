const { Pool } = require("pg"); //correct

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "bookcollection_db",
  password: "111111",
  port: 5432, //correct
});
