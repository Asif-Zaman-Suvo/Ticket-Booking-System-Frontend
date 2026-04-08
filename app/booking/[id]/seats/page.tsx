"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { SeatLayout } from "@/app/components/Booking/SeatLayout";
import { SeatSummary } from "@/app/components/Booking/SeatSummary";
import { Seat as SeatType } from "@/types/booking.types";
import { useBookingStore } from "@/store/bookingStore";
import { ArrowLeft, Armchair } from "lucide-react";


// Generate dummy seats for a bus
const generateDummySeats = (busId: string): SeatType[] => {
  const seats: SeatType[] = [];
  const rows = 10;
  const columns = 4;

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= columns; col++) {
      const isBooked = Math.random() < 0.3; // 30% chance of being booked
      const isFemaleOnly = Math.random() < 0.1; // 10% chance of being female-only

      seats.push({
        id: `${busId}-seat-${row}-${col}`,
        row,
        column: col,
        number: `${row}${String.fromCharCode(64 + col)}`,
        type: col === 1 || col === columns ? 'window' : 'aisle',
        status: isBooked ? 'booked' : isFemaleOnly ? 'female-only' : 'available',
        price: 1500,
        gender: isFemaleOnly ? 'female' : 'any',
      });
    }
  }

  return seats;
};

export default function SeatSelectionPage() {
  const params = useParams();
  const router = useRouter();
  const { id: busId } = params;

  const { selectedBus, selectedSeats, toggleSeat, setSelectedSeats } = useBookingStore();

  const [allSeats, setAllSeats] = useState<SeatType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const id = Array.isArray(busId) ? busId[0] : busId;
      if (!id) return;
      const seats = generateDummySeats(id);
      setAllSeats(seats);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [busId]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }, [selectedSeats]);

  const handleSeatToggle = (seat: SeatType) => {
    toggleSeat(seat);
  };

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      router.push(`/booking/${Array.isArray(busId) ? busId[0] : busId}/passenger`);
    }
  };

  const handleClearSelection = () => {
    setSelectedSeats([]);
  };

  const handleGoBack = () => {
    router.push('/search');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-600)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-[var(--primary-600)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Search</span>
            </button>
            <div className="flex items-center gap-2">
              <Armchair className="w-5 h-5 text-[var(--primary-600)]" />
              <h1 className="text-lg font-bold text-gray-900">Select Seats</h1>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Seat Layout */}
        <div className="flex-1">
          {selectedBus && (
            <div className="mb-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedBus.operator}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span>{selectedBus.type}</span>
                  <span>•</span>
                  <span>{selectedBus.departureTime} - {selectedBus.arrivalTime}</span>
                  <span>•</span>
                  <span>{selectedBus.duration}</span>
                </div>
              </div>
            </div>
          )}

          <SeatLayout
            seats={allSeats}
            selectedSeats={selectedSeats}
            onSeatToggle={handleSeatToggle}
          />
        </div>

        {/* Seat Summary */}
        <div className="w-full lg:w-80">
          <SeatSummary
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            onContinue={handleContinue}
            onClearSelection={handleClearSelection}
          />
        </div>
      </div>
    </div>
  );
}
