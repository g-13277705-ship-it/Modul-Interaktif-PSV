import React, { useState, useEffect } from 'react';
import { ActiveTab, StudentProfile } from '../types';
import { isNotesCachedOffline } from '../utils/offlineCache';
import { sounds } from '../utils/soundEffects';
import { CuteArtMascot, CuteSparkleStar } from './CuteCartoonIcons';
import {
  Palette,
  Home,
  HelpCircle,
  FileCheck,
  BarChart3,
  User,
  FileText,
  WifiOff,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  studentProfile: StudentProfile;
  onOpenProfileModal: () => void;
  onOpenNotesModal?: () => void;
  onOpenSpinWheel?: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  studentProfile,
  onOpenProfileModal,
  onOpenNotesModal,
  onOpenSpinWheel,
  historyCount,
}) => {
  const [isOffline, setIsOffline] = useState<boolean>(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [isNotesCached, setIsNotesCached] = useState<boolean>(() => isNotesCachedOffline());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sounds.isEnabled());

  const handleToggleSound = () => {
    const nextState = sounds.toggleSound();
    setSoundEnabled(nextState);
    if (nextState) {
      sounds.playClick();
    }
  };

  useEffect(() => {
    const checkCache = () => {
      setIsNotesCached(isNotesCachedOffline());
    };
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('focus', checkCache);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('focus', checkCache);
    };
  }, []);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Utama', icon: <Home className="w-4 h-4" /> },
    { id: 'quiz', label: 'Mula Kuiz', icon: <HelpCircle className="w-4 h-4" />, badge: '40 Soalan' },
    { id: 'leaderboard', label: 'Papan Pendahuluan', icon: <Trophy className="w-4 h-4" /> },
    { id: 'tracker', label: 'Analisis Prestasi', icon: <BarChart3 className="w-4 h-4" />, badge: historyCount > 0 ? historyCount : undefined },
    { id: 'answerKey', label: 'Skema Jawapan', icon: <FileCheck className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
              <div className="relative shrink-0">
                <CuteArtMascot className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs group-hover:scale-110 transition-transform" mood="happy" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-['Outfit'] font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                    Modul PSV
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-black tracking-wide uppercase bg-gradient-to-r from-amber-200 to-pink-200 text-slate-900 rounded-full border border-amber-300/60 shadow-2xs">
                    SMK SEPAGAYA 🎨
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold hidden sm:block">
                  Panitia Seni Visual SMK Sepagaya
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-2xs">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sounds.playClick();
                      setActiveTab(item.id);
                    }}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                          isActive ? 'bg-amber-300 text-slate-950' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions: Sound Toggle, Roda Tuah, Profile, Notes */}
            <div className="flex items-center space-x-2">
              {/* Sound Toggle Button */}
              <button
                onClick={handleToggleSound}
                className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  soundEnabled
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                    : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
                }`}
                title={soundEnabled ? 'Kesan Bunyi Aktif (Mute)' : 'Kesan Bunyi Dinyahaktif (Unmute)'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Spin Wheel Button */}
              {onOpenSpinWheel && (
                <button
                  onClick={onOpenSpinWheel}
                  className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-pink-400 to-purple-500 hover:from-amber-500 hover:to-purple-600 text-slate-950 shadow-xs border border-amber-300 transition-all cursor-pointer hover:scale-105"
                  title="Putar Roda Tuah PSV SPM"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-900 animate-spin" />
                  <span>Roda Tuah 🎡</span>
                </button>
              )}

              {onOpenNotesModal && (
                <button
                  onClick={onOpenNotesModal}
                  className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs transition-colors cursor-pointer relative"
                  title="Baca & Muat Turun Nota Ringkas"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Nota PDF</span>
                  {isNotesCached && (
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 absolute -top-1 -right-1"
                      title="Nota Tersimpan untuk Akses Luar Talian (Offline Ready)"
                    />
                  )}
                </button>
              )}

              <button
                onClick={onOpenProfileModal}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                title="Kemaskini Profil Murid"
              >
                <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  {studentProfile.name ? studentProfile.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="font-bold text-slate-800 text-xs truncate max-w-[110px]">
                    {studentProfile.name || 'Set Nama'}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {studentProfile.className || 'Kelas'}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sleek Mobile Bottom Fixed Navigation Bar (Page-by-Page Mobile UX) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-lg px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(item.id);
              }}
              className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-all cursor-pointer relative ${
                isActive ? 'text-indigo-600 font-black' : 'text-slate-500 font-semibold hover:text-slate-800'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-transform ${
                  isActive ? 'bg-indigo-100 text-indigo-700 scale-110 shadow-2xs' : 'bg-transparent'
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 absolute top-0 right-3" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

