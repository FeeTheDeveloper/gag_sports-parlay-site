export default function ResponsibleGamingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-4">Responsible Gaming</h1>
      <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
        <p>
          Gambling is entertainment. We are committed to providing a safe and responsible
          gaming environment for all our players.
        </p>
        <section>
          <h2 className="text-base font-semibold text-white mb-1">Deposit Limits</h2>
          <p>
            Set daily, weekly, or monthly deposit limits at any time in your account
            settings. Reductions take effect immediately; increases are subject to a
            cooling-off period.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-white mb-1">Self-Exclusion</h2>
          <p>
            You can request a self-exclusion period of 30 days, 6 months, 1 year, or
            permanently. Contact support to activate.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-white mb-1">Reality Check</h2>
          <p>
            Enable session time reminders to track how long you have been playing.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-white mb-1">Need Help?</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <a href="https://www.ncpgambling.org" className="underline hover:text-white">
                National Council on Problem Gambling
              </a>{" "}
              — 1-800-522-4700
            </li>
            <li>
              <a href="https://www.gamblingtherapy.org" className="underline hover:text-white">
                Gambling Therapy
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
