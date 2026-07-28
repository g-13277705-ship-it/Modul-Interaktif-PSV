import { BIDANG_NOTES, BidangNote } from '../data/notesData';
import { SECTIONS } from '../data/quizData';

export async function downloadNotesAsPDF(bidangId?: string) {
  try {
    // Dynamic import html2pdf.js to avoid SSR/build time issues
    // @ts-ignore
    const html2pdfModule = await import('html2pdf.js');
    // @ts-ignore
    const html2pdf = html2pdfModule.default || html2pdfModule;

    const element = document.getElementById(bidangId ? `note-card-${bidangId}` : 'all-notes-container');
    
    if (element && html2pdf) {
      const fileName = bidangId 
        ? `Nota_PSV_SMK_Sepagaya_${bidangId}.pdf` 
        : 'Nota_PSV_SMK_Sepagaya_Semua_Bidang.pdf';

      const opt = {
        margin: [10, 10, 10, 10],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // @ts-ignore
      await (html2pdf as any)().set(opt).from(element).save();
      return true;
    }
  } catch (err) {
    console.warn('html2pdf failed, falling back to HTML file download:', err);
  }

  // Fallback: Generate clean printable HTML file download if canvas rendering fails
  downloadNotesAsHTMLFile(bidangId);
  return false;
}

export function downloadNotesAsHTMLFile(bidangId?: string) {
  const notesToExport: { sectionCode: string; sectionTitle: string; note: BidangNote }[] = [];

  if (bidangId && BIDANG_NOTES[bidangId]) {
    const sec = SECTIONS.find((s) => s.id === bidangId);
    notesToExport.push({
      sectionCode: sec?.code || bidangId,
      sectionTitle: sec?.title || '',
      note: BIDANG_NOTES[bidangId],
    });
  } else {
    SECTIONS.forEach((sec) => {
      if (BIDANG_NOTES[sec.id]) {
        notesToExport.push({
          sectionCode: sec.code,
          sectionTitle: sec.title,
          note: BIDANG_NOTES[sec.id],
        });
      }
    });
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8">
  <title>Nota Ringkas Pendidikan Seni Visual KSSM SPM - SMK Sepagaya</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; padding: 30px; max-width: 900px; margin: 0 auto; background-color: #ffffff; }
    .header { text-align: center; border-bottom: 3px solid #1e1b4b; padding-bottom: 15px; margin-bottom: 25px; }
    .header h1 { color: #1e1b4b; margin: 0 0 5px 0; font-size: 24px; text-transform: uppercase; }
    .header p { color: #64748b; font-size: 13px; font-weight: 600; margin: 0; }
    .bidang-card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px; margin-bottom: 25px; page-break-inside: avoid; background-color: #fafafa; }
    .bidang-badge { background-color: #4338ca; color: white; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 20px; display: inline-block; margin-bottom: 8px; text-transform: uppercase; }
    .bidang-title { color: #0f172a; font-size: 18px; font-weight: 700; margin: 5px 0 10px 0; }
    .summary { font-style: italic; background-color: #f1f5f9; padding: 10px; border-left: 4px solid #6366f1; border-radius: 4px; font-size: 13px; margin-bottom: 15px; }
    .topic-title { font-weight: 700; color: #1e293b; font-size: 14px; margin-top: 15px; margin-bottom: 5px; }
    ul { margin: 5px 0 15px 20px; padding: 0; }
    li { font-size: 13px; color: #334155; margin-bottom: 6px; }
    .exam-tips { background-color: #fef3c7; border: 1px solid #fde68a; color: #78350f; padding: 8px 12px; border-radius: 6px; font-size: 12px; margin-top: 8px; }
    .footer { text-align: center; margin-top: 40px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; }
    @media print { body { padding: 0; } .bidang-card { border: 1px solid #000; } }
  </style>
</head>
<body>
  <div class="header">
    <p>PANITIA SENI VISUAL SMK SEPAGAYA • PENDIDIKAN SENI VISUAL KSSM SPM</p>
    <h1>MODUL NOTA RINGKAS & ULANG KAJI PENTAKSIRAN</h1>
    <p>Disusun khas untuk rujukan pantas murid dan calon SPM</p>
  </div>

  ${notesToExport
    .map(
      (item) => `
    <div class="bidang-card">
      <span class="bidang-badge">${item.sectionCode}</span>
      <h2 class="bidang-title">${item.note.title}</h2>
      <div class="summary">${item.note.summary}</div>

      ${item.note.topics
        .map(
          (topic) => `
        <div class="topic-title">${topic.title}</div>
        <ul>
          ${topic.points.map((pt) => `<li>${pt}</li>`).join('')}
        </ul>
        ${topic.examTips ? `<div class="exam-tips"><strong>💡 Petua SPM:</strong> ${topic.examTips}</div>` : ''}
      `
        )
        .join('')}
    </div>
  `
    )
    .join('')}

  <div class="footer">
    Dihasilkan melalui Applikasi Kuiz & Ulang Kaji Interaktif PSV SMK Sepagaya • Boleh dicetak atau disimpan sebagai PDF (Ctrl + P / Cmd + P)
  </div>
</body>
</html>`;

  const fileName = bidangId 
    ? `Nota_PSV_SMK_Sepagaya_${bidangId}.html` 
    : 'Nota_PSV_SMK_Sepagaya_Semua_Bidang.html';

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function openPrintWindow(bidangId?: string) {
  const notesToExport: { sectionCode: string; sectionTitle: string; note: BidangNote }[] = [];

  if (bidangId && BIDANG_NOTES[bidangId]) {
    const sec = SECTIONS.find((s) => s.id === bidangId);
    notesToExport.push({
      sectionCode: sec?.code || bidangId,
      sectionTitle: sec?.title || '',
      note: BIDANG_NOTES[bidangId],
    });
  } else {
    SECTIONS.forEach((sec) => {
      if (BIDANG_NOTES[sec.id]) {
        notesToExport.push({
          sectionCode: sec.code,
          sectionTitle: sec.title,
          note: BIDANG_NOTES[sec.id],
        });
      }
    });
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Sila benarkan popup window di pelayar web anda untuk mencetak nota.');
    return;
  }

  printWindow.document.write(`<!DOCTYPE html>
<html lang="ms">
<head>
  <title>Nota Ringkas Pendidikan Seni Visual KSSM SPM</title>
  <style>
    body { font-family: sans-serif; padding: 20px; color: #111; }
    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
    .bidang { border: 1px solid #888; padding: 15px; margin-bottom: 20px; border-radius: 8px; page-break-inside: avoid; }
    .badge { background: #333; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    h2 { font-size: 18px; margin: 8px 0; }
    h4 { font-size: 14px; margin-top: 12px; margin-bottom: 4px; color: #222; }
    ul { margin: 4px 0 10px 20px; padding: 0; }
    li { font-size: 12px; margin-bottom: 4px; }
    .tip { background: #fef9c3; padding: 6px 10px; border-radius: 4px; font-size: 11px; border: 1px solid #fde047; }
  </style>
</head>
<body>
  <div class="header">
    <h3>PANITIA SENI VISUAL SMK SEPAGAYA</h3>
    <h1>MODUL NOTA RINGKAS PENDIDIKAN SENI VISUAL KSSM SPM</h1>
  </div>
  ${notesToExport.map((item) => `
    <div class="bidang">
      <span class="badge">${item.sectionCode}</span>
      <h2>${item.note.title}</h2>
      <p style="font-style:italic; font-size:12px; color:#444;">${item.note.summary}</p>
      ${item.note.topics.map((t) => `
        <h4>${t.title}</h4>
        <ul>${t.points.map((p) => `<li>${p}</li>`).join('')}</ul>
        ${t.examTips ? `<div class="tip"><strong>💡 Petua SPM:</strong> ${t.examTips}</div>` : ''}
      `).join('')}
    </div>
  `).join('')}
  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>`);
  printWindow.document.close();
}
