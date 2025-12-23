import React, { useState } from 'react';
import { ArrowLeft, Upload, BookOpen, Lock, Globe, ChevronRight } from 'lucide-react';
import { QuizAttachment } from './QuizAttachment';
import { ShareableLink } from './ShareableLink';
import { Quiz } from '../types';
import { authService } from '../services/authService';

interface CourseUploadFormProps {
    onComplete: (data: any) => void;
    onBack: () => void;
}

export const CourseUploadForm: React.FC<CourseUploadFormProps> = ({ onComplete, onBack }) => {
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [generatedNoteId, setGeneratedNoteId] = useState('');
    const [formData, setFormData] = useState({
        platform: '',
        courseName: '',
        verificationLink: '',
        chapter: '',
        title: '',
        file: null as File | null,
        quiz: null as Quiz | null,
        authorizedEmails: [] as string[]
    });

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.relatedTarget && (e.currentTarget.contains(e.relatedTarget as Node) || e.currentTarget === e.relatedTarget)) {
            return;
        }
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setFormData({ ...formData, file });
        }
    };

    const user = authService.getUser();
    const platforms = ['Coursera', 'Udemy', 'YouTube', 'edX', 'Khan Academy', 'Other'];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleQuizAttach = (quiz: Quiz) => {
        setFormData({ ...formData, quiz });
        handleNext();
    };

    const handleNext = () => {
        if (step < 7) setStep(step + 1);
    };

    const handleSkipQuiz = () => {
        setFormData({ ...formData, quiz: null });
        setStep(7); // Skip to final step
    };

    const handleSubmit = async () => {
        setIsGenerating(true);
        // Simulate network delay for "generation" effect
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate a unique note ID (in production, this would come from backend)
        const noteId = `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setGeneratedNoteId(noteId);

        setIsGenerating(false);
        setUploadComplete(true);
        onComplete({ ...formData, noteId });
    };

    if (!user) return null;

    // Loading State
    if (isGenerating) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
                <div className="text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 animate-pulse"></div>
                        <Lock size={40} className="text-purple-600 animate-bounce" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">Generating Secure Link...</h2>
                    <p className="text-gray-500 font-medium">Encrypting content and creating access token</p>
                </div>
            </div>
        );
    }

    // Show shareable link after upload complete
    if (uploadComplete) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
                <div className="max-w-2xl w-full space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <ShareableLink
                        noteId={generatedNoteId}
                        noteTitle={formData.title}
                        noteType="course"
                        platform={formData.platform}
                        courseName={formData.courseName}
                        chapter={formData.chapter}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onBack}
                            className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-black hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
                        >
                            <Upload size={20} />
                            <span>Upload Another</span>
                        </button>

                        <button
                            onClick={() => window.location.hash = '#/'}
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-2"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Dashboard</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <button
                    onClick={onBack}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-bold mb-6"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Upload Type</span>
                </button>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Progress Bar */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <Lock size={24} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-white">Course Note Upload</h1>
                                    <p className="text-purple-100 text-sm font-medium">Protected content for enrolled students</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                                <div
                                    key={s}
                                    className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-white' : 'bg-white/30'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        {/* Step 1: Platform */}
                        {step === 1 && (
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Select Platform</h2>
                                <p className="text-gray-600 mb-6">Where is this course from?</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {platforms.map((platform) => (
                                        <button
                                            key={platform}
                                            onClick={() => {
                                                setFormData({ ...formData, platform });
                                                handleNext();
                                            }}
                                            className={`p-6 rounded-2xl border-2 transition-all ${formData.platform === platform
                                                ? 'border-purple-500 bg-purple-50'
                                                : 'border-gray-200 hover:border-purple-300'
                                                }`}
                                        >
                                            <p className="font-black text-gray-900 text-lg">{platform}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Course Name */}
                        {step === 2 && (
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Course Name</h2>
                                <p className="text-gray-600 mb-6">What's the name of the course?</p>
                                <input
                                    type="text"
                                    value={formData.courseName}
                                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                                    placeholder="e.g., Python Zero to Hero"
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none font-medium text-lg"
                                />
                                <button
                                    onClick={handleNext}
                                    disabled={!formData.courseName}
                                    className="mt-6 w-full py-4 bg-purple-600 text-white rounded-2xl font-black hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    Continue
                                </button>
                            </div>
                        )}

                        {/* Step 3: Course Verification Link */}
                        {step === 3 && (
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Verify Course Ownership</h2>
                                <p className="text-gray-600 mb-6">Provide a link to your published course to verify you're the instructor</p>

                                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-blue-100 rounded-xl">
                                            <Lock size={20} className="text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-black text-blue-900 mb-1">Why do we need this?</h4>
                                            <p className="text-sm font-medium text-blue-700">
                                                To prevent unauthorized sharing, we verify that you're the actual course creator. Paste your course URL from {formData.platform}.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                                    Course URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.verificationLink || ''}
                                    onChange={(e) => setFormData({ ...formData, verificationLink: e.target.value })}
                                    placeholder={`e.g., https://www.udemy.com/course/your-course-name/`}
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none font-medium text-lg mb-4"
                                />

                                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6">
                                    <p className="text-sm font-bold text-amber-800">
                                        💡 <strong>Tip:</strong> Make sure the course is published and publicly visible. We'll verify your instructor status.
                                    </p>
                                </div>

                                <button
                                    onClick={handleNext}
                                    disabled={!formData.verificationLink || !formData.verificationLink.startsWith('http')}
                                    className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    Verify & Continue
                                </button>
                            </div>
                        )}

                        {/* Step 4: Chapter */}
                        {step === 4 && (
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Chapter/Module</h2>
                                <p className="text-gray-600 mb-6">Which chapter or module is this for?</p>
                                <input
                                    type="text"
                                    value={formData.chapter}
                                    onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                                    placeholder="e.g., Chapter 1 or Week 1"
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none font-medium text-lg"
                                />
                                <button
                                    onClick={handleNext}
                                    disabled={!formData.chapter}
                                    className="mt-6 w-full py-4 bg-purple-600 text-white rounded-2xl font-black hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    Continue
                                </button>
                            </div>
                        )}

                        {/* Step 5: File Upload */}
                        {step === 5 && (
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Upload Note</h2>
                                <p className="text-gray-600 mb-6">Upload your course notes file</p>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Note title"
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none font-medium mb-4"
                                />

                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    id="course-file-upload"
                                />
                                <label
                                    htmlFor="course-file-upload"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`block border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${isDragging
                                            ? 'border-purple-600 bg-purple-50 shadow-inner'
                                            : 'border-gray-300 hover:border-purple-500'
                                        }`}
                                >
                                    <Upload size={48} className={`mx-auto mb-4 ${isDragging ? 'text-purple-600 animate-bounce' : 'text-gray-400'}`} />
                                    <p className="font-bold text-gray-700 mb-2">
                                        {formData.file ? formData.file.name : 'Click to upload or drag and drop'}
                                    </p>
                                    <p className="text-sm text-gray-500">PDF, DOC, DOCX (max 50MB)</p>
                                </label>

                                <button
                                    onClick={handleNext}
                                    disabled={!formData.file || !formData.title}
                                    className="mt-6 w-full py-4 bg-purple-600 text-white rounded-2xl font-black hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    Continue
                                </button>
                            </div>
                        )}

                        {/* Step 6: Quiz Attachment (Optional) */}
                        {step === 6 && (
                            <div className="max-h-[600px] overflow-y-auto">
                                <h2 className="text-2xl font-black text-gray-900 mb-4">Attach Quiz (Optional)</h2>
                                <p className="text-gray-600 mb-6">Create or attach a quiz to test student understanding</p>

                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <QuizAttachment
                                        user={user}
                                        subject={formData.platform || 'Course'}
                                        topic={formData.courseName || 'General'}
                                        subtopic={formData.chapter}
                                        onQuizAttached={handleQuizAttach}
                                        onSkip={handleSkipQuiz}
                                        compact={false}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 7: Summary & Submit */}
                        {step === 7 && (
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Review & Submit</h2>
                                <p className="text-gray-600 mb-6">Confirm your course note details</p>

                                <div className="bg-purple-50 rounded-2xl p-6 mb-6 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-gray-600">Platform:</span>
                                        <span className="font-black text-gray-900">{formData.platform}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-gray-600">Course:</span>
                                        <span className="font-black text-gray-900">{formData.courseName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-gray-600">Chapter:</span>
                                        <span className="font-black text-gray-900">{formData.chapter}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-gray-600">Title:</span>
                                        <span className="font-black text-gray-900">{formData.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-gray-600">File:</span>
                                        <span className="font-black text-gray-900">{formData.file?.name}</span>
                                    </div>
                                    {formData.quiz && (
                                        <div className="flex justify-between">
                                            <span className="font-bold text-gray-600">Quiz:</span>
                                            <span className="font-black text-gray-900">✅ {formData.quiz.title} ({formData.quiz.questions.length} questions)</span>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6">
                                    <p className="text-sm font-bold text-amber-800">
                                        📌 This note will be protected and only accessible via a unique link that you can share with your students.
                                    </p>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black hover:bg-purple-700 transition-colors"
                                >
                                    Upload Course Note{formData.quiz ? ' & Quiz' : ''}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
