import { Wallet } from "lucide-react";
import styles from "./BalanceDisplay.module.css";

// Static placeholder — real balance wiring lands with the wallet/ledger
// service in Phase 1 (see services/wallet-ledger).
export function BalanceDisplay() {
  return (
    <div className={styles.balance}>
      <Wallet size={14} strokeWidth={2.25} aria-hidden />
      <span className={styles.label}>Balance</span>
      <span className={styles.amount}>$0.00</span>
    </div>
  );
}
