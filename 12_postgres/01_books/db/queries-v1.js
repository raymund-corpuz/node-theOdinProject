const pool = require("./pool-v1.js"); //correct

async function getAllBooks() {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows; //correct
}

async function insertBook(title) {
  await pool.query(`INSERT INTO books (title) VALUES ($1)`, [title]); //correct
}

async function deleteAllBooks() {
  await pool.query("DELECT * FROM books");
}

async function searchBook(title) {
  const { rows } = await pool.query(
    "SELECT * FROM books WHERE title ILIKE '%' || $1 ||  '%'",
    [title]
  );
  return rows;
}
module.exports = { getAllBooks, insertBook, deleteAllBooks, searchBook };
