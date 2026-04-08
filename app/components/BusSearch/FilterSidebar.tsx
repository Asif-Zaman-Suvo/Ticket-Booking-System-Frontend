'use client';

import React from 'react';
import { useFilterStore } from '@/store/filterStore';

import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '../UI';

const busTypes = [
  { id: 'ac', label: 'AC Bus' },
  { id: 'non-ac', label: 'Non-AC Bus' },
  { id: 'sleeper', label: 'Sleeper' },
  { id: 'chair-coach', label: 'Chair Coach' },
];

const timeSlots = [
  { id: 'morning', label: 'Morning (6AM - 12PM)', startHour: 6, endHour: 12 },
  { id: 'afternoon', label: 'Afternoon (12PM - 6PM)', startHour: 12, endHour: 18 },
  { id: 'evening', label: 'Evening (6PM - 12AM)', startHour: 18, endHour: 24 },
  { id: 'night', label: 'Night (12AM - 6AM)', startHour: 0, endHour: 6 },
];

const operators = [
  'Green Line Paribahan',
  'Shohagh Paribahan',
  'Hanif Enterprise',
  'Ena Transport Pvt. Ltd',
  'Shyamoli N.R Travels',
  'S.A Travels',
];

export const FilterSidebar: React.FC = () => {
  const { filters, activeFilterCount, setPriceRange, toggleBusType, toggleTimeSlot, toggleOperator, setRating, clearFilters } = useFilterStore();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...filters.priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

  const handleRatingChange = (rating: number) => {
    setRating(filters.rating === rating ? 0 : rating);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-[var(--primary-600)] hover:text-[var(--primary-700)] font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">৳</span>
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[var(--primary-500)] focus:outline-none"
              min="0"
              max="5000"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">৳</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[var(--primary-500)] focus:outline-none"
              min="0"
              max="5000"
            />
          </div>
        </div>
      </div>

      {/* Bus Type */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Bus Type</h3>
        <div className="space-y-2">
          {busTypes.map((type) => (
            <label key={type.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.busTypes.includes(type.id)}
                onChange={() => toggleBusType(type.id)}
                className="w-4 h-4 text-[var(--primary-600)] border-gray-300 rounded focus:ring-[var(--primary-500)]"
              />
              <span className="text-sm text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Departure Time</h3>
        <div className="space-y-2">
          {timeSlots.map((slot) => (
            <label key={slot.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.timeSlots.includes(slot.id)}
                onChange={() => toggleTimeSlot(slot.id)}
                className="w-4 h-4 text-[var(--primary-600)] border-gray-300 rounded focus:ring-[var(--primary-500)]"
              />
              <span className="text-sm text-gray-700">{slot.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Operators */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Operators</h3>
        <div className="space-y-2">
          {operators.map((operator) => (
            <label key={operator} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.operators.includes(operator)}
                onChange={() => toggleOperator(operator)}
                className="w-4 h-4 text-[var(--primary-600)] border-gray-300 rounded focus:ring-[var(--primary-500)]"
              />
              <span className="text-sm text-gray-700">{operator}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
        <div className="flex gap-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-colors
                ${filters.rating === rating
                  ? 'bg-[var(--primary-600)] text-white border-[var(--primary-600)]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {rating}+ ★
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Count */}
      {activeFilterCount > 0 && (
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
            </span>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
