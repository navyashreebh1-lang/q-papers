const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const papersToDelete = [
    "dbms - AIML 4th Sem Supplementary 2026",
    "Test Subject - CSE 1th Sem SEE 2024"
  ];

  for (const title of papersToDelete) {
    const paper = await prisma.questionPaper.findFirst({
      where: {
        title: {
          contains: title.split(' - ')[0] // Or just search by start of title
        }
      }
    });

    if (paper) {
      await prisma.questionPaper.delete({
        where: { id: paper.id }
      });
      console.log(`Deleted paper: ${paper.title}`);
    } else {
      console.log(`Paper not found for title containing: ${title.split(' - ')[0]}`);
      
      // Let's do a broader search if exact match fails
      const allPapers = await prisma.questionPaper.findMany();
      const match = allPapers.find(p => p.title.includes('dbms') || p.title.includes('Test Subject'));
      if (match) {
        await prisma.questionPaper.delete({
          where: { id: match.id }
        });
        console.log(`Deleted fallback match: ${match.title}`);
      }
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
