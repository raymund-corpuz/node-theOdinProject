const pool = require("./pool"); //correct

async function getAllBooks() {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows; //correct
}

async function insertBook(title) {
  await pool.query("INSERT INTO books (title) VALUES ($1)", [title]); //correct
}

async function deleteAllBooks() {
  await pool.query("DELETE * FROM books"); //correct
}

async function searchBook(title) {
  const { rows } = await pool.query(
    "SELECT * FROM books WHERE title ILIKE '%' || $1 || '%'",
    [title] //correct
  );

  return rows;
}

module.exports = { getAllBooks, insertBook, deleteAllBooks, searchBook };
