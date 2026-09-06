import { buildBet, calculateToWin, calculatePayout, validateBetLegs, settleBet } from "@/lib/betslip";
import { americanToDecimal } from "@/lib/odds";
import { BetLeg } from "@/types";

const sampleLeg: BetLeg = {
  lineId: "line-001",
  eventId: "evt-001",
  label: "Chiefs -3.5",
  price: -110,
  normalizedDecimal: americanToDecimal(-110),
};

const sampleLeg2: BetLeg = {
  lineId: "line-002",
  eventId: "evt-002",
  label: "Lakers ML",
  price: -120,
  normalizedDecimal: americanToDecimal(-120),
};

describe("Bet slip pricing", () => {
  it("calculates toWin correctly", () => {
    const decimal = americanToDecimal(-110);
    expect(calculateToWin(100, decimal)).toBeCloseTo(90.91, 1);
  });

  it("calculates payout = stake + toWin", () => {
    const decimal = 2.0;
    expect(calculatePayout(50, decimal)).toBeCloseTo(100);
  });

  it("builds a straight bet with correct status and payout", () => {
    const bet = buildBet({ userId: "user-1", type: "STRAIGHT", legs: [sampleLeg], stake: 100 });
    expect(bet.status).toBe("PENDING");
    expect(bet.stake).toBe(100);
    expect(bet.payout).toBeGreaterThan(bet.stake);
    expect(bet.legs).toHaveLength(1);
  });

  it("builds a parlay bet with combined odds", () => {
    const bet = buildBet({
      userId: "user-1",
      type: "PARLAY",
      legs: [sampleLeg, sampleLeg2],
      stake: 50,
    });
    expect(bet.type).toBe("PARLAY");
    // Parlay payout > max individual straight payout
    const straight1 = calculatePayout(50, sampleLeg.normalizedDecimal);
    expect(bet.payout).toBeGreaterThan(straight1);
  });

  it("settles a bet correctly", () => {
    const bet = buildBet({ userId: "user-1", type: "STRAIGHT", legs: [sampleLeg], stake: 100 });
    const settled = settleBet(bet, "WON");
    expect(settled.status).toBe("WON");
    expect(settled.settledAt).toBeDefined();
  });
});

describe("validateBetLegs", () => {
  it("rejects empty legs", () => {
    expect(validateBetLegs([], "STRAIGHT")).not.toBeNull();
  });

  it("rejects straight bet with multiple legs", () => {
    expect(validateBetLegs([sampleLeg, sampleLeg2], "STRAIGHT")).not.toBeNull();
  });

  it("rejects parlay with only one leg", () => {
    expect(validateBetLegs([sampleLeg], "PARLAY")).not.toBeNull();
  });

  it("accepts valid straight bet", () => {
    expect(validateBetLegs([sampleLeg], "STRAIGHT")).toBeNull();
  });

  it("accepts valid parlay bet", () => {
    expect(validateBetLegs([sampleLeg, sampleLeg2], "PARLAY")).toBeNull();
  });
});
