"use client";

import { useBookingStore } from "@/store/bookingStore";
import { BookingData } from "@/types/booking.types";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/auth-client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Clock,
  Ticket,
  ArrowRight,
  Search,
  XCircle,
  CheckCircle2,
  Hourglass,
  Bus,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    badge: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  pending: {
    label: "Pending",
    icon: Hourglass,
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    badge: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
};

function BookingCard({ booking }: { booking: BookingData }) {
  const router = useRouter();
  const config = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending;
  const Icon = config.icon;

  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString("en-BD", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      {/* Top accent stripe */}
      <div
        className={cn(
          "h-1 w-full",
          booking.status === "confirmed" && "bg-green-500",
          booking.status === "pending" && "bg-yellow-400",
          booking.status === "cancelled" && "bg-red-500",
          booking.status === "completed" && "bg-[var(--primary-500)]"
        )}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[var(--primary-50)] flex items-center justify-center shrink-0">
              <Bus className="w-5 h-5 text-[var(--primary-600)]" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {booking.busId?.replace("bus-", "Bus #") || "Bus"}
              </p>
              {booking.pnrNumber && (
                <p className="text-xs text-gray-400 font-mono">
                  PNR: {booking.pnrNumber}
                </p>
              )}
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0",
              config.badge
            )}
          >
            <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
            {config.label}
          </span>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-0.5">From</p>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--primary-500)] shrink-0" />
              <p className="font-semibold text-gray-800 text-sm truncate">
                {booking.from}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 px-2">
            <ArrowRight className="w-4 h-4 text-gray-300" />
            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {booking.seats?.length ?? 0} seat
              {(booking.seats?.length ?? 0) !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-xs text-gray-500 mb-0.5">To</p>
            <div className="flex items-center justify-end gap-1.5">
              <p className="font-semibold text-gray-800 text-sm truncate">
                {booking.to}
              </p>
              <MapPin className="w-3.5 h-3.5 text-[var(--primary-500)] shrink-0" />
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-dashed border-gray-100 mb-4">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
              Date
            </p>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">{formattedDate}</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
              Departure
            </p>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <p className="text-xs font-medium text-gray-700">
                {booking.departureTime}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
              Total
            </p>
            <p className="text-sm font-bold text-[var(--primary-600)]">
              ৳{booking.totalAmount?.toLocaleString() ?? "—"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => router.push(`/booking/${booking.busId}/confirmation`)}
            className="flex-1 text-xs bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white"
          >
            <Ticket className="w-3.5 h-3.5 mr-1.5" />
            View Ticket
          </Button>
          {booking.status === "confirmed" && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  const { bookingHistory } = useBookingStore();
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-3 border-[var(--primary-600)] border-t-transparent animate-spin" />
      </div>
    );
  }

  const stats = {
    total: bookingHistory.length,
    confirmed: bookingHistory.filter((b) => b.status === "confirmed").length,
    completed: bookingHistory.filter((b) => b.status === "completed").length,
    cancelled: bookingHistory.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-soft sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="rounded-xl hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">My Bookings</h1>
            {session && (
              <p className="text-xs text-gray-500">
                {session.user?.name ?? session.user?.email}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats.total, color: "text-gray-800", bg: "bg-white" },
            { label: "Confirmed", value: stats.confirmed, color: "text-green-700", bg: "bg-green-50" },
            { label: "Completed", value: stats.completed, color: "text-blue-700", bg: "bg-blue-50" },
            { label: "Cancelled", value: stats.cancelled, color: "text-red-700", bg: "bg-red-50" },
          ].map(({ label, value, color, bg }) => (
            <div
              key={label}
              className={cn(
                "rounded-2xl border border-gray-100 p-4 text-center shadow-soft",
                bg
              )}
            >
              <p className={cn("text-3xl font-bold", color)}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Booking list */}
        {bookingHistory.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-[var(--primary-50)] flex items-center justify-center mx-auto">
              <Ticket className="w-10 h-10 text-[var(--primary-400)]" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">No bookings yet</h2>
            <p className="text-gray-500 max-w-sm mx-auto text-sm">
              Your booking history will appear here once you book a bus ticket.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white mt-2"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Buses
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {bookingHistory.length} booking
              {bookingHistory.length !== 1 ? "s" : ""}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bookingHistory.map((booking) => (
                <BookingCard key={booking.id ?? booking.busId} booking={booking} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
