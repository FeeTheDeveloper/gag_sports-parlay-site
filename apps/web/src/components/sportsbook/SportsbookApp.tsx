"use client";

import { useMemo, useState } from "react";
import { OddsBoard } from "./OddsBoard";
import { BetSlip } from "./BetSlip";
import type { Selection } from "./selection";
import styles from "./SportsbookApp.module.css";

export function SportsbookApp() {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [stakes, setStakes] = useState<Record<string, string>>({});

  const selectedIds = useMemo(() => new Set(selections.map((s) => s.id)), [selections]);

  function handleToggle(selection: Selection) {
    setSelections((prev) => {
      const exists = prev.some((s) => s.id === selection.id);
      if (exists) {
        return prev.filter((s) => s.id !== selection.id);
      }
      return [...prev, selection];
    });
  }

  function handleRemove(id: string) {
    setSelections((prev) => prev.filter((s) => s.id !== id));
  }

  function handleStakeChange(id: string, value: string) {
    setStakes((prev) => ({ ...prev, [id]: value }));
  }

  function handlePlaced() {
    setSelections([]);
    setStakes({});
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Sportsbook</h1>
        <span className={styles.badge}>NFL &middot; Sample Odds</span>
      </div>
      <p className={styles.subtitle}>
        Click any line to build a bet slip. Odds below are sample data for
        demonstration — the live, licensed odds feed lands with the
        odds-ingestion service ahead of a real launch.
      </p>

      <div className={styles.layout}>
        <OddsBoard selectedIds={selectedIds} onToggle={handleToggle} />
        <BetSlip
          selections={selections}
          stakes={stakes}
          onStakeChange={handleStakeChange}
          onRemove={handleRemove}
          onPlaced={handlePlaced}
        />
      </div>
    </div>
  );
}
