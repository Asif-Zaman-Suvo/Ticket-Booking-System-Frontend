"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TicketPreview } from "@/app/components/Booking/TicketPreview";
import { BookingData } from "@/types/booking.types";
import { useBookingStore } from "@/store/bookingStore";
import { useUIStore } from "@/store/uiStore";
import { CheckCircle, Download, Share2, Home, Ticket } from "lucide-react";
import { Button, Card, CardBody } from "@/app/components/UI";


export default function BookingConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const { id: busId } = params;

  const { selectedBus, selectedSeats, passengers, contactInfo, emergencyContact, searchParams, currentBooking, setCurrentBooking, addBookingToHistory, clearBooking } = useBookingStore();
  const { addToast } = useUIStore();

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to create booking
    const timer = setTimeout(() => {
      const newBooking: BookingData = {
        id: `booking-${Date.now()}`,
        busId: Array.isArray(busId) ? busId[0] : busId || '',
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.date,
        departureTime: selectedBus?.departureTime || '',
        arrivalTime: selectedBus?.arrivalTime || '',
        seats: selectedSeats,
        passengers: passengers,
        contactInfo: contactInfo!,
        emergencyContact: emergencyContact!,
        totalAmount: selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
        pnrNumber: `PNR${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      };

      setBooking(newBooking);
      setCurrentBooking(newBooking);
      addBookingToHistory(newBooking);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [busId, selectedBus, selectedSeats, passengers, contactInfo, emergencyContact, searchParams, setCurrentBooking, addBookingToHistory]);

  const handleDownloadTicket = () => {
    // Simulate ticket download
    addToast({
      type: 'success',
      message: 'Ticket downloaded successfully!',
    });
  };

  const handleShareBooking = () => {
    // Simulate share functionality
    if (navigator.share && booking) {
      navigator.share({
        title: 'Bus Ticket Booking',
        text: `I have booked a bus ticket from ${booking.from} to ${booking.to} on ${booking.date}. PNR: ${booking.pnrNumber}`,
      });
    } else {
      addToast({
        type: 'info',
        message: 'Share functionality not available on this device',
      });
    }
  };

  const handleViewBookings = () => {
    router.push('/dashboard/bookings');
  };

  const handleGoHome = () => {
    clearBooking();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-600)] mx-auto mb-4"></div>
          <p className="text-gray-600">Confirming your booking...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardBody className="text-center py-8">
            <p className="text-gray-600">Booking not found</p>
            <Button onClick={handleGoHome} className="mt-4">Go Home</Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-green-100">Your ticket has been booked successfully</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Ticket Preview */}
        <div className="mb-8">
          <TicketPreview booking={booking} />
        </div>

        {/* Action Buttons */}
        <Card>
          <CardBody className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                variant="secondary"
                onClick={handleDownloadTicket}
                className="flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Ticket
              </Button>
              <Button
                variant="outline"
                onClick={handleShareBooking}
                className="flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Booking
              </Button>
              <Button
                onClick={handleViewBookings}
                className="flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                View My Bookings
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Important Information */}
        <Card className="mt-6">
          <CardBody className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Important Information</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary-600)] mt-0.5">•</span>
                <span>Please arrive at the boarding point at least 30 minutes before departure time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary-600)] mt-0.5">•</span>
                <span>Carry a valid ID proof (NID/Passport) for verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary-600)] mt-0.5">•</span>
                <span>Show this ticket (printed or digital) at the boarding point</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary-600)] mt-0.5">•</span>
                <span>For any queries, contact our helpline: +880 1XXX-XXXXXX</span>
              </li>
            </ul>
          </CardBody>
        </Card>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 mx-auto"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
