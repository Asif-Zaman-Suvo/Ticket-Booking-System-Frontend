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
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--primary-50)] pb-16">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-[var(--primary-600)] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[var(--primary-100)] transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-medium">Back to Search</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] rounded-xl flex items-center justify-center shadow-md shadow-[var(--primary-500)]/30">
                <Armchair className="w-5 h-5 text-white" />
              </div>
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
            <div className="mb-6 animate-fade-in">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--primary-50)] to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] rounded-xl flex items-center justify-center shadow-md">
                      <Armchair className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedBus.operator}</h2>
                      <p className="text-sm text-gray-500">{selectedBus.type}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-[var(--primary-50)] px-3 py-1.5 rounded-full">
                      <span className="text-gray-500">Departure</span>
                      <span className="font-semibold text-gray-900">{selectedBus.departureTime}</span>
                    </div>
                    <div className="w-4 h-0.5 bg-gray-300" />
                    <div className="flex items-center gap-2 bg-[var(--primary-50)] px-3 py-1.5 rounded-full">
                      <span className="text-gray-500">Arrival</span>
                      <span className="font-semibold text-gray-900">{selectedBus.arrivalTime}</span>
                    </div>
                    <div className="w-4 h-0.5 bg-gray-300" />
                    <div className="flex items-center gap-2 bg-[var(--primary-50)] px-3 py-1.5 rounded-full">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-semibold text-gray-900">{selectedBus.duration}</span>
                    </div>
                  </div>
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
