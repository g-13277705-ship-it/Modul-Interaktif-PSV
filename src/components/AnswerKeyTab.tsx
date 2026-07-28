import React, { useState } from 'react';
import { QUESTIONS, SECTIONS } from '../data/quizData';
import { FileCheck, Search, Filter, BookOpen, CheckCircle2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const AnswerKeyTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredQuestions = QUESTIONS.filter((q) => {
    const matchesSection = selectedSection === 'all' || q.sectionId === selectedSection;
    const queryLower = searchQuery.toLowerCase();
    const matchesSearch =
      q.questionText.toLowerCase().includes(queryLower) ||
      q.options.some((opt) => opt.toLowerCase().includes(queryLower)) ||
      q.explanation.toLowerCase().includes(queryLower) ||
      q.sectionTitle.toLowerCase().includes(queryLower);

    return matchesSection && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-white">
              Skema Jawapan & Panduan Ulang Kaji
            </h2>
            <p className="text-xs text-slate-300">
              Rujukan lengkap jawapan tepat beserta nota ulasan fakta Sejarah & Apresiasi Seni Visual (PSV KSSM).
            </p>
          </div>
        </div>
      </div>

      {/* Search & Topic Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kunci soalan, nama tokoh, atau istilah seni..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Filter count indicator */}
          <div className="text-xs font-semibold text-slate-500 shrink-0">
            Menunjukkan <span className="text-indigo-600 font-bold">{filteredQuestions.length}</span> daripada {QUESTIONS.length} soalan
          </div>
        </div>

        {/* Topic filter chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedSection === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua Bidang ({QUESTIONS.length})
          </button>

          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSection === sec.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sec.code}: {sec.shortTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Answer Key Cards List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 space-y-2">
            <p className="font-bold text-sm">Tiada soalan ditemui.</p>
            <p className="text-xs">Sila cuba carian menggunakan kata kunci yang lain.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        Soalan #{q.id}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{q.sectionTitle}</span>
                    </div>

                    <h3 className="font-['Outfit'] font-bold text-base text-slate-900 leading-snug">
                      {q.questionText}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-300 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Jawapan: {q.answerLetter}</span>
                    </span>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Options List Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const letter = ['A', 'B', 'C', 'D'][optIdx];
                    const isCorrect = q.correctAnswer === optIdx;

                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border flex items-center space-x-2.5 ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                            : 'bg-slate-50/60 border-slate-200 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Educational Explanation Note */}
                <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-1">
                  <div className="flex items-center space-x-1 font-bold text-indigo-900">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Ulasan & Fasal Faktu:</span>
                  </div>
                  <p className="text-indigo-950 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
