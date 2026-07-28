import React, { useState } from 'react';
import { QuizAttempt, StudentProfile } from '../types';
import { CuteTrophyBadge, CuteCrownIcon, CuteSparkleStar, CuteRibbonBadge } from './CuteCartoonIcons';
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Search,
  Filter,
  Users,
  Sparkles,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Zap,
} from 'lucide-react';

interface LeaderboardProps {
  quizHistory?: QuizAttempt[];
  attempts?: QuizAttempt[];
  currentStudent?: StudentProfile;
  currentStudentProfile?: StudentProfile;
}

interface LeaderboardEntry {
  rank: number;
  studentName: string;
  className: string;
  highScorePercentage: number;
  totalQuizzesCompleted: number;
  bestScoreDate: string;
  isCurrentStudent: boolean;
  avatarColor: string;
}

// Sample benchmark classmates to ensure leaderboard is vibrant and competitive
const DEFAULT_CLASSMATES = [
  { studentName: 'Nurul Ain Fatihah', className: '5 Alfa', highScorePercentage: 95, totalQuizzesCompleted: 8, bestScoreDate: '26 Jul 2026', avatarColor: 'bg-emerald-500' },
  { studentName: 'Muhammad Harith', className: '5 Alfa', highScorePercentage: 90, totalQuizzesCompleted: 6, bestScoreDate: '25 Jul 2026', avatarColor: 'bg-indigo-500' },
  { studentName: 'Siti Sarah Zulaikha', className: '5 Beta', highScorePercentage: 85, totalQuizzesCompleted: 5, bestScoreDate: '24 Jul 2026', avatarColor: 'bg-purple-500' },
  { studentName: 'Danial Irfan', className: '5 Alfa', highScorePercentage: 80, totalQuizzesCompleted: 4, bestScoreDate: '23 Jul 2026', avatarColor: 'bg-blue-500' },
  { studentName: 'Adam Rayyan', className: '5 Beta', highScorePercentage: 75, totalQuizzesCompleted: 3, bestScoreDate: '22 Jul 2026', avatarColor: 'bg-amber-500' },
];

export const Leaderboard: React.FC<LeaderboardProps> = ({
  quizHistory,
  attempts,
  currentStudent,
  currentStudentProfile,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('SEMUA');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'score' | 'quizzes'>('score');

  const historyList = quizHistory || attempts || [];
  const activeStudent = currentStudent || currentStudentProfile;

  // Aggregate student history by studentName
  const studentMap = new Map<
    string,
    {
      studentName: string;
      className: string;
      highScorePercentage: number;
      totalQuizzesCompleted: number;
      bestScoreDate: string;
      isCurrentStudent: boolean;
      avatarColor: string;
    }
  >();

  // First seed standard benchmark classmates
  DEFAULT_CLASSMATES.forEach((c) => {
    const key = `${c.studentName.toLowerCase()}_${c.className.toLowerCase()}`;
    studentMap.set(key, { ...c, isCurrentStudent: false });
  });

  // Process actual quizHistory from localStorage
  historyList.forEach((attempt) => {
    const name = attempt.studentName && attempt.studentName.trim() ? attempt.studentName.trim() : 'Murid SPM';
    const cls = attempt.className && attempt.className.trim() ? attempt.className.trim() : '5 Alfa';
    const key = `${name.toLowerCase()}_${cls.toLowerCase()}`;

    const isCurrent =
      Boolean(activeStudent?.name) &&
      activeStudent?.name.trim().toLowerCase() === name.toLowerCase();

    const existing = studentMap.get(key);
    if (existing) {
      existing.highScorePercentage = Math.max(existing.highScorePercentage, attempt.percentage);
      existing.totalQuizzesCompleted += 1;
      if (attempt.percentage >= existing.highScorePercentage) {
        existing.bestScoreDate = attempt.dateFormatted || 'Terbaharu';
      }
      if (isCurrent) existing.isCurrentStudent = true;
    } else {
      studentMap.set(key, {
        studentName: name,
        className: cls,
        highScorePercentage: attempt.percentage,
        totalQuizzesCompleted: 1,
        bestScoreDate: attempt.dateFormatted || 'Terbaharu',
        isCurrentStudent: isCurrent,
        avatarColor: isCurrent ? 'bg-amber-500' : 'bg-sky-500',
      });
    }
  });

  // Convert map to list
  let entries: LeaderboardEntry[] = Array.from(studentMap.values()).map((item) => ({
    ...item,
    rank: 0,
  }));

  // Filter by class
  if (selectedClass !== 'SEMUA') {
    entries = entries.filter((e) => e.className.toLowerCase() === selectedClass.toLowerCase());
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    entries = entries.filter(
      (e) => e.studentName.toLowerCase().includes(query) || e.className.toLowerCase().includes(query)
    );
  }

  // Sort entries
  entries.sort((a, b) => {
    if (sortBy === 'score') {
      if (b.highScorePercentage !== a.highScorePercentage) {
        return b.highScorePercentage - a.highScorePercentage;
      }
      return b.totalQuizzesCompleted - a.totalQuizzesCompleted;
    } else {
      if (b.totalQuizzesCompleted !== a.totalQuizzesCompleted) {
        return b.totalQuizzesCompleted - a.totalQuizzesCompleted;
      }
      return b.highScorePercentage - a.highScorePercentage;
    }
  });

  // Assign rank numbers
  entries = entries.map((e, index) => ({
    ...e,
    rank: index + 1,
  }));

  // Find current student rank
  const currentStudentEntry = entries.find((e) => e.isCurrentStudent);

  // Available classes for dropdown
  const allClasses = Array.from(
    new Set(Array.from(studentMap.values()).map((e) => e.className))
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-extrabold text-[10px] uppercase tracking-wider">
              Papan Pendahuluan Kelas
            </span>
            <span className="text-xs font-bold text-slate-500 flex items-center space-x-1">
              <Users className="w-3.5 h-3.5" />
              <span>{entries.length} Murid Terlibat</span>
            </span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-2xl text-slate-900 flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <span>Kedudukan Skor Tertinggi SPM</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Carta kedudukan murid terbaik berdasarkan pencapaian kuiz interaktif PSV.
          </p>
        </div>

        {/* Current Student Rank Highlight */}
        {currentStudentEntry && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-3.5 rounded-2xl flex items-center space-x-3 shrink-0 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
              #{currentStudentEntry.rank}
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-amber-800 block">
                Kedudukan Anda
              </span>
              <span className="font-bold text-xs text-slate-900 block line-clamp-1">
                {currentStudentEntry.studentName} ({currentStudentEntry.className})
              </span>
              <span className="text-[11px] font-extrabold text-amber-700">
                Skor Terbaik: {currentStudentEntry.highScorePercentage}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Podium for Top 3 */}
      {entries.length >= 3 && !searchQuery && selectedClass === 'SEMUA' && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 pb-4 max-w-2xl mx-auto">
          {/* 2nd Place */}
          <div className="flex flex-col items-center justify-end">
            <div className="text-center space-y-1 mb-2">
              <div className="relative inline-block">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 border-2 border-slate-300 flex items-center justify-center mx-auto shadow-md">
                  <CuteTrophyBadge className="w-10 h-10" rank={2} />
                </div>
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-slate-700 text-white font-black text-[9px]">
                  #2
                </span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                {entries[1].studentName}
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold">{entries[1].className}</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-black text-xs border border-slate-200">
                {entries[1].highScorePercentage}%
              </span>
            </div>
            <div className="w-full h-20 sm:h-24 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-2xl border-t-4 border-slate-400 flex items-center justify-center font-black text-slate-500 text-lg">
              #2
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center justify-end -mt-3">
            <div className="text-center space-y-1 mb-2">
              <div className="relative inline-block">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border-2 border-amber-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <CuteTrophyBadge className="w-12 h-12" rank={1} />
                </div>
                <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <CuteCrownIcon className="w-6 h-6" />
                </span>
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-600 text-white font-black text-[10px]">
                  #1
                </span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <CuteSparkleStar className="w-4 h-4" />
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">
                  {entries[0].studentName}
                </h4>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold">{entries[0].className}</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 font-black text-xs border border-amber-300 shadow-2xs">
                {entries[0].highScorePercentage}%
              </span>
            </div>
            <div className="w-full h-28 sm:h-32 bg-gradient-to-t from-amber-200 via-amber-100 to-amber-50 rounded-t-2xl border-t-4 border-amber-400 flex items-center justify-center font-black text-amber-600 text-2xl shadow-sm">
              👑 #1
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center justify-end">
            <div className="text-center space-y-1 mb-2">
              <div className="relative inline-block">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-50 border-2 border-amber-600 flex items-center justify-center mx-auto shadow-md">
                  <CuteTrophyBadge className="w-10 h-10" rank={3} />
                </div>
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-800 text-white font-black text-[9px]">
                  #3
                </span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                {entries[2].studentName}
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold">{entries[2].className}</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-100 text-amber-900 font-black text-xs border border-orange-200">
                {entries[2].highScorePercentage}%
              </span>
            </div>
            <div className="w-full h-16 sm:h-20 bg-gradient-to-t from-orange-200 to-orange-100 rounded-t-2xl border-t-4 border-orange-500 flex items-center justify-center font-black text-amber-800 text-base">
              #3
            </div>
          </div>
        </div>
      )}

      {/* Controls & Search Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama murid / kelas..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50"
          />
        </div>

        {/* Filters & Sort */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          {/* Class Selector */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="SEMUA">Semua Kelas</option>
            {allClasses.map((c) => (
              <option key={c} value={c}>
                Kelas {c}
              </option>
            ))}
          </select>

          {/* Sort By Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center space-x-1">
            <button
              onClick={() => setSortBy('score')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sortBy === 'score'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Skor (%)
            </button>
            <button
              onClick={() => setSortBy('quizzes')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sortBy === 'quizzes'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Jumlah Kuiz
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-[11px] font-extrabold uppercase tracking-wider border-b border-slate-200/80">
              <th className="py-3 px-4 text-center w-16">Kedudukan</th>
              <th className="py-3 px-4">Nama Murid</th>
              <th className="py-3 px-4 hidden sm:table-cell">Kelas</th>
              <th className="py-3 px-4 text-center">Kuiz Disiapkan</th>
              <th className="py-3 px-4 text-right">Skor Tertinggi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  Tiada rekod murid dijumpai. Cuba cari dengan kata kunci lain.
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr
                  key={`${entry.studentName}_${entry.className}`}
                  className={`transition-colors ${
                    entry.isCurrentStudent
                      ? 'bg-amber-50/80 font-semibold text-slate-900 border-l-4 border-amber-500'
                      : 'hover:bg-slate-50/80 text-slate-700'
                  }`}
                >
                  {/* Rank Badge */}
                  <td className="py-3 px-4 text-center">
                    {entry.rank === 1 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black shadow-xs">
                        🥇
                      </span>
                    ) : entry.rank === 2 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-black shadow-xs">
                        🥈
                      </span>
                    ) : entry.rank === 3 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-amber-100 font-black shadow-xs">
                        🥉
                      </span>
                    ) : (
                      <span className="font-bold text-slate-500 text-xs">#{entry.rank}</span>
                    )}
                  </td>

                  {/* Student Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`w-7 h-7 rounded-full ${entry.avatarColor} text-white font-extrabold text-xs flex items-center justify-center shrink-0 uppercase`}
                      >
                        {entry.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                          <span>{entry.studentName}</span>
                          {entry.isCurrentStudent && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-amber-200 text-amber-900 border border-amber-300">
                              Anda
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 sm:hidden block">
                          Kelas {entry.className}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Class Name */}
                  <td className="py-3 px-4 hidden sm:table-cell font-medium text-slate-600">
                    {entry.className}
                  </td>

                  {/* Quizzes Completed */}
                  <td className="py-3 px-4 text-center font-bold text-slate-700">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200/80">
                      {entry.totalQuizzesCompleted} Set
                    </span>
                  </td>

                  {/* Score */}
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center space-x-1">
                      <span
                        className={`px-2.5 py-1 rounded-xl font-black text-xs ${
                          entry.highScorePercentage >= 80
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : entry.highScorePercentage >= 50
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {entry.highScorePercentage}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
