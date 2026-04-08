'use client';

import React from 'react';
import { Seat as SeatType } from '@/types/booking.types';

import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../UI';

interface SeatSummaryProps {
  selectedSeats: SeatType[];
  totalPrice: number;
  onContinue: () => void;
  onClearSelection: () => void;
}

export const SeatSummary: React.FC<SeatSummaryProps> = ({
  selectedSeats,
  totalPrice,
  onContinue,
  onClearSelection,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Seat Summary</h2>

      {selectedSeats.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No seats selected</p>
          <p className="text-sm text-gray-400 mt-1">Select seats to continue</p>
        </div>
      ) : (
        <>
          {/* Selected Seats */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Selected Seats ({selectedSeats.length})
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--primary-600)] rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Seat {seat.number}</p>
                      <p className="text-xs text-gray-500">
                        {seat.type === 'window' ? 'Window' : 'Aisle'} • Row {seat.row}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-[var(--primary-600)]">৳{seat.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-100 pt-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold text-[var(--primary-600)]">৳{totalPrice}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              fullWidth
              onClick={onContinue}
              disabled={selectedSeats.length === 0}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={onClearSelection}
              disabled={selectedSeats.length === 0}
            >
              Clear Selection
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
