import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parseSearchQuery } from "@/lib/ai-categorize";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// GET /api/search - Advanced search with AI-powered query parsing
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
    const query = searchParams.get("q") || "";

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        results: [],
        suggestions: [],
      });
    }

    // Parse natural language query
    const parsed = parseSearchQuery(query);

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: any[] = [];

    if (parsed.subjectName) {
      conditions.push({
        subjectName: { contains: parsed.subjectName, mode: "insensitive" },
      });
    }
    if (parsed.branch) {
      conditions.push({ branch: parsed.branch });
    }
    if (parsed.semester) {
      conditions.push({ semester: parsed.semester });
    }

    // Add general text search terms
    if (parsed.terms.length > 0) {
      for (const term of parsed.terms) {
        conditions.push({
          OR: [
            { subjectName: { contains: term, mode: "insensitive" } },
            { title: { contains: term, mode: "insensitive" } },
          ],
        });
      }
    }

    // If no conditions from parsing, do a general search
    if (conditions.length === 0) {
      conditions.push({
        OR: [
          { subjectName: { contains: query, mode: "insensitive" } },
          { title: { contains: query, mode: "insensitive" } },
          { tags: { has: query.toUpperCase() } },
        ],
      });
    }

    const results = await prisma.questionPaper.findMany({
      where: {
        AND: [{ status: "approved" }, ...conditions],
      },
      orderBy: [{ downloads: "desc" }, { createdAt: "desc" }],
      take: 20,
    });

    // Generate suggestions from results
    const suggestions = Array.from(
      new Set(
        results.flatMap((r) => [
          { type: "subject", value: r.subjectName, label: r.subjectName },
          { type: "title", value: r.title, label: r.title },
        ])
      )
    ).slice(0, 8);

    return NextResponse.json({
      success: true,
      results,
      suggestions,
      parsed,
    });
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
