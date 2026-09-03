"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { formatCurrency, formatOdds, toWin } from "./odds";
import type { Selection } from "./selection";
import styles from "./BetSlip.module.css";

type BetSlipProps = {
  selections: Selection[];
  stakes: Record<string, string>;
  onStakeChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  onPlaced: () => void;
};

export function BetSlip({ selections, stakes, onStakeChange, onRemove, onPlaced }: BetSlipProps) {
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const { totalStake, totalToWin } = useMemo(() => {
    return selections.reduce(
      (acc, selection) => {
        const stake = Number.parseFloat(stakes[selection.id] ?? "");
        const win = toWin(stake, selection.odds);
        return {
          totalStake: acc.totalStake + (Number.isFinite(stake) && stake > 0 ? stake : 0),
          totalToWin: acc.totalToWin + win,
        };
      },
      { totalStake: 0, totalToWin: 0 }
    );
  }, [selections, stakes]);

  const hasValidStake = selections.some((selection) => {
    const stake = Number.parseFloat(stakes[selection.id] ?? "");
    return Number.isFinite(stake) && stake > 0;
  });

  function handlePlaceBet() {
    setConfirmation(
      `Demo bet placed on ${selections.length} selection${selections.length === 1 ? "" : "s"} for ${formatCurrency(totalStake)}. This is a sample slip only — no account, wallet, or real money was involved.`
    );
    onPlaced();
  }

  return (
    <div className={styles.slip}>
      <div className={styles.header}>
        Bet Slip {selections.length > 0 && <span className={styles.count}>({selections.length})</span>}
      </div>

      {confirmation && <p className={styles.confirmation}>{confirmation}</p>}

      {selections.length === 0 ? (
        <p className={styles.empty}>
          Your bet slip is empty. Click any odds on the board to add a selection.
        </p>
      ) : (
        <ul className={styles.items}>
          {selections.map((selection) => {
            const stakeValue = stakes[selection.id] ?? "";
            const stakeNumber = Number.parseFloat(stakeValue);
            const win = toWin(stakeNumber, selection.odds);
            return (
              <li key={selection.id} className={styles.item}>
                <div className={styles.itemTop}>
                  <div>
                    <div className={styles.itemLabel}>{selection.label}</div>
                    <div className={styles.itemMeta}>
                      {selection.marketName} &middot; {selection.matchup}
                    </div>
                  </div>
                  <div className={styles.itemOdds}>{formatOdds(selection.odds)}</div>
                  <button
                    type="button"
                    className={styles.remove}
                    aria-label={`Remove ${selection.label}`}
                    onClick={() => onRemove(selection.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className={styles.stakeRow}>
                  <label className={styles.stakeInput}>
                    <span>$</span>
                    <input
                      type="number"
                      min="0"
                      inputMode="decimal"
                      placeholder="0"
                      value={stakeValue}
                      onChange={(event) => onStakeChange(selection.id, event.target.value)}
                    />
                  </label>
                  <span className={styles.toWin}>
                    To win <strong>{formatCurrency(win)}</strong>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {selections.length > 0 && (
        <div className={styles.totals}>
          <div className={styles.totalRow}>
            <span>Total stake</span>
            <strong>{formatCurrency(totalStake)}</strong>
          </div>
          <div className={styles.totalRow}>
            <span>Potential payout</span>
            <strong>{formatCurrency(totalStake + totalToWin)}</strong>
          </div>
          <button
            type="button"
            className={styles.placeButton}
            disabled={!hasValidStake}
            onClick={handlePlaceBet}
          >
            Place Bet (Demo)
          </button>
        </div>
      )}

      <p className={styles.disclaimer}>
        Sample odds for demonstration only — not a live feed, and no real
        money changes hands. See our{" "}
        <a href="/responsible-gambling">responsible gambling</a> resources.
      </p>
    </div>
  );
}
