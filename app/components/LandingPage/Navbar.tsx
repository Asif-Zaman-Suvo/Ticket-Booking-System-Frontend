"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "@/app/auth-client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Ticket, LogOut, ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#routes", label: "Routes" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    setIsMobileMenuOpen(false);
  };

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <nav className="glass-card fixed top-0 left-0 right-0 z-50 shadow-soft border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center group cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="relative overflow-hidden">
              <Image
                src="/busgo.png"
                alt="BusGo Logo"
                width={250}
                height={80}
                className="mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-700 font-medium transition-all duration-300 hover:text-[var(--primary-600)] group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-500)] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop auth area */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[var(--primary-50)] to-[var(--primary-100)] rounded-full border border-[var(--primary-200)] hover:border-[var(--primary-400)] transition-all duration-200 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {initials}
                  </div>
                  <span className="text-gray-700 font-medium text-sm max-w-28 truncate">
                    {session.user?.name || "User"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 transition-transform duration-200" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 shadow-strong">
                  <DropdownMenuLabel className="text-xs text-gray-500 font-normal">
                    {session.user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/profile")}
                    className="cursor-pointer"
                  >
                    <User className="w-4 h-4 mr-2 text-[var(--primary-600)]" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/bookings")}
                    className="cursor-pointer"
                  >
                    <Ticket className="w-4 h-4 mr-2 text-[var(--primary-600)]" />
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => router.push("/login")}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:border-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/register")}
                  className="px-6 py-2.5 bg-[var(--primary-600)] text-white hover:bg-[var(--accent-500)] hover:text-gray-900 transition-colors duration-200"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[var(--primary-600)] p-2 rounded-lg hover:bg-[var(--primary-50)] transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="py-4 space-y-1 border-t border-gray-200">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-[var(--primary-600)] font-medium transition-colors duration-300 py-2.5 px-4 rounded-lg hover:bg-[var(--primary-50)]"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-gray-200 mt-3">
              {session ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[var(--primary-50)] to-[var(--primary-100)] rounded-xl mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] flex items-center justify-center text-white font-bold">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-900 font-medium truncate">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      router.push("/dashboard/bookings");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-gray-700 hover:text-[var(--primary-600)] font-medium py-2.5 px-4 rounded-lg hover:bg-[var(--primary-50)] transition-colors duration-200"
                  >
                    <Ticket className="w-4 h-4" />
                    My Bookings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full text-red-600 hover:bg-red-50 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-1">
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      router.push("/register");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-700)]"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
