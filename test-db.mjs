import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const papers = await prisma.questionPaper.findMany({
    select: {
      id: true,
      title: true,
      status: true,
    }
  });
  console.log("Total Papers:", papers.length);
  console.log(papers);
  
  // also check if any are approved
  const approved = await prisma.questionPaper.count({ where: { status: 'approved' }});
  console.log("Approved count:", approved);
}

check().catch(console.error).finally(() => prisma.$disconnect());
