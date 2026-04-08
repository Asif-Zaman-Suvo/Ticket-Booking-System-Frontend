import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserProfile, SavedRoute, BookingHistoryItem } from '@/types/user.types';

interface UserState {
  // User data
  user: User | null;
  isAuthenticated: boolean;
  profile: UserProfile | null;

  // User data
  bookings: BookingHistoryItem[];
  savedRoutes: SavedRoute[];

  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  addBooking: (booking: BookingHistoryItem) => void;
  updateBooking: (id: string, booking: Partial<BookingHistoryItem>) => void;
  deleteBooking: (id: string) => void;
  addSavedRoute: (route: Omit<SavedRoute, 'id' | 'createdAt'>) => void;
  removeSavedRoute: (id: string) => void;
  clearUser: () => void;
  resetStore: () => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  profile: null,
  bookings: [],
  savedRoutes: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setProfile: (profile) => set({ profile }),

      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      addBooking: (booking) =>
        set((state) => ({
          bookings: [booking, ...state.bookings],
        })),

      updateBooking: (id, updates) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, ...updates } : booking
          ),
        })),

      deleteBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== id),
        })),

      addSavedRoute: (route) => {
        const newRoute: SavedRoute = {
          ...route,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          savedRoutes: [newRoute, ...state.savedRoutes],
        }));
      },

      removeSavedRoute: (id) =>
        set((state) => ({
          savedRoutes: state.savedRoutes.filter((route) => route.id !== id),
        })),

      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
          profile: null,
        }),

      resetStore: () => set(initialState),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        profile: state.profile,
        bookings: state.bookings,
        savedRoutes: state.savedRoutes,
      }),
    }
  )
);
