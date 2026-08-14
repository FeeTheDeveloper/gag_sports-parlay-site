"use client";

import Link from "next/link";
import { useState } from "react";
import AccountDrawer from "./AccountDrawer";

interface HeaderProps {
  balance: number;
  bonusBalance: number;
  username?: string;
}

export default function Header({ balance, bonusBalance, username }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between bg-gray-900 px-4 py-3 shadow-md">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold text-yellow-400 tracking-wide">
          GAG Sports
        </Link>

        {/* Primary nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-200">
          <Link href="/sportsbook" className="hover:text-yellow-400 transition-colors">
            Sportsbook
          </Link>
          <Link href="/sportsbook?tab=live" className="hover:text-yellow-400 transition-colors">
            Live Betting
          </Link>
          <Link href="/casino" className="hover:text-yellow-400 transition-colors">
            Casino
          </Link>
          <Link href="/poker" className="hover:text-yellow-400 transition-colors">
            Poker
          </Link>
        </nav>

        {/* Account / Balance */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400">Balance</p>
            <p className="text-sm font-semibold text-white">
              ${balance.toFixed(2)}
              {bonusBalance > 0 && (
                <span className="ml-1 text-xs text-yellow-400">
                  +${bonusBalance.toFixed(2)} bonus
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-semibold text-gray-900 hover:bg-yellow-300 transition-colors"
          >
            {username ?? "Account"}
          </button>
        </div>
      </header>

      <AccountDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        balance={balance}
        bonusBalance={bonusBalance}
        username={username}
      />
    </>
  );
}
