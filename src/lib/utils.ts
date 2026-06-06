import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(
  title: string,
  branch?: string,
  semester?: number | string
): string {
  const baseParts = [title];
  if (branch) baseParts.push(branch);
  if (semester) baseParts.push(`sem-${semester}`);
  
  const base = baseParts.join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const random = Math.random().toString(36).substring(2, 6);
  return `${base}-${random}`;
}

export function generateTitle(
  subjectName: string,
  branch: string,
  semester: number
): string {
  return `${subjectName} - ${branch} ${semester}th Sem`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function getSemesterLabel(semester: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = semester % 100;
  return `${semester}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]} Sem`;
}

export function getBranchColor(branch: string): string {
  const colors: Record<string, string> = {
    CSE: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    ISE: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    AIML: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    AIDS: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    ECE: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    EEE: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    MECH: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    CIVIL: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    CHEMICAL: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    BIOTECH: "bg-green-500/10 text-green-500 border-green-500/20",
  };
  return colors[branch] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
}



// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Generate a file hash for duplicate detection
export async function generateFileHash(buffer: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
