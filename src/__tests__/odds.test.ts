import {
  americanToDecimal,
  decimalToAmerican,
  fractionalToDecimal,
  impliedProbability,
  removeVig,
  parlayDecimal,
} from "@/lib/odds";

describe("Odds normalization", () => {
  it("converts positive American odds to decimal", () => {
    expect(americanToDecimal(100)).toBeCloseTo(2.0);
    expect(americanToDecimal(150)).toBeCloseTo(2.5);
  });

  it("converts negative American odds to decimal", () => {
    expect(americanToDecimal(-110)).toBeCloseTo(1.909, 2);
    expect(americanToDecimal(-200)).toBeCloseTo(1.5);
  });

  it("round-trips American ↔ decimal for common lines", () => {
    const american = -150;
    const decimal = americanToDecimal(american);
    expect(decimalToAmerican(decimal)).toBe(american);
  });

  it("converts fractional odds to decimal", () => {
    expect(fractionalToDecimal(1, 1)).toBeCloseTo(2.0); // evens
    expect(fractionalToDecimal(3, 1)).toBeCloseTo(4.0); // 3/1
  });

  it("calculates implied probability", () => {
    expect(impliedProbability(2.0)).toBeCloseTo(0.5);
    expect(impliedProbability(1.5)).toBeCloseTo(0.667, 2);
  });

  it("removes vig for a two-way market", () => {
    const { fairA, fairB } = removeVig(
      americanToDecimal(-110),
      americanToDecimal(-110)
    );
    // Fair prices should be symmetric
    expect(fairA).toBeCloseTo(fairB, 4);
    // Fair implied probabilities should sum to ~1
    expect(1 / fairA + 1 / fairB).toBeCloseTo(1, 4);
  });

  it("calculates parlay decimal as product of legs", () => {
    const legs = [americanToDecimal(-110), americanToDecimal(-110)];
    expect(parlayDecimal(legs)).toBeCloseTo(legs[0] * legs[1], 6);
  });
});
