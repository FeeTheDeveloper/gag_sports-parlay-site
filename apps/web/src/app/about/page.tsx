import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <ContentPage eyebrow="Company" title="About Good Az Gold">
      <p>
        Good Az Gold is a modular sportsbook, casino, and poker platform in
        active development. We&apos;re building the account, wallet, and
        odds infrastructure first — and treating licensing, identity
        verification, and responsible-gambling controls as launch
        requirements, not afterthoughts.
      </p>

      <h2>How we&apos;re building it</h2>
      <p>
        The platform is being delivered in phases: a compliance foundation
        (licensing, KYC/AML, responsible-gambling requirements) comes before
        the wallet and account core, which comes before any sportsbook,
        casino, or poker product goes live for real money. That order is
        deliberate — every balance on the platform is backed by an
        append-only ledger so deposits, wagers, grades, and payouts stay
        auditable and reconstructable.
      </p>

      <h2>Where things stand today</h2>
      <p>
        Good Az Gold is pre-launch. Nothing on this site currently accepts a
        deposit, places a bet, or processes a payout. The pages you see for
        Sportsbook, Casino, and Poker reflect real, in-progress phases of the
        build — not finished products.
      </p>

      <h2>Questions</h2>
      <p>
        For partnership, licensing, or press inquiries, reach out through
        the contact channel listed with your account representative once
        onboarding is available.
      </p>
    </ContentPage>
  );
}
