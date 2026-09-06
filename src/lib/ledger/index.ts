/**
 * Append-only ledger core.
 * In production this would be backed by an event-sourced database.
 * This module exposes the pure business logic so it can be tested
 * independently of the persistence layer.
 */

import { LedgerEntry, LedgerEntryType, WalletBalance } from "@/types";
import { randomUUID } from "crypto";

export function createLedgerEntry(
  params: Omit<LedgerEntry, "id" | "balanceAfter" | "createdAt">
): LedgerEntry {
  const entry: LedgerEntry = {
    ...params,
    id: randomUUID(),
    balanceAfter: params.balanceBefore + params.amount,
    createdAt: new Date().toISOString(),
  };
  return entry;
}

export function reconstructBalance(entries: LedgerEntry[]): number {
  return entries.reduce((acc, entry) => acc + entry.amount, 0);
}

export function isDebitEntry(type: LedgerEntryType): boolean {
  return (
    type === "WAGER" || type === "WITHDRAWAL" || type === "GRADE_LOSS"
  );
}

export function buildWalletBalance(
  userId: string,
  entries: LedgerEntry[]
): WalletBalance {
  const availableBalance = entries
    .filter((e) => e.type !== "BONUS_CREDIT" && e.type !== "BONUS_ROLLOVER_RELEASE")
    .reduce((acc, e) => acc + e.amount, 0);

  const bonusBalance = entries
    .filter(
      (e) => e.type === "BONUS_CREDIT" || e.type === "BONUS_ROLLOVER_RELEASE"
    )
    .reduce((acc, e) => acc + e.amount, 0);

  const pendingWagers = entries
    .filter((e) => e.type === "WAGER")
    .reduce((acc, e) => acc + Math.abs(e.amount), 0);

  return {
    userId,
    availableBalance,
    bonusBalance,
    pendingWagers,
    updatedAt: new Date().toISOString(),
  };
}
