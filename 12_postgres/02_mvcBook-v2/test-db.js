const pool = require("./db/pool");
const { createUser, findUserByEmail } = require("./models/userModels");
const { getAllBooks, insertNewBook } = require("./models/bookModels");

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

testAllBooks();

async function testInsertBook() {
  const TITLE = "Harry Potter";
  const AUTHOR = "J.K Rowling";
  const YEAR = 1995;
  const USER_ID = 1;

  const insertBook = await insertNewBook(TITLE, AUTHOR, YEAR, USER_ID);
  console.log("✅INSERTED SUCCESSFULLY", insertBook[0]);
}
// testInsertBook();
