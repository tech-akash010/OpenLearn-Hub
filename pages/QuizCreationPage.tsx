
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, BookOpen, ArrowLeft, FileText, CheckCircle, Calendar } from 'lucide-react';
import { authService } from '../services/authService';
import { QuizPublishingGuard } from '../components/QuizPublishingGuard';
import { ChatbotVerificationModal } from '../components/ChatbotVerificationModal';
import { QuizStatusBadge } from '../components/QuizStatusBadge';
import { QuizEditor } from '../components/QuizEditor';
import { quizPublishingService } from '../services/quizPublishingService';
import { Quiz, QuizQuestion, Difficulty, ChatbotVerificationResult } from '../types';

interface UploadedNote {
    id: string;
    title: string;
    subject: string;
    topic: string;
    uploadedAt: string;
    hasQuiz: boolean;
}

export const QuizCreationPage: React.FC = () => {
    const navigate = useNavigate();
    const user = authService.getUser();
    const [step, setStep] = useState<'select-note' | 'create-quiz' | 'complete'>('select-note');
    const [selectedNote, setSelectedNote] = useState<UploadedNote | null>(null);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showQuizEditor, setShowQuizEditor] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);

    // Mock user's uploaded notes (in production, fetch from backend)
    const [uploadedNotes] = useState<UploadedNote[]>([
        {
            id: 'note_1',
            title: 'Process Scheduling Algorithms',
            subject: 'Computer Science',
            topic: 'Operating Systems',
            uploadedAt: '2024-01-15',
            hasQuiz: false
        },
        {
            id: 'note_2',
            title: 'Memory Management Techniques',
            subject: 'Computer Science',
            topic: 'Operating Systems',
            uploadedAt: '2024-01-18',
            hasQuiz: true
        },
        {
            id: 'note_3',
            title: 'Data Structures - Binary Trees',
            subject: 'Computer Science',
            topic: 'Data Structures',
            uploadedAt: '2024-01-20',
            hasQuiz: false
        },
        {
            id: 'note_4',
            title: 'Sorting Algorithms Explained',
            subject: 'Computer Science',
            topic: 'Algorithms',
            uploadedAt: '2024-01-22',
            hasQuiz: false
        }
    ]);

    // Demo quiz for testing
    const createDemoQuiz = (note: UploadedNote): Quiz => {
        const publishingInfo = quizPublishingService.getPublishingInfo(user!);

        return {
            id: `quiz_${Date.now()}`,
            title: `Quiz: ${note.title}`,
            description: `Test your knowledge on ${note.title}`,
            subject: note.subject,
            topic: note.topic,
            difficulty: Difficulty.Intermediate,
            questions: [
                {
                    id: 'q1',
                    question: `What is the main concept covered in "${note.title}"?`,
                    options: [
                        'Core concept A',
                        'Core concept B',
                        'Core concept C',
                        'Core concept D'
                    ],
                    correctAnswer: 0,
                    explanation: 'This is the primary concept covered in the notes.'
                },
                {
                    id: 'q2',
                    question: 'Which of the following is a key principle?',
                    options: [
                        'Principle 1',
                        'Principle 2',
                        'Principle 3',
                        'Principle 4'
                    ],
                    correctAnswer: 1,
                    explanation: 'This principle is fundamental to understanding the topic.'
                },
                {
                    id: 'q3',
                    question: 'How does this concept apply in practice?',
                    options: [
                        'Application method A',
                        'Application method B',
                        'Application method C',
                        'Application method D'
                    ],
                    correctAnswer: 0,
                    explanation: 'This is the most common practical application.'
                }
            ],
            createdBy: user!.id,
            createdAt: new Date().toISOString(),
            metadata: {
                role: user!.role,
                trustLevel: user!.communityMetrics?.trustLevel || user!.verificationLevel,
                quizVerification: 'none',
                authorType: publishingInfo.authorType,
                published: false
            },
            status: 'draft'
        };
    };

    const handleSelectNote = (note: UploadedNote) => {
        if (note.hasQuiz) {
            alert('This note already has a quiz attached!');
            return;
        }
        setSelectedNote(note);
        setStep('create-quiz');
    };

    const handleCreateQuiz = (quiz: Quiz) => {
        setCurrentQuiz(quiz);
        setShowQuizEditor(false);

        // Check if verification is needed
        if (quizPublishingService.requiresChatbotVerification(user!)) {
            setShowVerificationModal(true);
        } else {
            handlePublishQuiz(quiz);
        }
    };

    const handlePublishQuiz = (quiz: Quiz) => {
        console.log('Publishing quiz:', quiz);
        console.log('Attached to note:', selectedNote);
        setStep('complete');
        setShowVerificationModal(false);
    };

    const handleVerified = (result: ChatbotVerificationResult) => {
        if (currentQuiz) {
            const updatedQuiz = {
                ...currentQuiz,
                metadata: {
                    ...currentQuiz.metadata,
                    published: true,
                    verifiedAt: new Date().toISOString(),
                    verificationFeedback: 'Chatbot verification passed',
                    conceptualScore: result.feedback.conceptualCorrectness.score,
                    clarityScore: result.feedback.questionClarity.score,
                    plagiarismScore: result.feedback.plagiarismCheck.score,
                    alignmentScore: result.feedback.subjectAlignment.score,
                    overallScore: result.score
                },
                status: 'published' as const
            };
            handlePublishQuiz(updatedQuiz);
        }
    };

    const handleEdit = () => {
        setShowVerificationModal(false);
        alert('Edit functionality would open quiz editor here');
    };

    if (!user) return null;

    const publishingInfo = quizPublishingService.getPublishingInfo(user);
    const availableNotes = uploadedNotes.filter(note => !note.hasQuiz);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <button
                    onClick={() => step === 'select-note' ? navigate('/') : setStep('select-note')}
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 font-bold text-sm mb-6"
                >
                    <ArrowLeft size={16} />
                    <span>{step === 'select-note' ? 'Back to Dashboard' : 'Back to Note Selection'}</span>
                </button>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Page Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                <BookOpen size={32} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black">Create Quiz</h1>
                                <p className="text-purple-100 font-medium">
                                    {step === 'select-note' ? 'Select a note to attach your quiz' : 'Create quiz for your note'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* Step 1: Select Note */}
                        {step === 'select-note' && (
                            <div>
                                {/* Publishing Permissions */}
                                <div className="mb-8">
                                    <h2 className="text-lg font-black text-gray-900 mb-4">Your Publishing Permissions</h2>
                                    <QuizPublishingGuard user={user} compact />
                                </div>

                                {/* Notes List */}
                                <div>
                                    <h2 className="text-lg font-black text-gray-900 mb-4">
                                        Your Uploaded Notes ({availableNotes.length} available)
                                    </h2>

                                    {availableNotes.length === 0 ? (
                                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                            <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                                            <h3 className="text-lg font-black text-gray-900 mb-2">No Notes Available</h3>
                                            <p className="text-gray-600 mb-6">Upload some notes first to create quizzes for them</p>
                                            <button
                                                onClick={() => navigate('/hub')}
                                                className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all"
                                            >
                                                Go to Learning Hub
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {uploadedNotes.map((note) => (
                                                <div
                                                    key={note.id}
                                                    className={`p-6 rounded-2xl border-2 transition-all ${note.hasQuiz
                                                        ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                                                        : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg cursor-pointer'
                                                        }`}
                                                    onClick={() => !note.hasQuiz && handleSelectNote(note)}
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center space-x-2">
                                                            <FileText className="text-blue-600" size={20} />
                                                            {note.hasQuiz && (
                                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                                    Quiz Attached ✓
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                            <Calendar size={12} />
                                                            <span>{new Date(note.uploadedAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>

                                                    <h3 className="font-black text-gray-900 mb-2 line-clamp-2">{note.title}</h3>

                                                    <div className="flex items-center space-x-2 text-xs">
                                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg">
                                                            {note.subject}
                                                        </span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="text-gray-600 font-medium">{note.topic}</span>
                                                    </div>

                                                    {!note.hasQuiz && (
                                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                                            <button className="text-sm font-bold text-purple-600 hover:text-purple-700">
                                                                Create Quiz for this Note →
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Create Quiz */}
                        {step === 'create-quiz' && selectedNote && (
                            <div className="space-y-6">
                                {/* Selected Note Info */}
                                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                                    <h3 className="font-black text-blue-900 mb-2">Creating Quiz For:</h3>
                                    <p className="text-lg font-bold text-blue-800">{selectedNote.title}</p>
                                    <div className="flex items-center space-x-2 mt-2 text-sm">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg">
                                            {selectedNote.subject}
                                        </span>
                                        <span className="text-blue-400">•</span>
                                        <span className="text-blue-700 font-medium">{selectedNote.topic}</span>
                                    </div>
                                </div>

                                {/* Quiz Editor Button */}
                                <div>
                                    <h2 className="text-lg font-black text-gray-900 mb-4">Create Your Quiz</h2>
                                    <p className="text-gray-600 font-medium mb-6">
                                        Open the quiz editor to create questions manually or select from AI-suggested questions.
                                    </p>

                                    <button
                                        onClick={() => setShowQuizEditor(true)}
                                        className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-black shadow-xl shadow-purple-100 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center space-x-3"
                                    >
                                        <PlusCircle size={24} />
                                        <span>Open Quiz Editor</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Quiz Editor Modal */}
                        {showQuizEditor && selectedNote && (
                            <QuizEditor
                                noteTitle={selectedNote.title}
                                subject={selectedNote.subject}
                                topic={selectedNote.topic}
                                onSave={handleCreateQuiz}
                                onCancel={() => setShowQuizEditor(false)}
                            />
                        )}

                        {/* Step 3: Complete */}
                        {step === 'complete' && selectedNote && (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="text-green-600" size={40} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-3">Quiz Published!</h2>
                                <p className="text-gray-600 font-medium mb-8 max-w-md mx-auto">
                                    Your quiz has been successfully attached to "{selectedNote.title}"
                                </p>

                                <div className="flex items-center space-x-4 max-w-md mx-auto">
                                    <button
                                        onClick={() => {
                                            setStep('select-note');
                                            setSelectedNote(null);
                                        }}
                                        className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition-all"
                                    >
                                        Create Another Quiz
                                    </button>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                                    >
                                        Back to Dashboard
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Verification Modal */}
            {showVerificationModal && currentQuiz && (
                <ChatbotVerificationModal
                    quiz={currentQuiz}
                    onClose={() => setShowVerificationModal(false)}
                    onVerified={handleVerified}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
};
