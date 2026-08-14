import Link from "next/link";

export default function Home() {
  const modules = [
    {
      href: "/sportsbook",
      icon: "🏈",
      title: "Sportsbook",
      description: "NFL, NBA, MLB, NHL and more. Straight bets, parlays, teasers, and props.",
    },
    {
      href: "/sportsbook?tab=live",
      icon: "🔴",
      title: "Live Betting",
      description: "In-game lines updated in real-time via SSE. Bet the action as it happens.",
    },
    {
      href: "/casino",
      icon: "🎰",
      title: "Casino",
      description: "Slots, blackjack, roulette, baccarat — live dealers available.",
    },
    {
      href: "/poker",
      icon: "♠️",
      title: "Poker",
      description: "Cash games, sit & gos, and tournaments. No-limit Hold'em & PLO.",
    },
    {
      href: "/promotions",
      icon: "🎁",
      title: "Promotions",
      description: "Deposit match, free bets, and reload bonuses with transparent rollover.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Hero */}
      <section className="mb-10 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-gray-900 border border-yellow-400/20 p-8 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Welcome to <span className="text-yellow-400">GAG Sports</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-6">
          Sports betting, live in-game wagering, casino games, and poker — all in one platform.
        </p>
        <Link
          href="/sportsbook"
          className="inline-block rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-gray-900 hover:bg-yellow-300 transition-colors"
        >
          Start Betting →
        </Link>
      </section>

      {/* Module grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="flex flex-col gap-2 rounded-xl bg-gray-800 p-5 hover:bg-gray-700 transition-colors"
          >
            <span className="text-3xl">{m.icon}</span>
            <h2 className="text-base font-semibold text-white">{m.title}</h2>
            <p className="text-xs text-gray-400 leading-relaxed">{m.description}</p>
          </Link>
        ))}
      </section>

      {/* Responsible gambling notice */}
      <p className="mt-10 text-center text-xs text-gray-600">
        Gambling involves risk. 18+ only. If you have concerns about your gambling,
        visit{" "}
        <a href="https://www.ncpgambling.org" className="underline hover:text-gray-400">
          ncpgambling.org
        </a>
        .
      </p>
    </div>
  );
}

