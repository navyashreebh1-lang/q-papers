import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { reportSchema } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// POST /api/report - Report a paper
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(ip, { maxRequests: 5, windowMs: 300000 });
    if (!limit.success) {
      return NextResponse.json(
        { success: false, error: "Too many reports. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { paperId, reason } = reportSchema.parse(body);

    // Verify paper exists
    const paper = await prisma.questionPaper.findUnique({
      where: { id: paperId },
    });
    if (!paper) {
      return NextResponse.json(
        { success: false, error: "Paper not found" },
        { status: 404 }
      );
    }

    const report = await prisma.report.create({
      data: { paperId, reason },
    });

    return NextResponse.json(
      { success: true, data: report },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/report error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
