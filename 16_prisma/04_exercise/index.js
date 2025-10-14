const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  //Create a User with Profile
  const user = await prisma.user.create({
    data: {
      name: "Raymund",
      email: "ray" + Date.now() + "@example.com",
      profile: {
        create: { bio: "Full-stack developer learning Prisma" },
      },
    },
    include: { profile: true },
  });

  console.log("✅ User Created :", user);

  //Create categories
  const cat1 = await prisma.category.create({ data: { name: "Tech" } });
  const cat2 = await prisma.category.create({ data: { name: "Tutorials" } });

  //Create Post with Relation to User & Categories
  const post = await prisma.post.create({
    data: {
      title: "Mastering Prisma Relations",
      content:
        "In this tutoriral, we'll learn about 1:N and N:M relationships.",
      published: true,
      author: { connect: { id: user.id } },
      categories: {
        connect: [{ id: cat1.id }, { id: cat2.id }],
      },
    },
    include: { author: true, categories: true },
  });

  console.log("✅ Post Created: ", post);

  //Get All Posts with Author & Categories
  const posts = await prisma.post.findMany({
    include: {
      auhtor: true,
      categories: true,
    },
  });

  console.log("All Posts:", posts);

  const updatedPost = await prisma.post.update({
    where: { id: post.id },
    data: { title: "Updated: Mastering Prisma Relations" },
  });
  console.log("✅ Updated Post:", updatedPost);

  //Delete Category
  const deleteCat = await prisma.category.delete({ where: { id: cat2.id } });
  console.log("Deleted Category :", deleteCat);
}

main()
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });
