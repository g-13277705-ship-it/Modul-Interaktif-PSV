import React, { useState, useEffect } from 'react';
import { BIDANG_NOTES, BidangNote } from '../data/notesData';
import { SECTIONS } from '../data/quizData';
import {
  downloadNotesAsPDF,
  downloadNotesAsHTMLFile,
  openPrintWindow,
} from '../utils/pdfExport';
import {
  isNotesCachedOffline,
  markNotesCachedOffline,
  getOfflineCachedTime,
} from '../utils/offlineCache';
import {
  BookOpen,
  Printer,
  X,
  FileText,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Download,
  Scissors,
  Palette,
  Shirt,
  Crown,
  Castle,
  Layers,
  Compass,
  Check,
  Loader2,
  FileCode,
  WifiOff,
  Wifi,
  HardDriveDownload,
  CheckCircle2,
  HardDrive,
} from 'lucide-react';

interface QuickNotesModalProps {
  initialBidangId?: string;
  onClose: () => void;
}

export const QuickNotesModal: React.FC<QuickNotesModalProps> = ({
  initialBidangId = 'sectionA',
  onClose,
}) => {
  const [selectedBidangId, setSelectedBidangId] = useState<string>(initialBidangId);
  const [viewAllMode, setViewAllMode] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Network & Offline Cache States
  const [isOffline, setIsOffline] = useState<boolean>(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [isCachedOffline, setIsCachedOffline] = useState<boolean>(() => isNotesCachedOffline());
  const [cacheTime, setCacheTime] = useState<string | null>(() => getOfflineCachedTime());

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const currentNote: BidangNote = BIDANG_NOTES[selectedBidangId] || BIDANG_NOTES['sectionA'];
  const currentSection = SECTIONS.find((s) => s.id === selectedBidangId) || SECTIONS[0];

  const handleToggleCacheOffline = () => {
    const nextState = !isCachedOffline;
    markNotesCachedOffline(nextState);
    setIsCachedOffline(nextState);
    setCacheTime(getOfflineCachedTime());
    if (nextState) {
      setDownloadSuccess(
        'Nota 7 Bidang PSV berjaya disahkan untuk Akses Luar Talian (Offline Cache)!'
      );
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
  };

  const renderSectionIcon = (iconName: string) => {
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

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    setDownloadSuccess(null);
    markNotesCachedOffline(true);
    setIsCachedOffline(true);
    setCacheTime(getOfflineCachedTime());

    try {
      const targetBidang = viewAllMode ? undefined : selectedBidangId;
      await downloadNotesAsPDF(targetBidang);
      setDownloadSuccess('Fail PDF Berjaya Dimuat Turun & Disimpan untuk Luar Talian!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (e) {
      console.error('PDF download error:', e);
      // Fallback
      downloadNotesAsHTMLFile(viewAllMode ? undefined : selectedBidangId);
      setDownloadSuccess('Fail Dokumen Nota Berjaya Dimuat Turun (Salinan Tempatan)!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadHTML = () => {
    const targetBidang = viewAllMode ? undefined : selectedBidangId;
    downloadNotesAsHTMLFile(targetBidang);
    markNotesCachedOffline(true);
    setIsCachedOffline(true);
    setCacheTime(getOfflineCachedTime());
    setDownloadSuccess('Fail Dokumen Nota (.html) Berjaya Dimuat Turun!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handlePrint = () => {
    const targetBidang = viewAllMode ? undefined : selectedBidangId;
    openPrintWindow(targetBidang);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Modal Card */}
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden my-auto print:max-h-none print:shadow-none print:border-none print:w-full print:p-0">
        
        {/* Modal Header (Hidden on print) */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 sm:p-6 text-white flex items-center justify-between border-b border-indigo-900/50 print:hidden">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 text-indigo-300 shadow-inner">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-indigo-500/30 text-indigo-200 border border-indigo-400/20">
                  Modul Interaktif PSV
                </span>
                
                {/* Connection & Cache Visual Badges */}
                {isOffline ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/30 text-amber-300 border border-amber-400/40 flex items-center space-x-1 animate-pulse">
                    <WifiOff className="w-3 h-3 text-amber-400" />
                    <span>Mod Luar Talian</span>
                  </span>
                ) : isCachedOffline ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Akses Luar Talian Sedia</span>
                  </span>
                ) : null}

                <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
                  SMK Sepagaya
                </span>
              </div>
              <h2 className="font-['Outfit'] font-bold text-xl sm:text-2xl text-white tracking-tight">
                Nota Ringkas & Bahan Ulang Kaji
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Cache Offline Toggle Button */}
            <button
              onClick={handleToggleCacheOffline}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isCachedOffline
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/60'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Simpan nota ini dalam memori peranti untuk dibaca tanpa internet"
            >
              <HardDriveDownload className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">
                {isCachedOffline ? 'Disimpan Luar Talian' : 'Simpan Luar Talian'}
              </span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
              title="Muat turun fail PDF ke peranti"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Jana PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Muat Turun PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadHTML}
              className="hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-indigo-100 font-medium text-xs border border-indigo-700/50 transition-all cursor-pointer"
              title="Muat turun salinan dokumen nota .html"
            >
              <FileCode className="w-4 h-4 text-indigo-300" />
              <span>Muat Turun HTML</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-medium text-xs transition-all cursor-pointer"
              title="Buka tingkap cetak"
            >
              <Printer className="w-4 h-4 text-slate-300" />
              <span>Cetak</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Network State Alert Banners */}
        {isOffline && (
          <div className="bg-amber-950/95 border-b border-amber-800/80 px-4 py-2.5 text-xs text-amber-200 font-medium flex items-center justify-between print:hidden">
            <div className="flex items-center space-x-2">
              <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Mod Luar Talian Aktif:</strong> Sambungan internet tidak dikesan. Semua nota 7 Bidang PSV disajikan secara penuh daripada simpanan tempatan peranti anda.
              </span>
            </div>
            <span className="hidden md:inline px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold shrink-0">
              🟢 Cache Sedia ({cacheTime || 'Aktif'})
            </span>
          </div>
        )}

        {!isOffline && isCachedOffline && (
          <div className="bg-emerald-950/90 border-b border-emerald-800/60 px-4 py-2 text-xs text-emerald-200 font-medium flex items-center justify-between print:hidden">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Nota 7 Bidang PSV disahkan tersimpan untuk akses luar talian (kemas kini: {cacheTime || 'Terbaharu'}). Anda boleh membaca nota ini walaupun tanpa data internet.
              </span>
            </div>
            <button
              onClick={handleToggleCacheOffline}
              className="text-[11px] underline hover:text-white font-bold cursor-pointer shrink-0 ml-2"
            >
              Nyahaktif Cache
            </button>
          </div>
        )}

        {/* Download Alert Status */}
        {downloadSuccess && (
          <div className="bg-emerald-500 text-slate-950 px-4 py-2.5 text-xs font-bold flex items-center justify-between shadow-inner print:hidden">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4" />
              <span>{downloadSuccess} Check folder Downloads di peranti anda.</span>
            </div>
            <button onClick={() => setDownloadSuccess(null)} className="text-slate-950 font-black">
              ×
            </button>
          </div>
        )}

        {/* Printable Document Header (Only visible when printed) */}
        <div className="hidden print:block p-6 text-center border-b-2 border-slate-900 mb-6 space-y-2">
          <div className="text-xs font-extrabold uppercase tracking-widest text-slate-600">
            PANITIA SENI VISUAL SMK SEPAGAYA • PENDIDIKAN SENI VISUAL KSSM SPM
          </div>
          <h1 className="font-['Outfit'] font-extrabold text-2xl text-slate-900 uppercase">
            MODUL NOTA RINGKAS & ULANG KAJI PENTAKSIRAN
          </h1>
          <p className="text-xs font-semibold text-slate-700">
            Merangkumi 7 Bidang Utama Sukatan Pendidikan Seni Visual (Tingkatan 1 hingga 5)
          </p>
        </div>

        {/* Bidang Navigation Tabs (Hidden on print) */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 overflow-x-auto print:hidden">
          <div className="flex items-center space-x-2 min-w-max">
            <button
              onClick={() => setViewAllMode(!viewAllMode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                viewAllMode
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{viewAllMode ? 'Papar Per Bidang' : 'Papar Semua 7 Bidang'}</span>
            </button>

            <div className="h-6 w-px bg-slate-300 mx-1" />

            {SECTIONS.map((sec) => {
              const isSelected = !viewAllMode && selectedBidangId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    setViewAllMode(false);
                    setSelectedBidangId(sec.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  <span>{sec.code}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 bg-slate-50/50 print:overflow-visible print:p-0 print:bg-white">
          {viewAllMode ? (
            /* View All 7 Bidang Notes */
            <div id="all-notes-container" className="space-y-10 p-2 bg-white rounded-2xl">
              <div className="bg-indigo-900 text-white p-5 rounded-2xl space-y-1 print:border print:border-slate-300 print:bg-white print:text-slate-900">
                <h3 className="font-['Outfit'] font-bold text-lg flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-indigo-300 print:text-slate-900" />
                  <span>Koleksi Lengkap Nota Ringkas (Semua 7 Bidang KSSM)</span>
                </h3>
                <p className="text-xs text-indigo-200 print:text-slate-600">
                  Disusun khas oleh Panitia Seni Visual SMK Sepagaya untuk rujukan pantas calon SPM.
                </p>
              </div>

              {SECTIONS.map((sec) => {
                const note = BIDANG_NOTES[sec.id];
                if (!note) return null;
                return (
                  <div key={sec.id} id={`note-card-${sec.id}`} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 page-break-after">
                    <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                      <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                        {renderSectionIcon(sec.icon)}
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-indigo-600 tracking-wide uppercase">
                          {sec.code}
                        </span>
                        <h3 className="font-['Outfit'] font-bold text-xl text-slate-900">
                          {sec.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {note.summary}
                    </p>

                    <div className="space-y-5">
                      {note.topics.map((topic, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-600" />
                            <span>{topic.title}</span>
                          </h4>
                          <ul className="space-y-1.5 pl-4">
                            {topic.points.map((pt, pIdx) => (
                              <li key={pIdx} className="text-xs text-slate-700 list-disc leading-relaxed">
                                {pt}
                              </li>
                            ))}
                          </ul>
                          {topic.examTips && (
                            <div className="mt-2 text-[11px] bg-amber-50 text-amber-900 p-2.5 rounded-lg border border-amber-200 font-medium">
                              <strong>💡 Petua SPM:</strong> {topic.examTips}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* View Selected Single Bidang Note */
            <div id={`note-card-${selectedBidangId}`} className="space-y-6 bg-white p-4 rounded-2xl border border-slate-100">
              {/* Bidang Header Card */}
              <div className={`p-6 rounded-2xl bg-gradient-to-r ${currentSection.themeColor} text-white shadow-lg space-y-3 print:bg-white print:text-slate-900 print:border print:border-slate-300 print:shadow-none`}>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs print:bg-slate-100 print:text-slate-800">
                    {currentSection.code}
                  </span>
                  <span className="text-xs font-semibold text-white/80 print:text-slate-600">
                    Range Soalan SPM: {currentSection.questionRange[0]} - {currentSection.questionRange[1]}
                  </span>
                </div>

                <h3 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-white tracking-tight print:text-slate-900">
                  {currentNote.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-3xl print:text-slate-700">
                  {currentNote.summary}
                </p>
              </div>

              {/* Topics Breakdown */}
              <div className="space-y-6">
                {currentNote.topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3.5 hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </div>
                      <h4 className="font-['Outfit'] font-bold text-base text-slate-900">
                        {topic.title}
                      </h4>
                    </div>

                    <div className="pl-2 space-y-2">
                      {topic.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start space-x-2 text-xs text-slate-700 leading-relaxed">
                          <ChevronRight className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {topic.examTips && (
                      <div className="mt-3 bg-amber-50/90 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-950 flex items-start space-x-2.5">
                        <span className="text-base shrink-0">💡</span>
                        <div>
                          <strong className="font-bold text-amber-900">Petua Pentaksiran SPM:</strong>{' '}
                          {topic.examTips}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer (Hidden on print) */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="text-xs text-slate-500 font-medium text-center sm:text-left space-y-0.5">
            <div>Disusun untuk Panitia Seni Visual SMK Sepagaya • KSSM SPM</div>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="font-semibold text-slate-600">
                Akses Peranti: {isOffline ? '⚡ Mod Luar Talian' : '🌐 Mod Dalam Talian'}
              </span>
              <span>•</span>
              <span
                className={`font-semibold ${
                  isCachedOffline ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {isCachedOffline
                  ? `🟢 Cache Tempatan Aktif ${cacheTime ? `(${cacheTime})` : ''}`
                  : '⚪ Belum Disimpan Luar Talian'}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Jana PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>Muat Turun PDF (.pdf)</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadHTML}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 border border-slate-300 cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-indigo-600" />
              <span>Muat Turun HTML</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
