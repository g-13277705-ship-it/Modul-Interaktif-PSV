import React, { useState } from 'react';
import { CuteArtMascot, CutePencilMascot, CuteSparkleStar } from './CuteCartoonIcons';
import { sounds } from '../utils/soundEffects';
import { Sparkles, MessageCircle, Heart, RefreshCw, Trophy } from 'lucide-react';

interface CartoonMascotBannerProps {
  studentName?: string;
  completedQuizzesCount?: number;
  onOpenSpinWheel?: () => void;
}

const CHEER_QUOTES = [
  '“Seni Visual bukan sekadar warna, ia ekspresi jiwa SPM anda! Teruskan semangat! 🎨✨”',
  '“Latih tubi 40 soalan secara konsisten kunci utama lulus Cemerlang A+ PSV SPM! 🌟”',
  '“Wah, rajinnya ulang kaji hari ini! Kiko bangga dengan kesungguhan anda! ✏️💖”',
  '“Tip PSV: Ingat 4 Bidang Utama - Sejarah & Apresiasi, Seni Halus, Reka Bentuk & Kraf! 🏆”',
  '“Jom putar Roda Tuah PSV untuk ujian pantas & kumpul Bonus XP hari ini! 🎡”',
];

export const CartoonMascotBanner: React.FC<CartoonMascotBannerProps> = ({
  studentName = 'Murid SPM',
  completedQuizzesCount = 0,
  onOpenSpinWheel,
}) => {
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(12);

  const handleNextQuote = () => {
    sounds.playClick();
    setQuoteIndex((prev) => (prev + 1) % CHEER_QUOTES.length);
  };

  const handleLike = () => {
    if (!isLiking) {
      sounds.playCorrect();
      setIsLiking(true);
      setLikeCount((prev) => prev + 1);
      setTimeout(() => setIsLiking(false), 800);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-100 via-pink-100 to-indigo-100 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden transition-all hover:shadow-lg">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-32 h-32 bg-pink-200/50 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Mascot + Speech Bubble */}
        <div className="flex items-center space-x-4 w-full md:w-auto">
          {/* Animated Cute Mascot */}
          <div className="relative shrink-0 cursor-pointer group" onClick={handleNextQuote} title="Klik Kiko untuk kata-kata semangat baharu!">
            <CuteArtMascot className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md group-hover:scale-110 transition-transform" mood="excited" />
            <span className="absolute -bottom-1 -right-1 bg-amber-400 border-2 border-white text-slate-900 font-extrabold text-[9px] px-2 py-0.5 rounded-full shadow-xs">
              Kiko 🎨
            </span>
          </div>

          {/* Speech Bubble */}
          <div className="bg-white/90 backdrop-blur-xs border-2 border-pink-200 p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-sm space-y-1 relative max-w-md">
            {/* Bubble Arrow */}
            <div className="hidden sm:block absolute -left-3 top-6 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-white/90" />

            <div className="flex items-center justify-between space-x-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-700 bg-pink-100 px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-pink-500" />
                <span>Maskot Panitia PSV</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500">
                Hi, {studentName}! 👋
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-relaxed pt-1">
              {CHEER_QUOTES[quoteIndex]}
            </p>
          </div>
        </div>

        {/* Interactive Buttons & Mini Widget */}
        <div className="flex items-center space-x-2 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={handleLike}
            className={`px-3.5 py-2 rounded-2xl border-2 font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
              isLiking
                ? 'bg-rose-500 text-white border-rose-600 scale-110'
                : 'bg-white/80 hover:bg-white text-rose-600 border-rose-200 hover:border-rose-300 shadow-xs'
            }`}
          >
            <Heart className={`w-4 h-4 fill-rose-500 text-rose-500 ${isLiking ? 'animate-ping' : ''}`} />
            <span>{likeCount} Suka</span>
          </button>

          <button
            onClick={handleNextQuote}
            className="p-2.5 rounded-2xl bg-white/80 hover:bg-white border-2 border-amber-200 text-amber-700 font-bold text-xs transition-all shadow-xs cursor-pointer hover:rotate-45"
            title="Tukar Kata-kata Semangat"
          >
            <RefreshCw className="w-4 h-4 text-amber-600" />
          </button>

          {onOpenSpinWheel && (
            <button
              onClick={onOpenSpinWheel}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-400 to-purple-500 hover:from-amber-500 hover:to-purple-600 text-slate-950 font-black text-xs shadow-md border-2 border-white flex items-center space-x-1.5 transition-transform hover:scale-105 cursor-pointer"
            >
              <CuteSparkleStar className="w-4 h-4" />
              <span>Roda Tuah 🎡</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
