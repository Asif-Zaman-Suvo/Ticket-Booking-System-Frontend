import jsPDF from 'jspdf';
import { BookingData } from '@/types/booking.types';

export const generateSimpleTicketPDF = (booking: BookingData): void => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    // ─── COLOR PALETTE ───────────────────────────────────────────────
    const blue       = { r: 37,  g: 99,  b: 235 };
    const blueDark   = { r: 29,  g: 78,  b: 216 };
    const blueLight  = { r: 219, g: 234, b: 254 };
    const green      = { r: 16,  g: 185, b: 129 };
    const greenDark  = { r: 5,   g: 150, b: 105 };
    const greenLight = { r: 209, g: 250, b: 229 };
    const gray50     = { r: 249, g: 250, b: 251 };
    const gray100    = { r: 243, g: 244, b: 246 };
    const gray200    = { r: 229, g: 231, b: 235 };
    const gray500    = { r: 107, g: 114, b: 128 };
    const gray700    = { r: 55,  g: 65,  b: 81  };
    const gray900    = { r: 17,  g: 24,  b: 39  };
    const white      = { r: 255, g: 255, b: 255 };

    const setFill   = (c: {r:number,g:number,b:number}) => pdf.setFillColor(c.r, c.g, c.b);
    const setStroke = (c: {r:number,g:number,b:number}) => pdf.setDrawColor(c.r, c.g, c.b);
    const setTxt    = (c: {r:number,g:number,b:number}) => pdf.setTextColor(c.r, c.g, c.b);

    // ─── HEADER BACKGROUND ───────────────────────────────────────────
    setFill(blue);
    pdf.rect(0, 0, pageWidth, 52, 'F');

    // Darker bottom strip for depth
    setFill(blueDark);
    pdf.rect(0, 42, pageWidth, 10, 'F');

    // Decorative horizontal lines (no transparency)
    setStroke({ r: 99, g: 155, b: 255 });
    pdf.setLineWidth(0.3);
    pdf.line(0, 8, pageWidth, 8);
    pdf.line(0, 44, pageWidth, 44);

    // Airline/Bus name
    setTxt(white);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BUS TICKET', pageWidth / 2, 22, { align: 'center' });

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    setTxt({ r: 191, g: 219, b: 254 });
    pdf.text('OFFICIAL TRAVEL DOCUMENT', pageWidth / 2, 30, { align: 'center' });

    // PNR pill (no transparency — solid color)
    setFill({ r: 29, g: 78, b: 216 });
    pdf.roundedRect(pageWidth / 2 - 32, 35, 64, 12, 3, 3, 'F');
    setTxt(white);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`PNR: ${booking.pnrNumber}`, pageWidth / 2, 43, { align: 'center' });

    // ─── ROUTE CARD ──────────────────────────────────────────────────
    let y = 62;
    setFill(gray50);
    setStroke(gray200);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(margin, y, contentWidth, 32, 4, 4, 'FD');

    // From
    setTxt(gray500);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.text('FROM', margin + 8, y + 10);
    setTxt(gray900);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(booking.from, margin + 8, y + 22);

    // Arrow in center
    const arrowX = pageWidth / 2;
    setFill(blueLight);
    pdf.circle(arrowX, y + 16, 6, 'F');
    setTxt(blue);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('\u2192', arrowX, y + 19.5, { align: 'center' });

    // To
    setTxt(gray500);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.text('TO', pageWidth - margin - 8, y + 10, { align: 'right' });
    setTxt(gray900);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(booking.to, pageWidth - margin - 8, y + 22, { align: 'right' });

    // ─── INFO CHIPS (DATE / TIME / SEATS) ────────────────────────────
    y += 40;
    const chipW = (contentWidth - 8) / 3;
    const chips = [
      {
        label: 'DATE',
        value: booking.date
          ? new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          : '—',
      },
      { label: 'DEPARTURE', value: booking.departureTime || '—' },
      { label: 'SEAT(S)', value: booking.seats.map(s => s.number).join(', ') || '—' },
    ];

    chips.forEach((chip, i) => {
      const x = margin + i * (chipW + 4);
      setFill(gray100);
      setStroke(gray200);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(x, y, chipW, 28, 3, 3, 'FD');

      // Label
      setTxt(blue);
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'bold');
      pdf.text(chip.label, x + chipW / 2, y + 9, { align: 'center' });

      // Divider
      setStroke(gray200);
      pdf.setLineWidth(0.2);
      pdf.line(x + 6, y + 12, x + chipW - 6, y + 12);

      // Value
      setTxt(gray900);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(chip.value, x + chipW / 2, y + 22, { align: 'center' });
    });

    // ─── DASHED DIVIDER (perforated look) ────────────────────────────
    y += 38;
    setStroke(gray200);
    pdf.setLineWidth(0.4);
    pdf.setLineDashPattern([2, 2], 0);
    pdf.line(margin + 6, y, pageWidth - margin - 6, y);
    pdf.setLineDashPattern([], 0);

    // Cutout circles on edges
    setFill(white);
    setStroke(gray200);
    pdf.setLineWidth(0.3);
    pdf.circle(margin - 2, y, 4, 'FD');
    pdf.circle(pageWidth - margin + 2, y, 4, 'FD');

    // ─── PASSENGER SECTION ───────────────────────────────────────────
    y += 10;
    setTxt(blue);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PASSENGER INFORMATION', margin, y);

    y += 6;
    booking.passengers.forEach((passenger, idx) => {
      const seatNum = booking.seats[idx]?.number || '';

      setFill(white);
      setStroke(gray200);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, y, contentWidth, 22, 3, 3, 'FD');

      // Seat badge
      setFill(blue);
      pdf.roundedRect(margin + 4, y + 5, 24, 12, 2, 2, 'F');
      setTxt(white);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${seatNum}`, margin + 16, y + 13, { align: 'center' });

      // Name
      setTxt(gray900);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(passenger.name, margin + 34, y + 11);

      // Phone
      setTxt(gray500);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`\u260E  ${passenger.phone}`, margin + 34, y + 18);

      // Gender badge (right side)
      if (passenger.gender) {
        const gBadgeColor = passenger.gender === 'male' ? blue : { r: 236, g: 72, b: 153 };
        setFill(gBadgeColor);
        pdf.roundedRect(pageWidth - margin - 20, y + 5, 16, 10, 2, 2, 'F');
        setTxt(white);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'bold');
        pdf.text(passenger.gender.toUpperCase().slice(0, 1), pageWidth - margin - 12, y + 12, { align: 'center' });
      }

      y += 28;
    });

    // ─── CONTACT INFO ────────────────────────────────────────────────
    y += 2;
    setFill(gray50);
    setStroke(gray200);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(margin, y, contentWidth, 22, 3, 3, 'FD');

    setTxt(blue);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CONTACT', margin + 6, y + 9);

    setTxt(gray700);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Email: ${booking.contactInfo.email}`, margin + 6, y + 16);
    pdf.text(`Phone: ${booking.contactInfo.phone}`, pageWidth / 2 + 4, y + 16);

    // ─── TOTAL AMOUNT ────────────────────────────────────────────────
    y += 30;
    setFill(green);
    pdf.roundedRect(margin, y, contentWidth, 26, 4, 4, 'F');

    // Darker right accent
    setFill(greenDark);
    pdf.roundedRect(pageWidth - margin - 48, y, 48, 26, 4, 4, 'F');
    // overlap fix
    setFill(greenDark);
    pdf.rect(pageWidth - margin - 48, y, 8, 26, 'F');

    setTxt(white);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TOTAL PAID', margin + 8, y + 11);

    setTxt({ r: 209, g: 250, b: 229 });
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${booking.seats.length} seat(s)`, margin + 8, y + 19);

    setTxt(white);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`\u09F3${booking.totalAmount.toLocaleString()}`, pageWidth - margin - 4, y + 17, { align: 'right' });

    // ─── IMPORTANT NOTES ─────────────────────────────────────────────
    y += 34;
    setFill(blueLight);
    setStroke({ r: 147, g: 197, b: 253 });
    pdf.setLineWidth(0.3);
    pdf.roundedRect(margin, y, contentWidth, 36, 3, 3, 'FD');

    setTxt(blue);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('IMPORTANT NOTES', margin + 6, y + 9);

    const notes = [
      'Arrive at boarding point at least 30 minutes before departure',
      'Carry a valid ID proof (NID/Passport) for verification',
      'Show this ticket (printed or digital) at boarding point',
    ];
    setTxt(blueDark);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    notes.forEach((note, i) => {
      pdf.text(`\u2022  ${note}`, margin + 6, y + 17 + i * 7);
    });

    // ─── FOOTER ──────────────────────────────────────────────────────
    const footerY = pageHeight - 18;
    setFill(gray100);
    pdf.rect(0, footerY - 4, pageWidth, 22, 'F');

    setStroke(gray200);
    pdf.setLineWidth(0.3);
    pdf.line(0, footerY - 4, pageWidth, footerY - 4);

    setTxt(gray500);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text('This is an official travel document. Please keep it safe for your journey.', pageWidth / 2, footerY + 2, { align: 'center' });

    setTxt(blue);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Helpline: +880 1XXX-XXXXXX', pageWidth / 2, footerY + 9, { align: 'center' });

    // ─── SAVE ────────────────────────────────────────────────────────
    const fileName = `ticket-${booking.pnrNumber}-${Date.now()}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Keep the html2canvas version for optional use
export const downloadTicketPDF = async (
  booking: BookingData,
  elementId: string = 'ticket-preview'
): Promise<void> => {
  const { default: jsPDF } = await import('jspdf');
  const { default: html2canvas } = await import('html2canvas');

  const element = document.getElementById(elementId);
  if (!element) { console.error('Ticket element not found'); return; }

  const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' });
  const imgData = canvas.toDataURL('image/png');
  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  const pdf = new jsPDF('p', 'mm', 'a4');
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, heightLeft - imgHeight, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`ticket-${booking.pnrNumber}-${Date.now()}.pdf`);
};