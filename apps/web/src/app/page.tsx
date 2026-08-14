import Link from "next/link";
import { Dices, Lock, ScrollText, ShieldCheck, Spade, Trophy } from "lucide-react";
import styles from "./page.module.css";

const MODULES = [
  {
    href: "/sportsbook",
    icon: Trophy,
    title: "Sportsbook",
    body: "Straight bets on launch, with parlays, teasers, and live in-play lines coming in Phase 3.",
  },
  {
    href: "/casino",
    icon: Dices,
    title: "Casino",
    body: "Slots and table games via a licensed content aggregator, arriving once the wallet and identity core are live.",
  },
  {
    href: "/poker",
    icon: Spade,
    title: "Poker",
    body: "Cash games and tournaments through the same aggregator embed as casino.",
  },
];

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Compliance before code",
    body: "Licensing, KYC/AML, and responsible-gambling controls are Phase 0 — before any wallet holds real funds.",
  },
  {
    icon: ScrollText,
    title: "Auditable ledger",
    body: "Every deposit, wager, grade, and payout is event-sourced and reconstructable for disputes and audits.",
  },
  {
    icon: Lock,
    title: "No real money yet",
    body: "This build is pre-launch. Nothing on this site processes a deposit, bet, or payout today.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <span className={styles.kicker}>
          <ShieldCheck size={13} strokeWidth={2.5} aria-hidden />
          Building compliance-first
        </span>
        <h1 className={styles.title}>Good Az Gold</h1>
        <p className={styles.subtitle}>
          A modular sportsbook, casino, and poker platform — built with a
          licensed odds feed, an auditable wallet ledger, and real
          responsible-gambling tooling from day one.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/sportsbook" className={styles.ctaPrimary}>
            <Trophy size={16} strokeWidth={2.25} aria-hidden />
            View Sportsbook
          </Link>
          <Link href="/about" className={styles.ctaSecondary}>
            About the platform
          </Link>
        </div>
      </section>

      <section className={styles.modules} aria-label="Platform modules">
        {MODULES.map(({ href, icon: Icon, title, body }) => (
          <Link key={href} href={href} className={styles.card}>
            <span className={styles.cardIcon}>
              <Icon size={20} strokeWidth={2} aria-hidden />
            </span>
            <h2 className={styles.cardTitle}>{title}</h2>
            <p className={styles.cardBody}>{body}</p>
          </Link>
        ))}
      </section>

      <section className={styles.principles} aria-label="Operating principles">
        {PRINCIPLES.map(({ icon: Icon, title, body }) => (
          <div key={title} className={styles.principle}>
            <Icon size={20} strokeWidth={2} className={styles.principleIcon} aria-hidden />
            <div>
              <p className={styles.principleTitle}>{title}</p>
              <p className={styles.principleBody}>{body}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
