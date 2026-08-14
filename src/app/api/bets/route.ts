/**
 * POST /api/bets
 * Accepts a bet placement request, validates it, deducts stake from wallet,
 * and persists the bet.
 *
 * In production: validate KYC, check wallet balance via ledger, write ledger
 * entry, then persist to the bets table.
 */
import { NextRequest, NextResponse } from "next/server";
import { BetLeg, BetType } from "@/types";
import { buildBet, validateBetLegs } from "@/lib/betslip";

interface PlaceBetRequest {
  userId: string;
  type: BetType;
  legs: BetLeg[];
  stake: number;
}

export async function POST(req: NextRequest) {
  let body: PlaceBetRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { userId, type, legs, stake } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId is required." }, { status: 400 });
  }
  if (stake <= 0 || !Number.isFinite(stake)) {
    return NextResponse.json({ error: "stake must be a positive number." }, { status: 400 });
  }

  const validationError = validateBetLegs(legs, type);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  const bet = buildBet({ userId, type, legs, stake });

  // TODO: persist bet to database and create ledger WAGER entry

  return NextResponse.json(bet, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId query param required." }, { status: 400 });
  }
  // TODO: fetch bets from database for userId
  return NextResponse.json([]);
}
