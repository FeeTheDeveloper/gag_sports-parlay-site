export default function CasinoPage() {
  const games = [
    { id: "slots", name: "Slots", icon: "🎰", description: "Hundreds of slot titles from top providers." },
    { id: "blackjack", name: "Blackjack", icon: "🃏", description: "Classic and live-dealer blackjack tables." },
    { id: "roulette", name: "Roulette", icon: "🎡", description: "European and American roulette." },
    { id: "baccarat", name: "Baccarat", icon: "💠", description: "Mini and live baccarat." },
    { id: "live-casino", name: "Live Casino", icon: "📹", description: "Real dealers, real-time streaming." },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-2">Casino</h1>
      <p className="text-gray-400 text-sm mb-6">
        Powered by aggregated casino-game content. New titles added regularly.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games.map((game) => (
          <button
            key={game.id}
            className="rounded-xl bg-gray-800 p-5 text-left hover:bg-gray-700 transition-colors space-y-2"
          >
            <span className="text-3xl">{game.icon}</span>
            <h2 className="text-base font-semibold text-white">{game.name}</h2>
            <p className="text-xs text-gray-400">{game.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
