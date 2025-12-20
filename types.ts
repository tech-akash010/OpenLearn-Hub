
export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export interface Contributor {
  id: string;
  name: string;
  reputation: number;
  badge?: 'Educator' | 'Reviewer' | 'Elite';
  streak: number;
}

export interface Version {
  id: string;
  author: string;
  timestamp: string;
  summary: string;
  content: string;
}

export interface Topic {
  id: string;
  title: string;
  subjectId: string;
  content: string;
  difficulty: Difficulty;
  lastUpdated: string;
  readiness: number; // 0-100
  contributors: string[];
  votes: number;
  versions: Version[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  topics: string[];
}

export interface DriveNote {
  id: string;
  name: string;
  mimeType: string;
  thumbnail?: string;
  linkedTopicId?: string;
  aiClassification?: string;
  lastModified: string;
  content?: string;
}

export interface UserStats {
  notesUploaded: number;
  contributions: number;
  studentsHelped: number;
  currentStreak: number;
}
