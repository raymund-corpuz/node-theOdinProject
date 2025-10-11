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

//testUsers();
//testCreateUser();
testGetUsername();
