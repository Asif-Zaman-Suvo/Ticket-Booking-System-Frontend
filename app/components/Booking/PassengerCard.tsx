'use client';

import React from 'react';

import { Seat as SeatType, Passenger } from '@/types/booking.types';
import { Armchair } from 'lucide-react';
import { Input } from '../UI';

interface PassengerCardProps {
  seat: SeatType;
  passenger: Passenger;
  onChange: (passenger: Passenger) => void;
  errors?: Record<string, string>;
}

export const PassengerCard: React.FC<PassengerCardProps> = ({
  seat,
  passenger,
  onChange,
  errors = {},
}) => {
  const handleChange = (field: keyof Passenger, value: any) => {
    onChange({ ...passenger, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 bg-[var(--primary-100)] rounded-lg flex items-center justify-center">
          <Armchair className="w-5 h-5 text-[var(--primary-600)]" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Seat {seat.number}</h3>
          <p className="text-sm text-gray-500">
            {seat.type === 'window' ? 'Window' : 'Aisle'} • Row {seat.row}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name *"
          value={passenger.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter passenger name"
          error={errors.name}
          fullWidth
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email *"
            type="email"
            value={passenger.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="email@example.com"
            error={errors.email}
          />

          <Input
            label="Phone Number *"
            type="tel"
            value={passenger.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="01XXXXXXXXX"
            error={errors.phone}
          />
        </div>

        <Input
          label="NID / Passport Number *"
          value={passenger.nid}
          onChange={(e) => handleChange('nid', e.target.value)}
          placeholder="Enter NID or passport number"
          error={errors.nid}
          fullWidth
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              value={passenger.gender}
              onChange={(e) => handleChange('gender', e.target.value as any)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--primary-500)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
            )}
          </div>

          <Input
            label="Age *"
            type="number"
            value={passenger.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
            placeholder="Enter age"
            error={errors.age}
            min="1"
            max="120"
          />
        </div>
      </div>
    </div>
  );
};
