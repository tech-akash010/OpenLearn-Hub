
import React from 'react';
import { ArrowRight, BookOpen, Flame, TrendingUp, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Heatmap } from '../components/Heatmap';

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; delta?: string; color: string }> = ({ icon, label, value, delta, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex items-start justify-between">
      <div className={`p-3 rounded-xl ${color} text-white`}>
        {icon}
      </div>
      {delta && (
        <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <TrendingUp size={12} className="mr-1" /> {delta}
        </span>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Jane</h1>
        <p className="text-gray-500 mt-2">You've helped 12 students this week. Keep up the great work!</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<BookOpen size={24} />} 
          label="Notes Linked" 
          value="42" 
          delta="+5" 
          color="bg-blue-600" 
        />
        <StatCard 
          icon={<Users size={24} />} 
          label="Impact Score" 
          value="1,240" 
          delta="+12%" 
          color="bg-indigo-600" 
        />
        <StatCard 
          icon={<Flame size={24} />} 
          label="Current Streak" 
          value="7 Days" 
          color="bg-orange-500" 
        />
        <StatCard 
          icon={<Award size={24} />} 
          label="Reputation" 
          value="Level 4" 
          color="bg-purple-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Heatmap />
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recently Updated Topics</h2>
              <Link to="/hub" className="text-blue-600 text-sm font-semibold flex items-center hover:underline">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Shortest Job First Algorithm', subject: 'Computer Science', updated: '2h ago', status: 'In Review' },
                { title: 'Cell Membrane Structure', subject: 'Biology', updated: '5h ago', status: 'Verified' },
                { title: 'Fourier Series Basics', subject: 'Mathematics', updated: '1d ago', status: 'Verified' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:border-gray-200 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.subject} • Updated {item.updated}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                    item.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg">
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <Flame size={20} className="mr-2 text-orange-400" /> Improvement Mode
            </h3>
            <p className="text-blue-100 text-sm mb-6">
              There are 12 topics in your subjects that need high-quality explanations. Contribute now and earn 2x reputation points!
            </p>
            <button className="w-full py-3 bg-white text-blue-700 font-bold rounded-xl shadow-md hover:bg-blue-50 transition-colors">
              Start Contributing
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4">Exam Readiness</h3>
            <div className="space-y-4">
              {[
                { name: 'Midterm 1: OS', progress: 75 },
                { name: 'Semester: DSA', progress: 42 },
                { name: 'Bio Quiz', progress: 98 },
              ].map((exam, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{exam.name}</span>
                    <span className="text-blue-600 font-bold">{exam.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${exam.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border-2 border-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Manage Exams
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
