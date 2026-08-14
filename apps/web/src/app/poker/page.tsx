import type { Metadata } from "next";
import { Spade } from "lucide-react";
import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export const metadata: Metadata = { title: "Poker" };

export default function PokerPage() {
  return (
    <ModulePlaceholder
      icon={Spade}
      phase="Phase 4 · Planned"
      title="Poker"
      body="Cash games and tournaments through the same aggregator embed as casino, launching alongside it in Phase 4."
    />
  );
}
