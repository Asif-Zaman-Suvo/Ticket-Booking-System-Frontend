import React from 'react';

export interface BusDetails {
  id: string;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  type: string;
  availableSeats: number;
  price: number;
  rating?: number;
}

interface BusCardProps {
  bus: BusDetails;
  onViewSeats: (busId: string) => void;
}

export default function BusCard({ bus, onViewSeats }: BusCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 items-center">
      {/* Operator Info */}
      <div className="flex-1 w-full sm:w-auto">
        <h3 className="text-xl font-bold text-gray-900">{bus.operator}</h3>
        <span className="inline-block mt-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
          {bus.type}
        </span>
        {bus.rating && (
          <div className="flex items-center mt-2 text-sm text-yellow-500 font-medium">
            <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {bus.rating} / 5
          </div>
        )}
      </div>

      {/* Time & Duration */}
      <div className="flex-[2] flex flex-row items-center justify-between w-full px-4 sm:px-8">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{bus.departureTime}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Departure</p>
        </div>
        
        <div className="flex-1 flex flex-col items-center px-4">
          <p className="text-sm font-medium text-gray-500 mb-1">{bus.duration}</p>
          <div className="w-full flex items-center">
            <div className="h-[2px] w-full bg-gray-200"></div>
            <svg className="w-5 h-5 text-gray-300 mx-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            <div className="h-[2px] w-full bg-gray-200"></div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{bus.arrivalTime}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Arrival</p>
        </div>
      </div>

      {/* Price & CTA */}
      <div className="flex-1 flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto sm:border-l border-gray-100 sm:pl-6">
        <div className="text-left sm:text-center mb-0 sm:mb-4">
          <p className="text-3xl font-extrabold text-[var(--primary-600)]">৳{bus.price}</p>
          <p className={`text-sm font-medium mt-1 ${bus.availableSeats < 10 ? 'text-red-500' : 'text-green-600'}`}>
            {bus.availableSeats} Seats Available
          </p>
        </div>
        <button 
          onClick={() => onViewSeats(bus.id)}
          className="btn btn-primary px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-auto sm:w-full"
        >
          View Seats
        </button>
      </div>
    </div>
  );
}
