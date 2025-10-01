const pool = require("../db/pool");

async function getAllBooks(userId) {
  const { rows } = await pool.query("SELECT * FROM books WHERE user_id = $1", [
    userId,
  ]);

  return rows;
}

async function insertBook(title, author) {
  await pool.query("INSERT INTO books (title, author) VALUES $1,$2", [
    title,
    author,
  ]);
}

async function deleteAllBooks(userId) {
  const { rows } = await pool.query("DELETE  FROM books WHERE user_id = $1", [
    userId,
  ]);
  return rows;
}

module.exports = { getAllBooks, insertBook, deleteAllBooks };
