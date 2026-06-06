import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function verifyAdmin(request: NextRequest): boolean {
  const secret = request.headers.get("x-admin-secret");
  return secret === process.env.ADMIN_SECRET;
}

// GET /api/admin/reports - List all reports
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: "desc" },
      include: { paper: true },
    });

    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    console.error("GET /api/admin/reports error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/reports - Dismiss a report
export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("id");

    if (!reportId) {
      return NextResponse.json(
        { success: false, error: "Report ID required" },
        { status: 400 }
      );
    }

    await prisma.report.delete({ where: { id: reportId } });

    return NextResponse.json({
      success: true,
      message: "Report dismissed",
    });
  } catch (error) {
    console.error("DELETE /api/admin/reports error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
