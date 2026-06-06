// ============================================================
// VTU Question Bank - TypeScript Types
// ============================================================

// ---------- Enums / Constants ----------

export type Branch =
  | "CSE"
  | "ISE"
  | "AIML"
  | "AIDS"
  | "ECE"
  | "EEE"
  | "MECH"
  | "CIVIL"
  | "CHEMICAL"
  | "BIOTECH";

export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ExamType = "SEE" | "CIE" | "Model Paper" | "Supplementary";

export type PaperStatus = "pending" | "approved" | "rejected";

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

// ---------- Database Models ----------

export interface QuestionPaper {
  id: string;
  title: string;
  slug: string;
  subjectName: string;
  subjectCode: string;
  branch: Branch;
  semester: number;
  year: number;
  month: string;
  examType: ExamType;
  pdfUrl: string;
  cloudinaryId: string | null;
  downloads: number;
  views: number;
  tags: string[];
  status: PaperStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Report {
  id: string;
  paperId: string;
  reason: string;
  createdAt: string | Date;
  paper?: QuestionPaper;
}

export interface Analytics {
  id: string;
  totalUploads: number;
  totalDownloads: number;
  totalViews: number;
  updatedAt: string | Date;
}

// ---------- API Request/Response ----------

export interface PaperFilters {
  branch?: string;
  semester?: string;
  year?: string;
  month?: string;
  examType?: string;
  subject?: string;
  search?: string;
  status?: PaperStatus;
  sort?: "newest" | "oldest" | "most_downloaded" | "most_viewed";
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface UploadFormData {
  subjectName: string;
  subjectCode: string;
  branch: Branch;
  semester: number;
  year: number;
  month: Month;
  examType: ExamType;
  file: File;
}

export interface SearchSuggestion {
  type: "subject" | "code" | "branch" | "tag";
  value: string;
  label: string;
}

export interface AnalyticsDashboard {
  global: Analytics;
  branchStats: { branch: string; count: number; downloads: number }[];
  semesterStats: { semester: number; count: number; downloads: number }[];
  topDownloaded: QuestionPaper[];
  topViewed: QuestionPaper[];
  recentUploads: QuestionPaper[];
}

export interface AdminAction {
  action: "approve" | "reject" | "delete";
  paperIds: string[];
}

// ---------- AI Categorization ----------

export interface AICategorization {
  subjectName?: string;
  subjectCode?: string;
  branch?: Branch;
  semester?: number;
  year?: number;
  tags: string[];
  confidence: number;
}
