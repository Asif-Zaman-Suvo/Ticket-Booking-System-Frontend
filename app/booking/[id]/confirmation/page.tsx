"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { TicketPreview } from "@/app/components/Booking/TicketPreview";
import { BookingData } from "@/types/booking.types";
import { useBookingStore } from "@/store/bookingStore";
import { useUIStore } from "@/store/uiStore";
import {
  CheckCircle,
  Download,
  Share2,
  Home,
  Ticket,
  Sparkles,
  Shield,
  Clock,
  Info,
  QrCode,
  Loader2,
  Eye,
  Printer,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateSimpleTicketPDF } from "@/utils/pdfGenerator";

// ─── Mock data for preview mode ────────────────────────────────────
const mockBooking: BookingData = {
  id: "booking-preview-001",
  busId: "bus-6",
  from: "Dhaka",
  to: "Chittagong",
  date: "2026-04-15",
  departureTime: "08:00 AM",
  arrivalTime: "02:00 PM",
  seats: [
    {
      id: "seat-A1",
      row: 1,
      column: 1,
      number: "A1",
      type: "window",
      status: "booked",
      price: 550,
    },
    {
      id: "seat-A2",
      row: 1,
      column: 2,
      number: "A2",
      type: "aisle",
      status: "booked",
      price: 550,
    },
  ],
  passengers: [
    {
      id: "pax-1",
      seatId: "seat-A1",
      name: "Rahim Uddin",
      email: "rahim@example.com",
      phone: "+880 1712-345678",
      nid: "1995123456",
      gender: "male",
      age: 30,
    },
    {
      id: "pax-2",
      seatId: "seat-A2",
      name: "Karim Hasan",
      email: "karim@example.com",
      phone: "+880 1898-765432",
      nid: "1996789012",
      gender: "male",
      age: 28,
    },
  ],
  contactInfo: {
    name: "Rahim Uddin",
    email: "rahim@example.com",
    phone: "+880 1712-345678",
  },
  emergencyContact: {
    name: "Jamila Begum",
    phone: "+880 1534-567890",
    relation: "Spouse",
  },
  totalAmount: 1100,
  status: "confirmed",
  bookingDate: new Date().toISOString(),
  pnrNumber: "PNRPREVIEW",
};

export default function BookingConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const { id: busId } = params;

  const {
    selectedBus,
    selectedSeats,
    passengers,
    contactInfo,
    emergencyContact,
    searchParams,
    currentBooking,
    setCurrentBooking,
    addBookingToHistory,
    clearBooking,
  } = useBookingStore();
  const { addToast } = useUIStore();

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we have real booking data from the store
    const hasRealData =
      selectedSeats.length > 0 &&
      passengers.length > 0 &&
      contactInfo !== null;

    if (hasRealData) {
      // Real booking flow
      const timer = setTimeout(() => {
        const newBooking: BookingData = {
          id: `booking-${Date.now()}`,
          busId: Array.isArray(busId) ? busId[0] : busId || "",
          from: searchParams.from,
          to: searchParams.to,
          date: searchParams.date,
          departureTime: selectedBus?.departureTime || "",
          arrivalTime: selectedBus?.arrivalTime || "",
          seats: selectedSeats,
          passengers: passengers,
          contactInfo: contactInfo!,
          emergencyContact: emergencyContact!,
          totalAmount: selectedSeats.reduce(
            (sum, seat) => sum + seat.price,
            0
          ),
          status: "confirmed",
          bookingDate: new Date().toISOString(),
          pnrNumber: `PNR${Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase()}`,
        };

        setBooking(newBooking);
        setCurrentBooking(newBooking);
        addBookingToHistory(newBooking);
        setIsLoading(false);
        setIsPreviewMode(false);
        setShowConfetti(true);

        setTimeout(() => setShowConfetti(false), 3000);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      // Preview mode — use mock data
      const timer = setTimeout(() => {
        setBooking(mockBooking);
        setIsPreviewMode(true);
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [
    busId,
    selectedBus,
    selectedSeats,
    passengers,
    contactInfo,
    emergencyContact,
    searchParams,
    setCurrentBooking,
    addBookingToHistory,
  ]);

  const handleDownloadTicket = async () => {
    if (!booking) return;

    setIsDownloading(true);
    try {
      generateSimpleTicketPDF(booking);
      addToast({
        type: "success",
        message: "Ticket downloaded successfully!",
      });
    } catch (error) {
      console.error("Error downloading ticket:", error);
      addToast({
        type: "error",
        message: "Failed to download ticket. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrintTicket = () => {
    window.print();
  };

  const handleShareBooking = () => {
    if (navigator.share && booking) {
      navigator.share({
        title: "Bus Ticket Booking",
        text: `I have booked a bus ticket from ${booking.from} to ${booking.to} on ${booking.date}. PNR: ${booking.pnrNumber}`,
      });
    } else {
      addToast({
        type: "info",
        message: "Share functionality not available on this device",
      });
    }
  };

  const handleViewBookings = () => {
    router.push("/dashboard/bookings");
  };

  const handleGoHome = () => {
    clearBooking();
    router.push("/");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--primary-50)] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--primary-200)] border-t-[var(--primary-600)] mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 bg-[var(--primary-400)] opacity-20 mx-auto"></div>
          </div>
          <p className="text-gray-700 font-medium text-lg">
            {isPreviewMode
              ? "Loading preview..."
              : "Confirming your booking..."}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Please wait while we process your request
          </p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--primary-50)] flex items-center justify-center">
        <Card className="max-w-md shadow-2xl border-0">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-600 font-medium">Booking not found</p>
            <Button onClick={handleGoHome} className="mt-6 px-8">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--primary-50)] pb-16 relative overflow-hidden">
      {/* ─── HIDDEN IN PRINT ──────────────────────────────────────── */}
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 print-hide">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary-600)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--primary-400)] rounded-full blur-3xl"></div>
      </div>

      {/* Preview Mode Banner */}
      {isPreviewMode && (
        <div className="bg-amber-500 text-white py-3 px-4 text-center relative z-50 print-hide">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
            <Eye className="w-5 h-5" />
            <span className="font-semibold">Preview Mode</span>
            <span className="text-amber-100">—</span>
            <span className="text-sm text-amber-100">
              This is a preview with sample data. Navigate through the full
              booking flow for a real ticket.
            </span>
          </div>
        </div>
      )}

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 print-hide">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fade-in"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: [
                    "#10b981",
                    "#3b82f6",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                  ][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Success Header */}
      <div className="relative print-hide">
        <div
          className={`text-white py-16 relative overflow-hidden ${
            isPreviewMode
              ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"
              : "bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600"
          }`}
        >
          {/* Animated Sparkles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-white/20 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${8 + Math.random() * 16}px`,
                  height: `${8 + Math.random() * 16}px`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/40 shadow-2xl">
                {isPreviewMode ? (
                  <Eye className="w-12 h-12 animate-scale-in" />
                ) : (
                  <CheckCircle className="w-12 h-12 animate-scale-in" />
                )}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in">
              {isPreviewMode ? "Ticket Preview" : "Booking Confirmed!"}
            </h1>
            <p
              className="text-lg animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {isPreviewMode
                ? "Preview how your ticket will look after booking"
                : "Your ticket has been booked successfully"}
            </p>
            <div
              className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Ticket className="w-4 h-4" />
              <span className="font-semibold">
                PNR: {booking.pnrNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* ─── MAIN CONTENT (print-wrapper resets layout for print) ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 print-wrapper">
        {/* Ticket Preview Controls */}
        <div
          className="mb-4 flex items-center justify-between animate-fade-in print-hide"
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[var(--primary-600)]" />
            Your E-Ticket
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="flex items-center gap-1.5 text-xs"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrintTicket}
              className="flex items-center gap-1.5 text-xs"
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
          </div>
        </div>

        {/* ─── TICKET PREVIEW (visible in print) ──────────────────── */}
        <div
          ref={ticketRef}
          className={`mb-8 animate-fade-in ${
            isFullscreen
              ? "fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 overflow-auto print-hide"
              : ""
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <div className={isFullscreen ? "max-w-3xl w-full" : ""}>
            {isFullscreen && (
              <div className="flex justify-end mb-3 print-hide">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="bg-white/90 hover:bg-white"
                >
                  <Minimize2 className="w-4 h-4 mr-1.5" />
                  Close
                </Button>
              </div>
            )}
            <TicketPreview booking={booking} />
          </div>
        </div>

        {/* Important Information */}
        <div
          className="animate-fade-in print-hide"
          style={{ animationDelay: "1s" }}
        >
          <Card className="shadow-xl border-0 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--primary-100)] rounded-xl flex items-center justify-center">
                  <Info className="w-5 h-5 text-[var(--primary-600)]" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl">
                  Important Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-[var(--primary-50)] rounded-xl">
                  <Clock className="w-5 h-5 text-[var(--primary-600)] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Please arrive at the boarding point at least 30 minutes
                    before departure time
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[var(--primary-50)] rounded-xl">
                  <Shield className="w-5 h-5 text-[var(--primary-600)] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Carry a valid ID proof (NID/Passport) for verification
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[var(--primary-50)] rounded-xl">
                  <Ticket className="w-5 h-5 text-[var(--primary-600)] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Show this ticket (printed or digital) at the boarding
                    point
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[var(--primary-50)] rounded-xl">
                  <Info className="w-5 h-5 text-[var(--primary-600)] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    For any queries, contact our helpline: +880 1XXX-XXXXXX
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Section */}
        <div
          className="animate-fade-in print-hide"
          style={{ animationDelay: "1.2s" }}
        >
          <Card className="shadow-xl border-0 mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-2xl shadow-inner border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-gray-900 text-xl mb-2">
                    Scan for Quick Check-in
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Show this QR code at the boarding point for quick
                    verification
                  </p>
                  <div className="inline-flex items-center gap-2 bg-[var(--primary-100)] text-[var(--primary-700)] px-4 py-2 rounded-lg font-mono font-bold text-lg">
                    {booking.pnrNumber}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home */}
        <div
          className="text-center animate-fade-in print-hide"
          style={{ animationDelay: "1.4s" }}
        >
          <Button
            variant="ghost"
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 mx-auto text-gray-600 hover:text-[var(--primary-600)] transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
