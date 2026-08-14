import type { Metadata } from "next";
import { Dices } from "lucide-react";
import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export const metadata: Metadata = { title: "Casino" };

export default function CasinoPage() {
  return (
    <ModulePlaceholder
      icon={Dices}
      phase="Phase 4 · Planned"
      title="Casino"
      body="Slots and table games arrive via a licensed content aggregator once the wallet, identity, and compliance core from Phases 0–1 are in place."
    />
  );
}
