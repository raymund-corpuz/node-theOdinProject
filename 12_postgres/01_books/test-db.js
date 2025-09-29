const pool = require("./db/pool");

async function test() {
  const { rows } = await pool.query("SELECT * FROM books");
  console.log(rows);
  process.exit();
}

test();
