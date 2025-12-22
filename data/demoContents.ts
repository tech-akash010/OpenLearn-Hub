import { ContentOrganization } from '../types';

export interface DemoContent {
    id: string;
    title: string;
    description: string;
    organization: ContentOrganization;
    uploadedBy: string;
    uploadedAt: string;
    views: number;
    likes: number;
}

export const DEMO_CONTENTS: DemoContent[] = [
    {
        id: 'content_1',
        title: 'Array Implementation in C',
        description: 'Complete guide to implementing arrays in C programming with examples',
        organization: {
            primaryPath: 'subject',
            subjectPath: {
                subject: 'Computer Science',
                coreTopic: 'Data Structures',
                subtopic: 'Arrays',
                resourceTitle: 'Array Implementation in C'
            },
            universityPath: {
                university: 'IIT Bombay',
                semester: '3',
                department: 'Computer Science & Engineering (CSE)',
                subject: 'Data Structures and Algorithms',
                topic: 'Arrays and Linked Lists'
            },
            channelPath: {
                channelName: 'CodeWithHarry',
                playlistName: 'DSA Full Course',
                topic: 'Arrays',
                resourceTitle: 'Array Implementation Notes'
            },
            coursePath: {
                provider: 'YouTube',
                instructor: 'CodeWithHarry',
                courseName: 'DSA Full Course',
                topic: 'Arrays',
                resourceTitle: 'Array Implementation Notes'
            }
        },
        uploadedBy: 'Rahul Kumar',
        uploadedAt: '2024-01-15T10:30:00Z',
        views: 1250,
        likes: 89
    },
    {
        id: 'content_2',
        title: 'Binary Search Trees Explained',
        description: 'Comprehensive notes on BST operations, traversals, and applications',
        organization: {
            primaryPath: 'university',
            subjectPath: {
                subject: 'Computer Science',
                coreTopic: 'Data Structures',
                subtopic: 'Trees',
                resourceTitle: 'Binary Search Trees Explained'
            },
            universityPath: {
                university: 'IIT Delhi',
                semester: '4',
                department: 'Computer Science & Engineering (CSE)',
                subject: 'Advanced Data Structures',
                topic: 'Binary Search Trees'
            },
            channelPath: {
                channelName: 'Abdul Bari',
                playlistName: 'Algorithms',
                topic: 'Trees',
                resourceTitle: 'BST Lecture Notes'
            },
            coursePath: {
                provider: 'Udemy',
                instructor: 'Abdul Bari',
                courseName: 'Mastering Data Structures & Algorithms',
                topic: 'Trees and BST',
                resourceTitle: 'BST Lecture Notes'
            }
        },
        uploadedBy: 'Priya Sharma',
        uploadedAt: '2024-01-18T14:20:00Z',
        views: 2100,
        likes: 156
    },
    {
        id: 'content_3',
        title: 'Python Loops Tutorial',
        description: 'For, while, and nested loops in Python with practical examples',
        organization: {
            primaryPath: 'channel',
            subjectPath: {
                subject: 'Computer Science',
                coreTopic: 'Programming',
                subtopic: 'Python Basics',
                resourceTitle: 'Python Loops Tutorial'
            },
            channelPath: {
                channelName: 'Apna College',
                playlistName: 'Python Tutorial Series',
                topic: 'Loops and Iterations',
                resourceTitle: 'Complete Loops Guide'
            },
            coursePath: {
                provider: 'Coursera',
                instructor: 'Google',
                courseName: 'Crash Course on Python',
                topic: 'Loops and Iterations',
                resourceTitle: 'Complete Loops Guide'
            }
        },
        uploadedBy: 'Amit Patel',
        uploadedAt: '2024-01-20T09:15:00Z',
        views: 3400,
        likes: 245
    },
    {
        id: 'content_4',
        title: 'Operating Systems - Process Scheduling',
        description: 'FCFS, SJF, Round Robin, and Priority scheduling algorithms',
        organization: {
            primaryPath: 'subject',
            subjectPath: {
                subject: 'Computer Science',
                coreTopic: 'Operating Systems',
                subtopic: 'Process Management',
                resourceTitle: 'Process Scheduling Algorithms'
            },
            universityPath: {
                university: 'IIT Madras',
                semester: '5',
                department: 'Computer Science & Engineering (CSE)',
                subject: 'Operating Systems',
                topic: 'CPU Scheduling'
            },
            channelPath: {
                channelName: 'Gate Smashers',
                playlistName: 'Operating Systems',
                topic: 'Process Scheduling',
                resourceTitle: 'Scheduling Algorithms Notes'
            },
            coursePath: {
                provider: 'YouTube',
                instructor: 'Gate Smashers',
                courseName: 'Operating Systems Complete Course',
                topic: 'Process Scheduling',
                resourceTitle: 'Scheduling Algorithms Notes'
            }
        },
        uploadedBy: 'Sneha Reddy',
        uploadedAt: '2024-01-22T11:45:00Z',
        views: 1890,
        likes: 134
    },
    {
        id: 'content_5',
        title: 'Database Normalization Forms',
        description: '1NF, 2NF, 3NF, and BCNF with examples and practice problems',
        organization: {
            primaryPath: 'university',
            subjectPath: {
                subject: 'Computer Science',
                coreTopic: 'Database Management',
                subtopic: 'Normalization',
                resourceTitle: 'Database Normalization Forms'
            },
            universityPath: {
                university: 'BITS Pilani',
                semester: '4',
                department: 'Computer Science & Engineering (CSE)',
                subject: 'Database Management Systems',
                topic: 'Normalization'
            },
            channelPath: {
                channelName: 'Jenny\'s Lectures',
                playlistName: 'DBMS Complete Course',
                topic: 'Normalization',
                resourceTitle: 'Normalization Forms Explained'
            },
            coursePath: {
                provider: 'Udemy',
                instructor: 'Tim Buchalka',
                courseName: 'The Complete SQL Bootcamp',
                topic: 'Database Normalization',
                resourceTitle: 'Normalization Forms Explained'
            }
        },
        uploadedBy: 'Vikram Singh',
        uploadedAt: '2024-01-25T16:00:00Z',
        views: 2750,
        likes: 198
    },
    {
        id: 'content_6',
        title: 'Machine Learning Basics',
        description: 'Introduction to ML concepts, supervised and unsupervised learning',
        organization: {
            primaryPath: 'channel',
            subjectPath: {
                subject: 'Computer Science',
                coreTopic: 'Artificial Intelligence',
                subtopic: 'Machine Learning',
                resourceTitle: 'Machine Learning Basics'
            },
            universityPath: {
                university: 'Stanford University',
                semester: '6',
                department: 'Computer Science & Engineering (CSE)',
                subject: 'Introduction to Machine Learning',
                topic: 'ML Fundamentals'
            },
            channelPath: {
                channelName: 'Stanford Online',
                playlistName: 'Machine Learning Course',
                topic: 'Introduction to ML',
                resourceTitle: 'ML Basics Lecture Notes'
            },
            coursePath: {
                provider: 'Coursera',
                instructor: 'Andrew Ng',
                courseName: 'Machine Learning Specialization',
                topic: 'Supervised Learning',
                resourceTitle: 'ML Basics Lecture Notes'
            }
        },
        uploadedBy: 'Ananya Gupta',
        uploadedAt: '2024-01-28T13:30:00Z',
        views: 4200,
        likes: 312
    },
    {
        id: 'content_7',
        title: 'React Hooks Complete Guide',
        description: 'useState, useEffect, useContext, and custom hooks explained',
        organization: {
            primaryPath: 'channel',
            subjectPath: {
                subject: 'Computer Science',
                coreTopic: 'Web Development',
                subtopic: 'React',
                resourceTitle: 'React Hooks Complete Guide'
            },
            channelPath: {
                channelName: 'CodeWithHarry',
                playlistName: 'React Tutorial',
                topic: 'React Hooks',
                resourceTitle: 'Hooks Comprehensive Notes'
            },
            coursePath: {
                provider: 'YouTube',
                instructor: 'CodeWithHarry',
                courseName: 'React JS - Complete Course for Beginners',
                topic: 'React Hooks',
                resourceTitle: 'Hooks Comprehensive Notes'
            }
        },
        uploadedBy: 'Rohan Verma',
        uploadedAt: '2024-02-01T10:00:00Z',
        views: 3100,
        likes: 267
    },
    {
        id: 'content_8',
        title: 'Computer Networks - OSI Model',
        description: 'All 7 layers of OSI model with protocols and examples',
        organization: {
            primaryPath: 'subject',
            subjectPath: {
                subject: 'Computer Science',
                coreTopic: 'Computer Networks',
                subtopic: 'Network Models',
                resourceTitle: 'OSI Model Explained'
            },
            universityPath: {
                university: 'IIT Kanpur',
                semester: '5',
                department: 'Computer Science & Engineering (CSE)',
                subject: 'Computer Networks',
                topic: 'OSI and TCP/IP Models'
            },
            channelPath: {
                channelName: 'Neso Academy',
                playlistName: 'Computer Networks',
                topic: 'OSI Model',
                resourceTitle: 'OSI Layers Complete Notes'
            },
            coursePath: {
                provider: 'NPTEL',
                instructor: 'IIT Kharagpur',
                courseName: 'Computer Networks and Internet Protocol',
                topic: 'OSI Reference Model',
                resourceTitle: 'OSI Layers Complete Notes'
            }
        },
        uploadedBy: 'Kavya Iyer',
        uploadedAt: '2024-02-03T15:20:00Z',
        views: 2890,
        likes: 201
    }
];
