
export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export enum DriveSource {
  Uploaded = 'Uploaded',
  Downloaded = 'Downloaded'
}

// Authentication & Verification Types
export type UserRole = 'student' | 'teacher' | 'online_educator';
export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'unverified';
export type VerificationLevel = 'basic' | 'medium' | 'strong';

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface VerificationData {
  institutionName?: string;
  department?: string;
  year?: string;
  studentId?: string;
  proofDocuments?: UploadedDocument[];
  credibilityLinks?: string[];
  submittedAt?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  verificationStatus: VerificationStatus;
  verificationLevel: VerificationLevel;
  verificationData?: VerificationData;
  joinedDate: string;
  reputation: number;
  badges: string[];
  // Legacy support
  legacyRole?: 'Student' | 'Educator' | 'Contributor';
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'verified' | 'pending';
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  status: 'verified' | 'pending';
  difficulty: Difficulty;
  votes: number;
  lastUpdated: string;
  content: string;
  readiness: number;
}

export interface Subtopic {
  id: string;
  topicId: string;
  title: string;
  description: string;
  status: 'verified' | 'pending';
}

export interface DriveItem {
  id: string;
  name: string;
  subjectId: string;
  topicId: string;
  subtopicId: string;
  subjectName: string;
  topicName: string;
  subtopicName: string;
  title: string;
  source: DriveSource;
  timestamp: string;
  mimeType: string;
  size?: string;
}

export interface ContentItem {
  id: string;
  subtopicId: string;
  topicId: string;
  subjectId: string;
  title: string;
  body: string;
  author: string;
  votes: number;
  readiness: number;
  lastUpdated: string;
  difficulty: Difficulty;
}

export interface UserStats {
  notesUploaded: number;
  contributions: number;
  studentsHelped: number;
  currentStreak: number;
}
