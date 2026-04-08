"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { PassengerCard } from "@/app/components/Booking/PassengerCard";
import { BookingSummary } from "@/app/components/Booking/BookingSummary";
import { Passenger, ContactInfo, EmergencyContact } from "@/types/booking.types";
import { useBookingStore } from "@/store/bookingStore";
import { ArrowLeft, User, Phone, AlertCircle } from "lucide-react";

import { useUIStore } from "@/store/uiStore";
import { Button, Card, CardBody, Input } from "@/app/components/UI";

export default function PassengerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id: busId } = params;

  const { selectedBus, selectedSeats, searchParams, setPassengers, setContactInfo, setEmergencyContact, clearBooking } = useBookingStore();
  const { addToast } = useUIStore();

  const [passengers, setPassengersState] = useState<Passenger[]>([]);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [contactInfo, setContactInfoState] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
  });
  const [emergencyContact, setEmergencyContactState] = useState<EmergencyContact>({
    name: '',
    phone: '',
    relation: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize passengers for each selected seat
  useEffect(() => {
    const initialPassengers: Passenger[] = selectedSeats.map((seat, index) => ({
      id: `passenger-${index}`,
      seatId: seat.id,
      name: '',
      email: '',
      phone: '',
      nid: '',
      gender: 'male' as const,
      age: 0,
    }));
    setPassengersState(initialPassengers);
  }, [selectedSeats]);

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }, [selectedSeats]);

  const handlePassengerChange = (index: number, passenger: Passenger) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = passenger;
    setPassengersState(updatedPassengers);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, Record<string, string>> = {};

    passengers.forEach((passenger, index) => {
      const passengerErrors: Record<string, string> = {};

      if (!passenger.name.trim()) {
        passengerErrors.name = 'Name is required';
      }
      if (!passenger.email.trim()) {
        passengerErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(passenger.email)) {
        passengerErrors.email = 'Invalid email format';
      }
      if (!passenger.phone.trim()) {
        passengerErrors.phone = 'Phone number is required';
      } else if (!/^01[3-9]\d{8}$/.test(passenger.phone)) {
        passengerErrors.phone = 'Invalid phone number format';
      }
      if (!passenger.nid.trim()) {
        passengerErrors.nid = 'NID/Passport is required';
      }
      if (!passenger.gender) {
        passengerErrors.gender = 'Gender is required';
      }
      if (!passenger.age || passenger.age < 1) {
        passengerErrors.age = 'Valid age is required';
      }

      if (Object.keys(passengerErrors).length > 0) {
        newErrors[index.toString()] = passengerErrors;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      addToast({
        type: 'error',
        message: 'Please fill in all required fields correctly',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setPassengers(passengers);
      setContactInfo(contactInfo);
      setEmergencyContact(emergencyContact);
      setIsLoading(false);
      router.push(`/booking/${Array.isArray(busId) ? busId[0] : busId}/confirmation`);
    }, 1000);
  };

  const handleBack = () => {
    router.push(`/booking/${Array.isArray(busId) ? busId[0] : busId}/seats`);
  };

  if (selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardBody className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Seats Selected</h2>
            <p className="text-gray-600 mb-6">
              Please select seats before proceeding to passenger details.
            </p>
            <Button onClick={handleBack}>Back to Seat Selection</Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-[var(--primary-600)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Seats</span>
            </button>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--primary-600)]" />
              <h1 className="text-lg font-bold text-gray-900">Passenger Details</h1>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-[var(--primary-600)] rounded-full" />
            <div className="flex-1 h-2 bg-[var(--primary-600)] rounded-full" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full" />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Seats</span>
            <span>Passenger</span>
            <span>Confirm</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Passenger Forms */}
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Passenger Information</h2>

          {passengers.map((passenger, index) => (
            <PassengerCard
              key={passenger.id}
              seat={selectedSeats[index]}
              passenger={passenger}
              onChange={(p) => handlePassengerChange(index, p)}
              errors={errors[index.toString()] || {}}
            />
          ))}

          {/* Contact Information */}
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-[var(--primary-600)]" />
                <h3 className="font-bold text-gray-900">Contact Information</h3>
              </div>

              <div className="space-y-4">
                <Input
                  label="Contact Name *"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfoState({ ...contactInfo, name: e.target.value })}
                  placeholder="Enter contact name"
                  fullWidth
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Contact Email *"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfoState({ ...contactInfo, email: e.target.value })}
                    placeholder="email@example.com"
                  />

                  <Input
                    label="Contact Phone *"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfoState({ ...contactInfo, phone: e.target.value })}
                    placeholder="01XXXXXXXXX"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-gray-900">Emergency Contact</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Emergency Contact Name *"
                    value={emergencyContact.name}
                    onChange={(e) => setEmergencyContactState({ ...emergencyContact, name: e.target.value })}
                    placeholder="Enter emergency contact name"
                  />

                  <Input
                    label="Relationship *"
                    value={emergencyContact.relation}
                    onChange={(e) => setEmergencyContactState({ ...emergencyContact, relation: e.target.value })}
                    placeholder="e.g., Father, Spouse"
                  />
                </div>

                <Input
                  label="Emergency Contact Phone *"
                  type="tel"
                  value={emergencyContact.phone}
                  onChange={(e) => setEmergencyContactState({ ...emergencyContact, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="w-full lg:w-80">
          <BookingSummary
            bus={selectedBus}
            from={searchParams.from}
            to={searchParams.to}
            date={searchParams.date}
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
}
