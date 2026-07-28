import React, { useState } from 'react';
import { QuizAttempt } from '../types';
import { QUESTIONS, SECTIONS, GRADE_RULES } from '../data/quizData';
import { CuteArtMascot, CuteTrophyBadge, CuteSparkleStar, CuteRibbonBadge } from './CuteCartoonIcons';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Printer,
  Download,
  BookOpen,
  Filter,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  GraduationCap,
} from 'lucide-react';

interface ResultTabProps {
  attempt: QuizAttempt;
  onRetakeQuiz: () => void;
  onOpenAnswerKey: () => void;
  onOpenPrintModal: () => void;
}

export const ResultTab: React.FC<ResultTabProps> = ({
  attempt,
  onRetakeQuiz,
  onOpenAnswerKey,
  onOpenPrintModal,
}) => {
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'flagged'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

  const gradeRule =
    GRADE_RULES.find(
      (r) => attempt.percentage >= r.minScorePct
    ) || GRADE_RULES[2];

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Filter questions for review
  const filteredQuestions = QUESTIONS.filter((q) => {
    const userSelected = attempt.answers[q.id];
    const isCorrect = userSelected === q.correctAnswer;
    const isFlagged = attempt.flaggedQuestions?.includes(q.id);

    if (reviewFilter === 'correct') return isCorrect;
    if (reviewFilter === 'incorrect') return !isCorrect;
    if (reviewFilter === 'flagged') return isFlagged;
    return true;
  });

  const downloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(attempt, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `Keputusan_PSV_${attempt.studentName.replace(/\s+/g, '_')}_${attempt.timestamp}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Score Card Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="shrink-0 relative">
              <CuteArtMascot className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md" mood={attempt.percentage >= 80 ? 'excited' : 'happy'} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase border ${gradeRule.badgeBg} shadow-2xs`}>
                  GRED: {attempt.grade}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-mono">{attempt.dateFormatted}</span>
              </div>
              <h2 className="font-['Outfit'] font-extrabold text-2xl text-slate-900 mt-1">
                Keputusan Pentaksiran Kendiri 🎨
              </h2>
              <p className="text-xs text-slate-600">
                Murid: <strong className="text-slate-900">{attempt.studentName}</strong> ({attempt.className})
              </p>
            </div>
          </div>

          {/* Big Score Counter */}
          <div className="bg-gradient-to-br from-amber-50 to-pink-50 px-6 py-4 rounded-3xl border-2 border-amber-200 text-center shrink-0 min-w-[170px] shadow-sm">
            <CuteRibbonBadge className="w-8 h-8 mx-auto -mt-1 mb-1" label={`${attempt.percentage}%`} />
            <span className="text-3xl font-black font-['Outfit'] text-slate-900">
              {attempt.score} <span className="text-base font-medium text-slate-400">/ {attempt.totalQuestions}</span>
            </span>
            <div className="text-xs font-bold text-slate-700 mt-0.5">
              Peratusan: <span className="text-pink-600 font-extrabold">{attempt.percentage}%</span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-center space-x-1 mt-1 font-mono">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{formatTimer(attempt.timeTakenSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Motivational Feedback */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100/90 via-pink-100/90 to-purple-100/90 border-2 border-pink-200 text-xs text-slate-900 flex items-start space-x-3">
          <CuteSparkleStar className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-black text-slate-900">{gradeRule.subtext}</p>
            <p className="text-slate-700 font-medium">
              Ulasan tajuk memperlihatkan analisis terperinci mengikut bahagian sukatan PSV di bawah.
            </p>
          </div>
        </div>

        {/* Section Score Breakdown Grid */}
        <div className="space-y-3">
          <h3 className="font-['Outfit'] font-bold text-sm text-slate-900">
            Analisis Skor Mengikut Tajuk Sukatan
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SECTIONS.map((sec) => {
              const secScoreData = attempt.sectionScores[sec.id] || { score: 0, total: 10 };
              const secPct = Math.round((secScoreData.score / secScoreData.total) * 100);

              return (
                <div key={sec.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{sec.code}: {sec.shortTitle}</span>
                    <span className="font-extrabold font-mono text-indigo-700">
                      {secScoreData.score} / {secScoreData.total} ({secPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${secPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenPrintModal}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF Sijil</span>
            </button>

            <button
              onClick={downloadJSON}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Muat Turun (JSON)</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onRetakeQuiz}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulang Kuiz Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Answer Review List Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-['Outfit'] font-bold text-xl text-slate-900">
              Semakan Semua Jawapan & Ulasan
            </h3>
            <p className="text-xs text-slate-500">
              Lihat jawapan anda berbanding skema jawapan rasmi berserta penjelasan akademik.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                reviewFilter === 'all' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({QUESTIONS.length})
            </button>
            <button
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                reviewFilter === 'correct' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Betul ({attempt.score})
            </button>
            <button
              onClick={() => setReviewFilter('incorrect')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                reviewFilter === 'incorrect' ? 'bg-white text-red-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Salah ({QUESTIONS.length - attempt.score})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const userAnsIdx = attempt.answers[q.id];
            const isCorrect = userAnsIdx === q.correctAnswer;
            const isUnanswered = userAnsIdx === undefined || userAnsIdx === null;
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-red-200 bg-red-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        Soalan #{q.id}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{q.sectionTitle}</span>
                    </div>

                    <h4 className="font-['Outfit'] font-bold text-sm text-slate-900 leading-snug pt-1">
                      {q.questionText}
                    </h4>
                  </div>

                  <div className="shrink-0 flex items-center space-x-2">
                    {isCorrect ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Betul</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Salah</span>
                      </span>
                    )}

                    <button
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-500 cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Answers Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/60 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Jawapan Anda:</span>
                    <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isUnanswered
                        ? 'Tidak Dijawab'
                        : `${['A', 'B', 'C', 'D'][userAnsIdx]}) ${q.options[userAnsIdx]}`}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-emerald-700 text-[10px] uppercase font-bold block mb-0.5">Jawapan Betul (Skema):</span>
                    <span className="font-bold text-emerald-900">
                      {q.answerLetter}) {q.options[q.correctAnswer]}
                    </span>
                  </div>
                </div>

                {/* Educational Explanation */}
                <div className="mt-3 p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs space-y-1">
                  <span className="font-bold text-indigo-900 block">Penjelasan & Nota Tambahan:</span>
                  <p className="text-indigo-950 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
