import React, { useState } from 'react';
import { SECTIONS, QUESTIONS } from '../data/quizData';
import { ActiveTab, StudentProfile, QuizAttempt } from '../types';
import { BADGE_DEFINITIONS } from '../utils/badges';
import { CartoonMascotBanner } from './CartoonMascotBanner';
import { CuteArtMascot, CutePencilMascot, CuteTrophyBadge, CuteCrownIcon, CuteSparkleStar, CuteRibbonBadge } from './CuteCartoonIcons';
import { sounds } from '../utils/soundEffects';
import {
  Palette,
  Shirt,
  Crown,
  Castle,
  Layers,
  Compass,
  Scissors,
  Play,
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  GraduationCap,
  FileSpreadsheet,
  FileText,
  Download,
  Printer,
  Shield,
  Flame,
  Star,
  Trophy,
  Lock,
  CheckCircle2,
  Medal,
  Dices,
} from 'lucide-react';

interface DashboardTabProps {
  setActiveTab: (tab: ActiveTab) => void;
  studentProfile: StudentProfile;
  onStartQuiz: (sectionId?: string) => void;
  onOpenNotesModal: (sectionId?: string) => void;
  onOpenSpinWheel?: () => void;
  lastScore?: number | null;
  quizHistory?: QuizAttempt[];
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  setActiveTab,
  studentProfile,
  onStartQuiz,
  onOpenNotesModal,
  onOpenSpinWheel,
  lastScore,
  quizHistory = [],
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bidang' | 'badges'>('bidang');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-5 h-5 text-blue-600" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5 text-amber-600" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-emerald-600" />;
      case 'Castle':
        return <Castle className="w-5 h-5 text-purple-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-rose-600" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-cyan-600" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-fuchsia-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-600" />;
    }
  };

  const renderBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case 'award':
        return <Award className="w-6 h-6 text-amber-400" />;
      case 'shield':
        return <Shield className="w-6 h-6 text-slate-200" />;
      case 'flame':
        return <Flame className="w-6 h-6 text-amber-200" />;
      case 'star':
        return <Star className="w-6 h-6 text-emerald-200" />;
      case 'trophy':
        return <Trophy className="w-6 h-6 text-amber-300" />;
      default:
        return <Award className="w-6 h-6 text-amber-400" />;
    }
  };

  const totalQuestions = QUESTIONS.length;
  const totalSections = SECTIONS.length;

  // Lencana stats calculation
  const completedCount = quizHistory.length;
  const badges = BADGE_DEFINITIONS.map((def) => {
    const isUnlocked = def.checkUnlocked(quizHistory);
    const progress = def.getProgressInfo(quizHistory);
    return {
      ...def,
      isUnlocked,
      progressText: progress.progressText,
      percent: progress.percent,
    };
  });

  const unlockedBadgesCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Cartoon Mascot Interactive Cheer Banner */}
      <CartoonMascotBanner
        studentName={studentProfile.name}
        completedQuizzesCount={quizHistory.length}
        onOpenSpinWheel={onOpenSpinWheel}
      />

      {/* Pusat Akses Halaman (4 Clean Kawaii Hub Action Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Card 1: Mula Kuiz Interaktif */}
        <div
          onClick={() => {
            sounds.playClick();
            onStartQuiz();
          }}
          className="group relative bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-4 sm:p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden border-2 border-indigo-400/40"
        >
          <div className="absolute -right-3 -bottom-3 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
              <Play className="w-5 h-5 fill-current text-amber-300" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-300 text-slate-950">
              {totalQuestions} Soalan
            </span>
          </div>
          <h3 className="font-['Outfit'] font-black text-base sm:text-lg text-white leading-tight">
            Mula Latih Tubi 📝
          </h3>
          <p className="text-[11px] text-indigo-100/90 font-medium mt-1">
            Pentaksiran kendiri 40 soalan bergambar.
          </p>
          <div className="mt-3 flex items-center text-xs font-bold text-amber-300 space-x-1 group-hover:translate-x-1 transition-transform">
            <span>Uji Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Nota Ringkas PDF */}
        <div
          onClick={() => {
            sounds.playClick();
            onOpenNotesModal('sectionA');
          }}
          className="group relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-4 sm:p-5 text-slate-950 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden border-2 border-amber-300/60"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-950 text-amber-300 flex items-center justify-center border border-amber-300/40">
              <FileText className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-950 text-amber-300">
              PDF Ready
            </span>
          </div>
          <h3 className="font-['Outfit'] font-black text-base sm:text-lg text-slate-950 leading-tight">
            Nota Ringkas PDF 📚
          </h3>
          <p className="text-[11px] text-slate-900/90 font-bold mt-1">
            Ulang kaji pantas 7 Bidang Utama PSV.
          </p>
          <div className="mt-3 flex items-center text-xs font-black text-slate-950 space-x-1 group-hover:translate-x-1 transition-transform">
            <span>Baca & Cetak</span>
            <Printer className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Roda Tuah Mini-Game */}
        <div
          onClick={() => {
            sounds.playClick();
            if (onOpenSpinWheel) onOpenSpinWheel();
          }}
          className="group relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500 rounded-3xl p-4 sm:p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden border-2 border-pink-300/40"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
              <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-300 text-slate-950">
              +Bonus XP
            </span>
          </div>
          <h3 className="font-['Outfit'] font-black text-base sm:text-lg text-white leading-tight">
            Roda Tuah Cabaran 🎡
          </h3>
          <p className="text-[11px] text-pink-100/90 font-medium mt-1">
            Putar roda & jawab soalan pantas!
          </p>
          <div className="mt-3 flex items-center text-xs font-bold text-amber-200 space-x-1 group-hover:translate-x-1 transition-transform">
            <span>Putar Roda</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Papan Pendahuluan */}
        <div
          onClick={() => {
            sounds.playClick();
            setActiveTab('leaderboard');
          }}
          className="group relative bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-4 sm:p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden border-2 border-emerald-300/40"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900">
              Carta Kelas
            </span>
          </div>
          <h3 className="font-['Outfit'] font-black text-base sm:text-lg text-white leading-tight">
            Papan Pendahuluan 🏆
          </h3>
          <p className="text-[11px] text-emerald-100/90 font-medium mt-1">
            Lihat kedudukan murid cemerlang.
          </p>
          <div className="mt-3 flex items-center text-xs font-bold text-amber-200 space-x-1 group-hover:translate-x-1 transition-transform">
            <span>Lihat Ranking</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Quick Overview Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <p className="text-lg font-black font-['Outfit'] text-slate-900">{totalQuestions}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Soalan PSV</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 px-2 border-l border-slate-100 sm:border-l">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-lg font-black font-['Outfit'] text-slate-900">{totalSections}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Bidang Sukatan</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 px-2 border-l border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <p className="text-lg font-black font-['Outfit'] text-slate-900">
              {lastScore !== undefined && lastScore !== null ? `${lastScore}` : '-'}
            </p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Skor Terakhir</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 px-2 border-l border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Medal className="w-4 h-4" />
          </div>
          <div>
            <p className="text-lg font-black font-['Outfit'] text-slate-900">
              {unlockedBadgesCount} / {badges.length}
            </p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Lencana Dibuka</p>
          </div>
        </div>
      </div>

      {/* Clean Sub-View Tabs Switcher */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 pt-2">
        <div className="flex items-center space-x-2 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-2xs">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveSubTab('bidang');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'bidang'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎨 Modul Sukatan (7 Bidang)
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveSubTab('badges');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'badges'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏅 Lencana & Gred SPM ({unlockedBadgesCount}/{badges.length})
          </button>
        </div>

        <button
          onClick={() => onOpenNotesModal('sectionA')}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-extrabold border border-amber-300 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-amber-800" />
          <span>Cetak Semua Nota PDF</span>
        </button>
      </div>

      {/* Tab Content 1: Modul Bidang Sukatan (7 Bidang) */}
      {activeSubTab === 'bidang' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SECTIONS.map((sec) => (
              <div
                key={sec.id}
                className="group bg-white rounded-3xl border border-slate-200/80 p-5 hover:border-indigo-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-2xl bg-slate-100 group-hover:bg-indigo-50 transition-colors">
                        {getIcon(sec.icon)}
                      </div>
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase bg-slate-100 text-slate-700 mb-0.5 border border-slate-200/60">
                          {sec.code}
                        </span>
                        <h3 className="font-['Outfit'] font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {sec.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {sec.description}
                  </p>

                  {/* Key concept chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sec.keyConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200/60"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onOpenNotesModal(sec.id);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-950 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-700" />
                      <span>Nota PDF</span>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        onStartQuiz(sec.id);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Uji Bidang</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Pencapaian & Lencana */}
      {activeSubTab === 'badges' && (
        <div className="space-y-6">
          {/* Lencana Pencapaian Murid */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase tracking-wider">
                    Sistem Lencana Murid
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {unlockedBadgesCount} / {badges.length} Dibuka
                  </span>
                </div>
                <h2 className="font-['Outfit'] font-bold text-2xl text-slate-900 flex items-center space-x-2">
                  <Medal className="w-6 h-6 text-amber-500" />
                  <span>Lencana Pencapaian PSV</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Kumpul lencana pencapaian secara automatik berdasarkan bilangan kuiz yang telah disiapkan!
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 min-w-[220px] shrink-0 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Kemajuan Lencana</span>
                  <span className="text-indigo-600 font-extrabold">
                    {unlockedBadgesCount} / {badges.length} Dibuka
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(unlockedBadgesCount / badges.length) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500 text-right font-medium">
                  {completedCount} Kuiz Telah Disiapkan
                </div>
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`relative rounded-2xl p-4 flex flex-col justify-between border transition-all duration-300 ${
                    badge.isUnlocked
                      ? `bg-gradient-to-b ${badge.gradient} text-white shadow-md ${badge.borderAccent} hover:scale-[1.02]`
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner ${
                        badge.isUnlocked
                          ? 'bg-white/20 backdrop-blur-md text-white'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {badge.isUnlocked ? (
                        renderBadgeIcon(badge.iconType)
                      ) : (
                        <Lock className="w-5 h-5 text-slate-400" />
                      )}
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        badge.isUnlocked
                          ? 'bg-white/20 text-white backdrop-blur-md'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {badge.level}
                    </span>
                  </div>

                  <div className="space-y-1 my-2">
                    <h3
                      className={`font-['Outfit'] font-bold text-base leading-tight ${
                        badge.isUnlocked ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {badge.title}
                    </h3>
                    <p
                      className={`text-[11px] leading-relaxed line-clamp-2 ${
                        badge.isUnlocked ? 'text-white/80' : 'text-slate-500'
                      }`}
                    >
                      {badge.description}
                    </p>
                  </div>

                  <div
                    className={`mt-3 pt-3 border-t space-y-1.5 ${
                      badge.isUnlocked ? 'border-white/20' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className={badge.isUnlocked ? 'text-white/90' : 'text-slate-500'}>
                        Syarat: {badge.requirement}
                      </span>
                    </div>

                    <div
                      className={`w-full h-1.5 rounded-full overflow-hidden ${
                        badge.isUnlocked ? 'bg-white/30' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          badge.isUnlocked ? 'bg-white' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${badge.percent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span
                        className={`text-[10px] font-extrabold flex items-center space-x-1 ${
                          badge.isUnlocked ? 'text-amber-200' : 'text-slate-500'
                        }`}
                      >
                        {badge.isUnlocked ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                            <span>{badge.progressText}</span>
                          </>
                        ) : (
                          <span>{badge.progressText}</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panduan Skala Gred */}
          <div className="bg-gradient-to-r from-indigo-50 via-sky-50 to-slate-50 rounded-3xl p-6 border border-indigo-100 space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="font-['Outfit'] font-bold text-base text-slate-900">
                Panduan & Skala Gred Pentaksiran Kendiri
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Cemerlang</span>
                  <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-emerald-100 text-emerald-800">
                    80% - 100%
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Menguasai fakta sejarah, reka bentuk, komunikasi visual, seni halus & kraf dengan cemerlang.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Lulus</span>
                  <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-blue-100 text-blue-800">
                    50% - 79%
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Memahami fakta asas. Lakukan ulang kaji bagi tajuk lemah untuk capai gred Cemerlang.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Perlu Bimbingan</span>
                  <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-amber-100 text-amber-800">
                    0% - 49%
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Sila baca semula nota ringkas PDF dan rujuk ulasan terperinci di bahagian Skema Jawapan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

