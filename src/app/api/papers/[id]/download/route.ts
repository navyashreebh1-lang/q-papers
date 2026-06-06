import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/papers/[id]/download - Increment download count
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const paper = await prisma.questionPaper.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    });

    // Update global analytics
    await prisma.analytics.upsert({
      where: { id: "global" },
      update: { totalDownloads: { increment: 1 } },
      create: { id: "global", totalDownloads: 1 },
    });

    return NextResponse.json({
      success: true,
      data: { pdfUrl: paper.pdfUrl, downloads: paper.downloads },
    });
  } catch (error) {
    console.error("POST /api/papers/[id]/download error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
