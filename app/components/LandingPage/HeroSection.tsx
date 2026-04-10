"use client";

import allDistrictApi from "@/services/api";
import { ApiResponse, District } from "@/types/api.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [districts, setDistricts] = useState<District[]>([]);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !searchData.date) {
        alert("Please select departure, destination and date");
        return;
    }
    const params = new URLSearchParams({
        from,
        to,
        date: searchData.date
    });
    router.push(`/search?${params.toString()}`);
  };

  const getDistricts = async () => {
    try {
      const res = await allDistrictApi<ApiResponse<District[]>>({
        endpoint: "https://bdapis.vercel.app/geo/v2.0/districts",
      });

      setDistricts(res.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  useEffect(() => {
    const fetchDistricts = async () => {
      await getDistricts();
    };
    fetchDistricts();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background with Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-banner.png"
          alt="Bus Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-900)]/95 via-[var(--primary-800)]/85 to-[var(--primary-700)]/75"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-600)]/20 via-transparent to-[var(--accent-500)]/20 animate-pulse"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle bg-white/20 float-slow"
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 3 + 4 + 's',
              }}
            />
          ))}
        </div>
        
        {/* Morphing Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary-400)]/30 rounded-full blur-3xl morph-bg"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-400)]/30 rounded-full blur-3xl morph-bg" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight slide-up">
            <span className="gradient-text-animated">Your Journey</span> Starts Here
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto mb-4 inline-block slide-up" style={{ animationDelay: '0.2s' }}>
            Book bus tickets across the country with ease and comfort
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 text-white/80">
              <svg className="w-5 h-5 text-[var(--accent-400)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2 text-white/80">
              <svg className="w-5 h-5 text-[var(--accent-400)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="font-semibold">1M+ Happy Travelers</span>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="glass-card rounded-3xl p-10 shadow-strong sm:p-8 md:p-10 lg:p-12 border border-white/20">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* From */}
                <div className="space-y-3">
                  <label
                    htmlFor="from"
                    className="block text-sm font-bold text-gray-700 flex items-center"
                  >
                    <svg
                      className="inline w-5 h-5 mr-2 text-[var(--primary-600)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    From
                  </label>

                  <select
                    id="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all duration-300 text-gray-800 bg-white hover:border-[var(--primary-300)]"
                  >
                    <option value="">Select Departure</option>

                    {districts.sort((a, b) => a.name.localeCompare(b.name)).map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* To */}
                <div className="space-y-3">
                  <label
                    htmlFor="to"
                    className="block text-sm font-bold text-gray-700 flex items-center"
                  >
                    <svg
                      className="inline w-5 h-5 mr-2 text-[var(--primary-600)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    To
                  </label>
                  <select
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="block w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all duration-300 text-gray-800 bg-white hover:border-[var(--primary-300)]"
                  >
                    <option value="">Select Destination</option>

                    {districts.sort((a, b) => a.name.localeCompare(b.name)).map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-3">
                  <label
                    htmlFor="date"
                    className="block text-sm font-bold text-gray-700 flex items-center"
                  >
                    <svg
                      className="inline w-5 h-5 mr-2 text-[var(--primary-600)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={searchData.date}
                    onChange={(e) =>
                      setSearchData({ ...searchData, date: e.target.value })
                    }
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all duration-300 text-gray-800 bg-white hover:border-[var(--primary-300)]"
                    required
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full py-5 text-xl font-extrabold pulse-glow hover:shadow-strong transition-all duration-300 hover:scale-[1.01] bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-700)] hover:from-[var(--primary-700)] hover:to-[var(--primary-800)] h-auto"
                >
                  <Search className="w-6 h-6 mr-2" />
                  Search Buses
                </Button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center group">
                <p className="text-2xl sm:text-3xl font-bold text-[var(--primary-600)] group-hover:scale-110 transition-transform duration-300">
                  500+
                </p>
                <p className="text-sm text-gray-600 mt-1">Routes</p>
              </div>
              <div className="text-center group">
                <p className="text-2xl sm:text-3xl font-bold text-[var(--primary-600)] group-hover:scale-110 transition-transform duration-300">
                  1M+
                </p>
                <p className="text-sm text-gray-600 mt-1">Happy Customers</p>
              </div>
              <div className="text-center group">
                <p className="text-2xl sm:text-3xl font-bold text-[var(--primary-600)] group-hover:scale-110 transition-transform duration-300">
                  24/7
                </p>
                <p className="text-sm text-gray-600 mt-1">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/70 text-sm">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
