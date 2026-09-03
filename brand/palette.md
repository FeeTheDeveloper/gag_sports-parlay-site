# GAG Color Palette

Derived from the "GOOD AZ GOLD" wordmark and GAG monogram: a black ground with a
metallic gold mark. Source of truth for values is [tokens.json](tokens.json) /
[tokens.css](tokens.css) — this file explains what each token is for.

## Backgrounds
| Token | Value | Use |
|---|---|---|
| `bg.base` | `#0A0A0B` | App background, matches the logo's black ground |
| `bg.elevated` | `#17171A` | Cards, panels, bet slip |
| `bg.inset` | `#221F1A` | Hover/pressed states, warm-tinted to read as "lit by gold" |
| `bg.border` | `#2E2A22` | Hairlines/dividers on dark surfaces |

## Gold (primary brand color)
| Token | Value | Use |
|---|---|---|
| `gold.900` | `#4A3410` | Deepest shadow edge of metallic gold, gradients only |
| `gold.700` | `#8A6A1E` | Bronze mid-tone, gradients / pressed button state |
| `gold.500` | `#D4AF37` | **Primary** — buttons, active nav, odds highlight |
| `gold.400` | `#E8C15E` | Hover state for primary gold |
| `gold.300` | `#F5D678` | Bright highlight, focus rings, sparkle accents |
| `gold.100` | `#FCEFC7` | Near-white highlight, use sparingly (glints only) |

## Text
| Token | Value | Use |
|---|---|---|
| `text.primary` | `#F5F1E6` | Body copy on dark backgrounds (warm off-white, not pure white) |
| `text.secondary` | `#B9B2A0` | Muted/secondary copy |
| `text.onGold` | `#14110A` | Text/icons placed on a gold-filled surface (buttons, badges) |

## Semantic (sportsbook-specific)
| Token | Value | Use |
|---|---|---|
| `semantic.positive` | `#2E9E5B` | Winning bets, positive odds movement, payouts |
| `semantic.negative` | `#C0392B` | Losing bets, negative odds movement |
| `semantic.live` | `#E2622A` | Live/in-play indicators |
| `semantic.info` | `#3B82C4` | Informational banners, neutral notices |

Gold is reserved for brand and primary actions — do not use it for semantic
win/loss states, or the two systems will collide visually.

## Typography
- Display / headings: `Playfair Display` — echoes the serif, engraved feel of
  the wordmark.
- Body / UI: `Inter` — neutral, legible at small sizes for odds and tables.
- Tabular data (odds, balances): `JetBrains Mono` for consistent digit width.

## Accessibility
- `text.primary` (#F5F1E6) on `bg.base` (#0A0A0B): contrast ratio ~15.5:1 (AAA).
- `text.onGold` (#14110A) on `gold.500` (#D4AF37): contrast ratio ~9.8:1 (AAA).
- Do not place `text.secondary` on `bg.inset` for body copy — contrast drops
  below AA. Use `text.primary` instead on that surface.
