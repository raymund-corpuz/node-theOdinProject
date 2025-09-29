const {
  getAllPost,
} = require("../../../11_chapterReview/01_smallBlog/models/PostStorage");
const pool = require("./pool");

async function getAllBooks() {
  const { rows } = await pool.query(`SELECT * FROM books`);
  return rows;
}

async function insertBook(title) {
  await pool.query("INSERT INTO books (title) VALUES ($1)", [title]);
}

async function deleteAllBooks() {
  await pool.query("DELETE FROM books");
}

async function searchBooks(keyword) {
  const { rows } = await pool.query(
    `SELECT * FROM books WHERE  title ILIKE "%" || $1 || "%"`,
    [keyword]
  );

  return rows;
}

module.exports = { getAllBooks, insertBook, deleteAllBooks, searchBooks };
