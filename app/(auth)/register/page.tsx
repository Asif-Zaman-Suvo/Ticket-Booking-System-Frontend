import Link from "next/link";
import React from "react";
import Image from "next/image";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 z-0">
              <Image
                src="/hero-banner.png"
                alt="Bus Travel"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-900)]/90 via-[var(--primary-800)]/80 to-[var(--primary-700)]/70"></div>
            </div>
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 my-5">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Start booking your journey today 🎫
        </p>

        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4ED8] outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4ED8] outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g. 01XXXXXXXXX"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4ED8] outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4ED8] outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4ED8] outline-none"
            />
          </div>

          <button className="w-full bg-[#1D4ED8] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1D4ED8] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
