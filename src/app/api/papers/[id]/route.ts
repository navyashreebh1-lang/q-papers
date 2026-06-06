import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { paperUpdateSchema } from "@/lib/validators";
import { deleteFromCloudinary } from "@/lib/cloudinary";

// GET /api/papers/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Try to find by ID or slug
    const paper = await prisma.questionPaper.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!paper) {
      return NextResponse.json(
        { success: false, error: "Paper not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: paper });
  } catch (error) {
    console.error("GET /api/papers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/papers/[id] - Update paper (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminSecret = request.headers.get("x-admin-secret");
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const validated = paperUpdateSchema.parse(body);

    const paper = await prisma.questionPaper.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json({ success: true, data: paper });
  } catch (error) {
    console.error("PUT /api/papers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/papers/[id] - Delete paper (admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminSecret = request.headers.get("x-admin-secret");
    
    console.log("Expected:", process.env.ADMIN_SECRET);
    console.log("Received:", adminSecret);

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const paper = await prisma.questionPaper.findUnique({ where: { id } });

    if (!paper) {
      return NextResponse.json(
        { success: false, error: "Paper not found" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary
    if (paper.cloudinaryId) {
      try {
        await deleteFromCloudinary(paper.cloudinaryId);
      } catch (e) {
        console.error("Failed to delete from Cloudinary:", e);
      }
    }

    await prisma.questionPaper.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Paper deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/papers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
