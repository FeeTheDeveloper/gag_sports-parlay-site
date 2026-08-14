/**
 * Bet slip pricing & settlement logic.
 * Stateless pure functions — can be called server-side or in unit tests.
 */

import { Bet, BetLeg, BetType, BetStatus } from "@/types";
import { parlayDecimal } from "@/lib/odds";
import { randomUUID } from "crypto";

export function calculateToWin(stake: number, decimalOdds: number): number {
  return +(stake * (decimalOdds - 1)).toFixed(2);
}

export function calculatePayout(stake: number, decimalOdds: number): number {
  return +(stake * decimalOdds).toFixed(2);
}

export function buildBet(params: {
  userId: string;
  type: BetType;
  legs: BetLeg[];
  stake: number;
}): Bet {
  const { userId, type, legs, stake } = params;
  const decimalOdds =
    type === "STRAIGHT"
      ? legs[0].normalizedDecimal
      : parlayDecimal(legs.map((l) => l.normalizedDecimal));

  const toWin = calculateToWin(stake, decimalOdds);

  return {
    id: randomUUID(),
    userId,
    type,
    legs,
    stake,
    toWin,
    payout: calculatePayout(stake, decimalOdds),
    status: "PENDING" as BetStatus,
    placedAt: new Date().toISOString(),
  };
}

export function settleBet(bet: Bet, outcome: "WON" | "LOST" | "PUSH" | "CANCELLED"): Bet {
  return {
    ...bet,
    status: outcome,
    settledAt: new Date().toISOString(),
  };
}

export function validateBetLegs(legs: BetLeg[], type: BetType): string | null {
  if (legs.length === 0) return "Bet must have at least one leg.";
  if (type === "STRAIGHT" && legs.length !== 1)
    return "Straight bet must have exactly one leg.";
  if (type === "PARLAY" && legs.length < 2)
    return "Parlay must have at least two legs.";
  for (const leg of legs) {
    if (!leg.lineId) return "Each leg must reference a valid line id.";
    if (leg.normalizedDecimal < 1.01)
      return `Leg "${leg.label}" has invalid odds.`;
  }
  return null;
}
