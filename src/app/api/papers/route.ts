import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { searchParamsSchema, uploadFormSchema } from "@/lib/validators";
import { generateSlug, generateTitle, sanitizeInput } from "@/lib/utils";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// GET /api/papers - List papers with filtering, sorting, pagination
export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(ip, { maxRequests: 60, windowMs: 60000 });
    if (!limit.success) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const params = searchParamsSchema.parse(
      Object.fromEntries(searchParams.entries())
    );

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Removed approval status filter to ensure all papers are displayed
    // as requested by the user.

    if (params.branch) {
      where.branch = params.branch;
    }
    if (params.semester) {
      where.semester = parseInt(params.semester);
    }
    if (params.subject) {
      where.subjectName = { contains: params.subject, mode: "insensitive" };
    }
    if (params.search) {
      const searchTerm = sanitizeInput(params.search);
      where.OR = [
        { subjectName: { contains: searchTerm, mode: "insensitive" } },
        { title: { contains: searchTerm, mode: "insensitive" } },
        { tags: { has: searchTerm.toUpperCase() } },
      ];
    }

    // Sorting
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = { createdAt: "desc" };
    switch (params.sort) {
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "most_downloaded":
        orderBy = { downloads: "desc" };
        break;
      case "most_viewed":
        orderBy = { views: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const skip = (params.page - 1) * params.limit;

    const [papers, total] = await Promise.all([
      prisma.questionPaper.findMany({
        where,
        orderBy,
        skip,
        take: params.limit,
      }),
      prisma.questionPaper.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: papers,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
        hasMore: skip + papers.length < total,
      },
    });
  } catch (error) {
    console.error("GET /api/papers error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/papers - Create a new paper
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(ip, { maxRequests: 10, windowMs: 60000 });
    if (!limit.success) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = uploadFormSchema.parse(body);

    // Check for duplicates
    const existing = await prisma.questionPaper.findFirst({
      where: {
        title: validated.title,
        branch: validated.branch,
        semester: validated.semester,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A paper with the same title, branch, and semester already exists.",
        },
        { status: 409 }
      );
    }

    const title = sanitizeInput(validated.title);
    const slug = generateSlug(
      title,
      validated.branch,
      validated.semester
    );

    // Generate tags
    const tags = [
      validated.branch,
      `SEM-${validated.semester}`,
      validated.subjectName,
      "VTU",
    ].filter(Boolean);

    const paper = await prisma.questionPaper.create({
      data: {
        title,
        slug,
        subjectName: sanitizeInput(validated.subjectName),
        branch: validated.branch,
        semester: validated.semester,
        pdfUrl: body.pdfUrl || "",
        cloudinaryId: body.cloudinaryId || null,
        tags,
        status: "approved",
      },
    });

    // Update analytics
    await prisma.analytics.upsert({
      where: { id: "global" },
      update: { totalUploads: { increment: 1 } },
      create: { id: "global", totalUploads: 1 },
    });

    return NextResponse.json(
      { success: true, data: paper },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/papers error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
