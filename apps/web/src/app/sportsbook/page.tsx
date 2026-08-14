import type { Metadata } from "next";
import { SportsbookApp } from "@/components/sportsbook/SportsbookApp";

export const metadata: Metadata = { title: "Sportsbook" };

export default function SportsbookPage() {
  return <SportsbookApp />;
}
