'use client';

import React from 'react';
import { BookingData } from '@/types/booking.types';
import { Calendar, Clock, MapPin, Armchair, User, Ticket, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';

interface TicketPreviewProps {
  booking: BookingData;
}

export const TicketPreview: React.FC<TicketPreviewProps> = ({ booking }) => {
  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative">
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[var(--primary-100)] to-transparent rounded-br-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[var(--primary-100)] to-transparent rounded-tl-3xl opacity-50" />

      {/* Ticket Header */}
      <div className="bg-gradient-to-r from-[var(--primary-600)] via-[var(--primary-700)] to-[var(--primary-800)] text-white p-6 sm:p-8 relative overflow-hidden">
        {/* Animated Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
          }} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Ticket className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Booking Confirmed</h2>
                <p className="text-[var(--primary-200)] text-sm mt-1">PNR: {booking.pnrNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--primary-200)] uppercase tracking-wider">Booking ID</p>
              <p className="font-mono font-bold text-lg">{booking.id?.slice(-8).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-6 sm:p-8 relative z-10">
        {/* Route Information */}
        <div className="mb-8 pb-8 border-b-2 border-dashed border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[var(--primary-500)]/30">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{booking.from}</p>
              <p className="text-sm text-gray-500 mt-1">Departure</p>
            </div>
            <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary-300)] to-transparent relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-md">
                  <div className="w-8 h-8 bg-[var(--primary-600)] rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[var(--primary-500)]/30">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{booking.to}</p>
              <p className="text-sm text-gray-500 mt-1">Arrival</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[var(--primary-50)] to-[var(--primary-100)] rounded-2xl p-4 text-center border border-[var(--primary-200)]">
              <div className="flex items-center justify-center gap-2 text-[var(--primary-600)] mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Date</span>
              </div>
              <p className="font-bold text-gray-900 text-sm">{formattedDate}</p>
            </div>
            <div className="bg-gradient-to-br from-[var(--primary-50)] to-[var(--primary-100)] rounded-2xl p-4 text-center border border-[var(--primary-200)]">
              <div className="flex items-center justify-center gap-2 text-[var(--primary-600)] mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Time</span>
              </div>
              <p className="font-bold text-gray-900 text-sm">{booking.departureTime}</p>
            </div>
            <div className="bg-gradient-to-br from-[var(--primary-50)] to-[var(--primary-100)] rounded-2xl p-4 text-center border border-[var(--primary-200)]">
              <div className="flex items-center justify-center gap-2 text-[var(--primary-600)] mb-2">
                <Armchair className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Seats</span>
              </div>
              <p className="font-bold text-gray-900 text-sm">
                {booking.seats.map((s) => s.number).join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Passenger Information */}
        <div className="mb-8 pb-8 border-b-2 border-dashed border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--primary-100)] rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-[var(--primary-600)]" />
            </div>
            Passenger Information
          </h3>
          <div className="space-y-3">
            {booking.passengers.map((passenger, index) => (
              <div key={passenger.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--primary-600)] rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{passenger.name}</p>
                    <p className="text-xs text-gray-500">Seat {booking.seats[index]?.number}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600 font-medium">{passenger.phone}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--primary-100)] rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-[var(--primary-600)]" />
            </div>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-[var(--primary-100)] rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-[var(--primary-600)]" />
              </div>
              <span className="text-sm text-gray-700 truncate">{booking.contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-[var(--primary-100)] rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-[var(--primary-600)]" />
              </div>
              <span className="text-sm text-gray-700">{booking.contactInfo.phone}</span>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-[var(--primary-50)] via-[var(--primary-100)] to-[var(--primary-50)] rounded-2xl p-6 border-2 border-[var(--primary-200)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary-600)] rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Paid</p>
              <p className="text-xs text-gray-500">Payment Successful</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--primary-600)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--primary-500)]/30">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-[var(--primary-700)]">৳{booking.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 text-center border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <CheckCircle className="w-4 h-4 text-[var(--success)]" />
          <span>Please show this ticket at the boarding point. Keep it safe for your journey.</span>
        </div>
      </div>
    </div>
  );
};
