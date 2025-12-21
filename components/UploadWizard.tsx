
import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Plus,
  Cloud,
  Image as ImageIcon,
  Type as TextIcon,
  Trash2,
  UploadCloud,
  FileText
} from 'lucide-react';
import { INITIAL_SUBJECTS, INITIAL_TOPICS, INITIAL_SUBTOPICS } from '../constants';
import { Difficulty, Quiz, ContentSourceMetadata } from '../types';
import { driveSyncService } from '../services/driveSyncService';
import { authService } from '../services/authService';
import { QuizAttachment } from './QuizAttachment';
import { ContentSourceForm } from './ContentSourceForm';
import { validateSourceRequirement } from '../services/contentSourceValidator';
import { RichTextEditor } from './RichTextEditor';
import { WatermarkInput, WatermarkConfig } from './WatermarkInput';

interface UploadWizardProps {
  onClose: () => void;
  onComplete: (data: any) => void;
}

export const UploadWizard: React.FC<UploadWizardProps> = ({ onClose, onComplete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    subject: '',
    topic: '',
    subtopic: '',
    title: '',
    content: '',
    difficulty: Difficulty.Beginner,
    isNewSubject: false,
    isNewTopic: false,
    isNewSubtopic: false,
    newName: '',
    attachedImage: null as string | null,
    attachedPdf: null as { name: string; data: string } | null,
    attachedQuiz: null as Quiz | null,
    sourceMetadata: null as ContentSourceMetadata | null,
    watermarkConfig: {
      enabled: false,
      text: authService.getUser()?.name || '',
      position: 'bottom-right' as const,
      opacity: 0.7
    }
  });

  const [filteredTopics, setFilteredTopics] = useState(INITIAL_TOPICS);
  const [filteredSubtopics, setFilteredSubtopics] = useState(INITIAL_SUBTOPICS);

  useEffect(() => {
    setFilteredTopics(INITIAL_TOPICS.filter(t => t.subjectId === selection.subject));
    if (selection.subject) {
      setSelection(prev => ({ ...prev, topic: '', subtopic: '' }));
    }
  }, [selection.subject]);

  useEffect(() => {
    setFilteredSubtopics(INITIAL_SUBTOPICS.filter(st => st.topicId === selection.topic));
    if (selection.topic) {
      setSelection(prev => ({ ...prev, subtopic: '' }));
    }
  }, [selection.topic]);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelection(prev => ({ ...prev, attachedImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelection(prev => ({
          ...prev,
          attachedPdf: {
            name: file.name,
            data: reader.result as string
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelection(prev => ({ ...prev, attachedImage: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePdf = () => {
    setSelection(prev => ({ ...prev, attachedPdf: null }));
    if (pdfInputRef.current) pdfInputRef.current.value = '';
  };

  const canProgress = () => {
    if (step === 1) return selection.subject !== '' || (selection.isNewSubject && selection.newName);
    if (step === 2) return selection.topic !== '' || (selection.isNewTopic && selection.newName);
    if (step === 3) return selection.subtopic !== '' || (selection.isNewSubtopic && selection.newName);
    if (step === 4) return selection.title && (selection.content || selection.attachedImage || selection.attachedPdf);
    if (step === 5) {
      // Source tags are required
      if (!selection.sourceMetadata) return false;
      const validation = validateSourceRequirement(selection.sourceMetadata);
      return validation.valid;
    }
    if (step === 6) return true; // Quiz is optional
    return false;
  };

  const handleSubmit = () => {
    const subject = INITIAL_SUBJECTS.find(s => s.id === selection.subject) || { name: selection.newName, id: 'new' } as any;
    const topic = INITIAL_TOPICS.find(t => t.id === selection.topic) || { title: selection.newName, id: 'new' } as any;
    const subtopic = INITIAL_SUBTOPICS.find(st => st.id === selection.subtopic) || { title: selection.newName, id: 'new' } as any;

    driveSyncService.syncContribution({
      subject,
      topic,
      subtopic,
      title: selection.title,
      quiz: selection.attachedQuiz
    });

    onComplete(selection);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-10 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Academic Contribution</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Multi-modal knowledge sync</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Steps Progress */}
        <div className="flex px-10 pt-6 space-x-2">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-blue-600' : 'bg-gray-100'}`} />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-blue-600 uppercase tracking-widest">Level 1: Subject</label>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">Where does this belong?</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {INITIAL_SUBJECTS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelection({ ...selection, subject: s.id, isNewSubject: false })}
                    className={`p-6 rounded-3xl border-2 text-left transition-all group ${selection.subject === s.id ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-50' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                  >
                    <span className="font-black text-lg block group-hover:text-blue-600 transition-colors">{s.name}</span>
                    <span className="text-xs text-gray-500 mt-2 line-clamp-1">{s.description}</span>
                  </button>
                ))}
                <button
                  onClick={() => setSelection({ ...selection, isNewSubject: true, subject: '' })}
                  className={`p-6 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center space-y-2 transition-all ${selection.isNewSubject ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50 text-gray-400'}`}
                >
                  <Plus size={24} />
                  <span className="font-bold text-sm">Propose New Subject</span>
                </button>
              </div>
              {selection.isNewSubject && (
                <input
                  type="text"
                  placeholder="Enter Subject Name..."
                  className="w-full px-5 py-3 rounded-2xl bg-amber-900 text-white border-none focus:ring-4 focus:ring-amber-200 outline-none font-bold placeholder:text-amber-400"
                  value={selection.newName}
                  onChange={e => setSelection({ ...selection, newName: e.target.value })}
                />
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-blue-600 uppercase tracking-widest">Level 2: Topic</label>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">Define the core theme</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {filteredTopics.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelection({ ...selection, topic: t.id, isNewTopic: false })}
                    className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${selection.topic === t.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <span className="font-bold text-gray-800">{t.title}</span>
                    {selection.topic === t.id && <Check size={20} className="text-blue-600" />}
                  </button>
                ))}
                <button
                  onClick={() => setSelection({ ...selection, isNewTopic: true, topic: '' })}
                  className={`p-5 rounded-2xl border-2 border-dashed text-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 ${selection.isNewTopic ? 'border-blue-600 bg-blue-50 text-blue-600' : ''}`}
                >
                  <Plus size={20} />
                  <span className="font-bold text-sm">Add New Topic</span>
                </button>
              </div>
              {selection.isNewTopic && (
                <input
                  type="text"
                  placeholder="Topic Name..."
                  className="w-full px-5 py-3 rounded-2xl bg-blue-900 text-white border-none focus:ring-4 focus:ring-blue-200 outline-none font-bold placeholder:text-blue-400"
                  value={selection.newName}
                  onChange={e => setSelection({ ...selection, newName: e.target.value })}
                />
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-blue-600 uppercase tracking-widest">Level 3: Subtopic</label>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">Granular classification</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {filteredSubtopics.map(st => (
                  <button
                    key={st.id}
                    onClick={() => setSelection({ ...selection, subtopic: st.id, isNewSubtopic: false })}
                    className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${selection.subtopic === st.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <span className="font-bold text-gray-800">{st.title}</span>
                    {selection.subtopic === st.id && <Check size={20} className="text-blue-600" />}
                  </button>
                ))}
                <button
                  onClick={() => setSelection({ ...selection, isNewSubtopic: true, subtopic: '' })}
                  className={`p-5 rounded-2xl border-2 border-dashed text-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 ${selection.isNewSubtopic ? 'border-blue-600 bg-blue-50 text-blue-600' : ''}`}
                >
                  <Plus size={20} />
                  <span className="font-bold text-sm">Define New Subtopic</span>
                </button>
              </div>
              {selection.isNewSubtopic && (
                <input
                  type="text"
                  placeholder="Subtopic Name..."
                  className="w-full px-5 py-3 rounded-2xl bg-blue-900 text-white border-none focus:ring-4 focus:ring-blue-200 outline-none font-bold placeholder:text-blue-400"
                  value={selection.newName}
                  onChange={e => setSelection({ ...selection, newName: e.target.value })}
                />
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Resource Header</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-900 text-white border-none focus:ring-4 focus:ring-blue-200 outline-none text-xl font-black placeholder:text-gray-500"
                    placeholder="Enter a descriptive title..."
                    value={selection.title}
                    onChange={e => setSelection({ ...selection, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Writing Area */}
                  <div className="lg:col-span-7 space-y-3">
                    <label className="flex items-center text-xs font-black text-blue-600 uppercase tracking-widest">
                      <TextIcon size={14} className="mr-2" /> Comprehensive Explanation (MS Word-like Editor)
                    </label>
                    <RichTextEditor
                      value={selection.content}
                      onChange={(html) => setSelection({ ...selection, content: html })}
                      placeholder="Explain the core concepts in detail... Use the toolbar to format your text with headings, lists, and more."
                    />
                  </div>

                  {/* Attachment Column */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Photo Area */}
                    <div className="space-y-3">
                      <label className="flex items-center text-xs font-black text-indigo-600 uppercase tracking-widest">
                        <ImageIcon size={14} className="mr-2" /> Visual Aids
                      </label>

                      {!selection.attachedImage ? (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="group relative h-40 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all overflow-hidden"
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                          <UploadCloud size={24} className="text-gray-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all" />
                          <p className="mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Image (JPG, PNG)</p>
                        </div>
                      ) : (
                        <div className="relative h-40 rounded-[2rem] overflow-hidden group shadow-md border border-gray-100">
                          <img
                            src={selection.attachedImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={removeImage}
                              className="p-3 bg-red-600 text-white rounded-xl hover:scale-110 transition-transform shadow-xl"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* PDF Area */}
                    <div className="space-y-3">
                      <label className="flex items-center text-xs font-black text-emerald-600 uppercase tracking-widest">
                        <FileText size={14} className="mr-2" /> Document Attachment (PDF)
                      </label>

                      {!selection.attachedPdf ? (
                        <div
                          onClick={() => pdfInputRef.current?.click()}
                          className="group relative h-40 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all overflow-hidden"
                        >
                          <input
                            type="file"
                            ref={pdfInputRef}
                            className="hidden"
                            accept="application/pdf"
                            onChange={handlePdfUpload}
                          />
                          <UploadCloud size={24} className="text-gray-400 group-hover:text-emerald-600 group-hover:scale-110 transition-all" />
                          <p className="mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">PDF DOCUMENT</p>
                        </div>
                      ) : (
                        <div className="relative h-40 rounded-[2rem] overflow-hidden group shadow-md bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center p-6 text-center">
                          <FileText size={40} className="text-emerald-600 mb-2" />
                          <p className="text-xs font-bold text-emerald-900 truncate w-full px-4">{selection.attachedPdf.name}</p>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={removePdf}
                              className="p-3 bg-red-600 text-white rounded-xl hover:scale-110 transition-transform shadow-xl"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center space-x-4">
                  <div className="p-3 bg-blue-600 text-white rounded-2xl">
                    <Cloud size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-900 text-sm">Cross-Device Synchronization</h5>
                    <p className="text-blue-700/70 text-xs">Writing, visuals, and PDF documents will be bundled into your personal vault.</p>
                  </div>
                </div>

                {/* Watermark Section */}
                <WatermarkInput
                  value={selection.watermarkConfig}
                  onChange={(config) => setSelection({ ...selection, watermarkConfig: config })}
                  defaultText={authService.getUser()?.name || 'Your Name'}
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="space-y-2 mb-6">
                <label className="text-xs font-black text-blue-600 uppercase tracking-widest">Step 5: Academic Source</label>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">Add source reference</h3>
                <p className="text-sm text-gray-600">Provide at least one academic source for your content</p>
              </div>

              <ContentSourceForm
                onSourceChange={(metadata) => {
                  setSelection({ ...selection, sourceMetadata: metadata });
                }}
                initialMetadata={selection.sourceMetadata || undefined}
              />
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="space-y-2 mb-6">
                <label className="text-xs font-black text-purple-600 uppercase tracking-widest">Step 6: Quiz (Optional)</label>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">Add a quiz to test knowledge</h3>
                <p className="text-sm text-gray-600">Help learners verify their understanding with an optional quiz</p>
              </div>

              <QuizAttachment
                user={authService.getUser()!}
                subject={INITIAL_SUBJECTS.find(s => s.id === selection.subject)?.name || selection.newName}
                topic={INITIAL_TOPICS.find(t => t.id === selection.topic)?.title || selection.newName}
                onQuizAttached={(quiz) => {
                  setSelection({ ...selection, attachedQuiz: quiz });
                }}
                onSkip={() => { }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-10 py-8 border-t border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-black transition-all ${step === 1 ? 'hidden' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={20} /> <span>Previous</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-2xl font-black text-red-500 hover:bg-red-50 transition-all"
            >
              Cancel
            </button>
          </div>
          <button
            onClick={step === 6 ? handleSubmit : handleNext}
            disabled={!canProgress()}
            className={`flex items-center space-x-2 px-10 py-3.5 rounded-2xl font-black transition-all shadow-xl ${canProgress() ? 'bg-blue-600 text-white shadow-blue-200 hover:scale-105 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            <span>{step === 6 ? 'Confirm & Sync' : 'Next Level'}</span>
            {step < 6 && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
