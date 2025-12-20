
import React, { useState } from 'react';
import { 
  Cloud, 
  Search, 
  RefreshCw, 
  FileText, 
  Folder, 
  Link as LinkIcon, 
  Zap,
  Check,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { geminiService } from '../services/geminiService';

export const DriveOrganizer: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unlinked'>('all');
  
  // Added mimeType to mockNotes to satisfy the UI logic requirements
  const mockNotes = [
    { id: '1', name: 'lecture_oct_12.pdf', subject: 'OS', topic: 'Scheduling', status: 'linked', date: '2024-10-12', mimeType: 'pdf' },
    { id: '2', name: 'Untitled Note 1.docx', subject: 'Math', topic: 'Calc', status: 'unlinked', date: '2024-10-15', mimeType: 'docx' },
    { id: '3', name: 'IMG_4523.jpg', subject: 'Biology', topic: 'Cells', status: 'linked', date: '2024-10-18', mimeType: 'image' },
    { id: '4', name: 'Quick_revision.txt', subject: 'None', topic: 'None', status: 'unlinked', date: '2024-10-20', mimeType: 'text' },
  ];

  const handleScan = async () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000); // Mock scan
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Drive Organizer</h1>
          <p className="text-gray-500 mt-1">Personal notes automatically mapped to Hub subjects and topics.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleScan}
            disabled={isScanning}
            className="bg-white border-2 border-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center shadow-sm"
          >
            <RefreshCw size={18} className={`mr-2 ${isScanning ? 'animate-spin' : ''}`} /> 
            {isScanning ? 'Syncing...' : 'Sync Drive'}
          </button>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center">
            <Zap size={18} className="mr-2" /> One-Click Cleanup
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="font-bold mb-4">Storage Map</h4>
            <div className="space-y-4">
              {[
                { name: 'Computer Science', count: 12, color: 'bg-blue-500' },
                { name: 'Mathematics', count: 8, color: 'bg-indigo-500' },
                { name: 'Biology', count: 4, color: 'bg-emerald-500' },
                { name: 'Unorganized', count: 7, color: 'bg-gray-300' },
              ].map((folder, i) => (
                <div key={i} className="flex items-center group cursor-pointer">
                  <div className={`w-2 h-10 rounded-full ${folder.color} mr-3`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-gray-700">{folder.name}</span>
                      <span className="text-xs text-gray-400">{folder.count} files</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                      <div className={`h-full ${folder.color}`} style={{ width: `${(folder.count/31)*100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl text-white shadow-xl">
            <h4 className="font-bold mb-2 flex items-center">
              <Zap size={18} className="mr-2 text-yellow-400" /> Smart Renaming
            </h4>
            <p className="text-gray-400 text-sm mb-4">AI suggests descriptive names based on content semantic analysis.</p>
            <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700 mb-4">
              <div className="text-[10px] text-gray-500 line-through">Untitled_Note_1.pdf</div>
              <div className="text-xs text-blue-400 font-bold mt-1 flex items-center italic">
                <Check size={12} className="mr-1" /> OS_Process_Scheduling_Lab.pdf
              </div>
            </div>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold transition-colors">
              Apply AI Suggestions
            </button>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  All Files
                </button>
                <button 
                  onClick={() => setActiveTab('unlinked')}
                  className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'unlinked' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Unlinked (7)
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter Drive..." 
                  className="pl-9 pr-4 py-2 border-transparent bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-lg text-sm transition-all"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {(activeTab === 'all' ? mockNotes : mockNotes.filter(n => n.status === 'unlinked')).map((file) => (
                <div key={file.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center group">
                  <div className="p-3 bg-gray-50 rounded-xl mr-4 group-hover:bg-white transition-colors">
                    {/* Fixed check for file.mimeType */}
                    {file.mimeType === 'image' ? <Cloud size={20} className="text-purple-500" /> : <FileText size={20} className="text-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-gray-900 truncate">{file.name}</h5>
                    <p className="text-xs text-gray-500 flex items-center mt-0.5">
                      <Folder size={12} className="mr-1" /> My Drive / {file.subject || 'Unsorted'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {file.status === 'linked' ? (
                      <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        <LinkIcon size={12} className="mr-1" /> Linked to Hub
                      </span>
                    ) : (
                      <button className="flex items-center text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100 transition-all">
                        <LinkIcon size={14} className="mr-1" /> Link Topic
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-50 text-center">
              <p className="text-sm text-gray-500 mb-4">Can't find what you're looking for?</p>
              <button className="px-6 py-2 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-white transition-all text-sm">
                Open Full Explorer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
