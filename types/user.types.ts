// User related types

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  dateJoined: string;
}

export interface UserProfile extends User {
  nid?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface SavedRoute {
  id: string;
  from: string;
  to: string;
  date?: string;
  createdAt: string;
}

export interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: string;
  currency: string;
}

export interface BookingHistoryItem {
  id: string;
  busId: string;
  operator: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  seats: string[];
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  bookingDate: string;
  pnrNumber: string;
}
