# Bus Ticket Booking System - Frontend Development Plan

## Project Overview

**Project Name:** BusGo - Bus Ticket Booking System
**Tech Stack:** Next.js 16.1.4, React 19.2.3, TypeScript, Tailwind CSS 4, better-auth
**Current Status:** MVP with landing page, authentication, and basic bus search

---

## Current Features ✅

1. **Landing Page**
   - HeroSection with search form
   - FeaturedRoutes showcase
   - Benefits section
   - Testimonials
   - Footer
   - Responsive Navbar

2. **Authentication**
   - Login page (email + Google social login)
   - Register page
   - Session management with better-auth

3. **Bus Search**
   - Search form with district selection (from Bangladesh API)
   - Search results page with dummy data
   - BusCard component displaying:
     - Operator name
     - Departure/arrival times
     - Duration
     - Bus type
     - Available seats
     - Price
     - Rating

4. **Infrastructure**
   - API service layer
   - TypeScript types for API responses
   - Basic routing setup

---

## Features to Build

### Phase 1: Core Booking Flow

#### 1.1 Enhanced Bus Search Results
**File:** `app/search/page.tsx`

**Features:**
- Filter sidebar with:
  - Price range slider
  - Bus type (AC/Non-AC, Sleeper, Chair Coach)
  - Departure time slots (Morning, Afternoon, Evening, Night)
  - Operator selection
  - Rating filter
- Sort options:
  - Price (Low to High, High to Low)
  - Departure time (Earliest, Latest)
  - Duration (Shortest, Longest)
  - Rating (Highest)
- Filter count badge
- Clear all filters button
- Mobile-friendly filter drawer

**Components to Create:**
- `app/components/BusSearch/FilterSidebar.tsx`
- `app/components/BusSearch/SortDropdown.tsx`
- `app/components/BusSearch/FilterBadge.tsx`
- `app/components/BusSearch/MobileFilterDrawer.tsx`

---

#### 1.2 Seat Selection Page
**File:** `app/booking/[id]/seats/page.tsx`

**Features:**
- Visual seat layout (2-2 or 2-1 configuration)
- Seat status indicators:
  - Available (white/green)
  - Booked (gray/red)
  - Selected (blue)
  - Female-only (pink - optional)
- Seat price display
- Seat type indicators (Window, Aisle, Front, Back)
- Select multiple seats
- Seat summary sidebar
- Total price calculation
- Continue to passenger details button

**Components to Create:**
- `app/components/Booking/SeatLayout.tsx`
- `app/components/Booking/Seat.tsx`
- `app/components/Booking/SeatLegend.tsx`
- `app/components/Booking/SeatSummary.tsx`

**Types to Add:**
```typescript
// types/booking.types.ts
export interface Seat {
  id: string;
  row: number;
  column: number;
  type: 'window' | 'aisle';
  status: 'available' | 'booked' | 'selected';
  price: number;
  gender?: 'male' | 'female' | 'any';
}

export interface BusLayout {
  rows: number;
  columns: number;
  seats: Seat[];
}
```

---

#### 1.3 Passenger Details Form
**File:** `app/booking/[id]/passenger/page.tsx`

**Features:**
- Dynamic form based on number of selected seats
- Passenger information fields:
  - Full name
  - Email
  - Phone number
  - NID/Passport number
  - Gender
  - Age
- Contact information (same for all passengers option)
- Emergency contact
- Form validation
- Progress indicator
- Booking summary sidebar
- Proceed to payment button

**Components to Create:**
- `app/components/Booking/PassengerForm.tsx`
- `app/components/Booking/PassengerCard.tsx`
- `app/components/Booking/BookingSummary.tsx`
- `app/components/Booking/ProgressBar.tsx`

**Types to Add:**
```typescript
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

export interface BookingData {
  busId: string;
  from: string;
  to: string;
  date: string;
  seats: Seat[];
  passengers: Passenger[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}
```

---

#### 1.4 Booking Confirmation Page
**File:** `app/booking/[id]/confirmation/page.tsx`

**Features:**
- Success animation/message
- Booking details card:
  - Booking ID
  - PNR number
  - Bus operator
  - Route (from/to)
  - Date and time
  - Seat numbers
  - Passenger names
  - Total paid
- Download ticket button (PDF)
- Share booking button
- View my bookings button
- Email booking confirmation (simulated)

**Components to Create:**
- `app/components/Booking/ConfirmationCard.tsx`
- `app/components/Booking/TicketPreview.tsx`
- `app/components/Booking/BookingActions.tsx`

---

### Phase 2: User Dashboard

#### 2.1 Dashboard Layout
**File:** `app/dashboard/layout.tsx`

**Features:**
- Sidebar navigation:
  - My Bookings
  - Profile
  - Saved Routes
  - Settings
- Mobile-responsive hamburger menu
- User info header
- Active route indicator

**Components to Create:**
- `app/components/Dashboard/DashboardSidebar.tsx`
- `app/components/Dashboard/DashboardHeader.tsx`
- `app/components/Dashboard/DashboardLayout.tsx`

---

#### 2.2 My Bookings Page
**File:** `app/dashboard/bookings/page.tsx`

**Features:**
- List of all bookings with:
  - Booking ID
  - Route (from/to)
  - Date and time
  - Bus operator
  - Seat numbers
  - Status (Confirmed, Cancelled, Completed)
  - Total price
- Filter by status
- Search bookings
- View booking details
- Download ticket
- Cancel booking (if eligible)
- Pagination
- Empty state

**Components to Create:**
- `app/components/Dashboard/BookingList.tsx`
- `app/components/Dashboard/BookingItem.tsx`
- `app/components/Dashboard/BookingStatusBadge.tsx`
- `app/components/Dashboard/EmptyBookings.tsx`

---

#### 2.3 Booking Details Page
**File:** `app/dashboard/bookings/[id]/page.tsx`

**Features:**
- Complete booking information
- Ticket preview
- Passenger details
- Bus information
- Route details
- QR Code (for boarding)
- Download ticket (PDF)
- Cancel booking (with confirmation)
- Refund policy information

**Components to Create:**
- `app/components/Dashboard/BookingDetails.tsx`
- `app/components/Dashboard/TicketView.tsx`
- `app/components/Dashboard/QRCode.tsx`
- `app/components/Dashboard/CancelBookingModal.tsx`

---

#### 2.4 User Profile Page
**File:** `app/dashboard/profile/page.tsx`

**Features:**
- Profile information display:
  - Name
  - Email
  - Phone
  - Date joined
- Edit profile form
- Change password
- Account settings
- Delete account (with confirmation)

**Components to Create:**
- `app/components/Dashboard/ProfileInfo.tsx`
- `app/components/Dashboard/EditProfileForm.tsx`
- `app/components/Dashboard/ChangePasswordForm.tsx`

---

#### 2.5 Saved Routes Page
**File:** `app/dashboard/saved-routes/page.tsx`

**Features:**
- List of saved routes
- Quick search from saved routes
- Delete saved route
- Add current search to saved routes

**Components to Create:**
- `app/components/Dashboard/SavedRoutesList.tsx`
- `app/components/Dashboard/SavedRouteCard.tsx`

---

### Phase 3: Additional Pages

#### 3.1 About Us Page
**File:** `app/about/page.tsx`

**Features:**
- Company story
- Mission and vision
- Team members
- Statistics (buses, routes, customers)
- Values

---

#### 3.2 Contact Page
**File:** `app/contact/page.tsx`

**Features:**
- Contact form:
  - Name
  - Email
  - Subject
  - Message
- Contact information:
  - Address
  - Phone
  - Email
  - Social media links
- Map embed

**Components to Create:**
- `app/components/Contact/ContactForm.tsx`
- `app/components/Contact/ContactInfo.tsx`

---

#### 3.3 FAQ Page
**File:** `app/faq/page.tsx`

**Features:**
- Accordion-style FAQ
- Categories:
  - Booking
  - Payment
  - Cancellation
  - Refund
  - General
- Search FAQs

**Components to Create:**
- `app/components/FAQ/FAQAccordion.tsx`
- `app/components/FAQ/FAQCategory.tsx`

---

#### 3.4 Terms and Conditions Page
**File:** `app/terms/page.tsx`

**Features:**
- Terms of service
- Booking policies
- Payment terms
- Cancellation policy
- Refund policy
- User responsibilities

---

#### 3.5 Privacy Policy Page
**File:** `app/privacy/page.tsx`

**Features:**
- Data collection
- Data usage
- Data sharing
- Cookies
- User rights

---

### Phase 4: Enhanced Features

#### 4.1 Bus Operator Profiles
**File:** `app/operator/[id]/page.tsx`

**Features:**
- Operator information
- Fleet details
- Amenities
- Rating and reviews
- All routes by operator

**Components to Create:**
- `app/components/Operator/OperatorProfile.tsx`
- `app/components/Operator/OperatorStats.tsx`
- `app/components/Operator/OperatorReviews.tsx`

---

#### 4.2 Reviews and Ratings
**File:** Integrated across pages

**Features:**
- Star rating system
- Write review form
- Display reviews
- Filter reviews
- Helpful votes

**Components to Create:**
- `app/components/Reviews/ReviewCard.tsx`
- `app/components/Reviews/ReviewForm.tsx`
- `app/components/Reviews/StarRating.tsx`

---

#### 4.3 Search History
**File:** Integrated in search page

**Features:**
- Recent searches
- Quick search from history
- Clear history

**Components to Create:**
- `app/components/Search/SearchHistory.tsx`
- `app/components/Search/RecentSearchItem.tsx`

---

### Phase 5: UI/UX Improvements

#### 5.1 Loading States
- Skeleton loaders for all pages
- Loading spinners
- Progress indicators

**Components to Create:**
- `app/components/UI/Skeleton.tsx`
- `app/components/UI/LoadingSpinner.tsx`
- `app/components/UI/ProgressBar.tsx`

---

#### 5.2 Error Handling
- Error pages (404, 500)
- Error boundaries
- Error messages
- Retry buttons

**Components to Create:**
- `app/error.tsx`
- `app/not-found.tsx`
- `app/components/UI/ErrorBoundary.tsx`
- `app/components/UI/ErrorMessage.tsx`

---

#### 5.3 Toast Notifications
- Success messages
- Error messages
- Warning messages
- Info messages
- Auto-dismiss
- Position options

**Components to Create:**
- `app/components/UI/Toast.tsx`
- `app/components/UI/ToastContainer.tsx`
- `app/hooks/useToast.ts`

---

#### 5.4 Dark Mode
- Theme toggle
- System preference detection
- Persist theme preference
- Dark mode styles for all components

**Components to Create:**
- `app/components/UI/ThemeToggle.tsx`
- `app/hooks/useTheme.ts`

---

### Phase 6: Technical Improvements

#### 6.1 State Management
- Zustand store for:
  - Booking state
  - User state
  - Search filters
  - UI state

**Stores to Create:**
- `app/store/bookingStore.ts`
- `app/store/userStore.ts`
- `app/store/filterStore.ts`
- `app/store/uiStore.ts`

---

#### 6.2 Reusable Components Library
- Button variants
- Input components
- Card components
- Modal components
- Dropdown components
- Badge components
- Avatar components

**Components to Create:**
- `app/components/UI/Button.tsx`
- `app/components/UI/Input.tsx`
- `app/components/UI/Card.tsx`
- `app/components/UI/Modal.tsx`
- `app/components/UI/Dropdown.tsx`
- `app/components/UI/Badge.tsx`
- `app/components/UI/Avatar.tsx`

---

#### 6.3 Testing
- Unit tests for critical components
- Integration tests for booking flow
- E2E tests with Playwright

---

#### 6.4 SEO Optimization
- Meta tags for all pages
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt

---

#### 6.5 Performance Optimization
- Image optimization
- Code splitting
- Lazy loading
- Bundle size optimization
- Font optimization

---

## File Structure

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/
│   ├── bookings/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── saved-routes/
│   │   └── page.tsx
│   └── layout.tsx
├── booking/
│   └── [id]/
│       ├── seats/
│       │   └── page.tsx
│       ├── passenger/
│       │   └── page.tsx
│       └── confirmation/
│           └── page.tsx
├── operator/
│   └── [id]/
│       └── page.tsx
├── search/
│   └── page.tsx
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
├── faq/
│   └── page.tsx
├── terms/
│   └── page.tsx
├── privacy/
│   └── page.tsx
├── components/
│   ├── Booking/
│   ├── BusSearch/
│   ├── Dashboard/
│   ├── LandingPage/
│   ├── Contact/
│   ├── FAQ/
│   ├── Operator/
│   ├── Reviews/
│   ├── Search/
│   └── UI/
├── store/
│   ├── bookingStore.ts
│   ├── userStore.ts
│   ├── filterStore.ts
│   └── uiStore.ts
├── hooks/
│   ├── useToast.ts
│   ├── useTheme.ts
│   └── useBooking.ts
├── types/
│   ├── api.types.ts
│   ├── booking.types.ts
│   └── user.types.ts
├── services/
│   └── api.ts
├── auth-client.ts
├── globals.css
├── layout.tsx
└── page.tsx
```

---

## Development Priority

### Immediate (Core Features)
1. Enhanced bus search with filters and sorting
2. Seat selection page
3. Passenger details form
4. Booking confirmation page
5. User dashboard layout
6. My bookings page

### High Priority
7. Booking details view
8. User profile page
9. Loading states and error handling
10. Toast notifications
11. State management setup
12. Reusable UI components

### Medium Priority
13. Additional pages (About, Contact, FAQ, Terms, Privacy)
14. Bus operator profiles
15. Reviews and ratings
16. Search history
17. Dark mode

### Low Priority
18. Unit tests
19. SEO optimization
20. Performance optimization
21. Deployment configuration

---

## Notes

- All features will use mock data initially
- Backend API integration will be added later
- Payment integration will be simulated
- Email/SMS notifications will be simulated
- PDF generation for tickets will use client-side libraries
