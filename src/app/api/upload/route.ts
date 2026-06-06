import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { validatePdfBuffer } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// POST /api/upload - Upload PDF to Cloudinary
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(ip, { maxRequests: 5, windowMs: 60000 });
    if (!limit.success) {
      return NextResponse.json(
        { success: false, error: "Too many uploads. Please wait a moment." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    console.log(`[Upload API] Received file: ${file.name}, type: ${file.type}, size: ${file.size}`);

    // Validate file type strictly
    if (file.type !== "application/pdf") {
      console.warn(`[Upload API] Rejected file due to incorrect MIME type: ${file.type}`);
      return NextResponse.json(
        { success: false, error: `Invalid file type: ${file.type}. Only PDF files are allowed.` },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    // Read file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate PDF magic bytes strictly
    if (!validatePdfBuffer(buffer)) {
      console.warn(`[Upload API] Rejected file due to invalid PDF magic bytes`);
      return NextResponse.json(
        { success: false, error: "Invalid PDF file structure. Please ensure the file is a genuine PDF." },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `vtu_${timestamp}_${safeName}`;

    const result = await uploadToCloudinary(buffer, filename);
    console.log(`[Upload API] Successfully uploaded to Cloudinary: ${result.url}`);

    return NextResponse.json({
      success: true,
      data: {
        pdfUrl: result.url,
        cloudinaryId: result.publicId,
        fileName: file.name,
        fileSize: file.size,
      },
    });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
