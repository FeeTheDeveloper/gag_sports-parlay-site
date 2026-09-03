"use client";

import { User } from "lucide-react";
import styles from "./AccountDrawer.module.css";

// Trigger only for now — the sliding drawer body and its account/identity
// data land with the identity-kyc service in Phase 1.
export function AccountDrawer() {
  return (
    <button type="button" className={styles.trigger}>
      <User size={15} strokeWidth={2.25} aria-hidden />
      Account
    </button>
  );
}
