const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create user
  const newUser = await prisma.user.create({
    data: {
      name: "John Lloyd",
      email: "johnlloyd@example.com",
    },
  });
  console.log("✅ Successfully Created :", newUser);

  //Get All User
  const users = await prisma.user.findMany();
  console.log("✅ All Users :", users);

  //Update User
  const updatedUser = await prisma.user.update({
    where: { id: newUser.id },
    data: { name: "John Updated" },
  });
  console.log("✅ Updated :", updatedUser);

  // Delete User
  const deleteUser = await prisma.user.delete({
    where: { id: newUser.id },
  });
  console.log("✅ Deleted :", deleteUser);
}

//Run the function
main()
  .catch((err) => {
    console.error(err.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
