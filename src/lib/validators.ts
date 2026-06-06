import { z } from "zod";

// Upload form validation
export const uploadFormSchema = z.object({
  title: z
    .string()
    .min(2, "Paper name must be at least 2 characters")
    .max(200, "Paper name must be less than 200 characters")
    .trim(),
  subjectName: z
    .string()
    .min(2, "Subject name must be at least 2 characters")
    .max(100, "Subject name must be less than 100 characters")
    .trim(),
  branch: z.enum([
    "CSE",
    "ISE",
    "AIML",
    "AIDS",
    "ECE",
    "EEE",
    "MECH",
    "CIVIL",
    "CHEMICAL",
    "BIOTECH",
  ]),
  semester: z.coerce.number().int().min(1).max(8),
});

export type UploadFormValues = z.infer<typeof uploadFormSchema>;

// Search params validation
export const searchParamsSchema = z.object({
  search: z.string().optional(),
  branch: z.string().optional(),
  semester: z.string().optional(),
  subject: z.string().optional(),
  sort: z
    .enum(["newest", "oldest", "most_downloaded", "most_viewed"])
    .optional()
    .default("newest"),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(50).optional().default(12),
});

// Admin action validation
export const adminActionSchema = z.object({
  action: z.enum(["approve", "reject", "delete"]),
  paperIds: z.array(z.string().cuid()).min(1),
});

// Report validation
export const reportSchema = z.object({
  paperId: z.string().cuid(),
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason must be less than 500 characters")
    .trim(),
});

// Paper update validation
export const paperUpdateSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  subjectName: z.string().min(2).max(100).optional(),
  branch: z
    .enum([
      "CSE",
      "ISE",
      "AIML",
      "AIDS",
      "ECE",
      "EEE",
      "MECH",
      "CIVIL",
      "CHEMICAL",
      "BIOTECH",
    ])
    .optional(),
  semester: z.coerce.number().int().min(1).max(8).optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
});

// Validate PDF file
export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "No file provided" };
  }

  if (file.type !== "application/pdf") {
    return { valid: false, error: "Only PDF files are allowed" };
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 10MB" };
  }

  return { valid: true };
}

// Validate PDF buffer (server-side magic bytes check)
export function validatePdfBuffer(buffer: Buffer): boolean {
  // Check PDF magic bytes: %PDF
  const header = buffer.subarray(0, 5).toString("ascii");
  return header.startsWith("%PDF-");
}
