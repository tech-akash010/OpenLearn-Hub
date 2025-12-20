
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_SUBJECTS, INITIAL_TOPICS, INITIAL_SUBTOPICS } from '../constants';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ChevronRight, FileText, Plus, CheckCircle2, Bookmark, ArrowRight, Sparkles } from 'lucide-react';

export const SubtopicExplorer: React.FC = () => {
  const { subjectId, topicId } = useParams<{ subjectId: string, topicId: string }>();
  const subject = INITIAL_SUBJECTS.find(s => s.id === subjectId);
  const topic = INITIAL_TOPICS.find(t => t.id === topicId);
  const subtopics = INITIAL_SUBTOPICS.filter(st => st.topicId === topicId);

  if (!subject || !topic) return <div>Topic not found</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
      <Breadcrumbs items={[
        { label: 'Hub', path: '/hub' },
        { label: subject.name, path: `/hub/subject/${subject.id}` },
        { label: topic.title, path: `/hub/subject/${subject.id}/topic/${topic.id}` }
      ]} />
      
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100">
            <FileText size={18} />
          </div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Hierarchy Level 3</span>
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">{topic.title} Components</h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
          Detailed specific concepts under the {topic.title} umbrella. Each subtopic contains verified community resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subtopics.map(st => (
          <Link
            key={st.id}
            to={`/hub/subject/${subject.id}/topic/${topic.id}/subtopic/${st.id}`}
            className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-125 transition-all text-indigo-600">
              <CheckCircle2 size={120} />
            </div>
            
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <FileText size={22} />
              </div>
              <button className="p-2 text-gray-300 hover:text-indigo-600 transition-colors">
                <Bookmark size={20} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {st.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
              {st.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ready for Exam</span>
              </div>
              <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                Browse <ArrowRight size={14} className="ml-1" />
              </div>
            </div>
          </Link>
        ))}

        <button className="group bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:bg-white hover:border-indigo-300 transition-all min-h-[220px]">
          <div className="w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
            <Plus size={24} />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-1">New Subtopic</h4>
          <p className="text-xs text-gray-400 max-w-[180px]">Define a specific niche within this topic area.</p>
        </button>
      </div>

      {/* Contribution Highlight */}
      <div className="mt-12 bg-gradient-to-br from-indigo-600 to-blue-700 p-8 md:p-12 rounded-[3rem] text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2 bg-white/10 w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-md">
            <Sparkles size={12} />
            <span>AI Suggestion</span>
          </div>
          <h3 className="text-3xl font-black mb-4">Complete the {topic.title} Path.</h3>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
            Our AI analysis shows that this topic is missing a subtopic for <strong>"Future Trends & Research"</strong>. 
            Contribute this missing link to earn a "Pathfinder" badge and 500 Reputation Points.
          </p>
          <button className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-indigo-50 hover:scale-105 transition-all">
            Propose Missing Link
          </button>
        </div>
        {/* Abstract Background circles */}
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 border-[32px] border-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute top-1/4 -right-10 w-40 h-40 border-[16px] border-white/5 rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};
