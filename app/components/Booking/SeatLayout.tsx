'use client';

import React, { useMemo } from 'react';
import { Seat as SeatComponent } from './Seat';
import { Seat as SeatType } from '@/types/booking.types';

interface SeatLayoutProps {
  seats: SeatType[];
  selectedSeats: SeatType[];
  onSeatToggle: (seat: SeatType) => void;
}

export const SeatLayout: React.FC<SeatLayoutProps> = ({
  seats,
  selectedSeats,
  onSeatToggle,
}) => {
  // Group seats by row
  const seatsByRow = useMemo(() => {
    const rows: Record<number, SeatType[]> = {};
    seats.forEach((seat) => {
      if (!rows[seat.row]) {
        rows[seat.row] = [];
      }
      rows[seat.row].push(seat);
    });
    return rows;
  }, [seats]);

  const sortedRows = Object.keys(seatsByRow).map(Number).sort((a, b) => a - b);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Bus Front */}
      <div className="mb-6">
        <div className="w-3/4 mx-auto h-8 bg-gradient-to-b from-gray-100 to-gray-50 rounded-t-3xl border-2 border-gray-200 border-b-0" />
      </div>

      {/* Driver Seat */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-500 font-medium">Driver</span>
          </div>
        </div>
      </div>

      {/* Seats */}
      <div className="space-y-3">
        {sortedRows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-4">
            {/* Left Side */}
            <div className="flex gap-2">
              {seatsByRow[row]
                .filter((seat) => seat.column <= 2)
                .sort((a, b) => a.column - b.column)
                .map((seat) => (
                  <SeatComponent
                    key={seat.id}
                    seat={{
                      ...seat,
                      status: selectedSeats.some((s) => s.id === seat.id)
                        ? 'selected'
                        : seat.status,
                    }}
                    onClick={() => onSeatToggle(seat)}
                  />
                ))}
            </div>

            {/* Aisle */}
            <div className="w-8 sm:w-12 flex-shrink-0" />

            {/* Right Side */}
            <div className="flex gap-2">
              {seatsByRow[row]
                .filter((seat) => seat.column > 2)
                .sort((a, b) => a.column - b.column)
                .map((seat) => (
                  <SeatComponent
                    key={seat.id}
                    seat={{
                      ...seat,
                      status: selectedSeats.some((s) => s.id === seat.id)
                        ? 'selected'
                        : seat.status,
                    }}
                    onClick={() => onSeatToggle(seat)}
                  />
                ))}
            </div>

            {/* Row Number */}
            <div className="w-8 text-center text-sm text-gray-400 font-medium">
              {row}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded-lg" />
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--primary-600)] border-2 border-[var(--primary-600)] rounded-lg" />
            <span className="text-sm text-gray-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 border-2 border-gray-200 rounded-lg opacity-50" />
            <span className="text-sm text-gray-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-50 border-2 border-pink-200 rounded-lg" />
            <span className="text-sm text-gray-600">Female Only</span>
          </div>
        </div>
      </div>
    </div>
  );
};
