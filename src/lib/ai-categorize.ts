// ============================================================
// AI Categorization - Heuristic-based PDF text analysis
// ============================================================

import { KNOWN_SUBJECTS, VTU_SUBJECT_PATTERNS } from "./constants";
import type { AICategorization, Branch } from "@/types";

// Common VTU keywords for pattern matching
const BRANCH_KEYWORDS: Record<string, Branch> = {
  "computer science": "CSE",
  "information science": "ISE",
  "artificial intelligence": "AIML",
  "machine learning": "AIML",
  "data science": "AIDS",
  "electronics and communication": "ECE",
  "electronics & communication": "ECE",
  "electrical and electronics": "EEE",
  "electrical & electronics": "EEE",
  mechanical: "MECH",
  civil: "CIVIL",
  chemical: "CHEMICAL",
  biotechnology: "BIOTECH",
};

const SEMESTER_PATTERNS = [
  /(\d)(?:st|nd|rd|th)\s*sem(?:ester)?/i,
  /sem(?:ester)?\s*[-:]?\s*(\d)/i,
  /semester\s*(\d)/i,
];

const YEAR_PATTERNS = [
  /\b(20\d{2})\b/g,
  /(?:year|yr)\s*[-:]?\s*(20\d{2})/i,
];

const SUBJECT_CODE_PATTERN = /\b(\d{2}[A-Z]{2,4}\d{2,3})\b/g;

export function categorizeFromText(text: string): AICategorization {
  const result: AICategorization = {
    tags: [],
    confidence: 0,
  };

  if (!text || text.trim().length === 0) {
    return result;
  }

  const normalizedText = text.toLowerCase();
  let confidenceScore = 0;

  // --- Extract Subject Code ---
  const codeMatches = text.match(SUBJECT_CODE_PATTERN);
  if (codeMatches && codeMatches.length > 0) {
    const code = codeMatches[0].toUpperCase();
    result.subjectCode = code;
    result.tags.push(code);
    confidenceScore += 25;

    // Look up known subjects
    const knownSubject = KNOWN_SUBJECTS.find(
      (s) => s.code.toUpperCase() === code
    );
    if (knownSubject) {
      result.subjectName = knownSubject.name;
      result.branch = knownSubject.branch as Branch;
      result.semester = knownSubject.semester;
      confidenceScore += 50;
    } else {
      // Try partial match with VTU patterns
      for (const [prefix, info] of Object.entries(VTU_SUBJECT_PATTERNS)) {
        if (code.startsWith(prefix)) {
          if (!result.branch && info.branch.length > 0) {
            result.branch = info.branch[0];
          }
          confidenceScore += 15;
          break;
        }
      }
    }
  }

  // --- Extract Branch ---
  if (!result.branch) {
    for (const [keyword, branch] of Object.entries(BRANCH_KEYWORDS)) {
      if (normalizedText.includes(keyword)) {
        result.branch = branch;
        confidenceScore += 15;
        break;
      }
    }
  }

  // --- Extract Semester ---
  if (!result.semester) {
    for (const pattern of SEMESTER_PATTERNS) {
      const match = normalizedText.match(pattern);
      if (match) {
        const sem = parseInt(match[1]);
        if (sem >= 1 && sem <= 8) {
          result.semester = sem;
          confidenceScore += 10;
          break;
        }
      }
    }
  }

  // --- Extract Year ---
  const yearMatches: number[] = [];
  for (const pattern of YEAR_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(text)) !== null) {
      const year = parseInt(match[1]);
      if (year >= 2010 && year <= new Date().getFullYear() + 1) {
        yearMatches.push(year);
      }
    }
  }
  if (yearMatches.length > 0) {
    result.year = Math.max(...yearMatches);
    confidenceScore += 10;
  }

  // --- Generate Tags ---
  const tagKeywords = [
    "vtu",
    "question paper",
    "exam",
    "see",
    "cie",
    "model paper",
    "supplementary",
    "cbcs",
    "scheme",
  ];
  for (const keyword of tagKeywords) {
    if (normalizedText.includes(keyword)) {
      result.tags.push(keyword.toUpperCase());
    }
  }

  if (result.branch) result.tags.push(result.branch);
  if (result.semester) result.tags.push(`SEM-${result.semester}`);
  if (result.year) result.tags.push(result.year.toString());
  if (result.subjectName) result.tags.push(result.subjectName);

  // Deduplicate tags
  result.tags = [...new Set(result.tags)];
  result.confidence = Math.min(confidenceScore, 100);

  return result;
}

// Parse natural language search queries
export function parseSearchQuery(query: string): {
  subjectName?: string;
  branch?: string;
  semester?: number;
  terms: string[];
} {
  const result: {
    subjectName?: string;
    branch?: string;
    semester?: number;
    terms: string[];
  } = { terms: [] };

  const normalizedQuery = query.toLowerCase().trim();

  // Extract semester
  for (const pattern of SEMESTER_PATTERNS) {
    const match = normalizedQuery.match(pattern);
    if (match) {
      result.semester = parseInt(match[1]);
      break;
    }
  }

  // Extract year and ignore it (or use it as term later)
  const yearMatch = normalizedQuery.match(/\b(20\d{2})\b/);
  // Extracted year is not stored as DB field anymore, just removed from remaining text if needed

  // Extract branch
  for (const [keyword, branch] of Object.entries(BRANCH_KEYWORDS)) {
    if (normalizedQuery.includes(keyword)) {
      result.branch = branch;
      break;
    }
  }

  // Check for branch abbreviations
  const branchAbbreviations = [
    "CSE", "ISE", "AIML", "AIDS", "ECE", "EEE", "MECH", "CIVIL", "CHEMICAL", "BIOTECH",
  ];
  for (const abbr of branchAbbreviations) {
    if (normalizedQuery.includes(abbr.toLowerCase())) {
      result.branch = abbr;
      break;
    }
  }

  // Extract subject code
  const codeMatch = normalizedQuery.match(/\b(\d{2}[a-z]{2,4}\d{2,3})\b/i);
  if (codeMatch) {
    const code = codeMatch[1].toUpperCase();

    // Look up subject name
    const known = KNOWN_SUBJECTS.find(
      (s) => s.code.toUpperCase() === code
    );
    if (known) {
      result.subjectName = known.name;
    }
  }

  // Remaining terms for text search
  let remaining = normalizedQuery
    .replace(/\d{2}[a-z]{2,4}\d{2,3}/gi, "")
    .replace(/20\d{2}/g, "")
    .replace(/\d+(?:st|nd|rd|th)\s*sem(?:ester)?/gi, "")
    .replace(/sem(?:ester)?\s*\d/gi, "");

  for (const abbr of branchAbbreviations) {
    remaining = remaining.replace(new RegExp(`\\b${abbr}\\b`, "gi"), "");
  }
  for (const keyword of Object.keys(BRANCH_KEYWORDS)) {
    remaining = remaining.replace(new RegExp(keyword, "gi"), "");
  }

  // Common words to remove
  remaining = remaining.replace(
    /\b(paper|question|papers|questions|exam|previous|year|download)\b/gi,
    ""
  );

  const terms = remaining
    .split(/\s+/)
    .filter((t) => t.length > 1)
    .map((t) => t.trim());

  if (terms.length > 0) {
    result.terms = terms;

    // Check if remaining terms match a known subject
    const joinedTerms = terms.join(" ");
    const matchedSubject = KNOWN_SUBJECTS.find((s) =>
      s.name.toLowerCase().includes(joinedTerms)
    );
    if (matchedSubject) {
      result.subjectName = matchedSubject.name;
    }
  }

  return result;
}
