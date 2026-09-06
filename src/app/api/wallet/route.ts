/**
 * GET  /api/wallet?userId=xxx  — returns current balance
 * POST /api/wallet              — creates a ledger entry (deposit/withdrawal)
 */
import { NextRequest, NextResponse } from "next/server";
import { LedgerEntry, LedgerEntryType } from "@/types";
import { createLedgerEntry } from "@/lib/ledger";

interface LedgerEntryRequest {
  userId: string;
  type: LedgerEntryType;
  amount: number;
  balanceBefore: number;
  referenceId?: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId query param required." }, { status: 400 });
  }
  // TODO: fetch ledger entries from database and reconstruct balance
  return NextResponse.json({
    userId,
    availableBalance: 0,
    bonusBalance: 0,
    pendingWagers: 0,
    updatedAt: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  let body: LedgerEntryRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { userId, type, amount, balanceBefore, referenceId } = body;
  if (!userId || !type || amount === undefined) {
    return NextResponse.json(
      { error: "userId, type, and amount are required." },
      { status: 400 }
    );
  }

  const entry: LedgerEntry = createLedgerEntry({
    userId,
    type,
    amount,
    balanceBefore,
    referenceId,
  });

  // TODO: persist entry to append-only ledger table

  return NextResponse.json(entry, { status: 201 });
}
