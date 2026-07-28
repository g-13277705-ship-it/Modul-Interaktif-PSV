import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BadgeDefinition } from '../utils/badges';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Award, Shield, Flame, Star, Trophy, Sparkles, X, ChevronRight, Check } from 'lucide-react';

interface BadgeUnlockNotificationProps {
  unlockedBadges: BadgeDefinition[];
  onClose: () => void;
  onViewDashboard: () => void;
}

export const BadgeUnlockNotification: React.FC<BadgeUnlockNotificationProps> = ({
  unlockedBadges,
  onClose,
  onViewDashboard,
}) => {
  useEffect(() => {
    if (unlockedBadges.length > 0) {
      sounds.playVictory();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.4 },
          colors: ['#f59e0b', '#6366f1', '#10b981', '#ec4899', '#8b5cf6'],
        });
      } catch (e) {
        // ignore
      }
    }
  }, [unlockedBadges]);

  if (unlockedBadges.length === 0) return null;

  const renderBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case 'award':
        return <Award className="w-10 h-10 text-amber-300" />;
      case 'shield':
        return <Shield className="w-10 h-10 text-slate-200" />;
      case 'flame':
        return <Flame className="w-10 h-10 text-amber-200" />;
      case 'star':
        return <Star className="w-10 h-10 text-emerald-200" />;
      case 'trophy':
        return <Trophy className="w-10 h-10 text-purple-200" />;
      default:
        return <Award className="w-10 h-10 text-amber-300" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -20 }}
          className="bg-slate-900 border-2 border-amber-400/80 text-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Banner */}
          <div className="text-center space-y-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 font-extrabold text-xs uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Lencana Baharu Dibuka!</span>
            </motion.div>
            <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-white">
              Tahniah, Murid Hebat! 🎉
            </h2>
            <p className="text-xs text-slate-300">
              Usaha anda membuahkan hasil. Anda telah membuka {unlockedBadges.length} pencapaian baharu!
            </p>
          </div>

          {/* Unlocked Badges List */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {unlockedBadges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className={`p-4 rounded-2xl bg-gradient-to-r ${badge.gradient} border-2 ${badge.borderAccent} shadow-lg flex items-center space-x-4`}
              >
                <div className="p-3 rounded-2xl bg-black/20 border border-white/20 shrink-0">
                  {renderBadgeIcon(badge.iconType)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-['Outfit'] font-bold text-base text-white">
                      {badge.title}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                      {badge.level}
                    </span>
                  </div>
                  <p className="text-xs text-white/90 leading-tight">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onViewDashboard();
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Lihat Galeri Lencana</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
