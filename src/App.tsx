import React, { useState, useEffect } from 'react';
import { ActiveTab, QuizAttempt, StudentProfile } from './types';
import { Navbar } from './components/Navbar';
import { DashboardTab } from './components/DashboardTab';
import { QuizTab } from './components/QuizTab';
import { ResultTab } from './components/ResultTab';
import { AnswerKeyTab } from './components/AnswerKeyTab';
import { TrackerTab } from './components/TrackerTab';
import { Leaderboard } from './components/Leaderboard';
import { PrintReportModal } from './components/PrintReportModal';
import { QuickNotesModal } from './components/QuickNotesModal';
import { BadgeUnlockNotification } from './components/BadgeUnlockNotification';
import { DailySpinWheelModal } from './components/DailySpinWheelModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { getNewlyUnlockedBadges, BadgeDefinition } from './utils/badges';
import { QUESTIONS, SECTIONS } from './data/quizData';
import { User, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Student profile in local storage
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('psv_student_profile');
      return saved ? JSON.parse(saved) : { name: '', className: '' };
    } catch (e) {
      return { name: '', className: '' };
    }
  });

  // Quiz Attempt History in local storage
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem('psv_quiz_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Current completed attempt for result view
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(() => {
    return quizHistory.length > 0 ? quizHistory[0] : null;
  });

  const [initialQuizSection, setInitialQuizSection] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false);
  const [showSpinWheelModal, setShowSpinWheelModal] = useState<boolean>(false);
  const [notesBidangId, setNotesBidangId] = useState<string>('sectionA');
  const [unlockedBadges, setUnlockedBadges] = useState<BadgeDefinition[]>([]);

  // Sync student profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('psv_student_profile', JSON.stringify(studentProfile));
    } catch (e) {
      console.error('Failed to save student profile', e);
    }
  }, [studentProfile]);

  // Sync quiz history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('psv_quiz_history', JSON.stringify(quizHistory));
    } catch (e) {
      console.error('Failed to save quiz history', e);
    }
  }, [quizHistory]);

  const handleStartQuiz = (sectionId?: string) => {
    setInitialQuizSection(sectionId || null);
    setActiveTab('quiz');
  };

  const handleCompleteQuiz = (newAttempt: QuizAttempt) => {
    const previousHistory = quizHistory;
    const newHistory = [newAttempt, ...quizHistory];

    setQuizHistory(newHistory);
    setCurrentAttempt(newAttempt);
    setActiveTab('quiz'); // Will show result in Result Tab or stay in Quiz flow

    const newlyUnlocked = getNewlyUnlockedBadges(previousHistory, newHistory);
    if (newlyUnlocked.length > 0) {
      setUnlockedBadges(newlyUnlocked);
    }
  };

  const handleDeleteAttempt = (id: string) => {
    setQuizHistory((prev) => prev.filter((a) => a.id !== id));
    if (currentAttempt && currentAttempt.id === id) {
      const remaining = quizHistory.filter((a) => a.id !== id);
      setCurrentAttempt(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Adakah anda pasti mahu memadam kesemua rekod sejarah percubaan?')) {
      setQuizHistory([]);
      setCurrentAttempt(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentProfile={studentProfile}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onOpenNotesModal={() => {
          setNotesBidangId('sectionA');
          setShowNotesModal(true);
        }}
        onOpenSpinWheel={() => setShowSpinWheelModal(true)}
        historyCount={quizHistory.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <DashboardTab
            setActiveTab={setActiveTab}
            studentProfile={studentProfile}
            onStartQuiz={handleStartQuiz}
            onOpenNotesModal={(sectionId) => {
              setNotesBidangId(sectionId || 'sectionA');
              setShowNotesModal(true);
            }}
            onOpenSpinWheel={() => setShowSpinWheelModal(true)}
            lastScore={currentAttempt?.score}
            quizHistory={quizHistory}
          />
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6">
            {/* If there is a current attempt freshly completed and user clicked result, or show quiz directly */}
            <QuizTab
              studentProfile={studentProfile}
              setStudentProfile={setStudentProfile}
              onCompleteQuiz={(attempt) => {
                handleCompleteQuiz(attempt);
              }}
              initialSectionId={initialQuizSection}
            />

            {/* Show recent completed result below quiz if available */}
            {currentAttempt && (
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-['Outfit'] font-bold text-lg text-slate-900">
                    Keputusan Percubaan Terakhir
                  </h3>
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-bold cursor-pointer"
                  >
                    Cetak Sijil Keputusan Ini
                  </button>
                </div>
                <ResultTab
                  attempt={currentAttempt}
                  onRetakeQuiz={() => handleStartQuiz()}
                  onOpenAnswerKey={() => setActiveTab('answerKey')}
                  onOpenPrintModal={() => setShowPrintModal(true)}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'answerKey' && <AnswerKeyTab />}

        {activeTab === 'tracker' && (
          <TrackerTab
            attempts={quizHistory}
            onSelectAttempt={(att) => {
              setCurrentAttempt(att);
              setActiveTab('quiz');
            }}
            onClearHistory={handleClearHistory}
            onDeleteAttempt={handleDeleteAttempt}
            onStartNewQuiz={() => handleStartQuiz()}
          />
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6 pb-12">
            <Leaderboard
              quizHistory={quizHistory}
              currentStudent={studentProfile}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            Modul Interaktif Panitia Seni Visual • SMK Sepagaya
          </p>
          <p className="text-[11px] text-slate-400">
            Platform Kuiz Interaktif & Pentaksiran Kendiri KSSM SPM • {QUESTIONS.length} Soalan Lengkap ({SECTIONS.length} Bidang Utama Sukatan)
          </p>
        </div>
      </footer>

      {/* Printable Report Modal */}
      {showPrintModal && currentAttempt && (
        <PrintReportModal
          attempt={currentAttempt}
          onClose={() => setShowPrintModal(false)}
        />
      )}

      {/* Quick Revision Notes Modal */}
      {showNotesModal && (
        <QuickNotesModal
          initialBidangId={notesBidangId}
          onClose={() => setShowNotesModal(false)}
        />
      )}

      {/* Student Profile & Certificate Gallery Modal */}
      {showProfileModal && (
        <StudentProfileModal
          studentProfile={studentProfile}
          onUpdateProfile={(updated) => setStudentProfile(updated)}
          quizHistory={quizHistory}
          onClose={() => setShowProfileModal(false)}
          onViewCertificate={(attempt) => {
            setCurrentAttempt(attempt);
            setShowPrintModal(true);
          }}
          onStartQuiz={() => handleStartQuiz()}
        />
      )}

      {/* Badge Unlock Notification Modal */}
      {unlockedBadges.length > 0 && (
        <BadgeUnlockNotification
          unlockedBadges={unlockedBadges}
          onClose={() => setUnlockedBadges([])}
          onViewDashboard={() => setActiveTab('dashboard')}
        />
      )}

      {/* Daily Spin Wheel Mini-Game Modal */}
      <DailySpinWheelModal
        isOpen={showSpinWheelModal}
        onClose={() => setShowSpinWheelModal(false)}
        onStartBidangQuiz={(bidangId) => {
          setShowSpinWheelModal(false);
          handleStartQuiz(bidangId);
        }}
      />
    </div>
  );
}
