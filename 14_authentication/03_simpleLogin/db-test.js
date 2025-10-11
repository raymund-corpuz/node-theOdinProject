const pool = require("./db/pool");
const userModels = require("./models/userModel");

async function testDb() {
  try {
    const data = await pool.query("SELECT * FROM users");
    console.log("✅ Success", data);
  } catch (error) {
    console.log("❌ Req Failed", error.message);
  }
}

// testDb();

async function testCreateUser() {
  try {
    const data = await userModels.createUser("ray3", "ray123456");
    console.log("✅ Success", data);
  } catch (error) {
    console.log("❌ Req Failed", error.message);
  }
}

//testCreateUser();

async function testFindUsername() {
  try {
    const data = await userModels.finduserByUsername("ray3");
    console.log("✅ Success", data);
  } catch (error) {
    console.log("❌ Req Failed", error.message);
  }
}

// testFindUsername();

async function testFindId() {
  try {
    const data = await userModels.findUserById(1);
    console.log("✅ Success", data);
  } catch (error) {
    console.log("❌ Req Failed", error.message);
  }
}

testFindId();
