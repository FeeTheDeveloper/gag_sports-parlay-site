/**
 * Promotions / bonus-rollover engine.
 */

import { Promotion, UserBonus } from "@/types";
import { randomUUID } from "crypto";

export function applyPromotion(
  userId: string,
  promotion: Promotion,
  depositAmount: number
): UserBonus {
  let bonusAmount = 0;
  if (promotion.type === "DEPOSIT_MATCH") {
    bonusAmount = depositAmount * (promotion.value / 100);
  } else if (promotion.type === "FREE_BET" || promotion.type === "RISK_FREE") {
    bonusAmount = promotion.value;
  } else if (promotion.type === "RELOAD") {
    bonusAmount = depositAmount * (promotion.value / 100);
  } else {
    bonusAmount = promotion.value;
  }

  return {
    id: randomUUID(),
    userId,
    promotionId: promotion.id,
    bonusAmount,
    amountWagered: 0,
    rolloverRequirement: bonusAmount * promotion.rolloverMultiplier,
    isReleased: false,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Track a wager against a bonus's rollover requirement.
 * Returns the updated UserBonus (immutable).
 */
export function recordWagerTowardRollover(
  bonus: UserBonus,
  wagerAmount: number
): UserBonus {
  const amountWagered = bonus.amountWagered + wagerAmount;
  const isReleased = amountWagered >= bonus.rolloverRequirement;
  return { ...bonus, amountWagered, isReleased };
}

export function isPromoExpired(promo: Promotion): boolean {
  return new Date(promo.expiresAt) < new Date();
}
