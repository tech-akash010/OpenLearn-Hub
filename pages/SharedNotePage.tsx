import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Share2, Download, CheckCircle2, FileText, ArrowLeft, Bookmark, ThumbsUp, MessageSquare } from 'lucide-react';
import { authService } from '../services/authService';

import { DEMO_CONTENTS } from '../data/demoContents';

export const SharedNotePage: React.FC = () => {
    const { noteId } = useParams<{ noteId: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = authService.getUser();

    useEffect(() => {
        // Simulate loading
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Find the actual demo content
    const foundContent = DEMO_CONTENTS.find(c => c.id === noteId);

    // Default fallback if not found or for the body text (since demo data doesn't have full text)
    const noteData = {
        title: foundContent?.title || "Understanding Process Synchronization",
        author: foundContent?.uploadedBy || "User_" + noteId?.slice(-4) || "Anonymous",
        subject: foundContent?.organization.subjectPath?.subject || "Computer Science",
        topic: foundContent?.organization.subjectPath?.coreTopic || "Operating Systems",
        uploadedAt: foundContent?.uploadedAt ? new Date(foundContent.uploadedAt).toLocaleDateString() : "Just now",
        content: foundContent ? `
## Description
${foundContent.description}

## Introduction
(This is placeholder text for the demo note view). Process synchronization is the task of coordinating the execution of processes in a way that no two processes can have access to the same shared data and resources.

## Critical Section Problem
The critical section is a code segment where the shared variables can be accessed. An atomic action is required in a critical section i.e. only one process can execute in its critical section at a time. All the other processes have to wait to execute in their critical sections.

### Solution Requirements
1. **Mutual Exclusion**: If process Pi is executing in its critical section, then no other processes can be executing in their critical sections.
2. **Progress**: If no process is executing in its critical section and there exist some processes that wish to enter their critical section, then the selection of the processes that will enter the critical section next cannot be postponed indefinitely.
3. **Bounded Waiting**: A bound must exist on the number of times that other processes are allowed to enter their critical sections after a process has made a request to enter its critical section and before that request is granted.
        `.trim() : `
## Introduction
Process synchronization is the task of coordinating the execution of processes in a way that no two processes can have access to the same shared data and resources.
        `.trim()
    };

    return (
        <div className="animate-in fade-in duration-700 max-w-5xl mx-auto pb-24 p-6">
            {/* Header Navigation */}
            <button
                onClick={() => navigate('/hub')}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 font-bold mb-8 transition-colors"
            >
                <ArrowLeft size={18} />
                <span>Back to Hub</span>
            </button>

            <div className="bg-white rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                {/* Top Meta Bar */}
                <div className="p-8 md:p-12 border-b border-gray-50 bg-gray-50/30 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center space-x-5">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-100">
                            {noteData.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 text-xl leading-tight">{noteData.author}</h4>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Community Contributor • {noteData.uploadedAt}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="flex bg-gray-100 rounded-2xl p-1">
                            <button className="p-3 text-gray-500 hover:text-green-600 hover:bg-white rounded-xl transition-all">
                                <ThumbsUp size={20} />
                            </button>
                        </div>
                        <button className="p-3.5 text-gray-400 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-2xl transition-all border border-gray-100 shadow-sm">
                            <Share2 size={20} />
                        </button>
                        <button className="p-3.5 text-gray-400 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-2xl transition-all border border-gray-100 shadow-sm">
                            <Bookmark size={20} />
                        </button>
                    </div>
                </div>

                {/* Main Content Body */}
                <div className="p-10 md:p-16">
                    <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-4 text-blue-600 font-black uppercase text-[10px] tracking-[0.3em]">
                            <span>{noteData.subject}</span>
                            <span>•</span>
                            <span>{noteData.topic}</span>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 leading-[1.1] tracking-tight">{noteData.title}</h1>
                    </div>

                    <div className="prose prose-blue prose-xl max-w-none text-gray-700 font-medium leading-[1.8]">
                        {noteData.content.split('\n').map((line, i) => (
                            line.startsWith('##') ? <h2 key={i} className="text-3xl font-black mt-16 mb-8 text-gray-900 border-b-2 border-gray-50 pb-4">{line.replace('## ', '')}</h2> :
                                line.startsWith('###') ? <h3 key={i} className="text-2xl font-black mt-10 mb-6 text-gray-800">{line.replace('### ', '')}</h3> :
                                    <p key={i} className="mb-8 opacity-90">{line}</p>
                        ))}
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="p-10 bg-gray-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 rounded-b-[4rem]">
                    <div className="flex items-center space-x-6">
                        <div className="p-5 bg-white/10 text-white rounded-[1.5rem] backdrop-blur-md border border-white/10">
                            <CheckCircle2 size={32} />
                        </div>
                        <div>
                            <h4 className="font-black text-2xl tracking-tight">Community Verified</h4>
                            <p className="text-gray-400 font-medium text-sm mt-1">This content has been reviewed by the community.</p>
                        </div>
                    </div>
                    <div className="flex space-x-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center space-x-3 bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black shadow-2xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 transition-all">
                            <Download size={24} /> <span>Download</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
