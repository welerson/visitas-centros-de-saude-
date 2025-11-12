
import { Visit } from '../types';

// These are loaded from CDN, so we declare them to make TypeScript happy.
declare const jspdf: any;
declare const autoTable: any;

export const generateVisitReport = (visits: Visit[]) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  doc.text("Relatório de Visitas do Turno - GCMBH", 14, 16);
  doc.setFontSize(10);
  doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 22);

  const tableColumn = ["Viatura", "Centro de Saúde", "Horário da Visita"];
  const tableRows: (string | Date)[][] = [];

  visits.forEach(visit => {
    const visitData = [
      visit.viatura,
      visit.centroSaude,
      visit.timestamp.toLocaleString('pt-BR'),
    ];
    tableRows.push(visitData);
  });

  doc.autoTable({
    startY: 30,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42] } // slate-900
  });

  const totalVisits = `Total de visitas no turno: ${visits.length}`;
  const finalY = (doc as any).lastAutoTable.finalY || 40;
  doc.text(totalVisits, 14, finalY + 10);

  doc.save(`relatorio_visitas_${new Date().toISOString().split('T')[0]}.pdf`);
};
