// ─── Core domain types ───────────────────────────────────────────────────────

// Wallet / Ledger
export type LedgerEntryType =
  | "DEPOSIT"
  | "WITHDRAWAL"
  | "WAGER"
  | "GRADE_WIN"
  | "GRADE_LOSS"
  | "GRADE_PUSH"
  | "BONUS_CREDIT"
  | "BONUS_ROLLOVER_RELEASE"
  | "ADJUSTMENT";

export interface LedgerEntry {
  id: string;
  userId: string;
  type: LedgerEntryType;
  amount: number; // positive = credit, negative = debit
  balanceBefore: number;
  balanceAfter: number;
  referenceId?: string; // bet id, deposit id, etc.
  metadata?: Record<string, unknown>;
  createdAt: string; // ISO 8601
}

export interface WalletBalance {
  userId: string;
  availableBalance: number;
  bonusBalance: number;
  pendingWagers: number;
  updatedAt: string;
}

// Identity / KYC
export type KycStatus = "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "EXPIRED";

export interface KycRecord {
  userId: string;
  status: KycStatus;
  submittedAt?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

// Odds / Events
export type BetMarketType = "MONEYLINE" | "SPREAD" | "TOTAL" | "PROP" | "FUTURES";
export type EventStatus = "SCHEDULED" | "LIVE" | "FINAL" | "POSTPONED" | "CANCELLED";

export interface OddsLine {
  id: string;
  eventId: string;
  marketType: BetMarketType;
  label: string; // e.g. "LAL -3.5"
  price: number; // American odds, e.g. -110
  normalizedDecimal: number; // always ≥ 1.0
  isLive: boolean;
  updatedAt: string;
}

export interface SportEvent {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  status: EventStatus;
  lines: OddsLine[];
}

// Bet Slip / Wagers
export type BetType = "STRAIGHT" | "PARLAY" | "TEASER" | "PROP";
export type BetStatus = "PENDING" | "WON" | "LOST" | "PUSH" | "CANCELLED";

export interface BetLeg {
  lineId: string;
  eventId: string;
  label: string;
  price: number;
  normalizedDecimal: number;
}

export interface Bet {
  id: string;
  userId: string;
  type: BetType;
  legs: BetLeg[];
  stake: number;
  toWin: number;
  payout: number; // stake + toWin
  status: BetStatus;
  placedAt: string;
  settledAt?: string;
}

// Promotions
export type PromoType = "DEPOSIT_MATCH" | "FREE_BET" | "RISK_FREE" | "RELOAD" | "REFERRAL";
export type PromoStatus = "ACTIVE" | "EXPIRED" | "REDEEMED" | "CANCELLED";

export interface Promotion {
  id: string;
  code: string;
  type: PromoType;
  value: number; // flat amount or percentage
  rolloverMultiplier: number;
  minOdds?: number;
  expiresAt: string;
  status: PromoStatus;
}

export interface UserBonus {
  id: string;
  userId: string;
  promotionId: string;
  bonusAmount: number;
  amountWagered: number;
  rolloverRequirement: number;
  isReleased: boolean;
  createdAt: string;
}
