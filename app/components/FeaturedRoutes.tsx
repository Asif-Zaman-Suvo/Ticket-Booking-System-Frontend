export default function FeaturedRoutes() {
  const routes = [
    {
      from: 'New York',
      to: 'Boston',
      duration: '4h 30m',
      price: '$45',
      frequency: '12 buses/day',
      rating: 4.8,
    },
    {
      from: 'Los Angeles',
      to: 'San Francisco',
      duration: '6h 15m',
      price: '$55',
      frequency: '15 buses/day',
      rating: 4.9,
    },
    {
      from: 'Chicago',
      to: 'Detroit',
      duration: '5h 00m',
      price: '$40',
      frequency: '10 buses/day',
      rating: 4.7,
    },
    {
      from: 'Miami',
      to: 'Orlando',
      duration: '3h 45m',
      price: '$35',
      frequency: '18 buses/day',
      rating: 4.8,
    },
  ];

  return (
    <section id="routes" className="py-32 bg-[var(--gray-50)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Routes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most traveled routes with the best prices and schedules
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-medium hover-lift p-6 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Route Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--primary-600)]"></div>
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="w-3 h-3 rounded-full bg-[var(--accent-500)]"></div>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-[var(--accent-500)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">{route.rating}</span>
                </div>
              </div>

              {/* Cities */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{route.from}</h3>
                <p className="text-gray-500 text-sm mb-2">to</p>
                <h3 className="text-xl font-bold text-gray-900">{route.to}</h3>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-[var(--primary-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {route.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-[var(--primary-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {route.frequency}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-2xl font-bold text-[var(--primary-600)]">{route.price}</p>
                </div>
                <button className="btn btn-primary px-4 py-2 text-sm">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn btn-outline px-8 py-3 text-lg">
            View All Routes
            <svg className="inline w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
