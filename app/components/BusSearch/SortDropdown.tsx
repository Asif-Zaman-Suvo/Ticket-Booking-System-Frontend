'use client';

import React, { useState } from 'react';
import { useFilterStore } from '@/store/filterStore';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';

const sortOptions = [
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'time-asc', label: 'Departure: Earliest' },
  { id: 'time-desc', label: 'Departure: Latest' },
  { id: 'duration-asc', label: 'Duration: Shortest' },
  { id: 'duration-desc', label: 'Duration: Longest' },
  { id: 'rating-desc', label: 'Rating: Highest' },
];

export const SortDropdown: React.FC = () => {
  const { filters, setSortBy } = useFilterStore();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = sortOptions.find((opt) => opt.id === filters.sortBy);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
      >
        <ArrowUpDown className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {selectedOption?.label || 'Sort by'}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-20">
            <div className="py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSortBy(option.id as any);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <span className="text-sm text-gray-700">{option.label}</span>
                  {filters.sortBy === option.id && (
                    <Check className="w-4 h-4 text-[var(--primary-600)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
