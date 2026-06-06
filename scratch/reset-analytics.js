const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.analytics.update({
    where: { id: "global" },
    data: {
      totalDownloads: 0,
      totalViews: 0,
      totalUploads: 0
    }
  });
  console.log("Analytics reset to 0");
}

main()
  .catch(e => {
    console.error(e);
    // If it doesn't exist, we might need to create it or it might just fail.
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
