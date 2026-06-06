const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const papers = await prisma.questionPaper.findMany({take: 5});
  console.log(papers.map(p => p.pdfUrl));
}

main().catch(console.error).finally(() => prisma.$disconnect());
