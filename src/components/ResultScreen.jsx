import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import WantedPoster from './WantedPoster';
import { getBountyRank, formatBounty } from '../utils/bountyCalculator';
import { playFanfare, playClick } from '../utils/sounds';

const BADGES = [
  { id: 'yonko',     condition: (b) => b >= 500_000_000, emoji: '👑', label: 'Nivel Yonko',        desc: 'Recompensa de 500M+' },
  { id: 'supernoeva',condition: (b) => b >= 100_000_000, emoji: '⭐', label: 'Supernoeva',          desc: 'Recompensa de 100M+' },
  { id: 'pacifista', condition: (b) => b >= 50_000_000,  emoji: '🤖', label: 'Amenaza Marina',     desc: 'Recompensa de 50M+' },
  { id: 'honor',     condition: (_, d) => d.filter(x => x.trait === 'honorable').length >= 2, emoji: '⚔️', label: 'Código Bushido', desc: 'Tomaste 2+ decisiones honorables' },
  { id: 'heroe',     condition: (_, d) => d.some(x => x.trait === 'robin_hood'),               emoji: '🦸', label: 'Héroe del Pueblo', desc: 'Robaste a los ricos' },
  { id: 'libre',     condition: (_, d) => d.some(x => x.trait === 'free_spirit'),              emoji: '🌊', label: 'Espíritu Libre', desc: 'Rechazaste el poder' },
  { id: 'astuto',    condition: (_, d) => d.filter(x => x.trait === 'cunning').length >= 2,    emoji: '🦊', label: 'Zorro del Mar', desc: '2+ decisiones astutas' },
  { id: 'perfecto',  condition: (_, d) => d.every(x => x.success),                             emoji: '💎', label: 'Partida Perfecta', desc: 'Todas las decisiones exitosas' },
];

export default function ResultScreen({ character, bounty, decisions, onRestart }) {
  const { rank, color } = getBountyRank(bounty);
  const earned = BADGES.filter((b) => b.condition(bounty, decisions));

  useEffect(() => {
    playFanfare();
    const t1 = setTimeout(() => confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981'] }), 300);
    const t2 = setTimeout(() => confetti({ particleCount: 60,  spread: 120, origin: { x: 0.1, y: 0.6 } }), 700);
    const t3 = setTimeout(() => confetti({ particleCount: 60,  spread: 120, origin: { x: 0.9, y: 0.6 } }), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-4 py-10 animate-fadein">
      <h1 className="text-2xl font-bold text-yellow-400 mb-1 animate-slideup">¡Partida completada!</h1>
      <p className={`text-lg font-semibold mb-6 animate-slideup ${color}`}>{rank}</p>

      {/* Badges */}
      {earned.length > 0 && (
        <div className="w-full max-w-md mb-6">
          <p className="text-center text-xs text-stone-500 mb-3 tracking-widest uppercase">Logros desbloqueados</p>
          <div className="flex flex-wrap justify-center gap-2">
            {earned.map((b, i) => (
              <div
                key={b.id}
                className="flex items-center gap-2 bg-stone-800 border border-yellow-700/50 rounded-xl px-3 py-2 animate-bounceonce"
                style={{ animationDelay: `${i * 0.1}s` }}
                title={b.desc}
              >
                <span className="text-2xl">{b.emoji}</span>
                <div>
                  <p className="text-yellow-400 text-xs font-bold leading-none">{b.label}</p>
                  <p className="text-stone-500 text-xs">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="animate-popin">
        <WantedPoster character={character} bounty={bounty} decisions={decisions} />
      </div>

      {/* Decision summary */}
      <div className="w-full max-w-md mt-8 bg-stone-900 rounded-2xl p-5 border border-stone-700 animate-slideup">
        <h3 className="text-stone-300 font-semibold mb-3 text-sm">Tu aventura</h3>
        <div className="space-y-2">
          {decisions.map((d, i) => (
            <div key={i} className="flex justify-between text-xs text-stone-400">
              <span className="truncate mr-2">{d.success ? '✅' : '⚠️'} {d.scenarioTitle}</span>
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
        onClick={() => { playClick(); onRestart(); }}
        className="mt-6 px-8 py-3 rounded-xl border border-stone-600 text-stone-300 hover:border-yellow-500 hover:text-yellow-400 active:scale-95 transition-all text-sm"
      >
        Jugar de nuevo
      </button>
    </div>
  );
}
