import Link from "next/link";
import styles from "./Header.module.css";
import { Logo } from "./Logo";
import { BalanceDisplay } from "./BalanceDisplay";
import { AccountDrawer } from "./AccountDrawer";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Home">
        <Logo />
      </Link>
      <nav className={styles.nav}>
        <Link href="/sportsbook">Sportsbook</Link>
        <Link href="/casino">Casino</Link>
        <Link href="/poker">Poker</Link>
      </nav>
      <div className={styles.actions}>
        <BalanceDisplay />
        <AccountDrawer />
      </div>
    </header>
  );
}
