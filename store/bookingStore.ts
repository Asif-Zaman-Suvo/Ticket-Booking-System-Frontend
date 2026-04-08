import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BusDetails, Seat, Passenger, BookingData, ContactInfo, EmergencyContact } from '@/types/booking.types';

interface BookingState {
  // Current search
  searchParams: {
    from: string;
    to: string;
    date: string;
  };

  // Selected bus
  selectedBus: BusDetails | null;

  // Selected seats
  selectedSeats: Seat[];

  // Passenger information
  passengers: Passenger[];

  // Contact information
  contactInfo: ContactInfo | null;

  // Emergency contact
  emergencyContact: EmergencyContact | null;

  // Current booking
  currentBooking: BookingData | null;

  // Booking history
  bookingHistory: BookingData[];

  // Actions
  setSearchParams: (params: { from: string; to: string; date: string }) => void;
  setSelectedBus: (bus: BusDetails | null) => void;
  setSelectedSeats: (seats: Seat[]) => void;
  toggleSeat: (seat: Seat) => void;
  setPassengers: (passengers: Passenger[]) => void;
  setContactInfo: (info: ContactInfo) => void;
  setEmergencyContact: (contact: EmergencyContact) => void;
  setCurrentBooking: (booking: BookingData | null) => void;
  addBookingToHistory: (booking: BookingData) => void;
  updateBookingStatus: (id: string, status: 'confirmed' | 'cancelled' | 'completed') => void;
  clearBooking: () => void;
  resetStore: () => void;
}

const initialState = {
  searchParams: {
    from: '',
    to: '',
    date: '',
  },
  selectedBus: null,
  selectedSeats: [],
  passengers: [],
  contactInfo: null,
  emergencyContact: null,
  currentBooking: null,
  bookingHistory: [],
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSearchParams: (params) =>
        set({ searchParams: params }),

      setSelectedBus: (bus) =>
        set({ selectedBus: bus }),

      setSelectedSeats: (seats) =>
        set({ selectedSeats: seats }),

      toggleSeat: (seat) => {
        const { selectedSeats } = get();
        const isSelected = selectedSeats.some((s) => s.id === seat.id);

        if (isSelected) {
          set({
            selectedSeats: selectedSeats.filter((s) => s.id !== seat.id),
          });
        } else {
          set({
            selectedSeats: [...selectedSeats, { ...seat, status: 'selected' }],
          });
        }
      },

      setPassengers: (passengers) =>
        set({ passengers }),

      setContactInfo: (info) =>
        set({ contactInfo: info }),

      setEmergencyContact: (contact) =>
        set({ emergencyContact: contact }),

      setCurrentBooking: (booking) =>
        set({ currentBooking: booking }),

      addBookingToHistory: (booking) =>
        set((state) => ({
          bookingHistory: [booking, ...state.bookingHistory],
        })),

      updateBookingStatus: (id, status) =>
        set((state) => ({
          bookingHistory: state.bookingHistory.map((booking) =>
            booking.id === id ? { ...booking, status } : booking
          ),
          currentBooking:
            state.currentBooking?.id === id
              ? { ...state.currentBooking, status }
              : state.currentBooking,
        })),

      clearBooking: () =>
        set({
          selectedBus: null,
          selectedSeats: [],
          passengers: [],
          contactInfo: null,
          emergencyContact: null,
          currentBooking: null,
        }),

      resetStore: () => set(initialState),
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({
        bookingHistory: state.bookingHistory,
        searchParams: state.searchParams,
      }),
    }
  )
);
