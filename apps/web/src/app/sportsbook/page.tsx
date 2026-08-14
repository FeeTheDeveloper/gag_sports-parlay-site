import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export const metadata: Metadata = { title: "Sportsbook" };

export default function SportsbookPage() {
  return (
    <ModulePlaceholder
      icon={Trophy}
      phase="Phase 2 · In Progress"
      title="Sportsbook"
      body="Straight bets, a licensed odds feed, and settlement land here first. Parlays, teasers, and live in-play lines follow in Phase 3."
    />
  );
}
