# BusGo - System Architecture Diagrams

## User Flow Diagram

```mermaid
flowchart TD
    A[Landing Page] --> B{User Authenticated?}
    B -->|No| C[Login/Register]
    B -->|Yes| D[Search Buses]
    C --> D
    D --> E[View Search Results]
    E --> F[Apply Filters & Sort]
    F --> G[Select Bus]
    G --> H[Select Seats]
    H --> I[Enter Passenger Details]
    I --> J[Review Booking]
    J --> K[Confirm Booking]
    K --> L[Booking Confirmation]
    L --> M[Download Ticket]
    M --> N[User Dashboard]
    N --> O[View My Bookings]
    N --> P[Manage Profile]
    N --> Q[Saved Routes]
    O --> R[View Booking Details]
    R --> S[Cancel Booking]
```

## Booking Flow Diagram

```mermaid
flowchart LR
    subgraph Search
        A[Search Form] --> B[Search Results]
        B --> C[Filters & Sorting]
    end

    subgraph Booking
        C --> D[Select Bus]
        D --> E[Seat Selection]
        E --> F[Passenger Details]
        F --> G[Review & Confirm]
        G --> H[Confirmation Page]
    end

    subgraph Post-Booking
        H --> I[Download Ticket]
        H --> J[View in Dashboard]
        J --> K[Manage Booking]
    end
```

## Component Architecture

```mermaid
graph TB
    subgraph Pages
        LP[Landing Page]
        LG[Login]
        LR[Register]
        SR[Search Results]
        SS[Seat Selection]
        PD[Passenger Details]
        BC[Booking Confirmation]
        DB[Dashboard]
        MB[My Bookings]
        BD[Booking Details]
        UP[User Profile]
    end

    subgraph Components
        NB[Navbar]
        HS[HeroSection]
        FR[FeaturedRoutes]
        BE[Benefits]
        TE[Testimonials]
        FT[Footer]
        BCARD[BusCard]
        FS[FilterSidebar]
        SL[SeatLayout]
        PF[PassengerForm]
        TC[TicketCard]
        DSB[DashboardSidebar]
        BL[BookingList]
        PI[ProfileInfo]
    end

    subgraph UI Components
        BTN[Button]
        INP[Input]
        MOD[Modal]
        TST[Toast]
        SKL[Skeleton]
        CRD[Card]
    end

    subgraph State Management
        BS[BookingStore]
        US[UserStore]
        FS[FilterStore]
    end

    subgraph Services
        API[API Service]
        AUTH[Auth Service]
    end

    LP --> NB
    LP --> HS
    LP --> FR
    LP --> BE
    LP --> TE
    LP --> FT

    SR --> BCARD
    SR --> FS

    SS --> SL

    PD --> PF

    BC --> TC

    DB --> DSB
    MB --> BL
    BD --> TC
    UP --> PI

    BCARD --> CRD
    SL --> BTN
    PF --> INP
    TC --> CRD

    SS --> BS
    PD --> BS
    MB --> US
    SR --> FS

    LG --> AUTH
    LR --> AUTH
    SR --> API
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant UI as UI Components
    participant SM as State Management
    participant API as API Service
    participant BE as Backend (Future)

    U->>UI: Search Buses
    UI->>SM: Update Search Params
    UI->>API: Fetch Buses
    API-->>UI: Return Bus Data
    UI->>U: Display Results

    U->>UI: Select Bus & Seats
    UI->>SM: Update Booking State
    UI->>U: Show Passenger Form

    U->>UI: Submit Passenger Details
    UI->>SM: Validate & Update State
    UI->>API: Create Booking
    API->>BE: POST /bookings
    BE-->>API: Booking Confirmed
    API-->>UI: Return Booking Data
    UI->>U: Show Confirmation

    U->>UI: View My Bookings
    UI->>API: Fetch User Bookings
    API->>BE: GET /bookings
    BE-->>API: Booking List
    API-->>UI: Return Bookings
    UI->>U: Display Bookings
```

## File Structure Diagram

```mermaid
graph TD
    ROOT[app/]
    ROOT --> AUTH[(auth)/]
    ROOT --> DASH[(dashboard)/]
    ROOT --> BOOKING[booking/]
    ROOT --> OPERATOR[operator/]
    ROOT --> SEARCH[search/]
    ROOT --> STATIC[Static Pages]
    ROOT --> COMPS[components/]
    ROOT --> STORE[store/]
    ROOT --> HOOKS[hooks/]
    ROOT --> TYPES[types/]
    ROOT --> SERVICES[services/]
    ROOT --> CONFIG[Config Files]

    AUTH --> LOGIN[login/]
    AUTH --> REGISTER[register/]

    DASH --> BOOKINGS[bookings/]
    DASH --> PROFILE[profile/]
    DASH --> SAVED[saved-routes/]

    BOOKING --> SEATS[seats/]
    BOOKING --> PASSENGER[passenger/]
    BOOKING --> CONFIRM[confirmation/]

    COMPS --> BOOKING_COMPS[Booking/]
    COMPS --> SEARCH_COMPS[BusSearch/]
    COMPS --> DASH_COMPS[Dashboard/]
    COMPS --> UI_COMPS[UI/]
    COMPS --> LANDING[LandingPage/]

    STATIC --> ABOUT[about/]
    STATIC --> CONTACT[contact/]
    STATIC --> FAQ[faq/]
    STATIC --> TERMS[terms/]
    STATIC --> PRIVACY[privacy/]
```

## State Management Structure

```mermaid
graph TB
    subgraph Zustand Stores
        BS[BookingStore]
        US[UserStore]
        FS[FilterStore]
        UIS[UIStore]
    end

    subgraph BookingStore State
        B1[selectedBus]
        B2[selectedSeats]
        B3[passengers]
        B4[bookingData]
        B5[bookingStatus]
    end

    subgraph UserStore State
        U1[user]
        U2[isAuthenticated]
        U3[bookings]
        U4[savedRoutes]
    end

    subgraph FilterStore State
        F1[priceRange]
        F2[busTypes]
        F3[timeSlots]
        F4[operators]
        F5[sortBy]
    end

    subgraph UIStore State
        I1[theme]
        I2[sidebarOpen]
        I3[loading]
        I4[errors]
        I5[toasts]
    end

    BS --> B1
    BS --> B2
    BS --> B3
    BS --> B4
    BS --> B5

    US --> U1
    US --> U2
    US --> U3
    US --> U4

    FS --> F1
    FS --> F2
    FS --> F3
    FS --> F4
    FS --> F5

    UIS --> I1
    UIS --> I2
    UIS --> I3
    UIS --> I4
    UIS --> I5
```

## Page Route Structure

```mermaid
graph LR
    HOME[/]
    HOME --> LOGIN[/login]
    HOME --> REGISTER[/register]
    HOME --> SEARCH[/search]
    SEARCH --> SEATS[/booking/id/seats]
    SEATS --> PASSENGER[/booking/id/passenger]
    PASSENGER --> CONFIRM[/booking/id/confirmation]
    HOME --> DASH[/dashboard]
    DASH --> BOOKINGS[/dashboard/bookings]
    BOOKINGS --> DETAILS[/dashboard/bookings/id]
    DASH --> PROFILE[/dashboard/profile]
    DASH --> SAVED[/dashboard/saved-routes]
    HOME --> ABOUT[/about]
    HOME --> CONTACT[/contact]
    HOME --> FAQ[/faq]
    HOME --> TERMS[/terms]
    HOME --> PRIVACY[/privacy]
```

## Component Hierarchy

```mermaid
graph TB
    App[Next.js App]

    subgraph Layout
        Layout[Root Layout]
        Navbar[Navbar]
        Footer[Footer]
    end

    subgraph Auth Pages
        LoginPage[Login Page]
        RegisterPage[Register Page]
    end

    subgraph Public Pages
        HomePage[Home Page]
        SearchPage[Search Page]
        AboutPage[About Page]
        ContactPage[Contact Page]
        FAQPage[FAQ Page]
    end

    subgraph Booking Pages
        SeatPage[Seat Selection]
        PassengerPage[Passenger Details]
        ConfirmPage[Confirmation]
    end

    subgraph Dashboard Pages
        DashboardLayout[Dashboard Layout]
        BookingsPage[My Bookings]
        BookingDetails[Booking Details]
        ProfilePage[Profile]
        SavedRoutes[Saved Routes]
    end

    App --> Layout
    Layout --> Navbar
    Layout --> Footer

    Layout --> LoginPage
    Layout --> RegisterPage
    Layout --> HomePage
    Layout --> SearchPage
    Layout --> AboutPage
    Layout --> ContactPage
    Layout --> FAQPage
    Layout --> SeatPage
    Layout --> PassengerPage
    Layout --> ConfirmPage
    Layout --> DashboardLayout

    DashboardLayout --> BookingsPage
    DashboardLayout --> BookingDetails
    DashboardLayout --> ProfilePage
    DashboardLayout --> SavedRoutes
```

## Technology Stack

```mermaid
graph TB
    subgraph Frontend Framework
        Next[Next.js 16.1.4]
        React[React 19.2.3]
        TS[TypeScript 5]
    end

    subgraph Styling
        Tailwind[Tailwind CSS 4]
        CSS[Custom CSS]
    end

    subgraph State Management
        Zustand[Zustand]
        Context[React Context]
    end

    subgraph Authentication
        BetterAuth[better-auth]
        Google[Google OAuth]
    end

    subgraph Utilities
        Lucide[Lucide Icons]
        DateFns[date-fns]
        Zod[Zod Validation]
    end

    subgraph Testing
        Jest[Jest]
        RTL[React Testing Library]
        Playwright[Playwright]
    end

    subgraph Build Tools
        ESLint[ESLint]
        Prettier[Prettier]
        TSConfig[tsconfig.json]
    end
```
