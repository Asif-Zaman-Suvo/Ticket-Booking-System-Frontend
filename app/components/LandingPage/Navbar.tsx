'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession, signOut } from '@/app/auth-client';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  return (
    <nav className="glass-effect fixed top-0 left-0 right-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center ">
            <Image
              src="/busgo.png"
              alt="BusGo Logo"
              width={250}
              height={80}
              className="cursor-pointer mix-blend-multiply"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-10">
              <a
                href="#home"
                className="text-gray-700 hover:text-[var(--primary-600)] font-medium transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="#routes"
                className="text-gray-700 hover:text-[var(--primary-600)] font-medium transition-colors duration-300"
              >
                Routes
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-[var(--primary-600)] font-medium transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-[var(--primary-600)] font-medium transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <button 
                onClick={async () => {
                  await signOut();
                  router.push('/login');
                }} 
                className="btn btn-primary px-6 py-2.5"
              >
                Logout, {session.user?.name?.split(' ')[0] || 'User'}
              </button>
            ) : (
              <>
                <button onClick={() => router.push('/login')} className="btn btn-outline px-6 py-2.5">
                  Login
                </button>
                <button onClick={() => router.push('/register')} className="btn btn-primary px-6 py-2.5">
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[var(--primary-600)] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
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
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <a
              href="#home"
              className="block text-gray-700 hover:text-[var(--primary-600)] font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#routes"
              className="block text-gray-700 hover:text-[var(--primary-600)] font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Routes
            </a>
            <a
              href="#about"
              className="block text-gray-700 hover:text-[var(--primary-600)] font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-gray-700 hover:text-[var(--primary-600)] font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="pt-4 space-y-3">
              {session ? (
                <button 
                  onClick={async () => {
                    await signOut();
                    setIsMobileMenuOpen(false);
                    router.push('/login');
                  }} 
                  className="btn btn-primary w-full"
                >
                  Logout, {session.user?.name?.split(' ')[0] || 'User'}
                </button>
              ) : (
                <>
                  <button onClick={() => { setIsMobileMenuOpen(false); router.push('/login'); }} className="btn btn-outline w-full">
                    Login
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); router.push('/register'); }} className="btn btn-primary w-full">
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
