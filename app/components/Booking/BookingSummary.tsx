'use client';

import React from 'react';
import { BusDetails } from '@/types/booking.types';
import { Seat as SeatType } from '@/types/booking.types';

import { ArrowRight, Calendar, Clock, MapPin, Armchair } from 'lucide-react';
import { Button } from '../UI';

interface BookingSummaryProps {
  bus: BusDetails | null;
  from: string;
  to: string;
  date: string;
  selectedSeats: SeatType[];
  totalPrice: number;
  onContinue: () => void;
  onBack: () => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  bus,
  from,
  to,
  date,
  selectedSeats,
  totalPrice,
  onContinue,
  onBack,
}) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h2>

      {/* Bus Info */}
      {bus && (
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 mb-2">{bus.operator}</h3>
          <p className="text-sm text-gray-600 mb-3">{bus.type}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>
                {from} → {to}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {bus.departureTime} - {bus.arrivalTime} ({bus.duration})
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Selected Seats */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Armchair className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Selected Seats</h3>
          <span className="text-sm text-gray-500">({selectedSeats.length})</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedSeats.map((seat) => (
            <span
              key={seat.id}
              className="px-3 py-1.5 bg-[var(--primary-50)] text-[var(--primary-700)] rounded-lg text-sm font-medium"
            >
              {seat.number}
            </span>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Price Breakdown</h3>
        <div className="space-y-2">
          {selectedSeats.map((seat) => (
            <div key={seat.id} className="flex justify-between text-sm">
              <span className="text-gray-600">Seat {seat.number}</span>
              <span className="text-gray-900 font-medium">৳{seat.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-100 pt-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Total Amount</span>
          <span className="text-2xl font-bold text-[var(--primary-600)]">৳{totalPrice}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button fullWidth onClick={onContinue}>
          Confirm Booking
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" fullWidth onClick={onBack}>
          Back to Seats
        </Button>
      </div>
    </div>
  );
};
