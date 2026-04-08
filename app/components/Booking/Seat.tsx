'use client';

import React from 'react';
import { Seat as SeatType } from '@/types/booking.types';
import { Armchair, User, Crown, Star } from 'lucide-react';

interface SeatProps {
  seat: SeatType;
  onClick: () => void;
}

export const Seat: React.FC<SeatProps> = ({ seat, onClick }) => {
  const isBooked = seat.status === 'booked';
  const isSelected = seat.status === 'selected';

  const baseStyles = `
    relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl border-2 flex flex-col items-center justify-center
    transition-all duration-300 transform
    ${isBooked ? 'cursor-not-allowed' : 'cursor-pointer'}
  `;

  const statusStyles: Record<SeatType['status'], string> = {
    available: `
      bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-sm
      hover:border-[var(--primary-400)] hover:shadow-md hover:-translate-y-1 hover:scale-105
    `,
    booked: `
      bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 opacity-60
    `,
    selected: `
      bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] border-[var(--primary-600)] text-white shadow-lg
      shadow-[var(--primary-500)]/30
    `,
    'female-only': `
      bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 shadow-sm
      hover:border-pink-400 hover:shadow-md hover:-translate-y-1 hover:scale-105
    `,
  };

  const iconColor = isSelected ? 'text-white' :
                   seat.status === 'female-only' ? 'text-pink-500' :
                   seat.status === 'booked' ? 'text-gray-400' : 'text-[var(--primary-600)]';

  return (
    <button
      onClick={onClick}
      disabled={isBooked}
      className={`${baseStyles} ${statusStyles[seat.status]}`}
      title={`${seat.number} - ${seat.type === 'window' ? 'Window' : 'Aisle'} Seat`}
    >
      {/* Seat Icon */}
      <Armchair className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor} transition-colors`} />
      
      {/* Seat Number */}
      <span className={`text-[10px] sm:text-xs font-semibold ${iconColor} mt-0.5`}>
        {seat.number}
      </span>

      {/* Female Only Indicator */}
      {seat.status === 'female-only' && (
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center shadow-sm">
          <User className="w-2.5 h-2.5 text-white" />
        </div>
      )}

      {/* Window Seat Indicator */}
      {seat.type === 'window' && !isBooked && seat.status !== 'selected' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent-400)] rounded-full shadow-sm" />
      )}

      {/* Selection Glow Effect */}
      {isSelected && (
        <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
      )}
    </button>
  );
};
