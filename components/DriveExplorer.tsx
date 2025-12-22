import React, { useState, useMemo } from 'react';
import { HardDrive, Folder, FileText, ChevronRight, ChevronDown, Upload as UploadIcon, Download, Globe, Lock, Search, ArrowLeft, Home, MoreVertical } from 'lucide-react';
import { authService } from '../services/authService';

interface DriveExplorerProps {
    userId: string;
}

// Types for our file system
interface FileNode {
    type: 'file';
    id: string;
    name: string;
    size: string;
    savedAt: string;
    data: any;
}

interface FolderNode {
    type: 'folder';
    name: string;
    path: string; // Full path for reference
    children: { [key: string]: FolderNode | FileNode };
}

type FileSystemItem = FolderNode | FileNode;

export const DriveExplorer: React.FC<DriveExplorerProps> = ({ userId }) => {
    const [activeTab, setActiveTab] = useState<'community-uploads' | 'course-uploads' | 'community-downloads' | 'course-downloads'>('community-downloads');
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const user = authService.getUser();

    // Check if user can upload (Bronze community contributors cannot)
    const canUpload = user ? authService.canUploadNotes(user) : true;

    // Mock data - conditional based on user permissions
    const MOCK_DRIVE_DATA = useMemo(() => ({
        'community-uploads': canUpload ? [
            {
                path: 'DSA/Array/Array Implementation',
                notes: [
                    { id: '1', fileName: 'Array Basics.pdf', savedAt: '2024-01-15', size: '2.4 MB' },
                    { id: '2', fileName: 'Dynamic Arrays.pdf', savedAt: '2024-01-16', size: '1.8 MB' }
                ]
            },
            {
                path: 'DSA/Linked List/Singly Linked List',
                notes: [
                    { id: '3', fileName: 'Linked List Operations.pdf', savedAt: '2024-01-18', size: '3.1 MB' }
                ]
            },
            {
                path: 'DSA/Array/Quizzes',
                notes: [
                    { id: 'q1', fileName: 'Array Quiz - Beginner.json', savedAt: '2024-01-19', size: '45 KB' }
                ]
            }
        ] : [],
        'course-uploads': canUpload ? [
            {
                path: 'Coursera/Python Zero to Hero/Chapter 1',
                notes: [
                    { id: '4', fileName: 'Python Introduction.pdf', savedAt: '2024-01-20', size: '4.2 MB' }
                ]
            },
            {
                path: 'Coursera/Python Zero to Hero/Chapter 1/Quizzes',
                notes: [
                    { id: 'q2', fileName: 'Python Basics Quiz.json', savedAt: '2024-01-21', size: '38 KB' }
                ]
            },
            {
                path: 'Udemy/Web Development Bootcamp/HTML Basics',
                notes: [
                    { id: '5', fileName: 'HTML Tags Guide.pdf', savedAt: '2024-01-21', size: '2.8 MB' }
                ]
            }
        ] : [],
        'community-downloads': [
            {
                path: 'Operating Systems/Memory Management/Paging',
                notes: [
                    { id: '6', fileName: 'Paging Concepts.pdf', savedAt: '2024-01-22', size: '2.9 MB' },
                    { id: '7', fileName: 'Page Replacement.pdf', savedAt: '2024-01-23', size: '2.1 MB' }
                ]
            },
            {
                path: 'Operating Systems/Memory Management/Quizzes',
                notes: [
                    { id: 'q3', fileName: 'Memory Management Quiz.json', savedAt: '2024-01-24', size: '52 KB' }
                ]
            }
        ],
        'course-downloads': [
            {
                path: 'Udemy/Angela Yu/Web Development Bootcamp/HTML Basics',
                notes: [
                    { id: '8', fileName: 'HTML Tags.pdf', savedAt: '2024-01-25', size: '1.5 MB' }
                ]
            },
            {
                path: 'Udemy/Angela Yu/Web Development Bootcamp/HTML Basics/Quizzes',
                notes: [
                    { id: 'q4', fileName: 'HTML Quiz - Advanced.json', savedAt: '2024-01-26', size: '41 KB' }
                ]
            },
            {
                path: 'Coursera/Andrew Ng/Machine Learning/Week 1',
                notes: [
                    { id: '9', fileName: 'ML Introduction.pdf', savedAt: '2024-01-26', size: '3.2 MB' }
                ]
            },
            {
                path: 'Coursera/Andrew Ng/Machine Learning/Week 1/Quizzes',
                notes: [
                    { id: 'q5', fileName: 'ML Week 1 Quiz.json', savedAt: '2024-01-27', size: '48 KB' }
                ]
            }
        ]
    }), [canUpload]);

    // Helper to build the file tree from flat paths
    const fileTree = useMemo(() => {
        const root: FolderNode = { type: 'folder', name: 'root', path: '', children: {} };
        const data = MOCK_DRIVE_DATA[activeTab] || [];

        data.forEach(item => {
            const parts = item.path.split('/');
            let current = root;

            // Build folder structure
            parts.forEach((part, index) => {
                if (!current.children[part]) {
                    const newPath = parts.slice(0, index + 1).join('/');
                    current.children[part] = {
                        type: 'folder',
                        name: part,
                        path: newPath,
                        children: {}
                    };
                }
                const nextNode = current.children[part];
                if (nextNode.type === 'folder') {
                    current = nextNode;
                }
            });

            // Add files to the leaf folder
            item.notes.forEach(note => {
                current.children[note.id] = {
                    type: 'file',
                    id: note.id,
                    name: note.fileName,
                    size: note.size,
                    savedAt: note.savedAt,
                    data: note
                };
            });
        });

        return root;
    }, [activeTab, MOCK_DRIVE_DATA]); // Rebuild when tab changes

    // Get contents of current path
    const folderContents = useMemo(() => {
        let current: FolderNode | FileNode = fileTree;
        for (const segment of currentPath) {
            if (current.type === 'folder' && current.children[segment]) {
                current = current.children[segment];
            } else {
                return []; // Should not happen if path is valid
            }
        }
        return current.type === 'folder' ? Object.values(current.children) : [];
    }, [fileTree, currentPath]);

    // Handle navigation
    const enterFolder = (folderName: string) => {
        setCurrentPath([...currentPath, folderName]);
    };

    const navigateUp = () => {
        setCurrentPath(currentPath.slice(0, -1));
    };

    const navigateToBreadcrumb = (index: number) => {
        setCurrentPath(currentPath.slice(0, index + 1));
    };

    const handleTabChange = (newTab: typeof activeTab) => {
        setActiveTab(newTab);
        setCurrentPath([]); // Reset path on tab switch
    };

    // Filter by search query
    const filteredContents = folderContents.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tabs = [
        { id: 'community-downloads', label: 'Community Downloads', icon: <Download size={18} />, color: 'green' },
        { id: 'course-downloads', label: 'Course Downloads', icon: <Lock size={18} />, color: 'orange' },
        { id: 'community-uploads', label: 'Community Captures', icon: <Globe size={18} />, color: 'blue' },
        { id: 'course-uploads', label: 'Course Captures', icon: <Lock size={18} />, color: 'purple' }
    ];

    // Sort: Folders first, then files
    const sortedContents = [...filteredContents].sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'folder' ? -1 : 1;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-xl">
                            <HardDrive size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900">My Drive</h1>
                            <p className="text-gray-600 font-medium">Auto-organized notes library</p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search in current folder..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none font-medium transition-colors"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id as any)}
                            className={`p-6 rounded-2xl border-2 transition-all ${activeTab === tab.id
                                ? `border-${tab.color}-500 bg-${tab.color}-50 shadow-lg`
                                : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-3 mx-auto ${activeTab === tab.id ? `bg-${tab.color}-500 text-white` : 'bg-gray-100 text-gray-600'
                                }`}>
                                {tab.icon}
                            </div>
                            <p className={`text-sm font-bold text-center ${activeTab === tab.id ? `text-${tab.color}-700` : 'text-gray-600'
                                }`}>
                                {tab.label}
                            </p>
                        </button>
                    ))}
                </div>

                {/* Browser Area */}
                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden min-h-[500px] flex flex-col">

                    {/* Breadcrumbs Toolbar */}
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center space-x-2 overflow-x-auto">
                        <button
                            onClick={() => setCurrentPath([])}
                            className={`flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors ${currentPath.length === 0 ? 'text-gray-900 font-bold' : 'text-gray-500'}`}
                        >
                            <Home size={18} />
                        </button>

                        {currentPath.map((folder, index) => (
                            <React.Fragment key={index}>
                                <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                                <button
                                    onClick={() => navigateToBreadcrumb(index)}
                                    className={`px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap ${index === currentPath.length - 1
                                        ? 'bg-white shadow-sm font-bold text-gray-900'
                                        : 'text-gray-600 font-medium'
                                        }`}
                                >
                                    {folder}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex-1">
                        {currentPath.length > 0 && (
                            <div className="mb-4">
                                <button
                                    onClick={navigateUp}
                                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 font-medium px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors inline-flex"
                                >
                                    <ArrowLeft size={18} />
                                    <span>Back</span>
                                </button>
                            </div>
                        )}

                        {sortedContents.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                                <Folder size={64} className="mb-4 opacity-20" />
                                <p className="text-lg font-medium">Empty folder</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {sortedContents.map((item) => (
                                    <div
                                        key={item.name}
                                        onClick={() => item.type === 'folder' ? enterFolder(item.name) : null}
                                        className={`
                                            group relative p-4 rounded-2xl border transition-all cursor-pointer
                                            ${item.type === 'folder'
                                                ? 'bg-blue-50/50 border-blue-100 hover:border-blue-300 hover:shadow-md hover:bg-blue-50'
                                                : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'
                                            }
                                        `}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`
                                                w-10 h-10 rounded-xl flex items-center justify-center
                                                ${item.type === 'folder' ? 'bg-blue-100 text-blue-600' : 'bg-red-50 text-red-500'}
                                            `}>
                                                {item.type === 'folder' ? <Folder size={20} /> : <FileText size={20} />}
                                            </div>
                                            {item.type === 'file' && (
                                                <button className="text-gray-300 hover:text-gray-600">
                                                    <MoreVertical size={16} />
                                                </button>
                                            )}
                                        </div>

                                        <p className="font-bold text-gray-900 truncate mb-1" title={item.name}>{item.name}</p>

                                        {item.type === 'file' && (
                                            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                                <span>{item.size}</span>
                                                <span>{item.savedAt}</span>
                                            </div>
                                        )}

                                        {item.type === 'folder' && (
                                            <div className="flex items-center space-x-1 mt-2 text-xs text-blue-600 font-medium">
                                                <span>Open Folder</span>
                                                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
