import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookingFilters } from '@/types/booking.types';

interface FilterState {
  filters: BookingFilters;
  activeFilterCount: number;

  // Actions
  setPriceRange: (range: [number, number]) => void;
  toggleBusType: (type: string) => void;
  toggleTimeSlot: (slot: string) => void;
  toggleOperator: (operator: string) => void;
  setRating: (rating: number) => void;
  setSortBy: (sortBy: BookingFilters['sortBy']) => void;
  clearFilters: () => void;
  resetStore: () => void;
}

const initialFilters: BookingFilters = {
  priceRange: [0, 5000],
  busTypes: [],
  timeSlots: [],
  operators: [],
  rating: 0,
  sortBy: 'price-asc',
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      filters: initialFilters,
      activeFilterCount: 0,

      setPriceRange: (range) =>
        set((state) => ({
          filters: { ...state.filters, priceRange: range },
        })),

      toggleBusType: (type) =>
        set((state) => {
          const busTypes = state.filters.busTypes.includes(type)
            ? state.filters.busTypes.filter((t) => t !== type)
            : [...state.filters.busTypes, type];
          return {
            filters: { ...state.filters, busTypes },
            activeFilterCount: calculateActiveCount({
              ...state.filters,
              busTypes,
            }),
          };
        }),

      toggleTimeSlot: (slot) =>
        set((state) => {
          const timeSlots = state.filters.timeSlots.includes(slot)
            ? state.filters.timeSlots.filter((s) => s !== slot)
            : [...state.filters.timeSlots, slot];
          return {
            filters: { ...state.filters, timeSlots },
            activeFilterCount: calculateActiveCount({
              ...state.filters,
              timeSlots,
            }),
          };
        }),

      toggleOperator: (operator) =>
        set((state) => {
          const operators = state.filters.operators.includes(operator)
            ? state.filters.operators.filter((o) => o !== operator)
            : [...state.filters.operators, operator];
          return {
            filters: { ...state.filters, operators },
            activeFilterCount: calculateActiveCount({
              ...state.filters,
              operators,
            }),
          };
        }),

      setRating: (rating) =>
        set((state) => ({
          filters: { ...state.filters, rating },
          activeFilterCount: calculateActiveCount({
            ...state.filters,
            rating,
          }),
        })),

      setSortBy: (sortBy) =>
        set((state) => ({
          filters: { ...state.filters, sortBy },
        })),

      clearFilters: () =>
        set({
          filters: initialFilters,
          activeFilterCount: 0,
        }),

      resetStore: () =>
        set({
          filters: initialFilters,
          activeFilterCount: 0,
        }),
    }),
    {
      name: 'filter-storage',
    }
  )
);

function calculateActiveCount(filters: BookingFilters): number {
  let count = 0;
  if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 5000) count++;
  if (filters.busTypes.length > 0) count++;
  if (filters.timeSlots.length > 0) count++;
  if (filters.operators.length > 0) count++;
  if (filters.rating > 0) count++;
  return count;
}
