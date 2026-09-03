import type { MarketSide } from "./data";

export type Selection = {
  id: string;
  matchup: string;
  marketName: string;
  label: string;
  odds: number;
};

export function selectionId(gameId: string, marketKey: string, side: MarketSide["side"]): string {
  return `${gameId}:${marketKey}:${side}`;
}
