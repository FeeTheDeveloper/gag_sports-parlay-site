# gag_sports-parlay-site

## Build Roadmap

This repository tracks the implementation direction for a modular sportsbook platform with expansion paths for casino and poker.

### Architecture

#### Frontend
- Component-based SPA with a persistent app shell:
  - Header/navigation
  - Balance display
  - Account drawer
- Route-based module loading for:
  - Sportsbook
  - Casino
  - Poker

#### Backend Services
- Odds ingestion and normalization service
- Bet slip, pricing, and settlement service
- Wallet and ledger service
- Identity and KYC service
- Promotions and bonus rollover service
- CMS/content service for promo banners and events feed

#### Data Layer
- Append-only (event-sourced) money ledger for:
  - Deposits
  - Wagers
  - Grades
  - Payouts
  - Bonus credits
- All balances must be reconstructable and auditable for compliance and dispute handling.

#### Real-Time Layer
- WebSocket or SSE channel for:
  - Live odds updates
  - In-play line movement

#### External Integrations
- Licensed odds-feed provider
- Gaming-capable payment processor
- KYC/identity verification vendor
- Casino game content aggregator (if games are not built in-house)

## Phased Implementation Plan

### Phase 0: Compliance Foundation
- Select licensing jurisdiction(s)
- Establish legal and compliance controls
- Integrate KYC/AML provider
- Implement responsible-gambling requirements
- Finalize payment processing for gaming use cases

### Phase 1: Platform Core
- Build identity/account foundation
- Build wallet and append-only ledger core
- Deliver account shell experience (global account and balance state)

### Phase 2: Sportsbook MVP
- Launch with:
  - One sport
  - Straight bets only
  - Odds feed integration
  - Settlement flow
  - Basic risk limits

### Phase 3: Sports Expansion
- Add parlay, teaser, and props support
- Expand sports/leagues coverage
- Harden real-time/live odds infrastructure

### Phase 4: Content Expansion
- Integrate casino and poker via aggregator embed

### Phase 5: Retention and Scale
- Promotions and bonus rollover engine
- Localization support
- Segmentation and retention tooling
- Advanced in-play/live betting capabilities
- Analytics and fraud detection enhancements