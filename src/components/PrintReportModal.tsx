import React from 'react';
import { QuizAttempt } from '../types';
import { SECTIONS, GRADE_RULES } from '../data/quizData';
import { Printer, X, Award, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';

interface PrintReportModalProps {
  attempt: QuizAttempt;
  onClose: () => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  attempt,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const gradeRule =
    GRADE_RULES.find(
      (r) => attempt.percentage >= r.minScorePct
    ) || GRADE_RULES[2];

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} minit ${secs} saat`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-8 print:my-0 print:shadow-none print:w-full print:max-w-none print:rounded-none">
        {/* Modal Controls (Hidden in print) */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <Printer className="w-5 h-5 text-indigo-400" />
            <span className="font-['Outfit'] font-bold text-sm">
              Pratonton Pelaporan Pentaksiran Kendiri PSV
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Content Area */}
        <div className="p-8 sm:p-12 space-y-8 print:p-8 bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
          {/* Header */}
          <div className="text-center space-y-2 border-b-2 border-slate-900 pb-6">
            <div className="inline-block px-3 py-1 bg-slate-100 rounded-md font-extrabold text-[10px] tracking-widest text-slate-700 uppercase mb-1">
              PANITIA SENI VISUAL SMK SEPAGAYA • MODUL INTERAKTIF PSV KSSM
            </div>
            <h1 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-slate-900">
              REKOD PELAPORAN PENTAKSIRAN KENDIRI
            </h1>
            <p className="text-xs font-semibold text-slate-600">
              Pendidikan Seni Visual KSSM SPM (SMK Sepagaya)
            </p>
          </div>

          {/* Student & Session Info Box */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
            <div className="space-y-1.5">
              <div>
                <span className="text-slate-500 font-medium">Nama Murid:</span>
                <p className="font-extrabold text-slate-900 text-sm">{attempt.studentName}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Kelas / Tingkatan:</span>
                <p className="font-bold text-slate-800">{attempt.className}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-right">
              <div>
                <span className="text-slate-500 font-medium">Tarikh & Masa Pentaksiran:</span>
                <p className="font-bold text-slate-800">{attempt.dateFormatted}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Masa Mengerjakan:</span>
                <p className="font-bold text-slate-800">{formatTimer(attempt.timeTakenSeconds)}</p>
              </div>
            </div>
          </div>

          {/* Result Summary Banner */}
          <div className="p-6 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                Pencapaian Keseluruhan:
              </span>
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-extrabold font-['Outfit'] text-indigo-950">
                  {attempt.score} <span className="text-lg font-normal text-slate-500">/ {attempt.totalQuestions}</span>
                </span>
                <span className="text-lg font-bold text-indigo-700">
                  ({attempt.percentage}%)
                </span>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="text-xs text-slate-500 font-medium block">Klasifikasi Gred:</span>
              <span className="px-4 py-1.5 rounded-xl text-sm font-extrabold uppercase bg-white text-indigo-900 border border-indigo-300 shadow-2xs inline-block">
                {attempt.grade}
              </span>
            </div>
          </div>

          {/* Topic Score Breakdown Table */}
          <div className="space-y-3">
            <h3 className="font-['Outfit'] font-bold text-sm text-slate-900 uppercase tracking-wide">
              Pencapaian Mengikut Modul Sukatan PSV
            </h3>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-100 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Kod & Tajuk Sukatan</th>
                  <th className="py-2.5 px-3 text-center">Skor Soalan</th>
                  <th className="py-2.5 px-3 text-center">Peratusan</th>
                  <th className="py-2.5 px-3 text-right">Tahap Penguasaan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {SECTIONS.map((sec) => {
                  const sData = attempt.sectionScores[sec.id] || { score: 0, total: 10 };
                  const pct = Math.round((sData.score / sData.total) * 100);
                  let statusText = 'Sangat Baik';
                  if (pct < 50) statusText = 'Perlu Bimbingan';
                  else if (pct < 80) statusText = 'Baik';

                  return (
                    <tr key={sec.id}>
                      <td className="py-2.5 px-3 font-semibold text-slate-800">
                        {sec.code}: {sec.title}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold font-mono">
                        {sData.score} / {sData.total}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold font-mono text-indigo-700">
                        {pct}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-slate-600">
                        {statusText}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Educational Feedback Note */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-900 block">Ulasan Guru / Cadangan Pembelajaran:</span>
            <p className="text-slate-700 italic leading-relaxed">
              "{gradeRule.subtext}"
            </p>
          </div>

          {/* Verification / Signature Section */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-slate-600">
            <div>
              <p className="font-semibold text-slate-800 mb-12">Disahkan Oleh Guru Mata Pelajaran:</p>
              <div className="border-b border-slate-400 w-48 mb-1"></div>
              <p className="font-bold text-slate-900">Tandatangan & Cop Guru PSV</p>
              <p className="text-[10px] text-slate-500">Tarikh: ____________________</p>
            </div>

            <div className="text-right">
              <div className="inline-block p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-left space-y-1">
                <div className="flex items-center space-x-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Sijil Sah Portal PSV</span>
                </div>
                <p className="text-[10px] text-indigo-800 font-mono">
                  ID Percubaan: {attempt.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
