import React, { useState } from 'react';
import { ProtectedNoteViewer } from '../components/ProtectedNoteViewer';
import { authService } from '../services/authService';
import { useParams, useSearchParams } from 'react-router-dom';
import { Lock, AlertTriangle, CheckCircle } from 'lucide-react';

export const CourseNoteAccessPage: React.FC = () => {
    const { courseNoteId } = useParams<{ courseNoteId: string }>();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const user = authService.getUser();

    // Mock validation (in real app, this would validate JWT)
    const [isValidating, setIsValidating] = useState(false);
    const [accessGranted, setAccessGranted] = useState(true); // Mock: always grant access for demo

    // Mock course note data
    const mockCourseNote = {
        id: courseNoteId || '1',
        title: 'Python Introduction - Variables and Data Types',
        platform: 'Coursera',
        instructor: 'Code with Harry',
        courseName: 'Python Zero to Hero',
        chapter: 'Chapter 1: Python Basics',
        content: 'Course content here...'
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-2xl">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock size={40} className="text-red-600" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-4">Login Required</h1>
                    <p className="text-gray-600 font-medium mb-8">
                        You must be logged in to access course content.
                    </p>
                    <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-colors">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (!accessGranted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-2xl">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={40} className="text-amber-600" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-4">Access Denied</h1>
                    <p className="text-gray-600 font-medium mb-8">
                        You don't have permission to access this course content. Please contact your instructor for access.
                    </p>
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                        <p className="text-sm font-bold text-gray-700 mb-2">Course Details:</p>
                        <p className="text-xs text-gray-600">Platform: {mockCourseNote.platform}</p>
                        <p className="text-xs text-gray-600">Instructor: {mockCourseNote.instructor}</p>
                        <p className="text-xs text-gray-600">Course: {mockCourseNote.courseName}</p>
                    </div>
                    <button className="w-full py-4 bg-gray-200 text-gray-700 rounded-2xl font-black hover:bg-gray-300 transition-colors">
                        Request Access
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <ProtectedNoteViewer
                courseNote={mockCourseNote}
                user={{
                    name: user.name,
                    email: user.email
                }}
            />
        </div>
    );
};
