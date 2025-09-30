const db = require("../db/queries-v1");

async function listBooks(req, res) {
  const search = req.query.search;
  let books;
  if (search) {
    books = await db.searchBook(search);
  } else {
    books = await db.getAllBooks();
  }

  res.send(books);
}

function newBookForm(req, res) {
  res.send(`
        <form method='POST' action='/new'>
        <input type="text" name="title" placeholder="Book title" />
        <button type="submit">Add Book</button>
        </form>
        `);
}

async function createBook(req, res) {
  const { title } = req.body;
  await db.insertBook(title);
  res.redirect("/");
}

async function deleteBooks(req, res) {
  await db.deleteAllBooks();
  res.send("All books deleted!");
}

module.exports = { listBooks, newBookForm, createBook, deleteBooks };
