"use client";

import { SAMPLE_GAMES } from "./data";
import { formatOdds } from "./odds";
import { selectionId, type Selection } from "./selection";
import styles from "./OddsBoard.module.css";

type OddsBoardProps = {
  selectedIds: Set<string>;
  onToggle: (selection: Selection) => void;
};

export function OddsBoard({ selectedIds, onToggle }: OddsBoardProps) {
  return (
    <div className={styles.list}>
      {SAMPLE_GAMES.map((game) => {
        const matchup = `${game.away} @ ${game.home}`;
        return (
          <article key={game.id} className={styles.game}>
            <div className={styles.meta}>
              <span className={styles.league}>{game.league}</span>
              <span className={styles.kickoff}>{game.kickoff}</span>
            </div>
            <div className={styles.teams}>
              <div className={styles.names}>
                <div className={styles.team}>{game.away}</div>
                <div className={styles.team}>{game.home}</div>
              </div>
              <div className={styles.markets}>
                {game.markets.map((market) => (
                  <div key={market.key} className={styles.market}>
                    <span className={styles.marketLabel}>{market.name}</span>
                    {market.sides.map((side) => {
                      const id = selectionId(game.id, market.key, side.side);
                      const isSelected = selectedIds.has(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`${styles.odd} ${isSelected ? styles.selected : ""}`}
                          aria-pressed={isSelected}
                          onClick={() =>
                            onToggle({
                              id,
                              matchup,
                              marketName: market.name,
                              label: side.label,
                              odds: side.odds,
                            })
                          }
                        >
                          <span className={styles.oddLabel}>{side.label}</span>
                          <span className={styles.oddValue}>{formatOdds(side.odds)}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
