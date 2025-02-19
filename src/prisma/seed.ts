import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.tag.createMany({
    data: [
      { name: "Nutrition" },
      { name: "Bloc" },
      { name: "Voie" },
      { name: "Vitesse" },
      { name: "Santé mentale" },
      { name: "Méditation" },
    ],
  });
  // await prisma.article.createMany({
  //   data: [
  //     {
  //       title: "Article 1",
  //       content: "Content 1",
  //       slug: "article-1",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 2",
  //       content: "Content 2",
  //       slug: "article-2",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 3",
  //       content: "Content 3",
  //       slug: "article-3",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 4",
  //       content: "Content 4",
  //       slug: "article-4",
  //       authorId: "1",
  //     },

  //     {
  //       title: "Article 5",
  //       content: "Content 5",
  //       slug: "article-5",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 6",
  //       content: "Content 6",
  //       slug: "article-6",
  //       authorId: "1",
  //     },

  //     {
  //       title: "Article 7",
  //       content: "Content 7",
  //       slug: "article-7",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 8",
  //       content: "Content 8",
  //       slug: "article-8",
  //       authorId: "1",
  //     },

  //     {
  //       title: "Article 9",
  //       content: "Content 9",
  //       slug: "article-9",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 10",
  //       content: "Content 10",
  //       slug: "article-10",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 11",
  //       content: "Content 11",
  //       slug: "article-11",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 12",
  //       content: "Content 12",
  //       slug: "article-12",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 13",
  //       content: "Content 13",
  //       slug: "article-13",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 14",
  //       content: "Content 14",
  //       slug: "article-14",
  //       authorId: "1",
  //     },
  //     {
  //       title: "Article 15",
  //       content: "Content 15",
  //       slug: "article-15",
  //       authorId: "1",
  //     },
  //   ],
  // });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
