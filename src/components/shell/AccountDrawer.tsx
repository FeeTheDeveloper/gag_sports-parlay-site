"use client";

import Link from "next/link";

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  bonusBalance: number;
  username?: string;
}

export default function AccountDrawer({
  isOpen,
  onClose,
  balance,
  bonusBalance,
  username,
}: AccountDrawerProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Account drawer"
        className={`fixed right-0 top-0 z-50 h-full w-72 bg-gray-800 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-700 px-4 py-4">
          <h2 className="text-lg font-semibold text-white">{username ?? "My Account"}</h2>
          <button
            onClick={onClose}
            aria-label="Close account drawer"
            className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Balance summary */}
          <div className="rounded-lg bg-gray-900 p-4 space-y-1">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Cash Balance</span>
              <span className="text-white font-medium">${balance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Bonus Balance</span>
              <span className="text-yellow-400 font-medium">${bonusBalance.toFixed(2)}</span>
            </div>
          </div>

          {/* Quick actions */}
          <nav className="space-y-1">
            {[
              { href: "/deposit", label: "Deposit" },
              { href: "/withdraw", label: "Withdraw" },
              { href: "/bet-history", label: "Bet History" },
              { href: "/promotions", label: "Promotions" },
              { href: "/responsible-gaming", label: "Responsible Gaming" },
              { href: "/account/kyc", label: "Verify Identity (KYC)" },
              { href: "/settings", label: "Settings" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                {label}
                <span className="text-gray-500">›</span>
              </Link>
            ))}
          </nav>

          <button className="w-full mt-4 rounded-md border border-red-500 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
