import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { adminActionSchema } from "@/lib/validators";
import { deleteFromCloudinary } from "@/lib/cloudinary";

function verifyAdmin(request: NextRequest): boolean {
  const secret = request.headers.get("x-admin-secret");
  return secret === process.env.ADMIN_SECRET;
}

// GET /api/admin/papers - List all papers (including pending/rejected)
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (status) where.status = status;

    const [papers, total] = await Promise.all([
      prisma.questionPaper.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { _count: { select: { reports: true } } },
      }),
      prisma.questionPaper.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: papers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/papers error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/papers - Bulk actions (approve, reject, delete)
export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { action, paperIds } = adminActionSchema.parse(body);

    switch (action) {
      case "approve":
        await prisma.questionPaper.updateMany({
          where: { id: { in: paperIds } },
          data: { status: "approved" },
        });
        break;

      case "reject":
        await prisma.questionPaper.updateMany({
          where: { id: { in: paperIds } },
          data: { status: "rejected" },
        });
        break;

      case "delete":
        // Get papers to delete from Cloudinary
        const papers = await prisma.questionPaper.findMany({
          where: { id: { in: paperIds } },
          select: { cloudinaryId: true },
        });

        // Delete from Cloudinary
        for (const paper of papers) {
          if (paper.cloudinaryId) {
            try {
              await deleteFromCloudinary(paper.cloudinaryId);
            } catch (e) {
              console.error("Cloudinary delete error:", e);
            }
          }
        }

        await prisma.questionPaper.deleteMany({
          where: { id: { in: paperIds } },
        });
        break;
    }

    return NextResponse.json({
      success: true,
      message: `Successfully ${action}ed ${paperIds.length} paper(s)`,
    });
  } catch (error) {
    console.error("POST /api/admin/papers error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
