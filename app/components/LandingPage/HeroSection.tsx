'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function HeroSection() {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search data:', searchData);
    // Handle search logic here
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-banner.png"
          alt="Bus Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-900)]/90 via-[var(--primary-800)]/80 to-[var(--primary-700)]/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your Journey Starts Here
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-4 inline-block">
            Book bus tickets across the country with ease and comfort
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto animate-scale-in">
          <div className="glass-effect rounded-2xl p-10 shadow-strong sm:p-8 md:p-10 lg:p-12">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* From */}
                <div className="space-y-3">
                  <label htmlFor="from" className="block text-sm font-bold text-gray-700">
                    <svg className="inline w-5 h-5 mr-2 text-[var(--primary-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    From
                  </label>
                  <input
                    type="text"
                    id="from"
                    placeholder="Enter source city"
                    value={searchData.from}
                    onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 bg-white"
                    required
                  />
                </div>

                {/* To */}
                <div className="space-y-3">
                  <label htmlFor="to" className="block text-sm font-bold text-gray-700">
                    <svg className="inline w-5 h-5 mr-2 text-[var(--primary-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    To
                  </label>
                  <input
                    type="text"
                    id="to"
                    placeholder="Enter destination city"
                    value={searchData.to}
                    onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 bg-white"
                    required
                  />
                </div>

                {/* Date */}
                <div className="space-y-3">
                  <label htmlFor="date" className="block text-sm font-bold text-gray-700">
                    <svg className="inline w-5 h-5 mr-2 text-[var(--primary-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all duration-300 text-gray-800 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full btn btn-primary py-5 text-xl font-extrabold shadow-glow hover:shadow-strong transition-all duration-300 hover:scale-[1.01]"
                >
                  <svg className="inline w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Buses
                </button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[var(--primary-600)]">500+</p>
                <p className="text-sm text-gray-600 mt-1">Routes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[var(--primary-600)]">1M+</p>
                <p className="text-sm text-gray-600 mt-1">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[var(--primary-600)]">24/7</p>
                <p className="text-sm text-gray-600 mt-1">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
