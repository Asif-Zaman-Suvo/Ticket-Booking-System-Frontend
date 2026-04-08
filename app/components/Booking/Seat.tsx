'use client';

import React from 'react';
import { Seat as SeatType } from '@/types/booking.types';
import { Armchair, User } from 'lucide-react';

interface SeatProps {
  seat: SeatType;
  onClick: () => void;
}

export const Seat: React.FC<SeatProps> = ({ seat, onClick }) => {
  const seatStyles: Record<SeatType['status'], string> = {
    available: 'bg-white border-gray-300 hover:border-[var(--primary-500)] hover:bg-[var(--primary-50)] cursor-pointer',
    booked: 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50',
    selected: 'bg-[var(--primary-600)] border-[var(--primary-600)] text-white',
    'female-only': 'bg-pink-50 border-pink-200 hover:border-pink-400 hover:bg-pink-100 cursor-pointer',
  };

  const isBooked = seat.status === 'booked';

  return (
    <button
      onClick={onClick}
      disabled={isBooked}
      className={`
        relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 flex flex-col items-center justify-center
        transition-all duration-200
        ${seatStyles[seat.status]}
      `}
      title={`${seat.number} - ${seat.type === 'window' ? 'Window' : 'Aisle'} Seat`}
    >
      <Armchair className="w-4 h-4 sm:w-5 sm:h-5" />
      {seat.status === 'female-only' && (
        <User className="w-3 h-3 sm:w-4 sm:h-4 absolute -top-1 -right-1 text-pink-500" />
      )}
    </button>
  );
};
