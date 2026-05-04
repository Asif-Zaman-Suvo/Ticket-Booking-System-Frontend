"use client";

import allDistrictApi from "@/services/api";
import { ApiResponse, District } from "@/types/api.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Search,
  MapPin,
  Navigation,
  Calendar,
  ArrowLeftRight,
  ChevronDown,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  width: ((i * 37 + 13) % 10) + 5,
  height: ((i * 53 + 7) % 10) + 5,
  left: (i * 47 + 3) % 100,
  top: (i * 61 + 11) % 100,
  delay: (i * 0.31) % 5,
  duration: ((i * 0.17) % 3) + 4,
}));

interface DistrictComboboxProps {
  value: string;
  onChange: (value: string) => void;
  districts: District[];
  placeholder: string;
  icon: React.ReactNode;
  label: string;
  disabledValue?: string;
}

function DistrictCombobox({
  value,
  onChange,
  districts,
  placeholder,
  icon,
  label,
  disabledValue,
}: DistrictComboboxProps) {
  const [open, setOpen] = useState(false);

  const filtered = disabledValue
    ? districts.filter((d) => d.name !== disabledValue)
    : districts;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
        {icon}
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(
            "w-full flex items-center justify-between px-4 py-4 rounded-xl border-2 transition-all duration-300 text-left bg-white",
            open
              ? "border-[var(--primary-500)] ring-4 ring-[var(--primary-100)]"
              : "border-gray-100 hover:border-[var(--primary-300)]"
          )}
        >
          <span
            className={cn(
              "text-base truncate",
              value ? "text-gray-800 font-medium" : "text-gray-400"
            )}
          >
            {value || placeholder}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-400 shrink-0 ml-2 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-72 shadow-strong border border-gray-200"
          align="start"
          sideOffset={6}
        >
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No district found.</CommandEmpty>
              <CommandGroup>
                {filtered
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((district) => (
                    <CommandItem
                      key={district.id}
                      value={district.name}
                      onSelect={(v) => {
                        onChange(v === value ? "" : v);
                        setOpen(false);
                      }}
                    >
                      <MapPin className="w-4 h-4 text-[var(--primary-500)]" />
                      {district.name}
                      {value === district.name && (
                        <Check className="ml-auto w-4 h-4 text-[var(--primary-600)]" />
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function HeroSection() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !date) {
      setError("Please select departure, destination and date.");
      return;
    }
    if (from === to) {
      setError("Departure and destination can't be the same.");
      return;
    }
    setError("");
    router.push(`/search?from=${from}&to=${to}&date=${date}`);
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  useEffect(() => {
    allDistrictApi<ApiResponse<District[]>>({
      endpoint: "https://bdapis.vercel.app/geo/v2.0/districts",
    })
      .then((res) => setDistricts(res.data))
      .catch(console.error);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-banner.png"
          alt="Bus Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-900)]/95 via-[var(--primary-800)]/85 to-[var(--primary-700)]/75" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-600)]/20 via-transparent to-[var(--accent-500)]/20 animate-pulse" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="particle bg-white/20 float-slow"
              style={{
                width: p.width + "px",
                height: p.height + "px",
                left: p.left + "%",
                top: p.top + "%",
                animationDelay: p.delay + "s",
                animationDuration: p.duration + "s",
              }}
            />
          ))}
        </div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary-400)]/30 rounded-full blur-3xl morph-bg" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-400)]/30 rounded-full blur-3xl morph-bg"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight slide-up">
            <span className="gradient-text-animated">Your Journey</span> Starts
            Here
          </h1>
          <p
            className="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto mb-4 slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Book bus tickets across the country with ease and comfort
          </p>
          <div
            className="flex items-center justify-center gap-6 mt-6 slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2 text-white/80">
              <svg
                className="w-5 h-5 text-[var(--accent-400)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2 text-white/80">
              <svg
                className="w-5 h-5 text-[var(--accent-400)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="font-semibold">1M+ Happy Travelers</span>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="max-w-5xl mx-auto slide-up" style={{ animationDelay: "0.6s" }}>
          <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-strong border border-white/20">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* From / Swap / To row */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-end gap-4">
                {/* From */}
                <DistrictCombobox
                  value={from}
                  onChange={setFrom}
                  districts={districts}
                  placeholder="Select Departure"
                  icon={<Navigation className="w-4 h-4 text-[var(--primary-600)]" />}
                  label="From"
                  disabledValue={to}
                />

                {/* Swap button */}
                <div className="flex justify-center pb-1">
                  <button
                    type="button"
                    onClick={handleSwap}
                    disabled={!from && !to}
                    className="w-10 h-10 rounded-full bg-[var(--primary-100)] hover:bg-[var(--primary-200)] border-2 border-[var(--primary-200)] hover:border-[var(--primary-400)] text-[var(--primary-600)] flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Swap departure and destination"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>

                {/* To */}
                <DistrictCombobox
                  value={to}
                  onChange={setTo}
                  districts={districts}
                  placeholder="Select Destination"
                  icon={<MapPin className="w-4 h-4 text-[var(--primary-600)]" />}
                  label="To"
                  disabledValue={from}
                />

                {/* Divider */}
                <div className="hidden md:block w-px h-14 bg-gray-200 self-end mb-1" />

                {/* Date */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Calendar className="w-4 h-4 text-[var(--primary-600)]" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] outline-none transition-all duration-300 text-gray-800 bg-white hover:border-[var(--primary-300)] cursor-pointer"
                  />
                </div>
              </div>

              {/* Inline error */}
              {error && (
                <p className="text-sm text-red-600 font-medium flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              )}

              {/* Search button */}
              <Button
                type="submit"
                className="w-full py-5 text-xl font-extrabold pulse-glow hover:shadow-strong transition-all duration-300 hover:scale-[1.01] bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-700)] hover:from-[var(--primary-700)] hover:to-[var(--primary-800)] h-auto"
              >
                <Search className="w-6 h-6 mr-2" />
                Search Buses
              </Button>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
              {[
                { stat: "500+", label: "Routes" },
                { stat: "1M+", label: "Happy Customers" },
                { stat: "24/7", label: "Support" },
              ].map(({ stat, label }) => (
                <div key={label} className="text-center group">
                  <p className="text-2xl sm:text-3xl font-bold text-[var(--primary-600)] group-hover:scale-110 transition-transform duration-300">
                    {stat}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/70 text-sm">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
