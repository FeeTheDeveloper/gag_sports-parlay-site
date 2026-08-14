import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Wooski } from "@/components/wooski/Wooski";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--ff-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--ff-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Vercel injects VERCEL_URL for every deployment (preview and production),
  // so OG/Twitter image URLs resolve correctly without hardcoding a domain.
  metadataBase: new URL(
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
  ),
  title: {
    default: "Good Az Gold",
    template: "%s | Good Az Gold",
  },
  description:
    "Good Az Gold is a modular sportsbook, casino, and poker platform being built compliance-first, ahead of any real-money launch.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <div className="app-shell">
          <Header />
          <main className="app-main">{children}</main>
          <Footer />
        </div>
        <Wooski />
      </body>
    </html>
  );
}
