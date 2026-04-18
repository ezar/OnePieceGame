import WantedPoster from './WantedPoster';
import { getBountyRank, formatBounty } from '../utils/bountyCalculator';

export default function ResultScreen({ character, bounty, decisions, onRestart }) {
  const { rank, color } = getBountyRank(bounty);

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-2xl font-bold text-yellow-400 mb-1">¡Partida completada!</h1>
      <p className={`text-lg font-semibold mb-6 ${color}`}>{rank}</p>

      <WantedPoster character={character} bounty={bounty} decisions={decisions} />

      {/* Decision summary */}
      <div className="w-full max-w-md mt-8 bg-stone-900 rounded-2xl p-5 border border-stone-700">
        <h3 className="text-stone-300 font-semibold mb-3 text-sm">Tu aventura</h3>
        <div className="space-y-2">
          {decisions.map((d, i) => (
            <div key={i} className="flex justify-between text-xs text-stone-400">
              <span className="truncate mr-2">{d.scenarioTitle}</span>
              <span className={`font-mono shrink-0 ${d.bountyBonus >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                {d.bountyBonus >= 0 ? '+' : ''}{formatBounty(d.bountyBonus)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-stone-700 flex justify-between text-sm font-bold">
          <span className="text-stone-300">Recompensa final</span>
          <span className="text-yellow-400 font-mono">{formatBounty(bounty)}</span>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="mt-6 px-8 py-3 rounded-xl border border-stone-600 text-stone-300 hover:border-yellow-500 hover:text-yellow-400 transition-colors text-sm"
      >
        Jugar de nuevo
      </button>
    </div>
  );
}
