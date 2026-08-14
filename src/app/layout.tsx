import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shell/Header";

export const metadata: Metadata = {
  title: "GAG Sports — Parlay Site",
  description: "Sports betting, casino, and poker platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100 font-sans">
        {/* Persistent app shell */}
        <Header balance={1000.0} bonusBalance={50.0} username="Player" />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} GAG Sports. 18+ | Play Responsibly.
        </footer>
      </body>
    </html>
  );
}
