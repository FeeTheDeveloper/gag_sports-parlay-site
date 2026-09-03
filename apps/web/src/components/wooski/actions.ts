import type { LucideIcon } from "lucide-react";
import { Dices, HelpCircle, Info, ShieldCheck, Spade, Trophy } from "lucide-react";

export type WooskiAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  reply: string;
  href?: string;
};

export const WOOSKI_ACTIONS: WooskiAction[] = [
  {
    id: "sportsbook",
    label: "Sportsbook",
    icon: Trophy,
    href: "/sportsbook",
    reply: "Heading to the Sportsbook — sample odds and a live bet slip. No real money involved yet.",
  },
  {
    id: "casino",
    label: "Casino",
    icon: Dices,
    href: "/casino",
    reply: "Casino arrives in Phase 4 via a licensed aggregator — here's where that page stands today.",
  },
  {
    id: "poker",
    label: "Poker",
    icon: Spade,
    href: "/poker",
    reply: "Poker launches alongside Casino in Phase 4 — taking you to the roadmap.",
  },
  {
    id: "responsible-gambling",
    label: "Responsible Gambling",
    icon: ShieldCheck,
    href: "/responsible-gambling",
    reply: "Here's our responsible gambling info and 24/7 helpline.",
  },
  {
    id: "about",
    label: "About the platform",
    icon: Info,
    href: "/about",
    reply: "Here's what Good Az Gold is building, and in what order.",
  },
  {
    id: "real-money",
    label: "Is this real money?",
    icon: HelpCircle,
    reply:
      "Not yet — this site is pre-launch. Nothing here processes a deposit, bet, or payout. Real-money wagering opens only after licensing, KYC, and responsible-gambling tooling are live.",
  },
];
