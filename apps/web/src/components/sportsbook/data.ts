export type MarketKey = "moneyline" | "spread" | "total";

export type MarketSide = {
  side: "away" | "home" | "over" | "under";
  label: string;
  odds: number;
};

export type Market = {
  key: MarketKey;
  name: string;
  sides: [MarketSide, MarketSide];
};

export type Game = {
  id: string;
  league: string;
  kickoff: string;
  away: string;
  home: string;
  markets: Market[];
};

// Sample odds for demo purposes only — not a live feed. Real integration
// lands with the odds-ingestion service in Phase 2 (see services/odds-ingestion).
export const SAMPLE_GAMES: Game[] = [
  {
    id: "kc-buf",
    league: "NFL",
    kickoff: "Sun 1:00 PM ET",
    away: "Kansas City Chiefs",
    home: "Buffalo Bills",
    markets: [
      {
        key: "moneyline",
        name: "Moneyline",
        sides: [
          { side: "away", label: "Chiefs", odds: -145 },
          { side: "home", label: "Bills", odds: 125 },
        ],
      },
      {
        key: "spread",
        name: "Spread",
        sides: [
          { side: "away", label: "Chiefs -2.5", odds: -110 },
          { side: "home", label: "Bills +2.5", odds: -110 },
        ],
      },
      {
        key: "total",
        name: "Total",
        sides: [
          { side: "over", label: "Over 47.5", odds: -110 },
          { side: "under", label: "Under 47.5", odds: -110 },
        ],
      },
    ],
  },
  {
    id: "sf-dal",
    league: "NFL",
    kickoff: "Sun 4:25 PM ET",
    away: "San Francisco 49ers",
    home: "Dallas Cowboys",
    markets: [
      {
        key: "moneyline",
        name: "Moneyline",
        sides: [
          { side: "away", label: "49ers", odds: -105 },
          { side: "home", label: "Cowboys", odds: -115 },
        ],
      },
      {
        key: "spread",
        name: "Spread",
        sides: [
          { side: "away", label: "49ers -1", odds: -110 },
          { side: "home", label: "Cowboys +1", odds: -110 },
        ],
      },
      {
        key: "total",
        name: "Total",
        sides: [
          { side: "over", label: "Over 44.5", odds: -108 },
          { side: "under", label: "Under 44.5", odds: -112 },
        ],
      },
    ],
  },
  {
    id: "phi-mia",
    league: "NFL",
    kickoff: "Sun 8:20 PM ET",
    away: "Philadelphia Eagles",
    home: "Miami Dolphins",
    markets: [
      {
        key: "moneyline",
        name: "Moneyline",
        sides: [
          { side: "away", label: "Eagles", odds: 150 },
          { side: "home", label: "Dolphins", odds: -180 },
        ],
      },
      {
        key: "spread",
        name: "Spread",
        sides: [
          { side: "away", label: "Eagles +3.5", odds: -110 },
          { side: "home", label: "Dolphins -3.5", odds: -110 },
        ],
      },
      {
        key: "total",
        name: "Total",
        sides: [
          { side: "over", label: "Over 49.5", odds: -110 },
          { side: "under", label: "Under 49.5", odds: -110 },
        ],
      },
    ],
  },
  {
    id: "gb-det",
    league: "NFL",
    kickoff: "Mon 8:15 PM ET",
    away: "Green Bay Packers",
    home: "Detroit Lions",
    markets: [
      {
        key: "moneyline",
        name: "Moneyline",
        sides: [
          { side: "away", label: "Packers", odds: 110 },
          { side: "home", label: "Lions", odds: -130 },
        ],
      },
      {
        key: "spread",
        name: "Spread",
        sides: [
          { side: "away", label: "Packers +2", odds: -110 },
          { side: "home", label: "Lions -2", odds: -110 },
        ],
      },
      {
        key: "total",
        name: "Total",
        sides: [
          { side: "over", label: "Over 45.5", odds: -110 },
          { side: "under", label: "Under 45.5", odds: -110 },
        ],
      },
    ],
  },
];
