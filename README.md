# BusGo — Bus Ticket Booking System

A full-stack bus ticket booking platform built for Bangladesh, featuring real-time seat selection, passenger management, multiple payment methods, and e-ticket generation.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Booking Flow](#booking-flow)
- [Roadmap](#roadmap)

---

## Overview

BusGo is a monorepo containing:

| App | Stack | Port |
|-----|-------|------|
| **Frontend** | Next.js 16 · React 19 · Tailwind CSS v4 | `3000` |
| **Backend** | NestJS 11 · Prisma 7 · PostgreSQL | `8000` |

Authentication is handled end-to-end by [better-auth](https://better-auth.dev) — email/password and Google OAuth are both supported out of the box.

---

## Tech Stack

### Frontend

| Category | Library |
|----------|---------|
| Framework | Next.js 16 (App Router) |
| UI | Tailwind CSS v4 + shadcn/ui (base-ui) |
| State | Zustand with persistence |
| Auth client | better-auth/react |
| PDF | jsPDF + html2canvas |
| Notifications | Sonner |
| Icons | Lucide React |

### Backend

| Category | Library |
|----------|---------|
| Framework | NestJS 11 |
| ORM | Prisma 7 (PostgreSQL adapter via `@prisma/adapter-pg`) |
| Auth server | better-auth |
| Validation | class-validator + class-transformer |
| Password | bcrypt |

---

## Project Structure

```
ticket-booking-system-frontend/   ← repo root (Next.js app)
│
├── app/
│   ├── (auth)/
│   │   ├── login/                ← Login page
│   │   └── register/             ← Registration page
│   ├── booking/[id]/
│   │   ├── seats/                ← Seat selection
│   │   ├── passenger/            ← Passenger details
│   │   ├── payment/              ← Payment (card, bKash, Nagad, Rocket)
│   │   └── confirmation/         ← Booking confirmation + e-ticket
│   ├── dashboard/
│   │   └── bookings/             ← My Bookings page
│   ├── search/                   ← Search results with filters
│   └── components/
│       ├── Booking/              ← SeatLayout, PassengerCard, BookingSummary, TicketPreview
│       ├── BusSearch/            ← BusCard, FilterSidebar, SortDropdown
│       └── LandingPage/          ← Navbar, HeroSection, FeaturedRoutes, Benefits, Testimonials, Footer
│
├── components/ui/                ← shadcn primitives (button, card, dialog, …)
├── store/                        ← Zustand stores (booking, filter, ui, user)
├── types/                        ← TypeScript interfaces
├── services/                     ← HTTP helpers + district API
├── utils/                        ← PDF generator
│
└── backend/                      ← NestJS app
    ├── src/
    │   ├── auth/                 ← better-auth controller + module
    │   ├── prisma/               ← PrismaService
    │   ├── app.module.ts
    │   └── main.ts
    └── prisma/
        ├── schema.prisma
        └── migrations/
```

---

## Features

### Implemented

- **Landing page** — hero with animated background, searchable district combobox (From / To swap), quick stats, featured routes, benefits, testimonials
- **Bus search** — results list with live filter (price range, bus type, operator, time slot, rating) and sort (price, rating, departure time, duration)
- **Seat selection** — interactive seat map with available / booked / selected / female-only states
- **Passenger details** — per-seat passenger form with contact and emergency contact blocks
- **Payment step** — credit/debit card, bKash, Nagad, Rocket, Net Banking; order summary with 2% service charge
- **Booking confirmation** — e-ticket preview with PNR, print and PDF download
- **My Bookings dashboard** — booking history with status badges (confirmed / pending / completed / cancelled) and stats overview
- **Authentication** — email + password registration/login, Google OAuth, session-aware navbar with profile dropdown

### Planned / In Progress

- Real backend integration for buses, seats, and bookings (currently mocked on the frontend)
- Route protection middleware (`middleware.ts`)
- Seat locking to prevent double-booking
- Booking cancellation and refund flow
- Operator / admin dashboard
- SMS / email notifications

---

## Getting Started

### Prerequisites

| Tool | Minimum version |
|------|----------------|
| Node.js | 22.12+ (required by Prisma 7) |
| npm | 10+ |
| PostgreSQL | 14+ |

> **Note on Node version:** Prisma 7 requires Node ≥ 22.12. If you're on an older version, use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to switch.

---

### Environment Variables

#### Frontend — `.env.local`

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

#### Backend — `backend/.env`

```env
# PostgreSQL connection pool URL (used at runtime via @prisma/adapter-pg)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# Direct connection URL (used by Prisma migrations)
DIRECT_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# Google OAuth (optional — only needed for social login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

### Running the App

#### 1. Install dependencies

```bash
# Frontend (repo root)
npm install

# Backend
cd backend && npm install
```

#### 2. Set up the database

```bash
cd backend

# Run all migrations
npx prisma migrate deploy

# (Optional) open Prisma Studio
npx prisma studio
```

#### 3. Start the development servers

Open two terminal tabs:

```bash
# Tab 1 — Frontend (http://localhost:3000)
npm run dev

# Tab 2 — Backend (http://localhost:8000)
cd backend && npm run start:dev
```

#### Production build

```bash
# Frontend
npm run build && npm run start

# Backend
cd backend && npm run build && npm run start:prod
```

---

## API Reference

All auth endpoints are handled by **better-auth** and exposed at `/api/auth/*` on the backend.

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/sign-up/email` | Register with email & password |
| `POST` | `/api/auth/sign-in/email` | Login with email & password |
| `POST` | `/api/auth/sign-in/social` | Google OAuth redirect |
| `POST` | `/api/auth/sign-out` | Invalidate session |
| `GET` | `/api/auth/session` | Get current session |

> Bus, seat, and booking endpoints are planned for the next milestone.

---

## Database Schema

```
User          — id, name, email, emailVerified, image, createdAt, updatedAt
Session       — id, token, expiresAt, userId → User
Account       — id, providerId, accountId, userId → User, tokens…
Verification  — id, identifier, value, expiresAt
```

Schema is managed by Prisma. Migrations live in `backend/prisma/migrations/`.

---

## Booking Flow

```
/ (Search form)
    │
    ▼
/search?from=&to=&date=        ← filtered + sorted bus list
    │
    ▼
/booking/[busId]/seats         ← interactive seat map
    │
    ▼
/booking/[busId]/passenger     ← passenger + contact forms
    │
    ▼
/booking/[busId]/payment       ← payment method + order summary
    │
    ▼
/booking/[busId]/confirmation  ← e-ticket, PDF download, PNR
    │
    ▼
/dashboard/bookings            ← booking history
```

---

## Roadmap

- [ ] Real bus/route/seat API (NestJS + Prisma)
- [ ] Seat locking with TTL (Redis or DB-level)
- [ ] Payment gateway integration (SSLCommerz / bKash API)
- [ ] Cancellation & refund flow
- [ ] Email + SMS notifications (booking confirmed, trip reminder)
- [ ] Operator portal (manage buses, routes, pricing)
- [ ] Admin dashboard (analytics, user management)
- [ ] Next.js middleware for route protection
- [ ] Docker Compose for one-command local setup
- [ ] CI/CD pipeline (GitHub Actions)
