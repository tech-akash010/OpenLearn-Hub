
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import { authService } from '../services/authService';
import { QuizAttachment } from '../components/QuizAttachment';
import { FileUpload } from '../components/FileUpload';
import { WatermarkInput, WatermarkConfig } from '../components/WatermarkInput';
import { Quiz, Difficulty, UploadedDocument } from '../types';

export const NoteUploadPage: React.FC = () => {
    const navigate = useNavigate();
    const user = authService.getUser();

    const [step, setStep] = useState<'details' | 'files' | 'quiz' | 'complete'>('details');
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [subject, setSubject] = useState('Computer Science');
    const [topic, setTopic] = useState('Operating Systems');
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Intermediate);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedDocument[]>([]);
    const [attachedQuiz, setAttachedQuiz] = useState<Quiz | null>(null);
    const [watermarkConfig, setWatermarkConfig] = useState<WatermarkConfig>({
        enabled: false,
        text: user?.name || '',
        position: 'bottom-right',
        opacity: 0.7
    });

    if (!user) return null;

    const handleFileUpload = (file: UploadedDocument) => {
        setUploadedFiles([...uploadedFiles, file]);
    };

    const handleFileRemove = (fileId: string) => {
        setUploadedFiles(uploadedFiles.filter(f => f.id !== fileId));
    };

    const handleQuizAttached = (quiz: Quiz) => {
        setAttachedQuiz(quiz);
        setStep('complete');
    };

    const handleSkipQuiz = () => {
        setStep('complete');
    };

    const handleSubmitNote = () => {
        const noteData = {
            title: noteTitle,
            description: noteDescription,
            content: noteContent,
            subject,
            topic,
            difficulty,
            files: uploadedFiles,
            quiz: attachedQuiz,
            watermark: watermarkConfig,
            uploadedBy: user.id,
            uploadedAt: new Date().toISOString()
        };

        console.log('Submitting note:', noteData);
        alert('✅ Note uploaded successfully!' + (attachedQuiz ? ' Quiz attached!' : ''));
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 font-bold text-sm mb-6"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Dashboard</span>
                </button>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Page Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Upload size={32} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black">Upload Notes</h1>
                                <p className="text-blue-100 font-medium">Share your knowledge with the community</p>
                            </div>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex items-center space-x-4 mt-6">
                            <div className={`flex items-center space-x-2 ${step === 'details' ? 'text-white' : 'text-blue-200'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${step === 'details' ? 'bg-white text-blue-600' : 'bg-white/20'}`}>
                                    1
                                </div>
                                <span className="font-bold text-sm">Details</span>
                            </div>
                            <div className="flex-1 h-1 bg-white/20 rounded"></div>
                            <div className={`flex items-center space-x-2 ${step === 'files' ? 'text-white' : 'text-blue-200'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${step === 'files' ? 'bg-white text-blue-600' : 'bg-white/20'}`}>
                                    2
                                </div>
                                <span className="font-bold text-sm">Files</span>
                            </div>
                            <div className="flex-1 h-1 bg-white/20 rounded"></div>
                            <div className={`flex items-center space-x-2 ${step === 'quiz' ? 'text-white' : 'text-blue-200'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${step === 'quiz' ? 'bg-white text-blue-600' : 'bg-white/20'}`}>
                                    3
                                </div>
                                <span className="font-bold text-sm">Quiz (Optional)</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Step 1: Note Details */}
                        {step === 'details' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-gray-900 mb-6">Note Details</h2>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">
                                        Note Title
                                    </label>
                                    <input
                                        type="text"
                                        value={noteTitle}
                                        onChange={(e) => setNoteTitle(e.target.value)}
                                        placeholder="e.g., Process Scheduling Algorithms"
                                        className="w-full px-6 py-4 bg-gray-900 text-white border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium placeholder:text-gray-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={noteDescription}
                                        onChange={(e) => setNoteDescription(e.target.value)}
                                        placeholder="Brief description of what these notes cover"
                                        rows={4}
                                        className="w-full px-6 py-4 bg-gray-900 text-white border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium placeholder:text-gray-500 resize-none"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">
                                            Subject
                                        </label>
                                        <select
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            className="w-full px-6 py-4 bg-gray-900 text-white border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                                        >
                                            <option>Computer Science</option>
                                            <option>Mathematics</option>
                                            <option>Physics</option>
                                            <option>Chemistry</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">
                                            Topic
                                        </label>
                                        <select
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="w-full px-6 py-4 bg-gray-900 text-white border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                                        >
                                            <option>Operating Systems</option>
                                            <option>Data Structures</option>
                                            <option>Algorithms</option>
                                            <option>Databases</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">
                                        Difficulty Level
                                    </label>
                                    <select
                                        value={difficulty}
                                        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                                        className="w-full px-6 py-4 bg-gray-900 text-white border-none rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                                    >
                                        <option value={Difficulty.Beginner}>Beginner</option>
                                        <option value={Difficulty.Intermediate}>Intermediate</option>
                                        <option value={Difficulty.Advanced}>Advanced</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => setStep('files')}
                                    disabled={!noteTitle.trim()}
                                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue to File Upload
                                </button>
                            </div>
                        )}

                        {/* Step 2: File Upload & Notes */}
                        {step === 'files' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-gray-900 mb-6">Upload Content</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    Add your notes by typing them below, uploading PDF documents, or adding images. You can use any combination of these methods.
                                </p>

                                <FileUpload
                                    onFileUpload={handleFileUpload}
                                    onFileRemove={handleFileRemove}
                                    uploadedFiles={uploadedFiles}
                                    noteContent={noteContent}
                                    onNoteChange={setNoteContent}
                                    maxFiles={5}
                                    label="Add Your Content"
                                />

                                {/* Watermark Section */}
                                <WatermarkInput
                                    value={watermarkConfig}
                                    onChange={setWatermarkConfig}
                                    defaultText={user?.name || 'Your Name'}
                                />

                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setStep('details')}
                                        className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition-all"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setStep('quiz')}
                                        disabled={uploadedFiles.length === 0 && !noteContent.trim()}
                                        className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Continue to Quiz (Optional)
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Quiz Attachment */}
                        {step === 'quiz' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-gray-900 mb-6">Add a Quiz (Optional)</h2>

                                <QuizAttachment
                                    user={user}
                                    subject={subject}
                                    topic={topic}
                                    onQuizAttached={handleQuizAttached}
                                    onSkip={handleSkipQuiz}
                                />

                                <button
                                    onClick={() => setStep('files')}
                                    className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition-all"
                                >
                                    Back to Files
                                </button>
                            </div>
                        )}

                        {/* Step 4: Complete */}
                        {step === 'complete' && (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="text-green-600" size={40} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-3">Ready to Publish!</h2>
                                <p className="text-gray-600 font-medium mb-8 max-w-md mx-auto">
                                    Your note is ready to be published
                                    {attachedQuiz && ' with an attached quiz'}
                                </p>

                                {/* Summary */}
                                <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
                                    <h3 className="font-black text-gray-900 mb-4">Summary</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Title:</span>
                                            <span className="font-bold text-gray-900">{noteTitle}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subject:</span>
                                            <span className="font-bold text-gray-900">{subject}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Topic:</span>
                                            <span className="font-bold text-gray-900">{topic}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Files:</span>
                                            <span className="font-bold text-gray-900">{uploadedFiles.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Notes:</span>
                                            <span className="font-bold text-gray-900">{noteContent.trim() ? `${noteContent.length} chars` : 'None'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Quiz Attached:</span>
                                            <span className="font-bold text-gray-900">{attachedQuiz ? 'Yes ✅' : 'No'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 max-w-md mx-auto">
                                    <button
                                        onClick={() => setStep('quiz')}
                                        className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition-all"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmitNote}
                                        className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                                    >
                                        Publish Note
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
