const { Pool } = require("pg");

// ⚠️ Change username/password to your PostgreSQL role
module.exports = new Pool({
  host: "localhost",
  user: "postgres", //replace with your role
  database: "practice_db",
  password: "111111",
  post: 5432,
});
