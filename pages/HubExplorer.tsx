
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Layers, Globe, ChevronRight, Star, ArrowUp } from 'lucide-react';
import { INITIAL_SUBJECTS, INITIAL_TOPICS } from '../constants';

export const HubExplorer: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Resource Hub</h1>
          <p className="text-gray-500 mt-1">High-quality, peer-reviewed learning materials curated by the community.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center whitespace-nowrap self-start">
          <ArrowUp size={18} className="mr-2" /> Contribute New Topic
        </button>
      </header>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INITIAL_SUBJECTS.map((subject) => (
          <div key={subject.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {subject.icon === 'Cpu' ? <Cpu /> : subject.icon === 'Layers' ? <Layers /> : <Globe />}
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded uppercase">
                {subject.topics.length} Topics
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{subject.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Curated notes, diagrams, and revision guides.</p>
            <div className="mt-6 space-y-2">
              {INITIAL_TOPICS.filter(t => t.subjectId === subject.id).map(topic => (
                <Link 
                  key={topic.id} 
                  to={`/hub/topic/${topic.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 border border-transparent hover:border-gray-200 transition-all"
                >
                  <span className="truncate pr-4">{topic.title.split(' - ')[1]}</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Trending Topics */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Star size={20} className="mr-2 text-yellow-500" /> Trending This Week
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_TOPICS.map(topic => (
            <Link 
              key={topic.id}
              to={`/hub/topic/${topic.id}`}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                    {topic.subjectId.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">Updated 2d ago</span>
                </div>
                <h4 className="font-bold text-gray-900 leading-tight">{topic.title}</h4>
                <div className="flex items-center mt-4 space-x-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    {topic.contributors.map((c, i) => (
                      <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-[8px] font-bold">
                        {c.charAt(5).toUpperCase()}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500">{topic.contributors.length} contributors</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center text-xs font-semibold text-gray-600">
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md mr-2">{topic.readiness}% Ready</span>
                  <span className="text-gray-400 font-normal">Difficulty: {topic.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
