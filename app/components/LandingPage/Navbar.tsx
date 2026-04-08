'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from '@/app/auth-client';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="glass-card fixed top-0 left-0 right-0 z-50 shadow-soft border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer" onClick={() => router.push('/')}>
            <div className="relative overflow-hidden">
              <Image
                src="/busgo.png"
                alt="BusGo Logo"
                width={250}
                height={80}
                className="mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out]"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-10">
              {[
                { href: '#home', label: 'Home' },
                { href: '#routes', label: 'Routes' },
                { href: '#about', label: 'About' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-700 font-medium transition-all duration-300 hover:text-[var(--primary-600)] group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-500)] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary-50)] to-[var(--primary-100)] rounded-full border border-[var(--primary-200)]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] flex items-center justify-center text-white font-bold text-sm">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{session.user?.name || 'User'}</span>
                </div>
                <button 
                  onClick={async () => {
                    await signOut();
                    router.push('/login');
                  }} 
                  className="btn btn-outline px-6 py-2.5 hover:shadow-lg hover:shadow-[var(--primary-200)]/50 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => router.push('/login')} 
                  className="btn btn-outline px-6 py-2.5 hover:shadow-lg hover:shadow-[var(--primary-200)]/50 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-700)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button 
                  onClick={() => router.push('/register')} 
                  className="btn btn-primary px-6 py-2.5 bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-700)] hover:from-[var(--primary-700)] hover:to-[var(--primary-800)] hover:shadow-lg hover:shadow-[var(--primary-400)]/50 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-500)] to-[var(--accent-600)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[var(--primary-600)] focus:outline-none p-2 rounded-lg hover:bg-[var(--primary-50)] transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <>
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {[
                { href: '#home', label: 'Home' },
                { href: '#routes', label: 'Routes' },
                { href: '#about', label: 'About' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-[var(--primary-600)] font-medium transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-[var(--primary-50)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-200">
              {session ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[var(--primary-50)] to-[var(--primary-100)] rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] flex items-center justify-center text-white font-bold">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{session.user?.name || 'User'}</p>
                      <p className="text-gray-500 text-sm">Welcome back!</p>
                    </div>
                  </div>
                  <button 
                    onClick={async () => {
                      await signOut();
                      router.push('/login');
                      setIsMobileMenuOpen(false);
                    }} 
                    className="btn btn-outline w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      router.push('/login');
                      setIsMobileMenuOpen(false);
                    }} 
                    className="btn btn-outline w-full"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      router.push('/register');
                      setIsMobileMenuOpen(false);
                    }} 
                    className="btn btn-primary w-full bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-700)]"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
