// Booking related types

export interface BusDetails {
  id: string;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  type: string;
  availableSeats: number;
  price: number;
  rating?: number;
}

export interface Seat {
  id: string;
  row: number;
  column: number;
  number: string;
  type: 'window' | 'aisle';
  status: 'available' | 'booked' | 'selected' | 'female-only';
  price: number;
  gender?: 'male' | 'female' | 'any';
}

export interface BusLayout {
  rows: number;
  columns: number;
  seats: Seat[];
}

export interface Passenger {
  id: string;
  seatId: string;
  name: string;
  email: string;
  phone: string;
  nid: string;
  gender: 'male' | 'female' | 'other';
  age: number;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface BookingData {
  id?: string;
  busId: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  seats: Seat[];
  passengers: Passenger[];
  contactInfo: ContactInfo;
  emergencyContact: EmergencyContact;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingDate?: string;
  pnrNumber?: string;
}

export interface BookingSummary {
  busId: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  selectedSeats: Seat[];
  totalAmount: number;
  passengerCount: number;
}

export interface BookingFilters {
  priceRange: [number, number];
  busTypes: string[];
  timeSlots: string[];
  operators: string[];
  rating: number;
  sortBy: 'price-asc' | 'price-desc' | 'time-asc' | 'time-desc' | 'duration-asc' | 'duration-desc' | 'rating-desc';
}

export interface TimeSlot {
  id: string;
  label: string;
  startHour: number;
  endHour: number;
}

export interface BusType {
  id: string;
  label: string;
  value: string;
}
