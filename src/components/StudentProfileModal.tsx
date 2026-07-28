import React, { useState } from 'react';
import { StudentProfile, QuizAttempt } from '../types';
import { CuteArtMascot, CuteTrophyBadge, CuteCrownIcon, CuteSparkleStar, CuteRibbonBadge } from './CuteCartoonIcons';
import { sounds } from '../utils/soundEffects';
import {
  User,
  X,
  Award,
  Calendar,
  Clock,
  Printer,
  CheckCircle2,
  FileText,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trophy,
  ArrowRight,
  Share2,
  Check,
  GraduationCap,
  Medal,
} from 'lucide-react';

interface StudentProfileModalProps {
  studentProfile: StudentProfile;
  onUpdateProfile: (profile: StudentProfile) => void;
  quizHistory: QuizAttempt[];
  onClose: () => void;
  onViewCertificate: (attempt: QuizAttempt) => void;
  onStartQuiz: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  studentProfile,
  onUpdateProfile,
  quizHistory,
  onClose,
  onViewCertificate,
  onStartQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'edit'>('gallery');
  const [nameInput, setNameInput] = useState(studentProfile.name || '');
  const [classInput, setClassInput] = useState(studentProfile.className || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterGrade, setFilterGrade] = useState<'all' | 'Cemerlang' | 'Lulus' | 'Perlu Bimbingan'>('all');
  const [sortBy, setSortBy] = useState<'best' | 'latest'>('best');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playCorrect();
    onUpdateProfile({
      name: nameInput.trim(),
      className: classInput.trim(),
    });
    setActiveTab('gallery');
  };

  // Process & sort quiz attempts for certificate gallery
  const sortedAttempts = [...quizHistory].sort((a, b) => {
    if (sortBy === 'best') {
      // First sort by percentage descending (pencapaian terbaik)
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage;
      }
      // If percentage equal, sort by timestamp descending (tarikh terkini)
      return b.timestamp - a.timestamp;
    } else {
      // Sort purely by latest timestamp
      return b.timestamp - a.timestamp;
    }
  });

  const filteredCertificates = sortedAttempts.filter((attempt) => {
    if (filterGrade === 'all') return true;
    return attempt.grade === filterGrade;
  });

  const bestAttempt = quizHistory.length > 0
    ? [...quizHistory].sort((a, b) => b.percentage - a.percentage)[0]
    : null;

  const totalCertificates = quizHistory.length;
  const cemerlangCount = quizHistory.filter((a) => a.percentage >= 80).length;

  const handleCopyCertificateInfo = (attempt: QuizAttempt) => {
    sounds.playClick();
    const text = `📜 *SIJIL PENTAKSIRAN KENDIRI PSV SPM*\n👤 Murid: ${attempt.studentName} (${attempt.className})\n🎯 Skor: ${attempt.score}/${attempt.totalQuestions} (${attempt.percentage}% - ${attempt.grade})\n📅 Tarikh: ${attempt.dateFormatted}\n🆔 ID Sijil: ${attempt.id}`;
    navigator.clipboard.writeText(text);
    setCopiedId(attempt.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute right-0 top-0 -mr-8 -mt-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center space-x-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-pink-500 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-amber-300 font-extrabold text-lg">
                {studentProfile.name ? studentProfile.name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-['Outfit'] font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  {studentProfile.name || 'Profil Murid'}
                </h2>
                {studentProfile.className && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                    {studentProfile.className}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 flex items-center space-x-1 mt-0.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                <span>Panitia Seni Visual SMK Sepagaya</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer relative z-10"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="bg-slate-100/80 border-b border-slate-200/80 px-4 pt-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('gallery');
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-2xl text-xs font-bold transition-all cursor-pointer border-t border-x ${
                activeTab === 'gallery'
                  ? 'bg-white text-indigo-700 border-slate-200 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 border-transparent'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Galeri Sijil PDF ({totalCertificates})</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('edit');
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-2xl text-xs font-bold transition-all cursor-pointer border-t border-x ${
                activeTab === 'edit'
                  ? 'bg-white text-indigo-700 border-slate-200 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 border-transparent'
              }`}
            >
              <User className="w-4 h-4 text-indigo-600" />
              <span>Kemaskini Profil</span>
            </button>
          </div>

          {bestAttempt && (
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-black">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Pencapaian Terbaik: {bestAttempt.percentage}% ({bestAttempt.grade})</span>
            </div>
          )}
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: GALERI SIJIL PDF */}
          {activeTab === 'gallery' && (
            <div className="space-y-5">
              {/* Certificate Stats Bar */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center space-x-3 px-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xl font-black font-['Outfit'] text-slate-900">{totalCertificates}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Jumlah Sijil Dijana</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 px-2 border-l border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xl font-black font-['Outfit'] text-slate-900">{cemerlangCount}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Sijil Cemerlang (80%+)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 px-2 border-l border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xl font-black font-['Outfit'] text-slate-900">
                      {bestAttempt ? `${bestAttempt.percentage}%` : '0%'}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Skor Tertinggi</p>
                  </div>
                </div>
              </div>

              {/* Filtering & Sorting Toolbar */}
              {totalCertificates > 0 && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Gred:</span>
                    {(['all', 'Cemerlang', 'Lulus', 'Perlu Bimbingan'] as const).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => {
                          sounds.playClick();
                          setFilterGrade(grade);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                          filterGrade === grade
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {grade === 'all' ? 'Semua Sijil' : grade}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-end space-x-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Susunan:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        sounds.playClick();
                        setSortBy(e.target.value as 'best' | 'latest');
                      }}
                      className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="best">🏆 Pencapaian Terbaik First</option>
                      <option value="latest">📅 Tarikh Terkini First</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Certificates List */}
              {filteredCertificates.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredCertificates.map((attempt, index) => {
                    const isBestOverall = bestAttempt && bestAttempt.id === attempt.id;
                    const isCemerlang = attempt.percentage >= 80;
                    const isLulus = attempt.percentage >= 50 && attempt.percentage < 80;

                    return (
                      <div
                        key={attempt.id}
                        className={`relative bg-white rounded-3xl border-2 p-5 transition-all duration-200 hover:shadow-md ${
                          isCemerlang
                            ? 'border-amber-300/80 bg-gradient-to-r from-amber-50/40 via-white to-orange-50/30'
                            : isLulus
                            ? 'border-blue-200 bg-gradient-to-r from-blue-50/30 via-white to-slate-50'
                            : 'border-slate-200 bg-slate-50/50'
                        }`}
                      >
                        {/* Top Ribbon & ID Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center space-x-2.5">
                            <div
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                                isCemerlang
                                  ? 'bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-xs'
                                  : isLulus
                                  ? 'bg-gradient-to-tr from-blue-500 to-indigo-600 text-white border-blue-400 shadow-xs'
                                  : 'bg-slate-200 text-slate-600 border-slate-300'
                              }`}
                            >
                              {isCemerlang ? (
                                <CuteCrownIcon className="w-6 h-6" />
                              ) : (
                                <Award className="w-5 h-5" />
                              )}
                            </div>

                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-['Outfit'] font-black text-slate-900 text-base leading-tight">
                                  SIJIL PENTAKSIRAN KENDIRI PSV
                                </h3>
                                {isBestOverall && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow-2xs flex items-center space-x-1">
                                    <Trophy className="w-3 h-3 text-slate-950" />
                                    <span>Pencapaian Terbaik</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                                {attempt.modeTitle || 'Pentaksiran Modul PSV KSSM'}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span
                              className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider inline-block ${
                                isCemerlang
                                  ? 'bg-amber-400 text-slate-950 border border-amber-300 shadow-2xs'
                                  : isLulus
                                  ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {attempt.grade}
                            </span>
                          </div>
                        </div>

                        {/* Student Name & Score Breakdown Bar */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/80 p-3.5 rounded-2xl border border-slate-200/80 my-3 text-xs">
                          <div className="space-y-1">
                            <div className="text-slate-500 font-medium">Penerima Sijil:</div>
                            <div className="font-extrabold text-slate-900 text-sm">
                              {attempt.studentName || 'Murid PSV'}
                              <span className="ml-1.5 text-xs text-slate-500 font-normal">
                                ({attempt.className || 'Kelas'})
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              Tarikh: {attempt.dateFormatted}
                            </div>
                          </div>

                          <div className="space-y-1 sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                            <div className="text-slate-500 font-medium">Keputusan Kuiz:</div>
                            <div className="font-black text-indigo-700 text-base font-['Outfit']">
                              {attempt.score} / {attempt.totalQuestions} Soalan ({attempt.percentage}%)
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              Masa Mengerjakan: {Math.floor(attempt.timeTakenSeconds / 60)}m {attempt.timeTakenSeconds % 60}s
                            </div>
                          </div>
                        </div>

                        {/* Certificate Actions Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: {attempt.id}
                          </span>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleCopyCertificateInfo(attempt)}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                              title="Salin Ringkasan Sijil"
                            >
                              {copiedId === attempt.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700">Disalin!</span>
                                </>
                              ) : (
                                <>
                                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                                  <span>Salin Info</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => {
                                sounds.playClick();
                                onViewCertificate(attempt);
                              }}
                              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5 text-amber-300" />
                              <span>Papar & Cetak PDF</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty Gallery State */
                <div className="text-center py-10 px-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
                    <CuteArtMascot className="w-14 h-14" mood="happy" />
                  </div>

                  <div className="space-y-1 max-w-sm mx-auto">
                    <h3 className="font-['Outfit'] font-bold text-base text-slate-900">
                      {totalCertificates === 0
                        ? 'Galeri Sijil Masih Kosong'
                        : 'Tiada Sijil Mengikut Carian Ini'}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {totalCertificates === 0
                        ? 'Selesaikah satu set kuiz 40 soalan atau latih tubi bidang untuk menjana Sijil Pentaksiran Kendiri PDF rasmi anda!'
                        : 'Cuba tukar tapisan gred di atas untuk melihat senarai sijil yang lain.'}
                    </p>
                  </div>

                  {totalCertificates === 0 && (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onClose();
                        onStartQuiz();
                      }}
                      className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md inline-flex items-center space-x-2 transition-transform hover:scale-105 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Mula Kuiz Pertama Sekarang</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KEMASKINI PROFIL */}
          {activeTab === 'edit' && (
            <form onSubmit={handleSaveProfile} className="space-y-5 max-w-md mx-auto py-2">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-lg text-slate-900">
                  Kemaskini Maklumat Diri Murid
                </h3>
                <p className="text-xs text-slate-500">
                  Nama dan kelas ini akan dipaparkan secara rasmi dalam Sijil Pencapaian PDF dan Papan Pendahuluan Kelas.
                </p>
              </div>

              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Penuh Murid
                  </label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Contoh: Muhammad Ammar Bin Rosli"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-semibold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kelas / Tingkatan
                  </label>
                  <input
                    type="text"
                    required
                    value={classInput}
                    onChange={(e) => setClassInput(e.target.value)}
                    placeholder="Contoh: 5 ILTIZAM"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-semibold bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('gallery')}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Profil Murid
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
