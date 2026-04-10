'use client';

import React from 'react';
import { BookingData } from '@/types/booking.types';
import {
  Calendar,
  Clock,
  MapPin,
  Armchair,
  User,
  Ticket,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Bus,
  Shield,
  AlertCircle,
} from 'lucide-react';

interface TicketPreviewProps {
  booking: BookingData;
}

export const TicketPreview: React.FC<TicketPreviewProps> = ({ booking }) => {
  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const formattedBookingDate = booking.bookingDate
    ? new Date(booking.bookingDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div
      id="ticket-preview"
      className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative"
    >
      {/* ─── HEADER ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[var(--primary-600)] via-[var(--primary-700)] to-[var(--primary-800)] text-white p-6 sm:p-8 relative overflow-hidden">
        {/* Diagonal stripe pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
              )`,
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Brand / Title */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Bus className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  E-Ticket
                </h2>
                <p className="text-[var(--primary-200)] text-sm mt-0.5">
                  Booking Confirmed
                </p>
              </div>
            </div>

            {/* PNR & Booking ID */}
            <div className="text-right space-y-1">
              <div>
                <p className="text-[10px] text-[var(--primary-300)] uppercase tracking-widest">
                  PNR Number
                </p>
                <p className="font-mono font-bold text-lg tracking-wider">
                  {booking.pnrNumber}
                </p>
              </div>
              <p className="text-xs text-[var(--primary-300)]">
                ID: {booking.id?.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── STATUS BADGE ───────────────────────────────────────────── */}
      <div className="bg-emerald-50 border-b border-emerald-100 px-6 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
            {booking.status === 'confirmed' ? '✓ Confirmed' : booking.status}
          </span>
        </div>
        {formattedBookingDate && (
          <span className="text-xs text-gray-500">
            Booked: {formattedBookingDate}
          </span>
        )}
      </div>

      {/* ─── ROUTE SECTION ──────────────────────────────────────────── */}
      <div className="p-6 sm:p-8">
        {/* From → To */}
        <div className="flex items-center justify-between mb-8">
          {/* From */}
          <div className="text-center flex-1">
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[var(--primary-500)]/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {booking.from}
            </p>
            <p className="text-sm text-gray-500 mt-1">Departure</p>
          </div>

          {/* Arrow connector */}
          <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
            <div className="w-full relative flex items-center">
              {/* Dashed line */}
              <div className="flex-1 border-t-2 border-dashed border-gray-300" />
              {/* Arrow circle */}
              <div className="absolute left-1/2 -translate-x-1/2 bg-white px-1">
                <div className="w-10 h-10 bg-[var(--primary-600)] rounded-full flex items-center justify-center shadow-md">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* To */}
          <div className="text-center flex-1">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {booking.to}
            </p>
            <p className="text-sm text-gray-500 mt-1">Arrival</p>
          </div>
        </div>

        {/* ─── INFO CHIPS: Date / Departure / Arrival / Seats ──────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center border border-blue-200">
            <div className="flex items-center justify-center gap-1.5 text-blue-600 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Date
              </span>
            </div>
            <p className="font-bold text-gray-900 text-sm">{formattedDate}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center border border-green-200">
            <div className="flex items-center justify-center gap-1.5 text-green-600 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Departure
              </span>
            </div>
            <p className="font-bold text-gray-900 text-sm">
              {booking.departureTime}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center border border-purple-200">
            <div className="flex items-center justify-center gap-1.5 text-purple-600 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Arrival
              </span>
            </div>
            <p className="font-bold text-gray-900 text-sm">
              {booking.arrivalTime}
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 text-center border border-amber-200">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 mb-2">
              <Armchair className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Seats
              </span>
            </div>
            <p className="font-bold text-gray-900 text-sm">
              {booking.seats.map((s) => s.number).join(', ')}
            </p>
          </div>
        </div>

        {/* ─── PERFORATED DIVIDER ───────────────────────────────────── */}
        <div className="relative mb-8">
          <div className="border-t-2 border-dashed border-gray-300" />
          {/* Cutout circles */}
          <div className="absolute -left-[22px] -top-[14px] w-7 h-7 bg-[var(--primary-50)] rounded-full border-2 border-gray-200" />
          <div className="absolute -right-[22px] -top-[14px] w-7 h-7 bg-[var(--primary-50)] rounded-full border-2 border-gray-200" />
        </div>

        {/* ─── PASSENGER INFORMATION ────────────────────────────────── */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--primary-100)] rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-[var(--primary-600)]" />
            </div>
            Passenger Information
          </h3>
          <div className="space-y-3">
            {booking.passengers.map((passenger, index) => (
              <div
                key={passenger.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  {/* Seat badge */}
                  <div className="w-12 h-12 bg-[var(--primary-600)] rounded-xl flex flex-col items-center justify-center text-white shadow-md">
                    <Armchair className="w-4 h-4" />
                    <span className="text-[10px] font-bold leading-none mt-0.5">
                      {booking.seats[index]?.number}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {passenger.name}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-500">
                        {passenger.gender === 'male'
                          ? '♂ Male'
                          : passenger.gender === 'female'
                          ? '♀ Female'
                          : 'Other'}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        Age: {passenger.age}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600 font-medium">
                    {passenger.phone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── CONTACT INFORMATION ──────────────────────────────────── */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--primary-100)] rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-[var(--primary-600)]" />
            </div>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Email
                </p>
                <span className="text-sm text-gray-700 truncate block max-w-[180px]">
                  {booking.contactInfo.email}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Phone
                </p>
                <span className="text-sm text-gray-700">
                  {booking.contactInfo.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── PRICE BREAKDOWN ──────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-[var(--primary-50)] via-[var(--primary-100)] to-[var(--primary-50)] rounded-2xl p-6 border-2 border-[var(--primary-200)] relative overflow-hidden mb-6">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary-600)] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-[var(--primary-600)] rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10">
            {/* Seat price breakdown */}
            <div className="space-y-2 mb-4">
              {booking.seats.map((seat, idx) => (
                <div
                  key={seat.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">
                    Seat {seat.number} — {booking.passengers[idx]?.name || 'Passenger'}
                  </span>
                  <span className="font-medium text-gray-800">
                    ৳{seat.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--primary-200)] my-3" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-0.5">Total Paid</p>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <p className="text-xs text-emerald-600 font-medium">
                    Payment Successful
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-[var(--primary-700)]">
                  ৳{booking.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BARCODE-STYLE ELEMENT ────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-[2px]">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-800"
                style={{
                  width: Math.random() > 0.5 ? '2px' : '1px',
                  height: '32px',
                }}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-gray-500 tracking-widest">
            {booking.pnrNumber}
          </span>
        </div>
      </div>

      {/* ─── FOOTER ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 sm:px-8 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>
              Please show this ticket at the boarding point. Keep it safe for
              your journey.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Bus className="w-3.5 h-3.5" />
            <span>BusGo Express</span>
          </div>
        </div>
      </div>
    </div>
  );
};
