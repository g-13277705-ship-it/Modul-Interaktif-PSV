import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SECTIONS, QUESTIONS } from '../data/quizData';
import { Question } from '../types';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Dices, RotateCw, CheckCircle2, XCircle, Award, ArrowRight, X, Volume2, Palette } from 'lucide-react';

interface DailySpinWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBidangQuiz: (bidangId: string) => void;
}

export const DailySpinWheelModal: React.FC<DailySpinWheelModalProps> = ({
  isOpen,
  onClose,
  onStartBidangQuiz,
}) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [selectedBidang, setSelectedBidang] = useState<typeof SECTIONS[0] | null>(null);
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);
  const [userAnswerIndex, setUserAnswerIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [earnedXp, setEarnedXp] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedBidang(null);
    setRandomQuestion(null);
    setUserAnswerIndex(null);
    setIsSubmitted(false);
    setEarnedXp(null);

    sounds.playClick();

    // Pick a random section index
    const randomIndex = Math.floor(Math.random() * SECTIONS.length);
    const chosenSection = SECTIONS[randomIndex];

    // Compute rotation degrees (multiple full rotations + offset)
    const extraTurns = 5 * 360; // 5 full spins
    const sectionAngle = 360 / SECTIONS.length;
    const targetAngle = extraTurns + (360 - randomIndex * sectionAngle - sectionAngle / 2);

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedBidang(chosenSection);
      sounds.playCorrect();

      // Pick a random question from this section
      const sectionQuestions = QUESTIONS.filter((q) => q.sectionId === chosenSection.id);
      if (sectionQuestions.length > 0) {
        const qIndex = Math.floor(Math.random() * sectionQuestions.length);
        setRandomQuestion(sectionQuestions[qIndex]);
      }
    }, 3200);
  };

  const handleAnswerOption = (index: number) => {
    if (isSubmitted) return;
    setUserAnswerIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (userAnswerIndex === null || !randomQuestion) return;
    setIsSubmitted(true);

    if (userAnswerIndex === randomQuestion.correctAnswer) {
      sounds.playCorrect();
      setEarnedXp(50);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
        });
      } catch (e) {
        // ignore
      }
    } else {
      sounds.playWrong();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          className="bg-slate-900 border-2 border-indigo-500/80 text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden my-auto"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Mini Game Cabaran Harian</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-white">
              🎡 Roda Tuah PSV SPM!
            </h2>
            <p className="text-xs text-slate-300">
              Putar roda untuk pilih Bidang PSV rawak & sahut cabaran bonus soalan pantas!
            </p>
          </div>

          {/* Wheel Graphic Container */}
          <div className="flex flex-col items-center justify-center space-y-4 py-2">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
              {/* Pointer Arrow */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-amber-400 font-black text-2xl drop-shadow-md">
                ▼
              </div>

              {/* Rotating Wheel */}
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 3.2, ease: [0.15, 0.85, 0.35, 1.0] }}
                className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl relative overflow-hidden bg-slate-800"
              >
                {/* Visual Segments */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  {SECTIONS.map((sec, idx) => {
                    const angle = 360 / SECTIONS.length;
                    const rotateVal = idx * angle;
                    return (
                      <div
                        key={sec.id}
                        className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left border-l border-b border-slate-900/40 flex items-center justify-center p-2"
                        style={{
                          transform: `rotate(${rotateVal}deg) skewY(-${90 - angle}deg)`,
                          backgroundColor: idx % 2 === 0 ? '#312e81' : '#1e1b4b',
                        }}
                      >
                        <span
                          className="font-extrabold text-[10px] text-amber-300 uppercase truncate max-w-[80px]"
                          style={{
                            transform: `skewY(${90 - angle}deg) rotate(${angle / 2}deg) translate(30px, -10px)`,
                          }}
                        >
                          {sec.shortTitle}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Center Hub */}
                <div className="absolute inset-0 m-auto w-16 h-16 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full border-4 border-slate-900 shadow-lg flex items-center justify-center z-10">
                  <Palette className="w-8 h-8 text-slate-950" />
                </div>
              </motion.div>
            </div>

            {/* Spin Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`py-3.5 px-8 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center space-x-2 cursor-pointer ${
                isSpinning
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 shadow-amber-500/30 hover:scale-105'
              }`}
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Sedang Memutar...' : 'Putar Roda Sekarang!'}</span>
            </button>
          </div>

          {/* Result Challenge Section */}
          {selectedBidang && randomQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 sm:p-5 space-y-4 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-extrabold text-xs">
                    {selectedBidang.title}
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-400 flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>Bonus +50 XP</span>
                </span>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <p className="font-bold text-sm text-slate-100 leading-snug">
                  {randomQuestion.questionText}
                </p>

                {/* Question Image if any */}
                {randomQuestion.imagePrompt && (
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 max-h-40 flex items-center justify-center p-2">
                    <img
                      src={`https://placehold.co/600x300/1e1b4b/e0e7ff?text=${encodeURIComponent(
                        randomQuestion.shortTag || 'PSV SPM'
                      )}`}
                      alt="Soalan PSV"
                      className="max-h-36 object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2">
                {randomQuestion.options.map((option, idx) => {
                  let isSelected = userAnswerIndex === idx;
                  let isCorrect = idx === randomQuestion.correctAnswer;

                  let btnStyle =
                    'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-500';

                  if (isSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950 border-rose-500 text-rose-200 font-bold';
                    } else {
                      btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-indigo-900/90 border-indigo-500 text-white font-bold ring-2 ring-indigo-400/50';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerOption(idx)}
                      disabled={isSubmitted}
                      className={`w-full p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-start space-x-2.5">
                        <span className="font-bold text-indigo-400 shrink-0">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span className="leading-snug">{option}</span>
                      </div>
                      {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                      {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={userAnswerIndex === null}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-extrabold text-xs transition-colors cursor-pointer text-center"
                  >
                    Hantar Jawapan
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onClose();
                        onStartBidangQuiz(selectedBidang.id);
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <span>Uji Penuh Bidang Ini</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleSpin}
                      className="py-2.5 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Putar Lagi
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
