// const { PrismaClient, Prisma } = require("@prisma/client");
// const prisma = new PrismaClient();

// async function runCrud() {
//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         name: "John Doe",
//         email: "john@example.com",
//       },
//     });
//     console.log("✅ Created :", newUser);

//     //Read (all users)

//     const users = await prisma.user.findMany();
//     console.log("All Users :", users);

//     //Update (by id)
//     const updated = await prisma.user.update({
//       where: { id: newUser.id },
//       data: { name: "Johnny Updated" },
//     });
//     console.log("Updated : ", updated);

//     //Delete (by id)
//     const deleted = await prisma.user.delete({
//       where: { id: newUser.id },
//     });
//     console.log("🗑️ Deleted :", deleted);
//   } catch (err) {
//     if (err.code === "P2002") {
//       console.error("Unique constraint failed :", err.meta);
//     } else {
//       console.error("❌ Error :", err);
//     }
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// runCrud();

// ============= Re-Create =================== //
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function runCrud() {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: "Raymund",
        email: "ray@xexample.com",
      },
    });
    console.log("✅ New User is Created :", newUser);

    const users = await prisma.user.findMany();
    console.log("All users :", users);

    const updated = await prisma.user.update({
      where: { id: newUser.id },
      data: { name: "Raymanxikoy" },
    });

    console.log("✅ Updated :", updated);

    const deleted = await prisma.user.delete({
      where: { id: newUser.id },
    });
    console.log("✅ Deleted :", deleted);
  } catch (error) {
    if (error === "P2002") {
      console.error("Unique constraint failed :", error.meta);
    } else {
      console.error("❌ Error", error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

runCrud();
