"use client";

import { useState, useEffect } from "react";
import { Bet, BetLeg, BetType } from "@/types";
import { buildBet, validateBetLegs } from "@/lib/betslip";

interface BetSlipProps {
  legs: BetLeg[];
  onRemoveLeg: (lineId: string) => void;
  onClear: () => void;
}

export default function BetSlip({ legs, onRemoveLeg, onClear }: BetSlipProps) {
  const [betType, setBetType] = useState<BetType>("STRAIGHT");
  const [stake, setStake] = useState<string>("");
  const [pendingBet, setPendingBet] = useState<Bet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (legs.length > 1 && betType === "STRAIGHT") setBetType("PARLAY");
    if (legs.length <= 1 && betType === "PARLAY") setBetType("STRAIGHT");
  }, [legs.length, betType]);

  const stakeNum = parseFloat(stake) || 0;

  useEffect(() => {
    if (stakeNum <= 0 || legs.length === 0) {
      setPendingBet(null);
      return;
    }
    const validationError = validateBetLegs(legs, betType);
    if (validationError) {
      setError(validationError);
      setPendingBet(null);
      return;
    }
    setError(null);
    const bet = buildBet({ userId: "preview", type: betType, legs, stake: stakeNum });
    setPendingBet(bet);
  }, [legs, betType, stakeNum]);

  function handleSubmit() {
    if (!pendingBet) return;
    // In production: POST /api/bets with pendingBet
    setSubmitted(true);
  }

  if (legs.length === 0) {
    return (
      <aside className="w-64 shrink-0 rounded-xl bg-gray-800 p-4 text-center text-gray-400 text-sm">
        Add selections to build your bet slip.
      </aside>
    );
  }

  return (
    <aside className="w-64 shrink-0 rounded-xl bg-gray-800 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Bet Slip</h3>
        <button onClick={onClear} className="text-xs text-gray-400 hover:text-red-400">
          Clear
        </button>
      </div>

      {/* Bet type selector (only show when multiple legs) */}
      {legs.length > 1 && (
        <div className="flex gap-2">
          {(["PARLAY", "TEASER"] as BetType[]).map((t) => (
            <button
              key={t}
              onClick={() => setBetType(t)}
              className={`flex-1 rounded py-1 text-xs font-medium transition-colors ${
                betType === t
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Legs */}
      <ul className="space-y-2">
        {legs.map((leg) => (
          <li
            key={leg.lineId}
            className="flex items-center justify-between rounded bg-gray-700 px-2 py-1.5 text-sm"
          >
            <span className="text-gray-200 truncate">{leg.label}</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-yellow-400 text-xs">
                {leg.price > 0 ? `+${leg.price}` : leg.price}
              </span>
              <button
                onClick={() => onRemoveLeg(leg.lineId)}
                aria-label="Remove leg"
                className="text-gray-500 hover:text-red-400 text-xs"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Stake input */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">Stake ($)</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          className="w-full rounded bg-gray-700 px-2 py-1.5 text-sm text-white outline-none focus:ring-1 focus:ring-yellow-400"
        />
      </div>

      {/* Payout preview */}
      {pendingBet && (
        <div className="rounded bg-gray-700 px-3 py-2 text-xs space-y-1">
          <div className="flex justify-between text-gray-400">
            <span>To Win</span>
            <span className="text-white">${pendingBet.toWin.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Total Payout</span>
            <span className="text-yellow-400 font-medium">${pendingBet.payout.toFixed(2)}</span>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      {submitted ? (
        <p className="text-center text-xs text-green-400">Bet placed successfully!</p>
      ) : (
        <button
          disabled={!pendingBet}
          onClick={handleSubmit}
          className="w-full rounded bg-yellow-400 py-2 text-sm font-semibold text-gray-900 disabled:opacity-40 hover:bg-yellow-300 transition-colors"
        >
          Place Bet
        </button>
      )}
    </aside>
  );
}
