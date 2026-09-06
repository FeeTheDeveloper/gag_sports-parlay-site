export default function PokerPage() {
  const tables = [
    { id: "nlhe-micro", name: "No-Limit Hold'em", stakes: "$0.01/$0.02", players: 4, max: 9 },
    { id: "nlhe-low", name: "No-Limit Hold'em", stakes: "$0.05/$0.10", players: 7, max: 9 },
    { id: "plo-micro", name: "Pot-Limit Omaha", stakes: "$0.02/$0.05", players: 3, max: 6 },
    { id: "sit-n-go", name: "Sit & Go $5", stakes: "$5 buy-in", players: 6, max: 9 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-2">Poker</h1>
      <p className="text-gray-400 text-sm mb-6">
        Real-money cash games, sit &amp; gos, and tournaments.
      </p>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wide">
            <th className="pb-2 font-medium">Game</th>
            <th className="pb-2 font-medium">Stakes</th>
            <th className="pb-2 font-medium">Players</th>
            <th className="pb-2 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {tables.map((t) => (
            <tr key={t.id} className="hover:bg-gray-800/50 transition-colors">
              <td className="py-3 font-medium text-white">{t.name}</td>
              <td className="py-3 text-gray-300">{t.stakes}</td>
              <td className="py-3 text-gray-300">
                {t.players}/{t.max}
              </td>
              <td className="py-3 text-right">
                <button className="rounded bg-yellow-400 px-3 py-1 text-xs font-semibold text-gray-900 hover:bg-yellow-300 transition-colors">
                  Join Table
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
