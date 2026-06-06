import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const samplePapers = [
  {
    title: "Design and Analysis of Algorithms - CSE 4th Sem SEE 2024",
    slug: "design-analysis-algorithms-cse-sem-4-2024-a1b2",
    subjectName: "Design and Analysis of Algorithms",
    subjectCode: "21CS42",
    branch: "CSE",
    semester: 4,
    year: 2024,
    month: "June",
    examType: "SEE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 245,
    views: 890,
    tags: ["CSE", "SEM-4", "2024", "SEE", "21CS42", "Design and Analysis of Algorithms", "VTU"],
    status: "approved",
  },
  {
    title: "Database Management System - CSE 4th Sem SEE 2024",
    slug: "database-management-system-cse-sem-4-2024-c3d4",
    subjectName: "Database Management System",
    subjectCode: "21CS46",
    branch: "CSE",
    semester: 4,
    year: 2024,
    month: "June",
    examType: "SEE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 312,
    views: 1050,
    tags: ["CSE", "SEM-4", "2024", "SEE", "21CS46", "Database Management System", "VTU"],
    status: "approved",
  },
  {
    title: "Operating Systems - CSE 4th Sem SEE 2024",
    slug: "operating-systems-cse-sem-4-2024-e5f6",
    subjectName: "Operating Systems",
    subjectCode: "21CS43",
    branch: "CSE",
    semester: 4,
    year: 2024,
    month: "June",
    examType: "SEE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 198,
    views: 720,
    tags: ["CSE", "SEM-4", "2024", "SEE", "21CS43", "Operating Systems", "VTU"],
    status: "approved",
  },
  {
    title: "Data Structures and Applications - CSE 3rd Sem SEE 2024",
    slug: "data-structures-applications-cse-sem-3-2024-g7h8",
    subjectName: "Data Structures and Applications",
    subjectCode: "21CS32",
    branch: "CSE",
    semester: 3,
    year: 2024,
    month: "January",
    examType: "SEE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 420,
    views: 1500,
    tags: ["CSE", "SEM-3", "2024", "SEE", "21CS32", "Data Structures and Applications", "VTU"],
    status: "approved",
  },
  {
    title: "Computer Networks - CSE 5th Sem SEE 2023",
    slug: "computer-networks-cse-sem-5-2023-i9j0",
    subjectName: "Computer Networks",
    subjectCode: "21CS51",
    branch: "CSE",
    semester: 5,
    year: 2023,
    month: "December",
    examType: "SEE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 178,
    views: 650,
    tags: ["CSE", "SEM-5", "2023", "SEE", "21CS51", "Computer Networks", "VTU"],
    status: "approved",
  },
  {
    title: "Signals and Systems - ECE 4th Sem SEE 2024",
    slug: "signals-systems-ece-sem-4-2024-k1l2",
    subjectName: "Signals and Systems",
    subjectCode: "21EC42",
    branch: "ECE",
    semester: 4,
    year: 2024,
    month: "June",
    examType: "SEE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 134,
    views: 480,
    tags: ["ECE", "SEM-4", "2024", "SEE", "21EC42", "Signals and Systems", "VTU"],
    status: "approved",
  },
  {
    title: "Mechanics of Materials - MECH 3rd Sem SEE 2024",
    slug: "mechanics-materials-mech-sem-3-2024-m3n4",
    subjectName: "Mechanics of Materials",
    subjectCode: "21ME32",
    branch: "MECH",
    semester: 3,
    year: 2024,
    month: "January",
    examType: "SEE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 89,
    views: 320,
    tags: ["MECH", "SEM-3", "2024", "SEE", "21ME32", "Mechanics of Materials", "VTU"],
    status: "approved",
  },
  {
    title: "Calculus and Differential Equations - CSE 1st Sem CIE 2024",
    slug: "calculus-differential-equations-cse-sem-1-2024-o5p6",
    subjectName: "Calculus and Differential Equations",
    subjectCode: "21MAT11",
    branch: "CSE",
    semester: 1,
    year: 2024,
    month: "March",
    examType: "CIE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 567,
    views: 2100,
    tags: ["CSE", "SEM-1", "2024", "CIE", "21MAT11", "Calculus and Differential Equations", "VTU"],
    status: "approved",
  },
  {
    title: "Machine Learning - CSE 7th Sem SEE 2023",
    slug: "machine-learning-cse-sem-7-2023-q7r8",
    subjectName: "Machine Learning",
    subjectCode: "21CS71",
    branch: "CSE",
    semester: 7,
    year: 2023,
    month: "December",
    examType: "SEE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 223,
    views: 890,
    tags: ["CSE", "SEM-7", "2023", "SEE", "21CS71", "Machine Learning", "VTU"],
    status: "approved",
  },
  {
    title: "Artificial Intelligence and Machine Learning - AIML 5th Sem Model Paper 2024",
    slug: "aiml-5th-sem-model-paper-2024-s9t0",
    subjectName: "Artificial Intelligence and Machine Learning",
    subjectCode: "21CS54",
    branch: "AIML",
    semester: 5,
    year: 2024,
    month: "May",
    examType: "Model Paper",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 156,
    views: 560,
    tags: ["AIML", "SEM-5", "2024", "Model Paper", "21CS54", "AI and ML", "VTU"],
    status: "approved",
  },
  {
    title: "Software Engineering - CSE 3rd Sem SEE 2023",
    slug: "software-engineering-cse-sem-3-2023-u1v2",
    subjectName: "Software Engineering",
    subjectCode: "21CS35",
    branch: "CSE",
    semester: 3,
    year: 2023,
    month: "December",
    examType: "SEE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 145,
    views: 520,
    tags: ["CSE", "SEM-3", "2023", "SEE", "21CS35", "Software Engineering", "VTU"],
    status: "approved",
  },
  {
    title: "Web Technology - CSE 6th Sem SEE 2024",
    slug: "web-technology-cse-sem-6-2024-w3x4",
    subjectName: "Web Technology and its Applications",
    subjectCode: "21CS63",
    branch: "CSE",
    semester: 6,
    year: 2024,
    month: "June",
    examType: "SEE",
    pdfUrl: "https://example.com/sample.pdf",
    downloads: 167,
    views: 610,
    tags: ["CSE", "SEM-6", "2024", "SEE", "21CS63", "Web Technology", "VTU"],
    status: "approved",
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.report.deleteMany();
  await prisma.questionPaper.deleteMany();
  await prisma.analytics.deleteMany();

  // Create papers
  for (const paper of samplePapers) {
    await prisma.questionPaper.create({ data: paper });
    console.log(`  ✅ Created: ${paper.subjectName}`);
  }

  // Calculate analytics
  const totalDownloads = samplePapers.reduce((sum, p) => sum + p.downloads, 0);
  const totalViews = samplePapers.reduce((sum, p) => sum + p.views, 0);

  await prisma.analytics.create({
    data: {
      id: "global",
      totalUploads: samplePapers.length,
      totalDownloads,
      totalViews,
    },
  });

  console.log(`\n✨ Seeded ${samplePapers.length} papers successfully!`);
  console.log(`   Total Downloads: ${totalDownloads}`);
  console.log(`   Total Views: ${totalViews}`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
