
export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export enum DriveSource {
  Uploaded = 'Uploaded',
  Downloaded = 'Downloaded'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'Student' | 'Educator' | 'Contributor';
  joinedDate: string;
  reputation: number;
  badges: string[];
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
