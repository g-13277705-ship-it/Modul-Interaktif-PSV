import React, { useState, useEffect } from 'react';
import { Question, QuizAttempt, StudentProfile } from '../types';
import { QUESTIONS, SECTIONS } from '../data/quizData';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { CuteArtMascot, CutePencilMascot, CuteSparkleStar } from './CuteCartoonIcons';
import {
  HelpCircle,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Sparkles,
  AlertCircle,
  ListOrdered,
  Flame,
  Zap,
  Volume2,
  VolumeX,
  Trophy,
  Award,
  Gamepad2,
  RotateCcw,
  Shield,
} from 'lucide-react';

interface QuizTabProps {
  studentProfile: StudentProfile;
  setStudentProfile: (profile: StudentProfile) => void;
  onCompleteQuiz: (attempt: QuizAttempt) => void;
  initialSectionId?: string | null;
}

export const QuizTab: React.FC<QuizTabProps> = ({
  studentProfile,
  setStudentProfile,
  onCompleteQuiz,
  initialSectionId = null,
}) => {
  // Setup Quiz Filter / Questions
  const [activeSection, setActiveSection] = useState<string>(initialSectionId || 'all');
  const [instantFeedback, setInstantFeedback] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const filterQuestions = (): Question[] => {
    if (activeSection === 'all') return QUESTIONS;
    return QUESTIONS.filter((q) => q.sectionId === activeSection);
  };

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>(filterQuestions());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [timeTakenSeconds, setTimeTakenSeconds] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showQuestionGrid, setShowQuestionGrid] = useState<boolean>(false);

  // Gamification states
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [totalXp, setTotalXp] = useState<number>(0);
  const [comboPopup, setComboPopup] = useState<{ text: string; xpBonus: number } | null>(null);

  // Student Profile Form input
  const [inputName, setInputName] = useState<string>(studentProfile.name);
  const [inputClass, setInputClass] = useState<string>(studentProfile.className);

  // Update questions whenever section filter changes
  useEffect(() => {
    const qList = filterQuestions();
    setCurrentQuestions(qList);
    setCurrentIndex(0);
  }, [activeSection]);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted) {
      interval = setInterval(() => {
        setTimeTakenSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted]);

  const toggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
    if (newState) {
      sounds.playClick();
    }
  };

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) {
      alert('Sila masukkan nama anda terlebih dahulu.');
      return;
    }
    setStudentProfile({
      name: inputName.trim(),
      className: inputClass.trim() || '5 PSV',
    });
    setAnswers({});
    setFlagged([]);
    setTimeTakenSeconds(0);
    setCurrentIndex(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setTotalXp(0);
    setIsStarted(true);

    if (soundEnabled) {
      sounds.playStreak();
    }
  };

  const currentQ = currentQuestions[currentIndex];

  const triggerConfetti = (particleCount = 50) => {
    try {
      confetti({
        particleCount,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#f59e0b', '#10b981', '#ec4899', '#3b82f6'],
      });
    } catch (e) {
      // ignore
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    sounds.playClick();

    const previousSelected = answers[currentQ.id];
    const isFirstTimeAnswering = previousSelected === undefined || previousSelected === null;

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));

    if (isFirstTimeAnswering) {
      setTotalXp((prev) => prev + 100);
    }

    // Only show instant right/wrong chimes & popups if instant feedback mode is turned ON
    if (instantFeedback) {
      const isCorrect = optionIndex === currentQ.correctAnswer;

      if (isCorrect) {
        sounds.playCorrect();

        if (isFirstTimeAnswering) {
          const newStreak = currentStreak + 1;
          setCurrentStreak(newStreak);
          if (newStreak > maxStreak) setMaxStreak(newStreak);

          const streakBonus = newStreak >= 3 ? newStreak * 25 : 0;
          if (streakBonus > 0) {
            setTotalXp((prev) => prev + streakBonus);
          }

          // Show Combo reaction popup
          if (newStreak >= 3) {
            let comboTitle = `STREAK ${newStreak}x! 🔥`;
            if (newStreak >= 10) comboTitle = `LEGENDA ${newStreak}x! 👑`;
            else if (newStreak >= 5) comboTitle = `COMBO HEBAT ${newStreak}x! ⚡`;

            setComboPopup({
              text: comboTitle,
              xpBonus: streakBonus,
            });

            triggerConfetti(25 + newStreak * 5);
            sounds.playStreak();

            setTimeout(() => setComboPopup(null), 2500);
          } else {
            setComboPopup({
              text: 'TEPAT SEKALI! ✨',
              xpBonus: 0,
            });
            setTimeout(() => setComboPopup(null), 1500);
          }
        }
      } else {
        sounds.playWrong();
        setCurrentStreak(0); // Reset streak on wrong answer
        setComboPopup({
          text: 'PILIHAN DITUKAR! 🎯',
          xpBonus: 0,
        });
        setTimeout(() => setComboPopup(null), 1500);
      }
    }
  };

  const handleToggleFlag = (qId: number) => {
    sounds.playClick();
    setFlagged((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const answeredCount = Object.values(answers).filter((a) => a !== null && a !== undefined).length;
  const totalQCount = currentQuestions.length;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmitQuiz = () => {
    sounds.playVictory();
    triggerConfetti(120);

    // Calculate Score
    const questionsToGrade = currentQuestions;
    let totalScore = 0;
    const sectionScores: Record<string, { score: number; total: number }> = {};

    SECTIONS.forEach((sec) => {
      sectionScores[sec.id] = { score: 0, total: 0 };
    });

    questionsToGrade.forEach((q) => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      const secKey = q.sectionId;

      if (!sectionScores[secKey]) {
        sectionScores[secKey] = { score: 0, total: 0 };
      }

      sectionScores[secKey].total += 1;
      if (isCorrect) {
        sectionScores[secKey].score += 1;
        totalScore += 1;
      }
    });

    const totalQuestionsOverall = questionsToGrade.length;
    const percentage = Math.round((totalScore / totalQuestionsOverall) * 100);

    let grade: 'Cemerlang' | 'Lulus' | 'Perlu Bimbingan' = 'Perlu Bimbingan';
    let gradeBadgeColor = 'bg-amber-100 text-amber-800 border-amber-300';

    if (percentage >= 80) {
      grade = 'Cemerlang';
      gradeBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    } else if (percentage >= 50) {
      grade = 'Lulus';
      gradeBadgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
    }

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('ms-MY', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let modeTitle = `Kuiz Semua Bidang (${totalQuestionsOverall} Soalan)`;
    if (activeSection !== 'all') {
      const secObj = SECTIONS.find((s) => s.id === activeSection);
      if (secObj) modeTitle = `${secObj.code}: ${secObj.shortTitle} (${totalQuestionsOverall} Soalan)`;
    }

    const attemptRecord: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      timestamp: Date.now(),
      dateFormatted,
      studentName: studentProfile.name || inputName || 'Murid PSV',
      className: studentProfile.className || inputClass || '5 PSV',
      mode: activeSection,
      modeTitle,
      timeTakenSeconds,
      score: totalScore,
      totalQuestions: totalQuestionsOverall,
      percentage,
      grade,
      gradeBadgeColor,
      sectionScores,
      answers,
      flaggedQuestions: flagged,
    };

    onCompleteQuiz(attemptRecord);
  };

  // If Quiz not started, show setup registration card
  if (!isStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="relative inline-block mx-auto mb-1">
              <CuteArtMascot className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md" mood="excited" />
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-xs">
              <CuteSparkleStar className="w-4 h-4" />
              <span>Modul Kuiz Interaktif Cartoon PSV</span>
            </div>
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-slate-900">
              Pendaftaran & Konfigurasi Kuiz SPM
            </h2>
            <p className="text-xs text-slate-600">
              Sila lengkapkan maklumat murid dan pilih skop soalan sebelum memulakan sesi pentaksiran kendiri.
            </p>
          </div>

          <form onSubmit={handleStartQuiz} className="space-y-5">
            {/* Student Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Penuh Murid <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="Contoh: Muhammad Amirul"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kelas / Tingkatan
                </label>
                <input
                  type="text"
                  value={inputClass}
                  onChange={(e) => setInputClass(e.target.value)}
                  placeholder="Contoh: 5 ILTIZAM"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs font-medium"
                />
              </div>
            </div>

            {/* Scope Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Pilih Skop / Modul Soalan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveSection('all')}
                  className={`p-3.5 rounded-xl text-left border text-xs transition-all ${
                    activeSection === 'all'
                      ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200 text-indigo-950 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">Kuiz Semua Bidang ({QUESTIONS.length} Soalan)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-600 text-white font-bold">
                      Keseluruhan
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Merangkumi kesemua {SECTIONS.length} Bidang PSV (100 soalan setiap bidang).
                  </p>
                </button>

                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveSection(sec.id)}
                    className={`p-3.5 rounded-xl text-left border text-xs transition-all ${
                      activeSection === sec.id
                        ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200 text-indigo-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{sec.code}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{sec.questionCount} Soalan</span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate">{sec.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Instant Feedback Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span>Paparkan Jawapan Serta-Merta (Mod Latihan)</span>
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Secara lalai (DITUTUP): Jawapan disembunyikan supaya murid menjawab mengikut pemahaman sebenar seperti peperiksaan SPM.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-3 shrink-0">
                <input
                  type="checkbox"
                  checked={instantFeedback}
                  onChange={(e) => setInstantFeedback(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mula Mengerjakan Kuiz Sekarang</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Active Quiz View
  const isOptionSelected = answers[currentQ.id] !== undefined && answers[currentQ.id] !== null;
  const selectedOpt = answers[currentQ.id];

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-16 relative">
      {/* Gamified HUD Top Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* XP & Streak Counters */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* XP Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-extrabold text-xs shadow-inner">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{totalXp} XP</span>
            </div>

            {/* Streak Counter */}
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl border text-xs font-extrabold transition-all ${
                currentStreak >= 3
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-amber-500/20 animate-bounce'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <Flame
                className={`w-4 h-4 ${
                  currentStreak >= 3 ? 'text-amber-400 fill-amber-400' : 'text-slate-500'
                }`}
              />
              <span>{currentStreak} STREAK</span>
            </div>

            {/* Timer */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{formatTimer(timeTakenSeconds)}</span>
            </div>
          </div>

          {/* Controls: Feedback Mode Toggle, Audio Toggle, Nav Grid, Submit */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sounds.playClick();
                setInstantFeedback(!instantFeedback);
              }}
              className={`px-2.5 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                instantFeedback
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title={instantFeedback ? 'Jawapan ditunjuk serta-merta' : 'Jawapan disembunyikan sehingga hantar'}
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">
                {instantFeedback ? 'Latihan (Terus Jawap)' : 'Ujian (Sembunyi Jawapan)'}
              </span>
            </button>

            <button
              onClick={toggleSound}
              className={`p-2 rounded-2xl border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
              title={soundEnabled ? 'Matikan Kesan Bunyi' : 'Hidupkan Kesan Bunyi'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowQuestionGrid(!showQuestionGrid)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
            >
              <ListOrdered className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Navigasi</span>
            </button>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Hantar</span>
            </button>
          </div>
        </div>

        {/* Global Progress Line */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>
              Soalan {currentIndex + 1} daripada {totalQCount}
            </span>
            <span>{Math.round(((currentIndex + 1) / totalQCount) * 100)}% Selesai</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / totalQCount) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Floating Combo Reaction Popup */}
      <AnimatePresence>
        {comboPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md border-2 border-amber-400 text-amber-300 px-6 py-3 rounded-full shadow-2xl font-black text-sm flex items-center space-x-3 pointer-events-none"
          >
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
            <span>{comboPopup.text}</span>
            {comboPopup.xpBonus > 0 && (
              <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-xs">
                +{comboPopup.xpBonus} XP BONUS!
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Grid Drawer/Modal */}
      {showQuestionGrid && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <Gamepad2 className="w-4 h-4 text-indigo-600" />
              <span>Senarai Penuh Soalan</span>
            </span>
            <div className="flex items-center space-x-3 text-[11px] text-slate-500">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" /> Dijawab
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Ditanda
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block" /> Belum
              </span>
            </div>
          </div>

          <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 max-h-60 overflow-y-auto p-1">
            {currentQuestions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
              const isFlagged = flagged.includes(q.id);
              const isCurrent = idx === currentIndex;

              let btnStyle = 'bg-slate-100 text-slate-700 border-slate-200';
              if (isCurrent)
                btnStyle =
                  'ring-2 ring-indigo-600 bg-indigo-50 text-indigo-900 font-extrabold scale-105';
              else if (isFlagged)
                btnStyle = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
              else if (isAnswered) btnStyle = 'bg-indigo-600 text-white font-bold';

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    sounds.playClick();
                    setCurrentIndex(idx);
                    setShowQuestionGrid(false);
                  }}
                  className={`h-9 rounded-xl text-xs border flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                >
                  {q.id}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Animated Main Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6"
        >
          {/* Header Topic Tag & Flag Button */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {currentQ.sectionTitle}
            </span>

            <button
              onClick={() => handleToggleFlag(currentQ.id)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                flagged.includes(currentQ.id)
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              <Flag
                className={`w-3.5 h-3.5 ${flagged.includes(currentQ.id) ? 'fill-current' : ''}`}
              />
              <span>{flagged.includes(currentQ.id) ? 'Ditanda' : 'Tanda Soalan'}</span>
            </button>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Soalan #{currentQ.id}
              </span>
              <span className="text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                +100 XP
              </span>
            </div>
            <h3 className="font-['Outfit'] font-bold text-lg sm:text-xl text-slate-900 leading-snug">
              {currentQ.questionText}
            </h3>
          </div>

          {/* Animated Options List */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((optText, optIdx) => {
              const letter = ['A', 'B', 'C', 'D'][optIdx];
              const isSelected = selectedOpt === optIdx;
              const isCorrect = currentQ.correctAnswer === optIdx;

              let cardStyle =
                'border-slate-200 hover:border-slate-300 bg-white text-slate-800 hover:bg-slate-50/80';
              let badgeStyle = 'bg-slate-100 text-slate-600 font-bold';

              if (isSelected) {
                cardStyle =
                  'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-200 text-indigo-950 font-semibold shadow-xs';
                badgeStyle = 'bg-indigo-600 text-white font-bold';
              }

              // If Instant Feedback enabled and option selected
              if (instantFeedback && isOptionSelected) {
                if (isCorrect) {
                  cardStyle =
                    'border-emerald-500 bg-emerald-50/90 ring-2 ring-emerald-200 text-emerald-950 font-semibold';
                  badgeStyle = 'bg-emerald-600 text-white font-bold';
                } else if (isSelected && !isCorrect) {
                  cardStyle =
                    'border-red-500 bg-red-50/90 ring-2 ring-red-200 text-red-950 font-semibold';
                  badgeStyle = 'bg-red-600 text-white font-bold';
                }
              }

              return (
                <motion.button
                  key={optIdx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between space-x-3 transition-all cursor-pointer ${cardStyle}`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${badgeStyle}`}
                    >
                      {letter}
                    </span>
                    <span className="text-sm leading-relaxed">{optText}</span>
                  </div>

                  {instantFeedback && isOptionSelected && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-bounce" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-red-600 animate-pulse" />
                      ) : null}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Instant Feedback Educational Explanation */}
          {instantFeedback && isOptionSelected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs space-y-1.5"
            >
              <div className="flex items-center space-x-1.5 font-bold text-indigo-900">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Ulasan & Penjelasan Ringkas:</span>
              </div>
              <p className="text-indigo-950 leading-relaxed">{currentQ.explanation}</p>
            </motion.div>
          )}

          {/* Pagination Navigation Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                sounds.playClick();
                setCurrentIndex((prev) => Math.max(0, prev - 1));
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentIndex < totalQCount - 1 ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  setCurrentIndex((prev) => Math.min(totalQCount - 1, prev + 1));
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              >
                <span>Seterusnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowConfirmModal(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                Selesai & Hantar
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Confirmation Submit Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-['Outfit'] font-bold text-xl text-slate-900">
                Pengesahan Penghantaran Kuiz
              </h3>
              <p className="text-xs text-slate-600">
                Adakah anda pasti mahu menghantar keputusan kuiz ini sekarang?
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Jumlah Soalan:</span>
                <span className="font-bold text-slate-900">{totalQCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Soalan Dijawab:</span>
                <span className="font-bold text-emerald-600">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Belum Dijawab:</span>
                <span className="font-bold text-red-600">{totalQCount - answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Soalan Ditanda:</span>
                <span className="font-bold text-amber-600">{flagged.length}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-600 font-bold">Mata XP Dikumpul:</span>
                <span className="font-extrabold text-indigo-600">{totalXp} XP</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowConfirmModal(false);
                }}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Kembali Semak
              </button>
              <button
                onClick={handleSubmitQuiz}
                className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Ya, Hantar Kuiz
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
