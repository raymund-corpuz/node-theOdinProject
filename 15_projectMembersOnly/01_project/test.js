const pool = require("./db/pool");
const userModels = require("./models/userModels");

async function testUsers() {
  try {
    const data = await userModels.showAllUsers();
    console.log("✅ Success", data);
  } catch (error) {
    console.log("❌ Error occured :", error.message);
  }
}

async function testCreateUser() {
  try {
    const data = await userModels.createUser(
      "ruzel",
      "corpuz",
      "ruz",
      "ruz123",
      true,
      false
    );
    console.log("✅ Success", data);
  } catch (error) {
    console.log("❌ Error occured :", error.message);
  }
}

async function testGetUsername() {
  try {
    const data = await userModels.getUserByUsername("ruz");
    console.log("✅ Get Username", data);
  } catch (error) {
    console.log("❌ Error occured :", error.message);
  }
}

async function testGetById() {
  const data = await userModels.getUserById("2");
  console.log("✅ Get By Id", data);
}

//testUsers();
//testCreateUser();
// testGetUsername();
testGetById();
