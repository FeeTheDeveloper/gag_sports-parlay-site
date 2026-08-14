import { applyPromotion, recordWagerTowardRollover, isPromoExpired } from "@/lib/promotions";
import { Promotion } from "@/types";

const activePromo: Promotion = {
  id: "promo-test",
  code: "TEST100",
  type: "DEPOSIT_MATCH",
  value: 100,
  rolloverMultiplier: 10,
  expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
  status: "ACTIVE",
};

const expiredPromo: Promotion = {
  ...activePromo,
  expiresAt: new Date(Date.now() - 1).toISOString(),
};

describe("Promotions engine", () => {
  it("applies a 100% deposit-match bonus", () => {
    const bonus = applyPromotion("user-1", activePromo, 200);
    expect(bonus.bonusAmount).toBe(200); // 100% of 200
    expect(bonus.rolloverRequirement).toBe(2000); // 200 * 10
    expect(bonus.isReleased).toBe(false);
  });

  it("applies a free-bet bonus regardless of deposit", () => {
    const freeBetPromo: Promotion = { ...activePromo, type: "FREE_BET", value: 25 };
    const bonus = applyPromotion("user-1", freeBetPromo, 0);
    expect(bonus.bonusAmount).toBe(25);
  });

  it("tracks wager toward rollover and releases when met", () => {
    const bonus = applyPromotion("user-1", activePromo, 100); // rollover = 1000
    const updated = recordWagerTowardRollover(bonus, 1000);
    expect(updated.amountWagered).toBe(1000);
    expect(updated.isReleased).toBe(true);
  });

  it("does not release bonus when rollover not met", () => {
    const bonus = applyPromotion("user-1", activePromo, 100); // rollover = 1000
    const updated = recordWagerTowardRollover(bonus, 500);
    expect(updated.isReleased).toBe(false);
  });

  it("detects expired promotions", () => {
    expect(isPromoExpired(activePromo)).toBe(false);
    expect(isPromoExpired(expiredPromo)).toBe(true);
  });
});
