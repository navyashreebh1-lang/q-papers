import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const detailed = searchParams.get("detailed") === "true";

    // Global stats
    const global = await prisma.analytics.findUnique({
      where: { id: "global" },
    });

    const totalPapers = await prisma.questionPaper.count({
      where: { status: "approved" },
    });
    const totalSubjects = await prisma.questionPaper.groupBy({
      by: ["subjectName"],
      where: { status: "approved" },
    });

    const baseStats = {
      totalPapers,
      totalSubjects: totalSubjects.length,
      totalDownloads: global?.totalDownloads || 0,
      totalViews: global?.totalViews || 0,
      totalUploads: global?.totalUploads || 0,
    };

    if (!detailed) {
      return NextResponse.json({ success: true, data: baseStats });
    }

    // Detailed stats
    const branchStats = await prisma.questionPaper.groupBy({
      by: ["branch"],
      where: { status: "approved" },
      _count: { id: true },
      _sum: { downloads: true },
    });

    const semesterStats = await prisma.questionPaper.groupBy({
      by: ["semester"],
      where: { status: "approved" },
      _count: { id: true },
      _sum: { downloads: true },
      orderBy: { semester: "asc" },
    });

    const topDownloaded = await prisma.questionPaper.findMany({
      where: { status: "approved" },
      orderBy: { downloads: "desc" },
      take: 10,
    });

    const topViewed = await prisma.questionPaper.findMany({
      where: { status: "approved" },
      orderBy: { views: "desc" },
      take: 10,
    });

    const recentUploads = await prisma.questionPaper.findMany({
      where: { status: "approved" },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const pendingCount = await prisma.questionPaper.count({
      where: { status: "pending" },
    });

    const reportCount = await prisma.report.count();

    return NextResponse.json({
      success: true,
      data: {
        ...baseStats,
        pendingCount,
        reportCount,
        branchStats: branchStats.map((b) => ({
          branch: b.branch,
          count: b._count.id,
          downloads: b._sum.downloads || 0,
        })),
        semesterStats: semesterStats.map((s) => ({
          semester: s.semester,
          count: s._count.id,
          downloads: s._sum.downloads || 0,
        })),
        topDownloaded,
        topViewed,
        recentUploads,
      },
    });
  } catch (error) {
    console.error("GET /api/analytics error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
