'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Fatima Rahman',
      role: 'Business Traveler',
      image: '👩‍💼',
      rating: 5,
      text: "BusGo has made my weekly commute so much easier! The booking process is seamless, and the buses are always on time. Highly recommended!",
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      name: 'Ahmed Hossain',
      role: 'Student',
      image: '👨‍🎓',
      rating: 5,
      text: 'As a student, I appreciate the affordable prices and student discounts. The comfort level is amazing for long journeys. Best bus service ever!',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      name: 'Nadia Islam',
      role: 'Tourist',
      image: '👩‍🦰',
      rating: 5,
      text: 'Explored the entire country using BusGo! The customer service is exceptional, and the buses are clean and comfortable. Will definitely use again!',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      name: 'Rafiq Ahmed',
      role: 'Regular Commuter',
      image: '👨‍💻',
      rating: 5,
      text: 'Been using BusGo for over 2 years now. Never had a single issue. The app is user-friendly and the loyalty rewards are fantastic!',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-28 bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--accent-50)] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary-200)]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent-200)]/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 slide-up">
            What Our <span className="gradient-text-animated">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.2s' }}>
            Do not just take our word for it - hear from our satisfied travelers
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-strong p-8 md:p-12 relative overflow-hidden border border-gray-100">
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[activeIndex].gradient} opacity-5 transition-opacity duration-500`}></div>
            
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-[var(--primary-200)] opacity-50">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10 pt-8">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${testimonials[activeIndex].gradient} flex items-center justify-center text-5xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {testimonials[activeIndex].image}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {testimonials[activeIndex].name}
                </h3>
                <p className="text-gray-600">{testimonials[activeIndex].role}</p>
                
                {/* Rating */}
                <div className="flex items-center mt-3">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[var(--accent-500)]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-lg text-gray-700 text-center leading-relaxed italic">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                onClick={prevTestimonial}
                size="icon"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] text-white hover:shadow-lg hover:shadow-[var(--primary-400)]/50 transition-all duration-300 hover:scale-110 border-0"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 p-0 min-w-3 border-0 ${
                      index === activeIndex
                        ? 'w-8 bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-500)]'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                onClick={nextTestimonial}
                size="icon"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] text-white hover:shadow-lg hover:shadow-[var(--primary-400)]/50 transition-all duration-300 hover:scale-110 border-0"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: '⭐', text: '4.9/5 Rating' },
            { icon: '👥', text: '1M+ Users' },
            { icon: '🏆', text: 'Best Service 2024' },
            { icon: '🔒', text: 'Secure Booking' },
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
              <span className="text-2xl">{badge.icon}</span>
              <span className="font-semibold text-gray-700">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
