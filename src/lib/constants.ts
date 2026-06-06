// ============================================================
// VTU Question Bank - Constants
// ============================================================

import type { Branch, ExamType, Month, Semester } from "@/types";

export const BRANCHES: { value: Branch; label: string; fullName: string }[] = [
  { value: "CSE", label: "CSE", fullName: "Computer Science & Engineering" },
  { value: "ISE", label: "ISE", fullName: "Information Science & Engineering" },
  { value: "AIML", label: "AIML", fullName: "Artificial Intelligence & Machine Learning" },
  { value: "AIDS", label: "AIDS", fullName: "Artificial Intelligence & Data Science" },
  { value: "ECE", label: "ECE", fullName: "Electronics & Communication Engineering" },
  { value: "EEE", label: "EEE", fullName: "Electrical & Electronics Engineering" },
  { value: "MECH", label: "MECH", fullName: "Mechanical Engineering" },
  { value: "CIVIL", label: "CIVIL", fullName: "Civil Engineering" },
  { value: "CHEMICAL", label: "CHEMICAL", fullName: "Chemical Engineering" },
  { value: "BIOTECH", label: "BIOTECH", fullName: "Biotechnology" },
];

export const SEMESTERS: { value: Semester; label: string }[] = [
  { value: 1, label: "1st Semester" },
  { value: 2, label: "2nd Semester" },
  { value: 3, label: "3rd Semester" },
  { value: 4, label: "4th Semester" },
  { value: 5, label: "5th Semester" },
  { value: 6, label: "6th Semester" },
  { value: 7, label: "7th Semester" },
  { value: 8, label: "8th Semester" },
];

export const EXAM_TYPES: { value: ExamType; label: string; description: string }[] = [
  { value: "SEE", label: "SEE", description: "Semester End Examination" },
  { value: "CIE", label: "CIE", description: "Continuous Internal Evaluation" },
  { value: "Model Paper", label: "Model Paper", description: "Model Question Paper" },
  { value: "Supplementary", label: "Supplementary", description: "Supplementary Examination" },
];

export const MONTHS: { value: Month; label: string }[] = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

export const YEARS = Array.from({ length: 15 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year, label: year.toString() };
});

// VTU Subject Code patterns for AI categorization
export const VTU_SUBJECT_PATTERNS: Record<string, { name: string; branch: Branch[]; semester: number }> = {
  "21CS": { name: "Computer Science", branch: ["CSE", "ISE"], semester: 3 },
  "18CS": { name: "Computer Science", branch: ["CSE", "ISE"], semester: 3 },
  "21EC": { name: "Electronics & Communication", branch: ["ECE"], semester: 3 },
  "21EE": { name: "Electrical Engineering", branch: ["EEE"], semester: 3 },
  "21ME": { name: "Mechanical Engineering", branch: ["MECH"], semester: 3 },
  "21CV": { name: "Civil Engineering", branch: ["CIVIL"], semester: 3 },
  "21CH": { name: "Chemical Engineering", branch: ["CHEMICAL"], semester: 3 },
  "21BT": { name: "Biotechnology", branch: ["BIOTECH"], semester: 3 },
  "21AI": { name: "AI & ML", branch: ["AIML", "AIDS"], semester: 3 },
  "21MAT": { name: "Mathematics", branch: ["CSE", "ISE", "ECE", "EEE", "MECH", "CIVIL"], semester: 1 },
  "21PHY": { name: "Physics", branch: ["CSE", "ISE", "ECE", "EEE", "MECH", "CIVIL"], semester: 1 },
  "21CHE": { name: "Chemistry", branch: ["CSE", "ISE", "ECE", "EEE", "MECH", "CIVIL"], semester: 1 },
  "21CIV": { name: "Civil Engineering", branch: ["CIVIL"], semester: 3 },
};

// Known VTU subjects for auto-suggestion
export const KNOWN_SUBJECTS = [
  { code: "21CS32", name: "Data Structures and Applications", branch: "CSE", semester: 3 },
  { code: "21CS33", name: "Analog and Digital Electronics", branch: "CSE", semester: 3 },
  { code: "21CS34", name: "Computer Organization and Architecture", branch: "CSE", semester: 3 },
  { code: "21CS35", name: "Software Engineering", branch: "CSE", semester: 3 },
  { code: "21CS36", name: "Discrete Mathematical Structures", branch: "CSE", semester: 3 },
  { code: "21CS42", name: "Design and Analysis of Algorithms", branch: "CSE", semester: 4 },
  { code: "21CS43", name: "Operating Systems", branch: "CSE", semester: 4 },
  { code: "21CS44", name: "Microcontroller and Embedded Systems", branch: "CSE", semester: 4 },
  { code: "21CS45", name: "Object Oriented Concepts", branch: "CSE", semester: 4 },
  { code: "21CS46", name: "Database Management System", branch: "CSE", semester: 4 },
  { code: "21CS51", name: "Computer Networks", branch: "CSE", semester: 5 },
  { code: "21CS52", name: "Automata Theory and Computability", branch: "CSE", semester: 5 },
  { code: "21CS53", name: "Database Management System", branch: "CSE", semester: 5 },
  { code: "21CS54", name: "Artificial Intelligence and Machine Learning", branch: "CSE", semester: 5 },
  { code: "21CS61", name: "System Software and Compilers", branch: "CSE", semester: 6 },
  { code: "21CS62", name: "Computer Graphics and Visualization", branch: "CSE", semester: 6 },
  { code: "21CS63", name: "Web Technology and its Applications", branch: "CSE", semester: 6 },
  { code: "21CS71", name: "Machine Learning", branch: "CSE", semester: 7 },
  { code: "21CS72", name: "Big Data Analytics", branch: "CSE", semester: 7 },
  { code: "21EC32", name: "Network Analysis", branch: "ECE", semester: 3 },
  { code: "21EC33", name: "Electronic Devices", branch: "ECE", semester: 3 },
  { code: "21EC42", name: "Signals and Systems", branch: "ECE", semester: 4 },
  { code: "21EC43", name: "Analog Electronic Circuits", branch: "ECE", semester: 4 },
  { code: "21ME32", name: "Mechanics of Materials", branch: "MECH", semester: 3 },
  { code: "21ME33", name: "Manufacturing Process - I", branch: "MECH", semester: 3 },
  { code: "21MAT11", name: "Calculus and Differential Equations", branch: "CSE", semester: 1 },
  { code: "21MAT21", name: "Advanced Calculus and Numerical Methods", branch: "CSE", semester: 2 },
  { code: "21MAT31", name: "Transform Calculus, Fourier Series and Numerical Techniques", branch: "CSE", semester: 3 },
  { code: "21MAT41", name: "Complex Analysis, Probability and Statistical Methods", branch: "CSE", semester: 4 },
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPES = ["application/pdf"];
export const ITEMS_PER_PAGE = 12;

export const APP_NAME = "VTU Question Bank";
export const APP_TAGLINE = "One Place for Every VTU Question Paper";
export const APP_DESCRIPTION = "Access and Share VTU Previous Year Question Papers Easily. Browse, search, and download question papers from all branches and semesters.";
