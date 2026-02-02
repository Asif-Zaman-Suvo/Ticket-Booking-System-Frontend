import React from "react";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1D4ED8] to-blue-400 px-4">
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
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Book your journey in seconds 🚍
        </p>

        <form className="space-y-5">
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

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4ED8] outline-none"
            />
          </div>

          <button className="w-full bg-[#1D4ED8] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-[#1D4ED8] font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
