import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import styles from "@/components/ContentPage.module.css";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <ContentPage eyebrow="Legal · Draft" title="Privacy Policy">
      <div className={styles.callout}>
        <p>
          <strong>This is a pre-launch draft, not a final policy.</strong> A
          complete Privacy Policy, aligned to the KYC/AML and
          identity-verification requirements of each jurisdiction we operate
          in, will be published before account registration or identity data
          collection opens.
        </p>
      </div>

      <h2>What this site collects today</h2>
      <p>
        In its current pre-launch state, this site does not collect account
        registration data, identity documents, or payment information. Any
        data collection tied to identity verification (KYC) or wallet
        activity will be documented here before those features go live.
      </p>

      <h2>What changes at launch</h2>
      <p>
        Once account creation opens, this policy will cover what identity
        and financial data we collect, why we collect it (including KYC/AML
        obligations), how long it&apos;s retained, and how you can request
        access to or deletion of it.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions can be directed through the same contact channel
        listed on the <a href="/about">About</a> page.
      </p>
    </ContentPage>
  );
}
