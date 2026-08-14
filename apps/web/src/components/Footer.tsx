import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span>GOOD AZ GOLD</span>
          <p className={styles.tagline}>
            A modular sportsbook, casino, and poker platform being built
            compliance-first — licensing, KYC, and responsible-gambling
            controls before a single real-money wager ships.
          </p>
        </div>

        <div>
          <p className={styles.heading}>Platform</p>
          <ul className={styles.links}>
            <li><Link href="/sportsbook">Sportsbook</Link></li>
            <li><Link href="/casino">Casino</Link></li>
            <li><Link href="/poker">Poker</Link></li>
          </ul>
        </div>

        <div>
          <p className={styles.heading}>Company</p>
          <ul className={styles.links}>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/responsible-gambling">Responsible Gambling</Link></li>
          </ul>
        </div>

        <div>
          <p className={styles.heading}>Legal</p>
          <ul className={styles.links}>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.notice}>
        <div className={styles.noticeInner}>
          <span className={styles.badge}>
            <ShieldCheck size={14} strokeWidth={2.5} aria-hidden />
            21+ &middot; Play Responsibly
          </span>
          <p className={styles.noticeText}>
            <strong>Good Az Gold is in active development and is not yet
            licensed to accept real-money wagers.</strong> No deposits, bets,
            or payouts are processed on this site today. If gambling stops
            being fun, call or text the National Problem Gambling Helpline at{" "}
            <strong>1-800-522-4700</strong>, available 24/7.
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {year} Good Az Gold. All rights reserved.</span>
        <span>Must be 21+. Void where prohibited.</span>
      </div>
    </footer>
  );
}
