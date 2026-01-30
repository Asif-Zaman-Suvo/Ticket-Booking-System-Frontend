import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "BusGo - Book Bus Tickets Online | Safe & Affordable Travel",
  description: "Book bus tickets across the country with BusGo. Safe, reliable, and affordable travel with 500+ routes, 24/7 support, and best prices guaranteed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers session={null}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
