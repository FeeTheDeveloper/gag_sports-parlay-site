"use client";

import { useState, useEffect } from "react";
import { Promotion } from "@/types";

export default function PromotionsPage() {
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/promotions")
      .then((r) => r.json())
      .then((data: Promotion[]) => setPromos(data))
      .catch(() => {});
  }, []);

  async function handleRedeem(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    const res = await fetch("/api/promotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "demo-user", code: code.trim(), depositAmount: 100 }),
    });
    const data = await res.json();
    setMessage(res.ok ? "Promo applied! Bonus credited." : data.error ?? "Error.");
    setCode("");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-2">Promotions</h1>
      <p className="text-gray-400 text-sm mb-6">
        Claim bonuses below. All bonuses subject to rollover requirements.
      </p>

      <form onSubmit={handleRedeem} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter promo code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 rounded bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="rounded bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-yellow-300 transition-colors"
        >
          Redeem
        </button>
      </form>
      {message && <p className="mb-4 text-sm text-green-400">{message}</p>}

      <div className="space-y-4">
        {promos.map((p) => (
          <div
            key={p.id}
            className="rounded-xl bg-gray-800 p-4 flex items-start justify-between gap-4"
          >
            <div>
              <h3 className="font-semibold text-white">{p.code}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {p.type.replace("_", " ")} — ${p.value}
                {p.type === "DEPOSIT_MATCH" ? "%" : ""} bonus ·{" "}
                {p.rolloverMultiplier}× rollover
                {p.minOdds && ` · Min odds ${p.minOdds}`}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Expires {new Date(p.expiresAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setCode(p.code)}
              className="shrink-0 rounded border border-yellow-400 px-3 py-1 text-xs text-yellow-400 hover:bg-yellow-400/10 transition-colors"
            >
              Use Code
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
