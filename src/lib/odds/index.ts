/**
 * Odds ingestion and normalization utilities.
 * Normalizes raw provider prices (American, Decimal, Fractional)
 * into a canonical decimal representation and derives implied probability.
 */

export function americanToDecimal(american: number): number {
  if (american >= 100) {
    return american / 100 + 1;
  }
  return 100 / Math.abs(american) + 1;
}

export function decimalToAmerican(decimal: number): number {
  if (decimal >= 2) {
    return Math.round((decimal - 1) * 100);
  }
  return Math.round(-100 / (decimal - 1));
}

export function fractionalToDecimal(numerator: number, denominator: number): number {
  return numerator / denominator + 1;
}

export function impliedProbability(decimal: number): number {
  return 1 / decimal;
}

/** Vig-free fair odds for a two-outcome market */
export function removeVig(
  decimalA: number,
  decimalB: number
): { fairA: number; fairB: number } {
  const pA = impliedProbability(decimalA);
  const pB = impliedProbability(decimalB);
  const totalOverround = pA + pB;
  return {
    fairA: 1 / (pA / totalOverround),
    fairB: 1 / (pB / totalOverround),
  };
}

/**
 * Parlay multiplier from an array of decimal odds.
 * Simply the product of all individual odds (no correlated-leg protection).
 */
export function parlayDecimal(legs: number[]): number {
  return legs.reduce((acc, odd) => acc * odd, 1);
}

/**
 * Teaser adjustment: shifts point spreads / totals by a set number of points.
 * Returns an approximate new decimal price (simplified linear model).
 */
export function teaserAdjustedOdds(baseDecimal: number, teaserPoints: number): number {
  // Each teaser point is worth approximately 0.03 on a decimal line centred at 1.91
  const adjustment = teaserPoints * 0.03;
  return Math.max(1.01, baseDecimal + adjustment);
}
