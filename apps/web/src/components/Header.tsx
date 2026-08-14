import Link from "next/link";
import { Dices, Spade, Trophy } from "lucide-react";
import styles from "./Header.module.css";
import { Logo } from "./Logo";
import { BalanceDisplay } from "./BalanceDisplay";
import { AccountDrawer } from "./AccountDrawer";

const NAV_LINKS = [
  { href: "/sportsbook", label: "Sportsbook", icon: Trophy },
  { href: "/casino", label: "Casino", icon: Dices },
  { href: "/poker", label: "Poker", icon: Spade },
];

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Home">
        <Logo />
      </Link>
      <nav className={styles.nav}>
        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Icon size={15} strokeWidth={2} aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
      <div className={styles.actions}>
        <BalanceDisplay />
        <AccountDrawer />
      </div>
    </header>
  );
}
