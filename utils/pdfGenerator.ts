import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BookingData } from '@/types/booking.types';

/**
 * Generate and download a PDF ticket
 * @param booking - The booking data
 * @param elementId - The ID of the HTML element to capture
 */
export const downloadTicketPDF = async (
  booking: BookingData,
  elementId: string = 'ticket-preview'
): Promise<void> => {
  try {
    // Get the element to capture
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Ticket element not found');
      return;
    }

    // Show loading state
    const originalStyle = element.style.display;
    element.style.display = 'block';

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Restore original style
    element.style.display = originalStyle;

    // Calculate PDF dimensions
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    const fileName = `ticket-${booking.pnrNumber}-${Date.now()}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/**
 * Generate a simple PDF ticket without HTML capture
 * @param booking - The booking data
 */
export const generateSimpleTicketPDF = (booking: BookingData): void => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;

    // Colors
    const primaryColor = [37, 99, 235]; // Blue
    const secondaryColor = [16, 185, 129]; // Green

    // Header gradient background (simulated with multiple rectangles)
    pdf.setFillColor(30, 58, 138); // Dark blue
    pdf.rect(0, 0, pageWidth, 50, 'F');
    pdf.setFillColor(37, 99, 235); // Primary blue
    pdf.rect(0, 10, pageWidth, 40, 'F');
    
    // Decorative circles in header
    pdf.setFillColor(255, 255, 255, 0.1);
    pdf.circle(pageWidth - 20, 25, 30, 'F');
    pdf.circle(20, 25, 20, 'F');

    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Bus Ticket', pageWidth / 2, 30, { align: 'center' });

    // PNR Number badge
    pdf.setFillColor(255, 255, 255, 0.2);
    pdf.roundedRect(pageWidth / 2 - 30, 38, 60, 12, 3, 3, 'F');
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`PNR: ${booking.pnrNumber}`, pageWidth / 2, 46, { align: 'center' });

    // Route Information Card
    let yPos = 65;
    pdf.setFillColor(240, 249, 255);
    pdf.roundedRect(margin, yPos, pageWidth - 2 * margin, 35, 5, 5, 'F');
    
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ROUTE INFORMATION', margin + 10, yPos + 12);
    
    // Route with arrow
    yPos += 20;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(booking.from, margin + 15, yPos);
    
    // Arrow
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(margin + 50, yPos - 2, pageWidth - margin - 50, yPos - 2);
    pdf.setFontSize(12);
    pdf.setFont('symbol');
    pdf.text('→', pageWidth / 2, yPos + 2, { align: 'center' });
    
    pdf.setFont('helvetica', 'bold');
    pdf.text(booking.to, pageWidth - margin - 15, yPos, { align: 'right' });

    // Date, Time, Seats
    yPos += 45;
    const cardWidth = (pageWidth - 2 * margin - 10) / 3;
    
    // Date card
    pdf.setFillColor(240, 249, 255);
    pdf.roundedRect(margin, yPos, cardWidth, 30, 5, 5, 'F');
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.circle(margin + 10, yPos + 10, 4, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('D', margin + 10, yPos + 13, { align: 'center' });
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    pdf.text('DATE', margin + cardWidth / 2, yPos + 10, { align: 'center' });
    const formattedDate = booking.date
      ? new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      : '';
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.text(formattedDate, margin + cardWidth / 2, yPos + 24, { align: 'center' });
    
    // Time card
    pdf.setFillColor(240, 249, 255);
    pdf.roundedRect(margin + cardWidth + 5, yPos, cardWidth, 30, 5, 5, 'F');
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.circle(margin + cardWidth + 15, yPos + 10, 4, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('T', margin + cardWidth + 15, yPos + 13, { align: 'center' });
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    pdf.text('TIME', margin + cardWidth + 5 + cardWidth / 2, yPos + 10, { align: 'center' });
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.text(booking.departureTime, margin + cardWidth + 5 + cardWidth / 2, yPos + 24, { align: 'center' });
    
    // Seats card
    pdf.setFillColor(240, 249, 255);
    pdf.roundedRect(margin + 2 * (cardWidth + 5), yPos, cardWidth, 30, 5, 5, 'F');
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.circle(margin + 2 * (cardWidth + 5) + 10, yPos + 10, 4, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('S', margin + 2 * (cardWidth + 5) + 10, yPos + 13, { align: 'center' });
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    pdf.text('SEATS', margin + 2 * (cardWidth + 5) + cardWidth / 2, yPos + 10, { align: 'center' });
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    const seatsText = booking.seats.map(s => s.number).join(', ');
    pdf.text(seatsText, margin + 2 * (cardWidth + 5) + cardWidth / 2, yPos + 24, { align: 'center' });

    // Passenger Information
    yPos += 45;
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PASSENGER INFORMATION', margin, yPos);
    yPos += 10;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    
    booking.passengers.forEach((passenger, index) => {
      const seatNumber = booking.seats[index]?.number || '';
      
      // Passenger card
      pdf.setFillColor(250, 250, 250);
      pdf.roundedRect(margin, yPos, pageWidth - 2 * margin, 20, 3, 3, 'F');
      
      // Seat badge
      pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.roundedRect(margin + 5, yPos + 5, 30, 10, 2, 2, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Seat ${seatNumber}`, margin + 20, yPos + 11, { align: 'center' });
      
      // Name
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(passenger.name, margin + 45, yPos + 11);
      
      // Phone
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(75, 85, 99);
      pdf.text(`Phone: ${passenger.phone}`, margin + 45, yPos + 17);
      
      yPos += 25;
    });

    // Contact Information
    yPos += 5;
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CONTACT INFORMATION', margin, yPos);
    yPos += 10;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Email: ${booking.contactInfo.email}`, margin, yPos);
    yPos += 8;
    pdf.text(`Phone: ${booking.contactInfo.phone}`, margin, yPos);
    yPos += 20;

    // Total Amount
    pdf.setFillColor(16, 185, 129); // Green
    pdf.roundedRect(margin, yPos, pageWidth - 2 * margin, 25, 5, 5, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('TOTAL PAID', margin + 15, yPos + 12);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`৳${booking.totalAmount}`, pageWidth - margin - 15, yPos + 15, { align: 'right' });
    yPos += 35;

    // Important Information
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('IMPORTANT INFORMATION', margin, yPos);
    yPos += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    const importantInfo = [
      '• Please arrive at boarding point at least 30 minutes before departure',
      '• Carry a valid ID proof (NID/Passport) for verification',
      '• Show this ticket (printed or digital) at boarding point',
      '• For any queries, contact our helpline: +880 1XXX-XXXXXX',
    ];

    importantInfo.forEach((info) => {
      pdf.text(info, margin, yPos);
      yPos += 7;
    });

    // Footer
    yPos = pageHeight - 25;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(75, 85, 99);
    pdf.text('Please show this ticket at the boarding point. Keep it safe for your journey.', pageWidth / 2, yPos, { align: 'center' });

    // Save the PDF
    const fileName = `ticket-${booking.pnrNumber}-${Date.now()}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
