"use client";

import styles from "./AccountDrawer.module.css";

// Trigger only for now — the sliding drawer body and its account/identity
// data land with the identity-kyc service in Phase 1.
export function AccountDrawer() {
  return (
    <button type="button" className={styles.trigger}>
      Account
    </button>
  );
}
