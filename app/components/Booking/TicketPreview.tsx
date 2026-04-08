'use client';

import React from 'react';
import { BookingData } from '@/types/booking.types';
import { Calendar, Clock, MapPin, Armchair, User, Ticket, Phone, Mail } from 'lucide-react';

interface TicketPreviewProps {
  booking: BookingData;
}

export const TicketPreview: React.FC<TicketPreviewProps> = ({ booking }) => {
  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Ticket Header */}
      <div className="bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-700)] text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ticket className="w-8 h-8" />
            <div>
              <h2 className="text-xl font-bold">Booking Confirmed</h2>
              <p className="text-[var(--primary-200)] text-sm">PNR: {booking.pnrNumber}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-[var(--primary-200)]">Booking ID</p>
            <p className="font-mono font-bold">{booking.id?.slice(-8).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-6">
        {/* Route Information */}
        <div className="mb-6 pb-6 border-b border-dashed border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{booking.from}</p>
              <p className="text-sm text-gray-500">Departure</p>
            </div>
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="w-full h-[2px] bg-gray-200 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                  <svg className="w-6 h-6 text-[var(--primary-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{booking.to}</p>
              <p className="text-sm text-gray-500">Arrival</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Date</span>
              </div>
              <p className="font-semibold text-gray-900">{formattedDate}</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs">Time</span>
              </div>
              <p className="font-semibold text-gray-900">{booking.departureTime}</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                <Armchair className="w-4 h-4" />
                <span className="text-xs">Seats</span>
              </div>
              <p className="font-semibold text-gray-900">
                {booking.seats.map((s) => s.number).join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Passenger Information */}
        <div className="mb-6 pb-6 border-b border-dashed border-gray-300">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            Passenger Information
          </h3>
          <div className="space-y-2">
            {booking.passengers.map((passenger, index) => (
              <div key={passenger.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Seat {booking.seats[index]?.number}: {passenger.name}
                </span>
                <span className="text-gray-900 font-medium">{passenger.phone}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Contact Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{booking.contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{booking.contactInfo.phone}</span>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Paid</span>
            <span className="text-2xl font-bold text-[var(--primary-600)]">৳{booking.totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Ticket Footer */}
      <div className="bg-gray-50 px-6 py-3 text-center">
        <p className="text-xs text-gray-500">
          Please show this ticket at the boarding point. Keep it safe for your journey.
        </p>
      </div>
    </div>
  );
};
