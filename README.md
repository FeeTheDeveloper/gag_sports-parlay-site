# GAG Sports — Parlay Site

A full-stack sports-betting platform built with **Next.js 16 (App Router)**, TypeScript, and Tailwind CSS.

---

## Architecture Overview

### Frontend — Component-Based SPA

| Layer | Details |
|-------|---------|
| Framework | Next.js 16 App Router (React 19) |
| App Shell | Persistent `Header` with balance display + `AccountDrawer` slide-in panel |
| Route modules | `/sportsbook`, `/casino`, `/poker` — each loaded as a separate route segment |
| Real-time | `useLiveOdds` hook consumes the `/api/events` Server-Sent Events endpoint |
| Bet Slip | Client-side component with straight / parlay / teaser pricing preview |

### Backend Services (API Routes)

| Route | Responsibility |
|-------|---------------|
| `GET /api/odds` | Odds ingestion & normalization (American → decimal, vig removal) |
| `POST /api/bets` | Bet slip placement + pricing/settlement |
| `GET/POST /api/wallet` | Wallet / append-only ledger entries |
| `GET/POST /api/kyc` | Identity / KYC submission stub |
| `GET/POST /api/promotions` | Promotions & bonus-rollover engine |
| `GET /api/events` | Server-Sent Events for live odds updates |

### Data Layer — Append-Only Ledger

`src/lib/ledger/index.ts` implements the core of an **event-sourced / append-only ledger**:

- Every money movement (deposit, wager, grade, payout, bonus credit) is a `LedgerEntry`
- `balanceBefore` + `amount` → `balanceAfter` is stored on each entry
- `reconstructBalance(entries)` rebuilds any balance from the event log alone
- This makes every balance **auditable and reconstructable** — required for compliance and dispute resolution

### Real-Time Layer

`GET /api/events` is a **Server-Sent Events** (SSE) endpoint. The `useLiveOdds` React hook connects to it and maintains a live odds map keyed by `lineId`, allowing in-place price updates without page reloads.

---

## Module Layout

```
src/
├── app/
│   ├── layout.tsx              # Persistent app shell (Header)
│   ├── page.tsx                # Home / lobby
│   ├── sportsbook/page.tsx     # Sportsbook module
│   ├── casino/page.tsx         # Casino module
│   ├── poker/page.tsx          # Poker module
│   ├── promotions/page.tsx     # Promotions & promo-code redemption
│   ├── responsible-gaming/     # RG page
│   └── api/
│       ├── odds/route.ts       # Odds feed
│       ├── bets/route.ts       # Bet placement
│       ├── wallet/route.ts     # Ledger / wallet
│       ├── kyc/route.ts        # KYC stub
│       ├── promotions/route.ts # Promos engine
│       └── events/route.ts     # SSE live odds
├── components/
│   ├── shell/
│   │   ├── Header.tsx
│   │   └── AccountDrawer.tsx
│   ├── betslip/BetSlip.tsx
│   └── sportsbook/EventCard.tsx
├── lib/
│   ├── ledger/index.ts         # Append-only ledger logic
│   ├── odds/index.ts           # Odds normalization
│   ├── betslip/index.ts        # Pricing & settlement
│   ├── kyc/index.ts            # KYC guard
│   └── promotions/index.ts     # Bonus / rollover engine
├── hooks/
│   └── useLiveOdds.ts          # SSE subscription hook
├── types/index.ts              # Canonical domain types
└── __tests__/                  # Unit tests (Jest)
    ├── odds.test.ts
    ├── betslip.test.ts
    ├── ledger.test.ts
    └── promotions.test.ts
```

---

## Phased Roadmap

| Phase | Milestone |
|-------|-----------|
| 1 | **Compliance foundation** — licensing jurisdiction, KYC vendor integration (Persona/Jumio/Onfido), responsible-gambling deposit-limit enforcement, payment processor |
| 2 | **Wallet / ledger core** — persist `LedgerEntry` to a real append-only database table; account authentication |
| 3 | **Sportsbook MVP** — straight bets on one sport, live odds-feed provider integration, settlement pipeline |
| 4 | **Expand bet types** — parlays, teasers, props; additional sports coverage |
| 5 | **Casino / Poker** — embed casino-game content via aggregator SDK; poker table engine |
| 6 | **Growth features** — promotions engine, bonus/rollover tracking, localization, full live/in-play betting |

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # run unit tests
npm run build      # production build
```

---

## Key Integrations (to source)

- **Odds feed** — licensed provider (e.g. Sportradar, Genius Sports)
- **Payments** — high-risk / gaming-experienced processor (e.g. Paysafe, NuveiSports)
- **KYC / Identity** — vendor SDK (e.g. Persona, Jumio, Onfido)
- **Casino content** — aggregator (e.g. SoftSwiss, Slotegrator)
- **Database** — append-only ledger table (PostgreSQL with INSERT-only permissions on ledger rows, or an event-store)

---

## Responsible Gambling

18+ only. If you or someone you know has a gambling problem:

- **National Council on Problem Gambling**: 1-800-522-4700 · ncpgambling.org
- **Gambling Therapy**: gamblingtherapy.org
