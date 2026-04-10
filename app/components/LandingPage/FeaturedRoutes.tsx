import { Button } from '@/components/ui/button';

export default function FeaturedRoutes() {
  const routes = [
    {
      from: 'Dhaka',
      to: 'Chittagong',
      duration: '6h 30m',
      price: '৳800',
      frequency: '15 buses/day',
      rating: 4.8,
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      from: 'Dhaka',
      to: 'Sylhet',
      duration: '5h 45m',
      price: '৳650',
      frequency: '12 buses/day',
      rating: 4.9,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      from: 'Dhaka',
      to: 'Rajshahi',
      duration: '5h 00m',
      price: '৳550',
      frequency: '10 buses/day',
      rating: 4.7,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      from: 'Dhaka',
      to: 'Khulna',
      duration: '7h 15m',
      price: '৳750',
      frequency: '8 buses/day',
      rating: 4.8,
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <section id="routes" className="py-32 bg-gradient-to-br from-[var(--gray-50)] via-white to-[var(--primary-50)] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-[var(--primary-200)]/20 rounded-full blur-3xl translate-x-1/2"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[var(--accent-200)]/20 rounded-full blur-3xl -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 slide-up">
            Popular <span className="gradient-text-animated">Routes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.2s' }}>
            Discover our most traveled routes with the best prices and schedules
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Border on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${route.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
              
              {/* Card Content */}
              <div className="relative z-10 p-6 bg-white group-hover:bg-white/95 transition-colors duration-500">
                {/* Route Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${route.gradient}`}></div>
                    <svg className="w-8 h-8 text-gray-400 group-hover:text-[var(--primary-500)] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${route.gradient}`}></div>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[var(--primary-700)] transition-colors duration-300">
                    {route.from}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">to</p>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[var(--primary-700)] transition-colors duration-300">
                    {route.to}
                  </h3>
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
                    <p className="text-2xl font-bold text-[var(--primary-600)] group-hover:scale-110 transition-transform duration-300">
                      {route.price}
                    </p>
                    <p className="text-xs text-gray-500">per person</p>
                  </div>
                  <Button className={`px-4 py-2 rounded-lg bg-gradient-to-r ${route.gradient} text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 hover:shadow-lg h-auto border-0`}>
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Routes Button */}
        <div className="text-center mt-12">
          <Button className="px-8 py-4 bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-700)] hover:from-[var(--primary-700)] hover:to-[var(--primary-800)] hover:shadow-lg transition-all duration-300 relative overflow-hidden group h-auto text-base">
            <span className="relative z-10">View All Routes</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-500)] to-[var(--accent-600)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>
      </div>
    </section>
  );
}
