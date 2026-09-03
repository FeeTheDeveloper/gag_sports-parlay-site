import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import styles from "@/components/ContentPage.module.css";

export const metadata: Metadata = { title: "Responsible Gambling" };

export default function ResponsibleGamblingPage() {
  return (
    <ContentPage eyebrow="Player Safety" title="Responsible Gambling">
      <p>
        Good Az Gold is being built for players who gamble for entertainment,
        within limits they set for themselves. Responsible-gambling tooling —
        deposit limits, cool-off periods, and self-exclusion — is part of the
        Phase 0 compliance foundation, required before any real-money
        wagering goes live.
      </p>

      <h2>Know the signs</h2>
      <ul>
        <li>Betting more than you can afford to lose, or chasing losses</li>
        <li>Gambling to escape stress, or hiding it from people close to you</li>
        <li>Borrowing money or missing obligations to keep playing</li>
        <li>Feeling restless or irritable when trying to cut back</li>
      </ul>

      <h2>Get help</h2>
      <p>
        If gambling stops being fun, free and confidential help is available
        24/7:
      </p>
      <ul>
        <li>
          <strong>Call or text 1-800-522-4700</strong> — National Problem
          Gambling Helpline
        </li>
        <li>
          <strong>ncpgambling.org/chat</strong> — live chat, National Council
          on Problem Gambling
        </li>
      </ul>

      <div className={styles.callout}>
        <p>
          <strong>Must be 21 or older.</strong> This platform does not yet
          accept real-money deposits or wagers — but the same limits and
          self-exclusion tools you&apos;d expect from a licensed operator are
          being built in before that changes.
        </p>
      </div>
    </ContentPage>
  );
}
