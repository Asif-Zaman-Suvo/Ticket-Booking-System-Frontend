"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense, useMemo } from "react";
import { BusCard, BusDetails, FilterSidebar, SortDropdown, MobileFilterDrawer } from "@/app/components/BusSearch";
import { Filter } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";

// Dummy data for bus routes
const generateDummyBuses = (from: string, to: string, date: string): BusDetails[] => {
  return [
    {
      id: "bus-1",
      operator: "Green Line Paribahan",
      departureTime: "08:00 AM",
      arrivalTime: "02:30 PM",
      duration: "6h 30m",
      type: "AC - Scania Double Decker",
      availableSeats: 12,
      price: 1500,
      rating: 4.8,
    },
    {
      id: "bus-2",
      operator: "Shohagh Paribahan",
      departureTime: "09:30 AM",
      arrivalTime: "04:15 PM",
      duration: "6h 45m",
      type: "AC - Hyundai",
      availableSeats: 8,
      price: 1350,
      rating: 4.5,
    },
    {
      id: "bus-3",
      operator: "Hanif Enterprise",
      departureTime: "11:00 AM",
      arrivalTime: "06:00 PM",
      duration: "7h 00m",
      type: "Non-AC Hino 1J",
      availableSeats: 24,
      price: 850,
      rating: 4.2,
    },
    {
      id: "bus-4",
      operator: "Ena Transport Pvt. Ltd",
      departureTime: "02:00 PM",
      arrivalTime: "08:30 PM",
      duration: "6h 30m",
      type: "AC - Scania Double Decker",
      availableSeats: 2,
      price: 1600,
      rating: 4.7,
    },
    {
      id: "bus-5",
      operator: "Shyamoli N.R Travels",
      departureTime: "08:30 PM",
      arrivalTime: "03:00 AM",
      duration: "6h 30m",
      type: "AC - Sleeper Class",
      availableSeats: 30,
      price: 2000,
      rating: 4.9,
    },
    {
      id: "bus-6",
      operator: "S.A Travels",
      departureTime: "11:30 PM",
      arrivalTime: "06:00 AM",
      duration: "6h 30m",
      type: "Non-AC / Chair Coach",
      availableSeats: 15,
      price: 800,
      rating: 4.0,
    },
  ];
};

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setSearchParams: setBookingSearchParams, setSelectedBus } = useBookingStore();

  const from = searchParams.get("from") || "Unknown Origin";
  const to = searchParams.get("to") || "Unknown Destination";
  const dateStr = searchParams.get("date");

  const [allBuses, setAllBuses] = useState<BusDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Format date for Header e.g 25 Mar 2026
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : "Select Date";

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const buses = generateDummyBuses(from, to, dateStr || "");
      setAllBuses(buses);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [from, to, dateStr]);

  const handleViewSeats = (busId: string) => {
    const bus = allBuses.find((b) => b.id === busId);
    if (bus) {
      setSelectedBus(bus);
      setBookingSearchParams({ from, to, date: dateStr || "" });
      router.push(`/booking/${busId}/seats`);
    }
  };

  // Filter and sort buses (this will be replaced with actual filter store logic)
  const filteredBuses = useMemo(() => {
    let result = [...allBuses];

    // Apply filters here when filter store is integrated
    // For now, just return all buses

    return result;
  }, [allBuses]);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Search Header Info */}
      <div className="bg-[var(--primary-800)] text-white py-8 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                {from}
                <svg className="w-6 h-6 text-[var(--primary-300)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                {to}
              </h1>
              <p className="text-[var(--primary-200)] mt-2 font-medium">{formattedDate}</p>
            </div>
            <button
              onClick={() => router.push('/#home')}
              className="mt-4 md:mt-0 btn border hover:border-white border-[var(--primary-400)] text-white bg-white/10 hover:bg-white/20 px-6 py-2"
            >
              Modify Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">

        {/* Left Sidebar (Filters) - Desktop */}
        <aside className="hidden lg:block w-full lg:w-1/4">
          <FilterSidebar />
        </aside>

        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} />

        {/* Right Content (Bus List) */}
        <main className="w-full lg:w-3/4">

          {/* Sort & Results Count */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sticky top-4 z-10">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters</span>
              </button>
              <p className="text-gray-600 font-medium whitespace-nowrap">
                {isLoading ? "Searching for buses..." : `Showing ${filteredBuses.length} buses`}
              </p>
            </div>
            <SortDropdown />
          </div>

          {/* List of Bus Cards or Skeletons */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 animate-pulse">
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="flex-[2] flex justify-between items-center px-4">
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/3 mx-4"></div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="flex-1 flex flex-col items-end sm:border-l border-gray-100 sm:pl-6 space-y-3">
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredBuses.length > 0 ? (
              filteredBuses.map((bus) => (
                <BusCard key={bus.id} bus={bus} onViewSeats={handleViewSeats} />
              ))
            ) : (
              // Empty State
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No buses found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We couldn't find any buses for this route on selected date. Please try modifying your search parameters.
                </p>
                <button
                  onClick={() => router.push('/#home')}
                  className="mt-8 btn btn-primary px-8"
                >
                  Modify Search
                </button>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-600)]"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
