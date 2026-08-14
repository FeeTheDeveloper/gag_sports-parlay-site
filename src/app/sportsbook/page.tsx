/**
 * Sportsbook module — main page.
 * Fetches events from /api/odds and renders them with the bet slip.
 */
"use client";

import { useState, useEffect } from "react";
import { SportEvent, BetLeg } from "@/types";
import EventCard from "@/components/sportsbook/EventCard";
import BetSlip from "@/components/betslip/BetSlip";

export default function SportsbookPage() {
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [legs, setLegs] = useState<BetLeg[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "live">("upcoming");

  useEffect(() => {
    fetch("/api/odds")
      .then((r) => r.json())
      .then((data: SportEvent[]) => setEvents(data))
      .catch(() => {});
  }, []);

  const filtered = events.filter((e) =>
    activeTab === "live" ? e.status === "LIVE" : e.status === "SCHEDULED"
  );

  function addLeg(leg: BetLeg) {
    setLegs((prev) => {
      if (prev.some((l) => l.lineId === leg.lineId)) return prev;
      return [...prev, leg];
    });
  }

  function removeLeg(lineId: string) {
    setLegs((prev) => prev.filter((l) => l.lineId !== lineId));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-4">Sportsbook</h1>

      {/* Tab bar */}
      <div className="flex gap-3 mb-6">
        {(["upcoming", "live"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab === "live" ? "🔴 Live" : "Upcoming"}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Events grid */}
        <div className="flex-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <p className="col-span-full text-gray-400 text-sm">No events available.</p>
          ) : (
            filtered.map((event) => (
              <EventCard key={event.id} event={event} onAddLeg={addLeg} />
            ))
          )}
        </div>

        {/* Persistent bet slip */}
        <div className="shrink-0 hidden lg:block">
          <BetSlip legs={legs} onRemoveLeg={removeLeg} onClear={() => setLegs([])} />
        </div>
      </div>
    </div>
  );
}
