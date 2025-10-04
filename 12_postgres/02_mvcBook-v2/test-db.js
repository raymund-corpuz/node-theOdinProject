const pool = require("./db/pool");
const { createUser, findUserByEmail } = require("./models/userModels");
const {
  getAllBooks,
  insertNewBook,
  findOneBook,
  updateBook,
  deleteBookId,
} = require("./models/bookModels");

async function test() {
  try {
    const { rows } = await pool.query("SELECT * from users");
    console.log(rows);
    process.exit();
  } catch (error) {
    console.log("❌ Error Occured");
  }
}

async function testCreate() {
  try {
    const newUser = await createUser("ray", "ray@example.com", "password123");
    console.log("✅Successfully created", newUser);
  } catch (error) {
    console.log("❌ Error Occured");
  } finally {
    pool.end();
  }
}

async function testFindEmail() {
  try {
    const EMAIL = "ray@example.com";
    const user = await findUserByEmail(EMAIL);

    if (!user) {
      console.log("❌ Cannot find the email");
    } else {
      console.log("✅ Successfully search", user);
    }
  } catch (error) {
    console.log("❌ Error Occured");
  } finally {
    pool.end();
  }
}

//test();
// testCreate();
//testFindEmail();

// ========== TEST CONTROLLERS ============================
async function testRegister() {
  const req = {
    body: { username: "Alice", email: "alice@example.com", password: "123456" },
    session: {},
  };

  const res = {
    render: (view, data) => console.log("Render:", view, data),
    status: function (code) {
      this.statusCode = code;
      return this;
    },
  };

  await registerPost(req, res);
}

async function testAllBooks() {
  const all = await getAllBooks();
  console.log(all);
  process.exit();
}

// testAllBooks();

async function testInsertBook() {
  const TITLE = "Kurama";
  const AUTHOR = "Naruto";
  const YEAR = 1979;
  const USER_ID = 2;

  const insertBook = await insertNewBook(TITLE, AUTHOR, YEAR, USER_ID);
  console.log("✅INSERTED SUCCESSFULLY", insertBook);
}
testInsertBook();

async function testFindOneBook() {
  const book = await findOneBook(2);
  console.log("✅ Successfully found", book);
}
//testFindOneBook();
async function testUpdateBook() {
  const ID = 1;
  const TITLE = "The Hobbit";
  const AUTHOR = "J.R.R. Tolkien";
  const YEAR = 1984;

  const updated = await updateBook(ID, TITLE, AUTHOR, YEAR);

  console.log("✅ SUCCESSFULLY", updated);
}

//testUpdateBook();

async function testDeleteBook() {
  const deleted = await deleteBookId(2);
  console.log("✅ Successfully deleted", deleted);
}

//testDeleteBook();
