import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import styles from "@/components/ContentPage.module.css";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <ContentPage eyebrow="Legal · Draft" title="Terms of Service">
      <div className={styles.callout}>
        <p>
          <strong>This is a pre-launch draft, not a final legal
          agreement.</strong> A complete Terms of Service, reviewed by
          licensed counsel in each jurisdiction we operate in, will be
          published before Good Az Gold accepts any real-money deposit or
          wager.
        </p>
      </div>

      <h2>Eligibility</h2>
      <p>
        Access is intended for individuals 21 years of age or older, located
        in a jurisdiction where the relevant product is legally permitted.
      </p>

      <h2>No real-money wagering today</h2>
      <p>
        Nothing on this site currently processes a deposit, bet, or payout.
        Balances, odds, and account features shown are placeholders for the
        platform still in development, described in our{" "}
        <a href="/about">About</a> page.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        Because the product is actively changing, this draft will change
        with it. The final Terms of Service will require explicit
        acceptance before any account can hold real funds.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be directed through the same contact
        channel listed on the <a href="/about">About</a> page.
      </p>
    </ContentPage>
  );
}
