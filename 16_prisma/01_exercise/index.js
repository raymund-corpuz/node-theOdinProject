// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   //create a new user
//   const newUser = await prisma.user.create({
//     data: {
//       name: "John Doe",
//       email: "john@example.com",
//     },
//   });

//   console.log("✅ Created user:", newUser);

//   //fetch all users
//   const allUsers = await prisma.user.findMany();
//   console.log("📦 All users :", allUsers);
// }

// //Run and handle errors
// main()
//   .then(() => prisma.$disconnect())
//   .catch((err) => {
//     console.log("❌ Error: ", err);
//     prisma.$disconnect();
//   });

// index.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
    },
  });
  console.log("✅ Created user:", newUser);

  const allUsers = await prisma.user.findMany();
  console.log("📦 All users:", allUsers);
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error("❌ Error:", error);
    prisma.$disconnect();
  });
