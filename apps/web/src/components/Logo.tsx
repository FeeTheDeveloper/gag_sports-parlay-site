import styles from "./Logo.module.css";

// Placeholder mark built from brand tokens until the real files from
// /brand/logos (wordmark.png, monogram.png) are added to the repo.
export function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <span className={styles.monogram} aria-hidden>
        GAG
      </span>
      <span className={styles.wordmark}>GOOD AZ GOLD</span>
    </div>
  );
}
