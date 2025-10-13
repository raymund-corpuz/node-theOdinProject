const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

async function runCrud() {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
      },
    });
    console.log("✅ Created :", newUser);

    //Read (all users)

    const users = await prisma.user.findMany();
    console.log("All Users :", users);

    //Update (by id)
    const updated = await prisma.user.update({
      where: { id: newUser.id },
      data: { name: "Johnny Updated" },
    });
    console.log("Updated : ", updated);

    //Delete (by id)
    const deleted = await prisma.user.delete({
      where: { id: newUser.id },
    });
    console.log("🗑️ Deleted :", deleted);
  } catch (err) {
    if (err.code === "P2002") {
      console.error("Unique constraint failed :", err.meta);
    } else {
      console.error("❌ Error :", err);
    }
  } finally {
    await prisma.$disconnect();
  }
}

runCrud();
