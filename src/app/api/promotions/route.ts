/**
 * GET  /api/promotions — list active promotions
 * POST /api/promotions/redeem — apply a promo code to a user account
 */
import { NextRequest, NextResponse } from "next/server";
import { Promotion } from "@/types";
import { isPromoExpired } from "@/lib/promotions";

const SAMPLE_PROMOTIONS: Promotion[] = [
  {
    id: "promo-001",
    code: "WELCOME100",
    type: "DEPOSIT_MATCH",
    value: 100,
    rolloverMultiplier: 10,
    minOdds: -200,
    expiresAt: new Date(Date.now() + 30 * 24 * 3_600_000).toISOString(),
    status: "ACTIVE",
  },
  {
    id: "promo-002",
    code: "FREEBET25",
    type: "FREE_BET",
    value: 25,
    rolloverMultiplier: 1,
    expiresAt: new Date(Date.now() + 7 * 24 * 3_600_000).toISOString(),
    status: "ACTIVE",
  },
];

export async function GET() {
  const active = SAMPLE_PROMOTIONS.filter((p) => !isPromoExpired(p));
  return NextResponse.json(active);
}

export async function POST(req: NextRequest) {
  let body: { userId: string; code: string; depositAmount?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const { userId, code, depositAmount = 0 } = body;
  if (!userId || !code) {
    return NextResponse.json({ error: "userId and code are required." }, { status: 400 });
  }
  const promo = SAMPLE_PROMOTIONS.find((p) => p.code === code && p.status === "ACTIVE");
  if (!promo) {
    return NextResponse.json({ error: "Promotion code not found or expired." }, { status: 404 });
  }
  if (isPromoExpired(promo)) {
    return NextResponse.json({ error: "Promotion has expired." }, { status: 410 });
  }
  const { applyPromotion } = await import("@/lib/promotions");
  const bonus = applyPromotion(userId, promo, depositAmount);
  // TODO: persist bonus to database and credit bonus ledger entry
  return NextResponse.json(bonus, { status: 201 });
}
