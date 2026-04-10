'use client';

import React, { useMemo } from 'react';
import { Seat as SeatComponent } from './Seat';
import { Seat as SeatType } from '@/types/booking.types';
import { Armchair, User, Circle, CheckCircle2 } from 'lucide-react';

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
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 overflow-hidden relative">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--primary-50)] to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[var(--primary-50)] to-transparent rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />
      {/* Driver Seat */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-gray-300 flex items-center justify-center shadow-sm">
            <Armchair className="w-6 h-6 text-gray-500" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-600 text-white text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
            Driver
          </div>
        </div>
      </div>

      {/* Seats */}
      <div className="space-y-4 relative z-10">
        {sortedRows?.map((row, index) => (
          <div
            key={row}
            className="flex items-center justify-center gap-4 sm:gap-6 animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Left Side */}
            <div className="flex gap-2 sm:gap-3">
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
            <div className="w-10 sm:w-14 flex-shrink-0 flex items-center justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-transparent via-gray-200 to-transparent rounded-full" />
            </div>

            {/* Right Side */}
            <div className="flex gap-2 sm:gap-3">
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
            <div className="w-10 text-center">
              <div className="inline-flex items-center justify-center w-7 h-7 bg-gray-100 rounded-lg text-sm text-gray-500 font-bold">
                {row}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-10 pt-8 border-t border-gray-100 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <LegendItem
            icon={<Circle className="w-3 h-3" />}
            label="Available"
            color="bg-white border-gray-300"
            textColor="text-gray-600"
          />
          <LegendItem
            icon={<CheckCircle2 className="w-3 h-3" />}
            label="Selected"
            color="bg-[var(--primary-600)] border-[var(--primary-600)]"
            textColor="text-[var(--primary-600)]"
          />
          <LegendItem
            icon={<Circle className="w-3 h-3" />}
            label="Booked"
            color="bg-gray-100 border-gray-200 opacity-60"
            textColor="text-gray-500"
          />
          <LegendItem
            icon={<User className="w-3 h-3" />}
            label="Female Only"
            color="bg-pink-50 border-pink-200"
            textColor="text-pink-600"
          />
        </div>
      </div>
    </div>
  );
};

// Legend Item Component
const LegendItem = ({
  icon,
  label,
  color,
  textColor
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  textColor: string;
}) => (
  <div className="flex items-center gap-2 group">
    <div className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center shadow-sm ${color} group-hover:scale-110 transition-transform duration-200`}>
      <span className={textColor}>{icon}</span>
    </div>
    <span className={`text-sm font-medium ${textColor}`}>{label}</span>
  </div>
);
