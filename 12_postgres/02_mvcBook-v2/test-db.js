const pool = require("./db/pool");
const { createUser, findUserByEmail } = require("./models/userModels");

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

testRegister();
