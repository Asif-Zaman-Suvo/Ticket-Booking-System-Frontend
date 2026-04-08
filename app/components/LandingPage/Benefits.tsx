export default function Benefits() {
  const benefits = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Safe & Secure',
      description: 'Your safety is our priority. All our buses are regularly maintained and drivers are professionally trained.',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Best Prices',
      description: 'Get the most competitive prices in the market with exclusive deals and discounts for regular travelers.',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Our customer support team is available round the clock to assist you with any queries or concerns.',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Quick Booking',
      description: 'Book your tickets in just a few clicks. Simple, fast, and hassle-free booking experience.',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Easy Refunds',
      description: 'Changed your plans? Get quick and easy refunds with our transparent cancellation policy.',
      gradient: 'from-rose-500 to-red-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Premium Comfort',
      description: 'Travel in comfort with spacious seats, AC, entertainment, and complimentary refreshments.',
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <section id="about" className="py-32 bg-gradient-to-br from-white via-gray-50 to-[var(--primary-50)] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--primary-200)]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--accent-200)]/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 slide-up">
            Why Choose <span className="gradient-text-animated">Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.2s' }}>
            Experience the difference with our exceptional service and commitment to excellence
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                {benefit.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--primary-700)] transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
              
              {/* Hover Arrow */}
              <div className={`absolute bottom-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-600)] via-[var(--primary-700)] to-[var(--accent-600)] rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-gradient-to-r from-[var(--primary-600)] via-[var(--primary-700)] to-[var(--accent-600)] rounded-2xl p-12 text-white overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 2%, transparent 2%), radial-gradient(circle at 75% 75%, white 2%, transparent 2%)`,
                backgroundSize: '60px 60px'
              }}></div>
            </div>
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '500+', label: 'Routes Covered' },
                { value: '1M+', label: 'Happy Customers' },
                { value: '10K+', label: 'Daily Trips' },
                { value: '99%', label: 'On-Time Rate' },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <p className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <p className="text-white/90">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
