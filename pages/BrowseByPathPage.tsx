import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Youtube, ChevronRight, Home, Folder, FileText, Trophy } from 'lucide-react';
import { DEMO_CONTENTS, DemoContent } from '../data/demoContents';
import { EnhancedContentCard } from '../components/EnhancedContentCard';
import { CourseGatekeeperModal } from '../components/CourseGatekeeperModal';

type BrowseTab = 'subject' | 'university' | 'channel' | 'course' | 'competitive_exam';

export const BrowseByPathPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<BrowseTab>('subject');

    // Gating State
    const [gatekeeperOpen, setGatekeeperOpen] = useState(false);
    const [selectedGatedContent, setSelectedGatedContent] = useState<DemoContent | null>(null);

    // Subject navigation
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);

    // University navigation
    const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);
    const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [selectedUniSubject, setSelectedUniSubject] = useState<string | null>(null);
    const [selectedUniTopic, setSelectedUniTopic] = useState<string | null>(null);

    // Channel navigation
    const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
    const [selectedChannelTopic, setSelectedChannelTopic] = useState<string | null>(null);

    // Course navigation
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [selectedCourseTopic, setSelectedCourseTopic] = useState<string | null>(null);

    // Competitive Exam navigation
    const [selectedExam, setSelectedExam] = useState<string | null>(null);
    const [selectedExamYear, setSelectedExamYear] = useState<string | null>(null);
    const [selectedExamSubject, setSelectedExamSubject] = useState<string | null>(null);
    const [selectedExamTopic, setSelectedExamTopic] = useState<string | null>(null);

    const handleContentClick = (content: DemoContent) => {
        if (activeTab === 'course') {
            setSelectedGatedContent(content);
            setGatekeeperOpen(true);
        } else {
            // Direct navigation for other tabs
            navigate(`/note/${content.id}`);
        }
    };

    const resetSubjectNav = () => {
        setSelectedSubject(null);
        setSelectedTopic(null);
        setSelectedSubtopic(null);
    };

    const resetUniversityNav = () => {
        setSelectedUniversity(null);
        setSelectedSemester(null);
        setSelectedDepartment(null);
        setSelectedUniSubject(null);
        setSelectedUniTopic(null);
    };

    const resetChannelNav = () => {
        setSelectedChannel(null);
        setSelectedPlaylist(null);
        setSelectedChannelTopic(null);
    };

    const resetCourseNav = () => {
        setSelectedCourse(null);
        setSelectedCourseTopic(null);
    };

    const resetExamNav = () => {
        setSelectedExam(null);
        setSelectedExamYear(null);
        setSelectedExamSubject(null);
        setSelectedExamTopic(null);
    };

    // Get unique values for hierarchical navigation
    const getUniqueSubjects = () => {
        const subjects = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.subjectPath) {
                subjects.add(c.organization.subjectPath.subject);
            }
        });
        return Array.from(subjects);
    };

    const getTopicsForSubject = (subject: string) => {
        const topics = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.subjectPath?.subject === subject) {
                topics.add(c.organization.subjectPath.coreTopic);
            }
        });
        return Array.from(topics);
    };

    const getSubtopicsForTopic = (subject: string, topic: string) => {
        const subtopics = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.subjectPath?.subject === subject &&
                c.organization.subjectPath?.coreTopic === topic) {
                subtopics.add(c.organization.subjectPath.subtopic);
            }
        });
        return Array.from(subtopics);
    };

    const getContentForSubtopic = (subject: string, topic: string, subtopic: string) => {
        return DEMO_CONTENTS.filter(c =>
            c.organization.subjectPath?.subject === subject &&
            c.organization.subjectPath?.coreTopic === topic &&
            c.organization.subjectPath?.subtopic === subtopic
        );
    };

    // University hierarchy
    const getUniqueUniversities = () => {
        const universities = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.universityPath) {
                universities.add(c.organization.universityPath.university);
            }
        });
        return Array.from(universities);
    };

    const getSemestersForUniversity = (university: string) => {
        const semesters = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.universityPath?.university === university) {
                semesters.add(c.organization.universityPath.semester);
            }
        });
        return Array.from(semesters).sort();
    };

    const getDepartmentsForSemester = (university: string, semester: string) => {
        const departments = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.universityPath?.university === university &&
                c.organization.universityPath?.semester === semester) {
                departments.add(c.organization.universityPath.department);
            }
        });
        return Array.from(departments);
    };

    const getSubjectsForDepartment = (university: string, semester: string, department: string) => {
        const subjects = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.universityPath?.university === university &&
                c.organization.universityPath?.semester === semester &&
                c.organization.universityPath?.department === department) {
                subjects.add(c.organization.universityPath.subject);
            }
        });
        return Array.from(subjects);
    };

    const getTopicsForUniSubject = (university: string, semester: string, department: string, subject: string) => {
        const topics = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.universityPath?.university === university &&
                c.organization.universityPath?.semester === semester &&
                c.organization.universityPath?.department === department &&
                c.organization.universityPath?.subject === subject) {
                topics.add(c.organization.universityPath.topic);
            }
        });
        return Array.from(topics);
    };

    const getContentForUniTopic = (university: string, semester: string, department: string, subject: string, topic: string) => {
        return DEMO_CONTENTS.filter(c =>
            c.organization.universityPath?.university === university &&
            c.organization.universityPath?.semester === semester &&
            c.organization.universityPath?.department === department &&
            c.organization.universityPath?.subject === subject &&
            c.organization.universityPath?.topic === topic
        );
    };

    // Channel hierarchy
    const getUniqueChannels = () => {
        const channels = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.channelPath) {
                channels.add(c.organization.channelPath.channelName);
            }
        });
        return Array.from(channels);
    };

    const getPlaylistsForChannel = (channel: string) => {
        const playlists = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.channelPath?.channelName === channel) {
                playlists.add(c.organization.channelPath.playlistName);
            }
        });
        return Array.from(playlists);
    };

    const getTopicsForPlaylist = (channel: string, playlist: string) => {
        const topics = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.channelPath?.channelName === channel &&
                c.organization.channelPath?.playlistName === playlist) {
                topics.add(c.organization.channelPath.topic);
            }
        });
        return Array.from(topics);
    };

    const getContentForChannelTopic = (channel: string, playlist: string, topic: string) => {
        return DEMO_CONTENTS.filter(c =>
            c.organization.channelPath?.channelName === channel &&
            c.organization.channelPath?.playlistName === playlist &&
            c.organization.channelPath?.topic === topic
        );
    };

    // Course hierarchy (New 4-level)
    const getUniqueProviders = () => {
        const providers = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.coursePath) {
                providers.add(c.organization.coursePath.provider);
            }
        });
        return Array.from(providers).sort();
    };

    const getInstructorsForProvider = (provider: string) => {
        const instructors = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.coursePath?.provider === provider) {
                instructors.add(c.organization.coursePath.instructor);
            }
        });
        return Array.from(instructors).sort();
    };

    const getCoursesForInstructor = (provider: string, instructor: string) => {
        const courses = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.coursePath?.provider === provider &&
                c.organization.coursePath?.instructor === instructor) {
                courses.add(c.organization.coursePath.courseName);
            }
        });
        return Array.from(courses).sort();
    };

    const getTopicsForCourse = (provider: string, instructor: string, course: string) => {
        const topics = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.coursePath?.provider === provider &&
                c.organization.coursePath?.instructor === instructor &&
                c.organization.coursePath?.courseName === course) {
                topics.add(c.organization.coursePath.topic);
            }
        });
        return Array.from(topics).sort();
    };

    const getContentForCourseTopic = (provider: string, instructor: string, course: string, topic: string) => {
        return DEMO_CONTENTS.filter(c =>
            c.organization.coursePath?.provider === provider &&
            c.organization.coursePath?.instructor === instructor &&
            c.organization.coursePath?.courseName === course &&
            c.organization.coursePath?.topic === topic
        );
    };

    // Competitive Exam hierarchy
    const getUniqueExams = () => {
        const exams = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.competitiveExamPath) {
                exams.add(c.organization.competitiveExamPath.exam);
            }
        });
        return Array.from(exams).sort();
    };

    const getYearsForExam = (exam: string) => {
        const years = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.competitiveExamPath?.exam === exam) {
                years.add(c.organization.competitiveExamPath.year);
            }
        });
        return Array.from(years).sort();
    };

    const getSubjectsForExamYear = (exam: string, year: string) => {
        const subjects = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.competitiveExamPath?.exam === exam &&
                c.organization.competitiveExamPath?.year === year) {
                subjects.add(c.organization.competitiveExamPath.subject);
            }
        });
        return Array.from(subjects).sort();
    };

    const getTopicsForExamSubject = (exam: string, year: string, subject: string) => {
        const topics = new Set<string>();
        DEMO_CONTENTS.forEach(c => {
            if (c.organization.competitiveExamPath?.exam === exam &&
                c.organization.competitiveExamPath?.year === year &&
                c.organization.competitiveExamPath?.subject === subject) {
                topics.add(c.organization.competitiveExamPath.topic);
            }
        });
        return Array.from(topics).sort();
    };

    const getContentForExamTopic = (exam: string, year: string, subject: string, topic: string) => {
        return DEMO_CONTENTS.filter(c =>
            c.organization.competitiveExamPath?.exam === exam &&
            c.organization.competitiveExamPath?.year === year &&
            c.organization.competitiveExamPath?.subject === subject &&
            c.organization.competitiveExamPath?.topic === topic
        );
    };

    const tabs = [
        { id: 'subject' as BrowseTab, label: 'Subject-wise', icon: BookOpen, color: 'blue', gradient: 'from-blue-500 to-cyan-600' },
        { id: 'university' as BrowseTab, label: 'University-wise', icon: GraduationCap, color: 'blue', gradient: 'from-blue-600 to-indigo-600' },
        { id: 'channel' as BrowseTab, label: 'Channel-wise', icon: Youtube, color: 'blue', gradient: 'from-cyan-500 to-blue-600' },
        { id: 'course' as BrowseTab, label: 'Course-wise', icon: Folder, color: 'purple', gradient: 'from-purple-500 to-pink-600' },
        { id: 'competitive_exam' as BrowseTab, label: 'Competitive Exams', icon: Trophy, color: 'amber', gradient: 'from-amber-500 to-orange-600' }
    ];

    const currentTab = tabs.find(t => t.id === activeTab)!;

    const renderBreadcrumb = () => {
        const crumbs: { label: string; onClick: () => void }[] = [];

        if (activeTab === 'subject') {
            crumbs.push({ label: 'Subjects', onClick: resetSubjectNav });
            if (selectedSubject) crumbs.push({ label: selectedSubject, onClick: () => { setSelectedTopic(null); setSelectedSubtopic(null); } });
            if (selectedTopic) crumbs.push({ label: selectedTopic, onClick: () => setSelectedSubtopic(null) });
            if (selectedSubtopic) crumbs.push({ label: selectedSubtopic, onClick: () => { } });
        } else if (activeTab === 'university') {
            crumbs.push({ label: 'Universities', onClick: resetUniversityNav });
            if (selectedUniversity) crumbs.push({ label: selectedUniversity, onClick: () => { setSelectedSemester(null); setSelectedDepartment(null); setSelectedUniSubject(null); setSelectedUniTopic(null); } });
            if (selectedSemester) crumbs.push({ label: `Sem ${selectedSemester}`, onClick: () => { setSelectedDepartment(null); setSelectedUniSubject(null); setSelectedUniTopic(null); } });
            if (selectedDepartment) crumbs.push({ label: selectedDepartment.split('(')[1]?.replace(')', '') || selectedDepartment, onClick: () => { setSelectedUniSubject(null); setSelectedUniTopic(null); } });
            if (selectedUniSubject) crumbs.push({ label: selectedUniSubject, onClick: () => setSelectedUniTopic(null) });
            if (selectedUniTopic) crumbs.push({ label: selectedUniTopic, onClick: () => { } });
        } else if (activeTab === 'channel') {
            crumbs.push({ label: 'Channels', onClick: resetChannelNav });
            if (selectedChannel) crumbs.push({ label: selectedChannel, onClick: () => { setSelectedPlaylist(null); setSelectedChannelTopic(null); } });
            if (selectedPlaylist) crumbs.push({ label: selectedPlaylist, onClick: () => setSelectedChannelTopic(null) });
            if (selectedChannelTopic) crumbs.push({ label: selectedChannelTopic, onClick: () => { } });
        } else if (activeTab === 'course') {
            // Course breadcrumbs
            crumbs.push({ label: 'Providers', onClick: resetCourseNav });
            if (selectedProvider) crumbs.push({ label: selectedProvider, onClick: () => { setSelectedInstructor(null); setSelectedCourse(null); setSelectedCourseTopic(null); } });
            if (selectedInstructor) crumbs.push({ label: selectedInstructor, onClick: () => { setSelectedCourse(null); setSelectedCourseTopic(null); } });
            if (selectedCourse) crumbs.push({ label: selectedCourse, onClick: () => setSelectedCourseTopic(null) });
            if (selectedCourseTopic) crumbs.push({ label: selectedCourseTopic, onClick: () => { } });
        } else {
            // Competitive Exam breadcrumbs
            crumbs.push({ label: 'Exams', onClick: resetExamNav });
            if (selectedExam) crumbs.push({ label: selectedExam, onClick: () => { setSelectedExamYear(null); setSelectedExamSubject(null); setSelectedExamTopic(null); } });
            if (selectedExamYear) crumbs.push({ label: selectedExamYear, onClick: () => { setSelectedExamSubject(null); setSelectedExamTopic(null); } });
            if (selectedExamSubject) crumbs.push({ label: selectedExamSubject, onClick: () => setSelectedExamTopic(null) });
            if (selectedExamTopic) crumbs.push({ label: selectedExamTopic, onClick: () => { } });
        }

        return (
            <div className="flex items-center space-x-2 text-sm font-medium flex-wrap">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentTab.gradient} flex items-center justify-center`}>
                    <Home size={16} className="text-white" />
                </div>
                {crumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                        <ChevronRight size={16} className="text-gray-300" />
                        <button
                            onClick={crumb.onClick}
                            className={`px-3 py-1.5 rounded-lg transition-all ${index === crumbs.length - 1
                                ? `bg-${currentTab.color}-100 text-${currentTab.color}-900 font-black`
                                : `text-${currentTab.color}-600 hover:bg-${currentTab.color}-50 font-bold`
                                }`}
                        >
                            {crumb.label}
                        </button>
                    </React.Fragment>
                ))}
            </div>
        );
    };

    const renderCategoryCard = (title: string, count: number, onClick: () => void, color: string = 'blue', gradient: string) => (
        <button
            onClick={onClick}
            className="group relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 text-left overflow-hidden transform hover:scale-105"
        >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                        <Folder className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className={`font-black text-gray-900 text-lg group-hover:text-${color}-600 transition-colors line-clamp-1`}>
                            {title}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className={`px-3 py-1 rounded-full bg-${color}-100 text-${color}-700 text-xs font-bold`}>
                        {count} {count === 1 ? 'item' : 'items'}
                    </div>
                    <ChevronRight className={`text-gray-400 group-hover:text-${color}-600 transition-colors`} size={20} />
                </div>
            </div>

            {/* Decorative corner */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient} opacity-5 rounded-bl-full`}></div>
        </button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center space-x-4 mb-3">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentTab.gradient} flex items-center justify-center shadow-xl`}>
                            {React.createElement(currentTab.icon, { size: 32, className: 'text-white' })}
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 mb-1">Browse Content</h1>
                            <p className="text-gray-600 font-medium">Navigate through structured learning paths</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-xl p-2 mb-6 animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
                    <div className="grid grid-cols-5 gap-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        resetSubjectNav();
                                        resetUniversityNav();
                                        resetChannelNav();
                                        resetCourseNav();
                                        resetExamNav();
                                    }}
                                    className={`relative p-4 rounded-xl font-black transition-all duration-300 ${isActive
                                        ? `bg-gradient-to-br ${tab.gradient} text-white shadow-lg scale-105`
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:scale-102'
                                        }`}
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <Icon size={20} />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </div>
                                    {isActive && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Breadcrumb */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-in fade-in slide-in-from-top-4 duration-500 delay-200">
                    {renderBreadcrumb()}
                </div>

                {/* Content Area */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                    {/* SUBJECT PATH */}
                    {activeTab === 'subject' && (
                        <>
                            {!selectedSubject && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getUniqueSubjects().map((subject, index) => (
                                        <div key={subject} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                subject,
                                                DEMO_CONTENTS.filter(c => c.organization.subjectPath?.subject === subject).length,
                                                () => setSelectedSubject(subject),
                                                'blue',
                                                'from-blue-500 to-blue-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedSubject && !selectedTopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getTopicsForSubject(selectedSubject).map((topic, index) => (
                                        <div key={topic} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                topic,
                                                DEMO_CONTENTS.filter(c => c.organization.subjectPath?.subject === selectedSubject && c.organization.subjectPath?.coreTopic === topic).length,
                                                () => setSelectedTopic(topic),
                                                'blue',
                                                'from-blue-500 to-blue-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedSubject && selectedTopic && !selectedSubtopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getSubtopicsForTopic(selectedSubject, selectedTopic).map((subtopic, index) => (
                                        <div key={subtopic} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                subtopic,
                                                DEMO_CONTENTS.filter(c => c.organization.subjectPath?.subject === selectedSubject && c.organization.subjectPath?.coreTopic === selectedTopic && c.organization.subjectPath?.subtopic === subtopic).length,
                                                () => setSelectedSubtopic(subtopic),
                                                'blue',
                                                'from-blue-500 to-blue-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedSubject && selectedTopic && selectedSubtopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getContentForSubtopic(selectedSubject, selectedTopic, selectedSubtopic).map((content, index) => (
                                        <div key={content.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            <EnhancedContentCard
                                                content={content}
                                                onClick={() => handleContentClick(content)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* UNIVERSITY PATH */}
                    {activeTab === 'university' && (
                        <>
                            {!selectedUniversity && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getUniqueUniversities().map((university, index) => (
                                        <div key={university} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                university,
                                                DEMO_CONTENTS.filter(c => c.organization.universityPath?.university === university).length,
                                                () => setSelectedUniversity(university),
                                                'blue',
                                                'from-blue-600 to-indigo-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedUniversity && !selectedSemester && (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    {getSemestersForUniversity(selectedUniversity).map((semester, index) => (
                                        <div key={semester} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                `Semester ${semester}`,
                                                DEMO_CONTENTS.filter(c => c.organization.universityPath?.university === selectedUniversity && c.organization.universityPath?.semester === semester).length,
                                                () => setSelectedSemester(semester),
                                                'blue',
                                                'from-blue-600 to-indigo-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedUniversity && selectedSemester && !selectedDepartment && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getDepartmentsForSemester(selectedUniversity, selectedSemester).map((department, index) => (
                                        <div key={department} className="animate-in fade-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                department,
                                                DEMO_CONTENTS.filter(c => c.organization.universityPath?.university === selectedUniversity && c.organization.universityPath?.semester === selectedSemester && c.organization.universityPath?.department === department).length,
                                                () => setSelectedDepartment(department),
                                                'blue',
                                                'from-blue-600 to-indigo-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedUniversity && selectedSemester && selectedDepartment && !selectedUniSubject && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getSubjectsForDepartment(selectedUniversity, selectedSemester, selectedDepartment).map((subject, index) => (
                                        <div key={subject} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                subject,
                                                DEMO_CONTENTS.filter(c => c.organization.universityPath?.university === selectedUniversity && c.organization.universityPath?.semester === selectedSemester && c.organization.universityPath?.department === selectedDepartment && c.organization.universityPath?.subject === subject).length,
                                                () => setSelectedUniSubject(subject),
                                                'blue',
                                                'from-blue-600 to-indigo-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedUniversity && selectedSemester && selectedDepartment && selectedUniSubject && !selectedUniTopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getTopicsForUniSubject(selectedUniversity, selectedSemester, selectedDepartment, selectedUniSubject).map((topic, index) => (
                                        <div key={topic} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                topic,
                                                DEMO_CONTENTS.filter(c => c.organization.universityPath?.university === selectedUniversity && c.organization.universityPath?.semester === selectedSemester && c.organization.universityPath?.department === selectedDepartment && c.organization.universityPath?.subject === selectedUniSubject && c.organization.universityPath?.topic === topic).length,
                                                () => setSelectedUniTopic(topic),
                                                'blue',
                                                'from-blue-600 to-indigo-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedUniversity && selectedSemester && selectedDepartment && selectedUniSubject && selectedUniTopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getContentForUniTopic(selectedUniversity, selectedSemester, selectedDepartment, selectedUniSubject, selectedUniTopic).map((content, index) => (
                                        <div key={content.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            <EnhancedContentCard
                                                content={content}
                                                onClick={() => handleContentClick(content)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* CHANNEL PATH */}
                    {activeTab === 'channel' && (
                        <>
                            {!selectedChannel && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getUniqueChannels().map((channel, index) => (
                                        <div key={channel} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                channel,
                                                DEMO_CONTENTS.filter(c => c.organization.channelPath?.channelName === channel).length,
                                                () => setSelectedChannel(channel),
                                                'blue',
                                                'from-cyan-500 to-blue-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedChannel && !selectedPlaylist && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getPlaylistsForChannel(selectedChannel).map((playlist, index) => (
                                        <div key={playlist} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                playlist,
                                                DEMO_CONTENTS.filter(c => c.organization.channelPath?.channelName === selectedChannel && c.organization.channelPath?.playlistName === playlist).length,
                                                () => setSelectedPlaylist(playlist),
                                                'blue',
                                                'from-cyan-500 to-blue-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedChannel && selectedPlaylist && !selectedChannelTopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getTopicsForPlaylist(selectedChannel, selectedPlaylist).map((topic, index) => (
                                        <div key={topic} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                topic,
                                                DEMO_CONTENTS.filter(c => c.organization.channelPath?.channelName === selectedChannel && c.organization.channelPath?.playlistName === selectedPlaylist && c.organization.channelPath?.topic === topic).length,
                                                () => setSelectedChannelTopic(topic),
                                                'blue',
                                                'from-cyan-500 to-blue-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedChannel && selectedPlaylist && selectedChannelTopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getContentForChannelTopic(selectedChannel, selectedPlaylist, selectedChannelTopic).map((content, index) => (
                                        <div key={content.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            <EnhancedContentCard
                                                content={content}
                                                onClick={() => handleContentClick(content)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* COURSE PATH (New 4-Level) */}
                    {activeTab === 'course' && (
                        <>
                            {!selectedProvider && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getUniqueProviders().map((provider, index) => (
                                        <div key={provider} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                provider,
                                                DEMO_CONTENTS.filter(c => c.organization.coursePath?.provider === provider).length,
                                                () => setSelectedProvider(provider),
                                                'purple',
                                                'from-purple-500 to-pink-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedProvider && !selectedInstructor && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getInstructorsForProvider(selectedProvider).map((instructor, index) => (
                                        <div key={instructor} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                instructor,
                                                DEMO_CONTENTS.filter(c => c.organization.coursePath?.provider === selectedProvider && c.organization.coursePath?.instructor === instructor).length,
                                                () => setSelectedInstructor(instructor),
                                                'purple',
                                                'from-purple-500 to-pink-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedProvider && selectedInstructor && !selectedCourse && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getCoursesForInstructor(selectedProvider, selectedInstructor).map((course, index) => (
                                        <div key={course} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                course,
                                                DEMO_CONTENTS.filter(c => c.organization.coursePath?.provider === selectedProvider && c.organization.coursePath?.instructor === selectedInstructor && c.organization.coursePath?.courseName === course).length,
                                                () => setSelectedCourse(course),
                                                'purple',
                                                'from-purple-500 to-pink-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedProvider && selectedInstructor && selectedCourse && !selectedCourseTopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getTopicsForCourse(selectedProvider, selectedInstructor, selectedCourse).map((topic, index) => (
                                        <div key={topic} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                topic,
                                                DEMO_CONTENTS.filter(c => c.organization.coursePath?.provider === selectedProvider && c.organization.coursePath?.instructor === selectedInstructor && c.organization.coursePath?.courseName === selectedCourse && c.organization.coursePath?.topic === topic).length,
                                                () => setSelectedCourseTopic(topic),
                                                'purple',
                                                'from-purple-500 to-pink-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedProvider && selectedInstructor && selectedCourse && selectedCourseTopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getContentForCourseTopic(selectedProvider, selectedInstructor, selectedCourse, selectedCourseTopic).map((content, index) => (
                                        <div key={content.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            <EnhancedContentCard
                                                content={content}
                                                onClick={() => handleContentClick(content)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* COMPETITIVE EXAMS PATH */}
                    {activeTab === 'competitive_exam' && (
                        <>
                            {!selectedExam && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getUniqueExams().map((exam, index) => (
                                        <div key={exam} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                exam,
                                                DEMO_CONTENTS.filter(c => c.organization.competitiveExamPath?.exam === exam).length,
                                                () => setSelectedExam(exam),
                                                'amber',
                                                'from-amber-500 to-orange-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedExam && !selectedExamYear && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getYearsForExam(selectedExam).map((year, index) => (
                                        <div key={year} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                year,
                                                DEMO_CONTENTS.filter(c => c.organization.competitiveExamPath?.exam === selectedExam && c.organization.competitiveExamPath?.year === year).length,
                                                () => setSelectedExamYear(year),
                                                'amber',
                                                'from-amber-500 to-orange-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedExam && selectedExamYear && !selectedExamSubject && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getSubjectsForExamYear(selectedExam, selectedExamYear).map((subject, index) => (
                                        <div key={subject} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                subject,
                                                DEMO_CONTENTS.filter(c => c.organization.competitiveExamPath?.exam === selectedExam && c.organization.competitiveExamPath?.year === selectedExamYear && c.organization.competitiveExamPath?.subject === subject).length,
                                                () => setSelectedExamSubject(subject),
                                                'amber',
                                                'from-amber-500 to-orange-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedExam && selectedExamYear && selectedExamSubject && !selectedExamTopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getTopicsForExamSubject(selectedExam, selectedExamYear, selectedExamSubject).map((topic, index) => (
                                        <div key={topic} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            {renderCategoryCard(
                                                topic,
                                                DEMO_CONTENTS.filter(c => c.organization.competitiveExamPath?.exam === selectedExam && c.organization.competitiveExamPath?.year === selectedExamYear && c.organization.competitiveExamPath?.subject === selectedExamSubject && c.organization.competitiveExamPath?.topic === topic).length,
                                                () => setSelectedExamTopic(topic),
                                                'amber',
                                                'from-amber-500 to-orange-600'
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedExam && selectedExamYear && selectedExamSubject && selectedExamTopic && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getContentForExamTopic(selectedExam, selectedExamYear, selectedExamSubject, selectedExamTopic).map((content, index) => (
                                        <div key={content.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                            <EnhancedContentCard
                                                content={content}
                                                // Competitive exams link directly to the note, NOT the course gatekeeper
                                                onClick={() => navigate(`/note/${content.id}`)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Transparency Notice */}
                <div className="mt-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-lg animate-in fade-in duration-500 delay-500">
                    <p className="text-xs text-gray-600 font-medium text-center">
                        ℹ️ Content is community-contributed and organized for structured learning.
                    </p>
                </div>
            </div>

            <CourseGatekeeperModal
                isOpen={gatekeeperOpen}
                onClose={() => setGatekeeperOpen(false)}
                courseName={selectedGatedContent?.organization.coursePath?.courseName || ''}
                provider={selectedGatedContent?.organization.coursePath?.provider || 'Coursera'}
            />
        </div>
    );
};
