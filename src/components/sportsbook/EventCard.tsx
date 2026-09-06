"use client";

import { useState } from "react";
import { SportEvent, OddsLine, BetLeg } from "@/types";

interface EventCardProps {
  event: SportEvent;
  onAddLeg: (leg: BetLeg) => void;
}

export default function EventCard({ event, onAddLeg }: EventCardProps) {
  const [selectedLineIds, setSelectedLineIds] = useState<Set<string>>(new Set());

  function handleLineClick(line: OddsLine) {
    if (selectedLineIds.has(line.id)) return;
    setSelectedLineIds((prev) => new Set(prev).add(line.id));
    onAddLeg({
      lineId: line.id,
      eventId: event.id,
      label: `${event.homeTeam} vs ${event.awayTeam} — ${line.label}`,
      price: line.price,
      normalizedDecimal: line.normalizedDecimal,
    });
  }

  const moneylines = event.lines.filter((l) => l.marketType === "MONEYLINE");
  const spreads = event.lines.filter((l) => l.marketType === "SPREAD");
  const totals = event.lines.filter((l) => l.marketType === "TOTAL");

  return (
    <article className="rounded-xl bg-gray-800 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            {event.league}
          </p>
          <p className="text-sm font-medium text-white">
            {event.awayTeam} @ {event.homeTeam}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(event.startTime).toLocaleString()}
          </p>
        </div>
        {event.status === "LIVE" && (
          <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white animate-pulse">
            LIVE
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium text-gray-400">
        <span>Moneyline</span>
        <span>Spread</span>
        <span>Total</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Moneyline */}
        <div className="space-y-1">
          {moneylines.slice(0, 2).map((line) => (
            <OddsButton
              key={line.id}
              line={line}
              selected={selectedLineIds.has(line.id)}
              onClick={() => handleLineClick(line)}
            />
          ))}
        </div>
        {/* Spread */}
        <div className="space-y-1">
          {spreads.slice(0, 2).map((line) => (
            <OddsButton
              key={line.id}
              line={line}
              selected={selectedLineIds.has(line.id)}
              onClick={() => handleLineClick(line)}
            />
          ))}
        </div>
        {/* Total */}
        <div className="space-y-1">
          {totals.slice(0, 2).map((line) => (
            <OddsButton
              key={line.id}
              line={line}
              selected={selectedLineIds.has(line.id)}
              onClick={() => handleLineClick(line)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function OddsButton({
  line,
  selected,
  onClick,
}: {
  line: OddsLine;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={selected}
      className={`w-full rounded py-1.5 text-xs font-medium transition-colors ${
        selected
          ? "bg-yellow-400 text-gray-900"
          : "bg-gray-700 text-gray-200 hover:bg-gray-600"
      }`}
    >
      <span className="block text-gray-400 truncate">{line.label}</span>
      <span className={selected ? "text-gray-900" : "text-yellow-400"}>
        {line.price > 0 ? `+${line.price}` : line.price}
      </span>
    </button>
  );
}
