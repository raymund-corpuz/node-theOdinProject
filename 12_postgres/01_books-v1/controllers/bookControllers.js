const db = require("../models/queries");

async function listBooks(req, res) {
  const search = req.params.search;
  let books;

  if (search) {
    books = await db.getAllBooks(search);
  } else {
    books = await db.getAllBooks();
  }

  res.send(books); //correct
}

function newBookForm(req, res) {
  res.send(`
        <form method="POST" action="/new">
        <input type="text" name="title" placeholder="Enter book" />     
        <button type="submit">Add Book</button>    
        </form>
        `);
}

async function createBook(req, res) {
  const { title } = req.body;
  await db.insertBook(title);

  //res.send(books); -- wrong
  res.redirect("/");
}

async function deleteBooks() {
  await db.deleteAllBooks();
  res.send("Books are deleted"); //correct
}

module.exports = { listBooks, createBook, newBookForm, deleteBooks };
