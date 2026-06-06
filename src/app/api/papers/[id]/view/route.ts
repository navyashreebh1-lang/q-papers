import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/papers/[id]/view - Increment view count
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.questionPaper.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    // Update global analytics
    await prisma.analytics.upsert({
      where: { id: "global" },
      update: { totalViews: { increment: 1 } },
      create: { id: "global", totalViews: 1 },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/papers/[id]/view error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
