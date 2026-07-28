import React from 'react';
import { QuizAttempt } from '../types';
import { BarChart3, Trophy, Calendar, Clock, Trash2, Download, Eye, RotateCcw, AlertTriangle, FileSpreadsheet } from 'lucide-react';

interface TrackerTabProps {
  attempts: QuizAttempt[];
  onSelectAttempt: (attempt: QuizAttempt) => void;
  onClearHistory: () => void;
  onDeleteAttempt: (id: string) => void;
  onStartNewQuiz: () => void;
}

export const TrackerTab: React.FC<TrackerTabProps> = ({
  attempts,
  onSelectAttempt,
  onClearHistory,
  onDeleteAttempt,
  onStartNewQuiz,
}) => {
  const totalAttempts = attempts.length;

  const avgPct = totalAttempts > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalAttempts)
    : 0;

  const highestPct = totalAttempts > 0
    ? Math.max(...attempts.map((a) => a.percentage))
    : 0;

  const cemerlangCount = attempts.filter((a) => a.grade === 'Cemerlang').length;
  const lulusCount = attempts.filter((a) => a.grade === 'Lulus').length;

  const exportAllHistoryJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(attempts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Rekod_Prestasi_PSV_KSSM_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-indigo-400" />
            <h2 className="font-['Outfit'] font-extrabold text-2xl text-white">
              Analisis Prestasi & Rekod Percubaan
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Jejak kemajuan pembelajaran murid dari semasa ke semasa berasaskan data rekod percubaan yang tersimpan.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {totalAttempts > 0 && (
            <button
              onClick={exportAllHistoryJSON}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Eksport Semua Data</span>
            </button>
          )}

          <button
            onClick={onStartNewQuiz}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            Mula Kuiz Baru
          </button>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <p className="text-xs text-slate-500 font-medium">Jumlah Sesi Kuiz</p>
          <p className="text-3xl font-extrabold font-['Outfit'] text-slate-900">{totalAttempts}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <p className="text-xs text-slate-500 font-medium">Purata Peratusan</p>
          <p className="text-3xl font-extrabold font-['Outfit'] text-indigo-600">
            {avgPct}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <p className="text-xs text-slate-500 font-medium">Peratusan Tertinggi</p>
          <p className="text-3xl font-extrabold font-['Outfit'] text-emerald-600">
            {highestPct}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <p className="text-xs text-slate-500 font-medium">Pencapaian Cemerlang</p>
          <p className="text-3xl font-extrabold font-['Outfit'] text-amber-600">{cemerlangCount}</p>
        </div>
      </div>

      {/* Attempts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-['Outfit'] font-bold text-lg text-slate-900">
            Sejarah Percubaan Kuiz
          </h3>

          {totalAttempts > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Padam Semua Rekod</span>
            </button>
          )}
        </div>

        {totalAttempts === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-800">Tiada Rekod Percubaan Tersimpan</p>
              <p className="text-xs text-slate-500">
                Selesaikan kuiz pertama anda untuk melihat analisis pencapaian di sini.
              </p>
            </div>
            <button
              onClick={onStartNewQuiz}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-block cursor-pointer"
            >
              Mula Kuiz Sekarang
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Tarikh / Masa</th>
                  <th className="px-4 py-3">Nama Murid</th>
                  <th className="px-4 py-3">Kelas</th>
                  <th className="px-4 py-3">Modul</th>
                  <th className="px-4 py-3">Masa</th>
                  <th className="px-4 py-3">Skor</th>
                  <th className="px-4 py-3">Gred</th>
                  <th className="px-4 py-3 rounded-r-xl text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {attempts.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                      {att.dateFormatted}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-900">{att.studentName}</td>
                    <td className="px-4 py-3.5 text-slate-600">{att.className}</td>
                    <td className="px-4 py-3.5 text-slate-600 max-w-[140px] truncate">{att.modeTitle}</td>
                    <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">
                      {formatTimer(att.timeTakenSeconds)}
                    </td>
                    <td className="px-4 py-3.5 font-extrabold font-mono text-indigo-700">
                      {att.score} / {att.totalQuestions} ({att.percentage}%)
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${att.gradeBadgeColor}`}>
                        {att.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => onSelectAttempt(att)}
                        className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                        title="Lihat Keputusan & Laporan"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteAttempt(att.id)}
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Padam Rekod Ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
