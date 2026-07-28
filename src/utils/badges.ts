import { QuizAttempt } from '../types';

export interface BadgeDefinition {
  id: string;
  title: string;
  level: string;
  description: string;
  requirement: string;
  iconType: 'award' | 'shield' | 'flame' | 'star' | 'trophy';
  gradient: string;
  borderAccent: string;
  bgGlow: string;
  checkUnlocked: (history: QuizAttempt[]) => boolean;
  getProgressInfo: (history: QuizAttempt[]) => { percent: number; progressText: string };
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'badge1',
    title: 'Peneroka PSV',
    level: 'Gangsa',
    description: 'Menyelesaikan percubaan kuiz pertama anda di portal PSV.',
    requirement: 'Disiapkan 1 Kuiz',
    iconType: 'award',
    gradient: 'from-amber-600 to-amber-800',
    borderAccent: 'border-amber-500',
    bgGlow: 'bg-amber-500/10',
    checkUnlocked: (history) => history.length >= 1,
    getProgressInfo: (history) => ({
      percent: Math.min(100, (history.length / 1) * 100),
      progressText: history.length >= 1 ? 'Telah Dibuka! ✨' : `${history.length}/1 Kuiz`,
    }),
  },
  {
    id: 'badge2',
    title: 'Penuntut Tekun',
    level: 'Perak',
    description: 'Menyelesaikan sekurang-kurangnya 3 percubaan kuiz secara konsisten.',
    requirement: 'Disiapkan 3 Kuiz',
    iconType: 'shield',
    gradient: 'from-slate-400 to-slate-600',
    borderAccent: 'border-slate-300',
    bgGlow: 'bg-slate-400/10',
    checkUnlocked: (history) => history.length >= 3,
    getProgressInfo: (history) => ({
      percent: Math.min(100, (history.length / 3) * 100),
      progressText: history.length >= 3 ? 'Telah Dibuka! ✨' : `${history.length}/3 Kuiz`,
    }),
  },
  {
    id: 'badge3',
    title: 'Pakar Seni',
    level: 'Emas',
    description: 'Menyelesaikan sekurang-kurangnya 5 percubaan kuiz dengan gigih.',
    requirement: 'Disiapkan 5 Kuiz',
    iconType: 'flame',
    gradient: 'from-amber-400 via-yellow-500 to-amber-600',
    borderAccent: 'border-yellow-400',
    bgGlow: 'bg-yellow-400/10',
    checkUnlocked: (history) => history.length >= 5,
    getProgressInfo: (history) => ({
      percent: Math.min(100, (history.length / 5) * 100),
      progressText: history.length >= 5 ? 'Telah Dibuka! ✨' : `${history.length}/5 Kuiz`,
    }),
  },
  {
    id: 'badge4',
    title: 'Bintang Cemerlang',
    level: 'Gred A',
    description: 'Mencapai keputusan Cemerlang (Skor ≥ 80%) atau menyiapkan 8 kuiz.',
    requirement: 'Skor ≥ 80% / 8 Kuiz',
    iconType: 'star',
    gradient: 'from-emerald-500 to-teal-700',
    borderAccent: 'border-emerald-400',
    bgGlow: 'bg-emerald-400/10',
    checkUnlocked: (history) => {
      const maxScore = history.length > 0 ? Math.max(...history.map((q) => q.percentage)) : 0;
      return maxScore >= 80 || history.length >= 8;
    },
    getProgressInfo: (history) => {
      const maxScore = history.length > 0 ? Math.max(...history.map((q) => q.percentage)) : 0;
      const isUnlocked = maxScore >= 80 || history.length >= 8;
      return {
        percent: isUnlocked ? 100 : Math.min(100, Math.max((history.length / 8) * 100, maxScore)),
        progressText: isUnlocked ? 'Telah Dibuka! ✨' : `${history.length}/8 Kuiz (Max: ${maxScore}%)`,
      };
    },
  },
  {
    id: 'badge5',
    title: 'Mahaguru Sepagaya',
    level: 'Platinum',
    description: 'Menyelesaikan 10 kuiz atau menerokai kesemua 7 bidang utama PSV.',
    requirement: '10 Kuiz / 7 Bidang',
    iconType: 'trophy',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    borderAccent: 'border-purple-400',
    bgGlow: 'bg-purple-500/10',
    checkUnlocked: (history) => {
      const uniqueBidangs = new Set(history.map((q) => q.mode)).size;
      return history.length >= 10 || uniqueBidangs >= 7;
    },
    getProgressInfo: (history) => {
      const uniqueBidangs = new Set(history.map((q) => q.mode)).size;
      const isUnlocked = history.length >= 10 || uniqueBidangs >= 7;
      return {
        percent: isUnlocked ? 100 : Math.min(100, (history.length / 10) * 100),
        progressText: isUnlocked
          ? 'Telah Dibuka! ✨'
          : `${history.length}/10 Kuiz (${uniqueBidangs}/7 Bidang)`,
      };
    },
  },
];

export function getNewlyUnlockedBadges(
  previousHistory: QuizAttempt[],
  currentHistory: QuizAttempt[]
): BadgeDefinition[] {
  const newlyUnlocked: BadgeDefinition[] = [];

  for (const badge of BADGE_DEFINITIONS) {
    const wasUnlocked = badge.checkUnlocked(previousHistory);
    const isNowUnlocked = badge.checkUnlocked(currentHistory);

    if (!wasUnlocked && isNowUnlocked) {
      newlyUnlocked.push(badge);
    }
  }

  return newlyUnlocked;
}
