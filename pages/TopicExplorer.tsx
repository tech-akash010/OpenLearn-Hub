
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_SUBJECTS, INITIAL_TOPICS } from '../constants';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ChevronRight, Layout, Plus, Star, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const TopicExplorer: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject = INITIAL_SUBJECTS.find(s => s.id === subjectId);
  const topics = INITIAL_TOPICS.filter(t => t.subjectId === subjectId);

  if (!subject) return <div>Subject not found</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-6xl mx-auto">
      <Breadcrumbs items={[{ label: 'Hub', path: '/hub' }, { label: subject.name, path: `/hub/subject/${subject.id}` }]} />
      
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100">
              <Layout size={24} />
            </div>
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Hierarchy Level 2</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">{subject.name}</h1>
          <p className="text-xl text-gray-500 leading-relaxed font-medium">{subject.description}</p>
        </div>
        <div className="flex items-center bg-white px-8 py-6 rounded-[2rem] border border-gray-100 shadow-sm space-x-8">
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Topics</p>
            <p className="text-3xl font-black text-gray-900">{topics.length}</p>
          </div>
          <div className="w-px h-12 bg-gray-100"></div>
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Coverage</p>
            <p className="text-3xl font-black text-emerald-600">85%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {topics.map(topic => (
          <Link
            key={topic.id}
            to={`/hub/subject/${subject.id}/topic/${topic.id}`}
            className="group bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 flex flex-col relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    topic.status === 'verified' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {topic.status}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    {topic.difficulty}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                  {topic.title}
                </h3>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-300 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <ArrowRight size={28} />
              </div>
            </div>
            
            <p className="text-gray-500 font-medium leading-relaxed mb-10 flex-1 h-12 line-clamp-2">
              {topic.description}
            </p>

            <div className="flex items-center justify-between pt-8 border-t border-gray-50">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-xs text-gray-400 font-black uppercase tracking-widest">
                  <Star size={16} className="text-amber-400 mr-2" /> {topic.votes}
                </div>
                <div className="flex items-center text-xs text-gray-400 font-black uppercase tracking-widest">
                  <Users size={16} className="text-blue-400 mr-2" /> 12 Experts
                </div>
              </div>
              <div className="flex items-center text-xs font-black text-blue-600 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all uppercase tracking-widest">
                Browse Subtopics <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
            
            {/* Corner Decorative */}
            <CheckCircle2 size={80} className="absolute -bottom-6 -right-6 text-gray-50/50 group-hover:text-blue-50/80 transition-colors" />
          </Link>
        ))}

        <button className="bg-gray-50/50 p-10 rounded-[3rem] border-2 border-dashed border-gray-200 hover:bg-white hover:border-blue-300 transition-all group flex flex-col items-center justify-center text-center min-h-[340px]">
          <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
            <Plus size={32} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Add New Topic</h3>
          <p className="text-gray-500 font-medium max-w-[280px] leading-relaxed">
            Expand the {subject.name} core curriculum with a verified new topic area.
          </p>
        </button>
      </div>
    </div>
  );
};
