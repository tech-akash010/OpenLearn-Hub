
import React from 'react';
import { BookOpen, Cpu, Database, Globe, Layers, Terminal } from 'lucide-react';
import { Subject, Topic, Difficulty } from './types';

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'cs', name: 'Computer Science', icon: 'Cpu', topics: ['os', 'dsa', 'dbms'] },
  { id: 'math', name: 'Mathematics', icon: 'Layers', topics: ['calc', 'la'] },
  { id: 'bio', name: 'Biology', icon: 'Globe', topics: ['cell', 'gen'] },
];

export const INITIAL_TOPICS: Topic[] = [
  {
    id: 'os',
    subjectId: 'cs',
    title: 'Operating Systems - Process Scheduling',
    content: `## What is Process Scheduling?\nProcess scheduling is the activity of the process manager that handles the removal of the running process from the CPU and the selection of another process on the basis of a particular strategy.\n\n### Types of Schedulers\n1. **Long Term Scheduler**: Job Scheduler\n2. **Short Term Scheduler**: CPU Scheduler\n3. **Medium Term Scheduler**: Process swapping scheduler\n\n### Algorithms\n- FCFS (First Come First Served)\n- SJF (Shortest Job First)\n- Round Robin\n- Priority Scheduling`,
    difficulty: Difficulty.Intermediate,
    lastUpdated: '2024-05-20',
    readiness: 85,
    contributors: ['user_1', 'user_admin'],
    votes: 124,
    versions: []
  },
  {
    id: 'dsa',
    subjectId: 'cs',
    title: 'Data Structures - Graphs',
    content: `## Graph Theory Foundations\nA Graph is a non-linear data structure consisting of nodes and edges.\n\n### Representations\n- Adjacency Matrix\n- Adjacency List`,
    difficulty: Difficulty.Advanced,
    lastUpdated: '2024-05-18',
    readiness: 45,
    contributors: ['user_2'],
    votes: 89,
    versions: []
  }
];
