"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Smartphone,
  Building2,
  ChevronLeft,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  MapPin,
  Clock,
  Users,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type PaymentMethod = "card" | "bkash" | "nagad" | "rocket" | "bank";

const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  icon: string;
  color: string;
  description: string;
}[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    icon: "💳",
    color: "border-blue-300 bg-blue-50",
    description: "Visa, Mastercard, AMEX",
  },
  {
    id: "bkash",
    label: "bKash",
    icon: "🔴",
    color: "border-pink-300 bg-pink-50",
    description: "Pay via bKash mobile banking",
  },
  {
    id: "nagad",
    label: "Nagad",
    icon: "🟠",
    color: "border-orange-300 bg-orange-50",
    description: "Pay via Nagad mobile banking",
  },
  {
    id: "rocket",
    label: "Rocket",
    icon: "🟣",
    color: "border-purple-300 bg-purple-50",
    description: "Pay via DBBL Rocket",
  },
  {
    id: "bank",
    label: "Net Banking",
    icon: "🏦",
    color: "border-green-300 bg-green-50",
    description: "All major banks supported",
  },
];

function CardForm() {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Card Number
        </label>
        <input
          type="text"
          maxLength={19}
          placeholder="1234  5678  9012  3456"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all text-gray-800 font-mono tracking-wider"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Expiry Date
          </label>
          <input
            type="text"
            maxLength={5}
            placeholder="MM / YY"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            CVV
          </label>
          <input
            type="password"
            maxLength={4}
            placeholder="• • •"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all text-gray-800"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Cardholder Name
        </label>
        <input
          type="text"
          placeholder="Name as on card"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all text-gray-800"
        />
      </div>
    </div>
  );
}

function MobileForm({ label }: { label: string }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label} Account Number
        </label>
        <div className="flex">
          <span className="px-3 py-3 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-xl text-gray-500 text-sm font-medium">
            +880
          </span>
          <input
            type="tel"
            maxLength={10}
            placeholder="1XXXXXXXXX"
            className="flex-1 px-4 py-3 rounded-r-xl border-2 border-gray-200 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all text-gray-800"
          />
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
        You will receive a PIN prompt on your {label} app to confirm payment.
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { selectedBus, selectedSeats, searchParams, setCurrentBooking, addBookingToHistory, passengers, contactInfo, emergencyContact } =
    useBookingStore();

  const [method, setMethod] = useState<PaymentMethod>("card");
  const [paying, setPaying] = useState(false);

  const totalAmount =
    selectedSeats.reduce((sum, s) => sum + s.price, 0) ||
    (selectedSeats.length || 1) * (selectedBus?.price ?? 0);

  const serviceCharge = Math.round(totalAmount * 0.02);
  const grandTotal = totalAmount + serviceCharge;

  const handlePay = async () => {
    setPaying(true);

    await new Promise((r) => setTimeout(r, 2000));

    const booking = {
      id: `BK-${Date.now()}`,
      busId: id as string,
      from: searchParams.from || "Dhaka",
      to: searchParams.to || "Chittagong",
      date: searchParams.date || new Date().toISOString().split("T")[0],
      departureTime: selectedBus?.departureTime ?? "08:00 AM",
      arrivalTime: selectedBus?.arrivalTime ?? "02:00 PM",
      seats: selectedSeats,
      passengers: passengers,
      contactInfo: contactInfo ?? { name: "", email: "", phone: "" },
      emergencyContact: emergencyContact ?? { name: "", phone: "", relation: "" },
      totalAmount: grandTotal,
      status: "confirmed" as const,
      bookingDate: new Date().toISOString(),
      pnrNumber: `PNR${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    };

    setCurrentBooking(booking);
    addBookingToHistory(booking);

    toast.success("Payment successful! Your ticket is confirmed.");
    router.push(`/booking/${id}/confirmation`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to passenger details
        </button>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          {[
            { step: 1, label: "Select Seats", done: true },
            { step: 2, label: "Passenger Info", done: true },
            { step: 3, label: "Payment", done: false, active: true },
            { step: 4, label: "Confirmation", done: false },
          ].map(({ step, label, done, active }) => (
            <div key={step} className="flex items-center gap-2 shrink-0">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  done
                    ? "bg-green-500 text-white"
                    : active
                      ? "bg-[var(--primary-600)] text-white ring-4 ring-[var(--primary-100)]"
                      : "bg-gray-200 text-gray-500"
                )}
              >
                {done ? <CheckCircle2 className="w-4 h-4" /> : step}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  active ? "text-gray-900" : done ? "text-gray-600" : "text-gray-400"
                )}
              >
                {label}
              </span>
              {step < 4 && (
                <div
                  className={cn(
                    "h-px w-6 sm:w-10",
                    done ? "bg-green-400" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Payment form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[var(--primary-600)]" />
                Choose Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setMethod(pm.id)}
                    className={cn(
                      "flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-200",
                      method === pm.id
                        ? cn("border-[var(--primary-500)] bg-[var(--primary-50)]", "ring-2 ring-[var(--primary-100)]")
                        : "border-gray-100 hover:border-gray-200 bg-white"
                    )}
                  >
                    <span className="text-2xl">{pm.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {pm.label}
                      </p>
                      <p className="text-xs text-gray-500">{pm.description}</p>
                    </div>
                    {method === pm.id && (
                      <CheckCircle2 className="w-4 h-4 text-[var(--primary-600)] ml-auto shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Method-specific form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6">
              <h3 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" />
                Payment Details
              </h3>
              {method === "card" && <CardForm />}
              {method === "bkash" && <MobileForm label="bKash" />}
              {method === "nagad" && <MobileForm label="Nagad" />}
              {method === "rocket" && <MobileForm label="Rocket" />}
              {method === "bank" && (
                <div className="text-center py-6 text-gray-500 text-sm">
                  You will be redirected to your bank&apos;s secure portal.
                </div>
              )}
            </div>

            {/* Security badge */}
            <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>
                Your payment is secured by 256-bit SSL encryption. We never
                store card details.
              </span>
            </div>
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 sticky top-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Order Summary
              </h3>

              {/* Route info */}
              <div className="bg-[var(--primary-50)] rounded-xl p-4 mb-4 space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-[var(--primary-600)] shrink-0" />
                  <span className="font-medium">
                    {searchParams.from || "Dhaka"} → {searchParams.to || "Chittagong"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-4 h-4 text-[var(--primary-600)] shrink-0" />
                  <span>
                    {selectedBus?.departureTime ?? "08:00 AM"} –{" "}
                    {selectedBus?.arrivalTime ?? "02:00 PM"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="w-4 h-4 text-[var(--primary-600)] shrink-0" />
                  <span>
                    {selectedSeats.length || 1} seat
                    {(selectedSeats.length || 1) !== 1 ? "s" : ""} selected
                    {selectedSeats.length > 0 &&
                      ` (${selectedSeats.map((s) => s.number).join(", ")})`}
                  </span>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Base fare</span>
                  <span>৳{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Service charge (2%)
                  </span>
                  <span>৳{serviceCharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-dashed border-gray-200 text-base">
                  <span>Total</span>
                  <span className="text-[var(--primary-600)]">
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePay}
                disabled={paying}
                className="w-full mt-5 py-5 h-auto text-base font-bold bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-700)] hover:from-[var(--primary-700)] hover:to-[var(--primary-800)] text-white shadow-lg hover:shadow-xl transition-all"
              >
                {paying ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Pay ৳{grandTotal.toLocaleString()}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
