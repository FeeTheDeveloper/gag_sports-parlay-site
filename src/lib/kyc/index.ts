/**
 * KYC stub — in production replace with a vendor SDK
 * (e.g. Persona, Jumio, Onfido).
 */

import { KycRecord, KycStatus } from "@/types";

export function createKycRecord(userId: string): KycRecord {
  return {
    userId,
    status: "PENDING" as KycStatus,
    submittedAt: new Date().toISOString(),
  };
}

export function isKycApproved(record: KycRecord): boolean {
  return record.status === "APPROVED";
}

/**
 * Guard: throws if the user is not KYC-approved.
 * Call this before accepting any wager or withdrawal.
 */
export function requireKycApproval(record: KycRecord | undefined): void {
  if (!record || record.status !== "APPROVED") {
    throw new Error(
      "KYC verification is required before placing bets or processing withdrawals."
    );
  }
}
