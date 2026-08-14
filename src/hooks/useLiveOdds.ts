"use client";

import { useEffect, useState, useCallback } from "react";
import { OddsLine } from "@/types";

/**
 * useLiveOdds — subscribes to /api/events (SSE) and maintains a map
 * of the latest odds keyed by lineId.
 */
export function useLiveOdds() {
  const [oddsMap, setOddsMap] = useState<Record<string, OddsLine>>({});
  const [connected, setConnected] = useState(false);

  const handleUpdate = useCallback((line: OddsLine) => {
    setOddsMap((prev) => ({ ...prev, [line.id]: line }));
  }, []);

  useEffect(() => {
    const es = new EventSource("/api/events");

    es.addEventListener("connected", () => setConnected(true));
    es.addEventListener("odds_update", (e: MessageEvent) => {
      try {
        const line: OddsLine = JSON.parse(e.data);
        handleUpdate(line);
      } catch {
        // ignore malformed events
      }
    });
    es.onerror = () => setConnected(false);

    return () => {
      es.close();
      setConnected(false);
    };
  }, [handleUpdate]);

  return { oddsMap, connected };
}
