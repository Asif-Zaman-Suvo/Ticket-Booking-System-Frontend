'use client';

import React from 'react';
import { Seat as SeatType } from '@/types/booking.types';

import { ArrowRight, Check, Armchair, XCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 sticky top-24 overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--primary-50)] to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
      
      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--primary-500)]/30">
            <Armchair className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Seat Summary</h2>
            <p className="text-sm text-gray-500">Review your selection</p>
          </div>
        </div>

        {selectedSeats.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Armchair className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No seats selected</p>
            <p className="text-sm text-gray-400 mt-2">Select seats from the layout to continue</p>
          </div>
        ) : (
          <>
            {/* Selected Seats */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Selected Seats
                </h3>
                <span className="text-xs font-bold bg-[var(--primary-100)] text-[var(--primary-700)] px-2 py-1 rounded-full">
                  {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'}
                </span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {selectedSeats.map((seat, index) => (
                  <div
                    key={seat.id}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-100 hover:border-[var(--primary-200)] transition-all duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] rounded-xl flex items-center justify-center shadow-md shadow-[var(--primary-500)]/20">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Seat {seat.number}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-400)]" />
                          {seat.type === 'window' ? 'Window' : 'Aisle'} • Row {seat.row}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-[var(--primary-600)] text-sm">৳{seat.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-[var(--primary-50)] to-[var(--primary-100)] rounded-2xl p-4 mb-6 border border-[var(--primary-200)]">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-sm font-medium">Total Amount</span>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--primary-600)]" />
                  <span className="text-xl font-bold text-[var(--primary-700)]">৳{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={onContinue}
                disabled={selectedSeats.length === 0}
                className="w-full cursor-pointer py-4 h-auto text-sm font-semibold shadow-lg shadow-[var(--primary-500)]/30 hover:shadow-xl hover:shadow-[var(--primary-500)]/40 transition-all duration-300 bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-700)] hover:from-[var(--primary-700)] hover:to-[var(--primary-800)]"
              >
                Continue to Passenger Details
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={onClearSelection}
                disabled={selectedSeats.length === 0}
                className="cursor-pointer w-full py-3 h-auto text-sm font-medium hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Clear Selection
              </Button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--gray-300);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--gray-400);
        }
      `}</style>
    </div>
  );
};
