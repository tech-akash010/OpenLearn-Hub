
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
export type UserRole = 'student' | 'teacher' | 'online_educator' | 'community_contributor';
export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'unverified';
export type VerificationLevel = 'basic' | 'medium' | 'strong';
export type TrustLevel = 'bronze' | 'silver' | 'gold';

// Community Contributor Metrics
export interface CommunityMetrics {
  notesUploaded: number;
  upvotes: number;
  downvotes: number;
  helpfulMarks: number;
  reportCount: number;
  trustScore: number;
  trustLevel: TrustLevel;
  canUploadNotes: boolean;
}

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
  communityMetrics?: CommunityMetrics;
  joinedDate: string;
  reputation: number;
  badges: string[];
  // Legacy support
  legacyRole?: 'Student' | 'Educator' | 'Contributor';
}

// Quiz Publishing Types
export type QuizVerificationMethod = 'none' | 'chatbot' | 'manual';
export type QuizAuthorType = 'educator' | 'student_verified' | 'community_trusted';
export type QuizStatus = 'draft' | 'pending_verification' | 'published' | 'rejected';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizMetadata {
  role: UserRole;
  trustLevel?: TrustLevel | VerificationLevel;
  quizVerification: QuizVerificationMethod;
  authorType: QuizAuthorType;
  published: boolean;
  verifiedAt?: string;
  verificationFeedback?: string;
  conceptualScore?: number;
  clarityScore?: number;
  plagiarismScore?: number;
  alignmentScore?: number;
  overallScore?: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  difficulty: Difficulty;
  questions: QuizQuestion[];
  createdBy: string;
  createdAt: string;
  metadata: QuizMetadata;
  status: QuizStatus;
}

export interface ChatbotVerificationResult {
  passed: boolean;
  score: number;
  feedback: {
    conceptualCorrectness: { passed: boolean; score: number; message: string };
    questionClarity: { passed: boolean; score: number; message: string };
    plagiarismCheck: { passed: boolean; score: number; message: string };
    subjectAlignment: { passed: boolean; score: number; message: string };
  };
  suggestions: string[];
}

export interface PublishingInfo {
  canPublish: boolean;
  requiresVerification: boolean;
  reason: string;
  authorType: QuizAuthorType;
}


// Content Source Validation Types
export type SourceTagType = 'youtube' | 'university' | 'online_course' | 'self_written' | 'book_other';
export type ContentTrustLevel = 'basic' | 'trusted' | 'verified';

export interface YouTubeSource {
  url: string;
  channelName?: string;
  videoTitle?: string;
  validated: boolean;
}

export interface UniversitySource {
  name: string;
  courseContext?: string;
  department?: string;
}

export interface OnlineCourseSource {
  platform: string; // 'NPTEL' | 'Coursera' | 'MIT OCW' | 'edX' | 'Khan Academy' | 'Other'
  courseName?: string;
  instructorName?: string;
  url?: string;
}

export interface SelfWrittenSource {
  authorName: string;
  description: string;
  expertise?: string;
  requiresAdminVerification: true;
}

export interface BookOtherSource {
  sourceType: 'book' | 'research_paper' | 'article' | 'other';
  title: string;
  author?: string;
  publisher?: string;
  isbn?: string;
  url?: string;
  description: string;
  requiresAdminVerification: true;
}

export interface ContentSourceMetadata {
  sourceTags: SourceTagType[];
  youtubeSource?: YouTubeSource;
  universitySource?: UniversitySource;
  onlineCourseSource?: OnlineCourseSource;
  selfWrittenSource?: SelfWrittenSource;
  bookOtherSource?: BookOtherSource;
  trustLevel: ContentTrustLevel;
  multipleSourceBonus: boolean;
  requiresAdminVerification: boolean;
}

// Multi-Path Content Organization Types
export type OrganizationPath = 'subject' | 'university' | 'channel';

export interface SubjectPath {
  subject: string;
  coreTopic: string;
  subtopic: string;
  resourceTitle: string;
}

export interface UniversityPath {
  university: string;
  semester: string;
  department: string;
  subject: string;
  topic: string;
}

export interface ChannelPath {
  channelName: string;
  playlistName: string;
  topic: string;
  resourceTitle: string;
}

export interface ContentOrganization {
  subjectPath?: SubjectPath;
  universityPath?: UniversityPath;
  channelPath?: ChannelPath;
  primaryPath: OrganizationPath;
}

export interface ContentUpload {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  subtopic?: string;
  files: UploadedDocument[];
  sourceMetadata: ContentSourceMetadata;
  organization?: ContentOrganization;
  uploadedBy: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
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

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  parts: { text: string }[];
}

export interface ChatContext {
  subject?: string;
  topic?: string;
  subtopic?: string;
}
