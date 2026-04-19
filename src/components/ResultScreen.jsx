import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import PuzzleReveal from './PuzzleReveal';
import { getBountyRank, formatBounty, getBountyStatBonus } from '../utils/bountyCalculator';
import { playFanfare, playClick } from '../utils/sounds';
import { useLang } from '../i18n/LangContext';

export default function ResultScreen({ character, bounty, decisions, crew = [], onRestart }) {
  const { t, lang } = useLang();
  const { rank, color } = getBountyRank(bounty, lang);

  const BADGES = [
    { id: 'yonko',     condition: (b)       => b >= 500_000_000,                                   emoji: '👑', ...t.badges.yonko },
    { id: 'supernova', condition: (b)       => b >= 100_000_000,                                   emoji: '⭐', ...t.badges.supernova },
    { id: 'honor',     condition: (_, d)    => d.filter(x => x.trait === 'honorable').length >= 2, emoji: '⚔️', ...t.badges.honor },
    { id: 'heroe',     condition: (_, d)    => d.some(x => x.trait === 'robin_hood'),              emoji: '🦸', ...t.badges.heroe },
    { id: 'libre',     condition: (_, d)    => d.some(x => x.trait === 'free_spirit'),             emoji: '🌊', ...t.badges.libre },
    { id: 'astuto',    condition: (_, d)    => d.filter(x => x.trait === 'cunning').length >= 2,   emoji: '🦊', ...t.badges.astuto },
    { id: 'perfecto',  condition: (_, d)    => d.every(x => x.success),                            emoji: '💎', ...t.badges.perfecto },
    { id: 'crew4',     condition: (_, d, c) => c?.length >= 4,                                     emoji: '🏴‍☠️', ...t.badges.crew4 },
  ];

  const earned = BADGES.filter((b) => b.condition(bounty, decisions, crew));
  const bountyBonusPoints = Math.floor(bounty / 10_000_000);
  const bountyBonuses = getBountyStatBonus(bounty, character.stats);

  useEffect(() => {
    playFanfare();
    const t1 = setTimeout(() => confetti({ particleCount: 150, spread: 90, origin: { y: 0.4 }, colors: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#a855f7'] }), 300);
    const t2 = setTimeout(() => confetti({ particleCount: 80, spread: 130, origin: { x: 0.1, y: 0.6 } }), 800);
    const t3 = setTimeout(() => confetti({ particleCount: 80, spread: 130, origin: { x: 0.9, y: 0.6 } }), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 animate-fadein">

      <div className="text-5xl float mb-2 animate-popin">🏴‍☠️</div>
      <h1 className="text-4xl font-black text-yellow-400 mb-1 animate-slideup"
        style={{ fontFamily: 'Bangers, sans-serif', letterSpacing: '0.08em', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
        {t.result.title}
      </h1>
      <p className={`text-xl font-black mb-6 animate-slideup ${color}`}
        style={{ fontFamily: 'Bangers, sans-serif', letterSpacing: '0.05em' }}>
        {rank}
      </p>

      {crew.length > 0 && (
        <div className="w-full max-w-md mb-6 animate-slideup rounded-3xl p-4 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)' }}>
          <p className="text-center text-xs font-black text-blue-300 mb-3 tracking-widest">{t.result.crewTitle}</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {crew.map((m, i) => (
              <div key={m.id} className="flex flex-col items-center animate-bounceonce"
                style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-2"
                  style={{ background: `${m.color}22`, borderColor: m.color }}>
                  {m.emoji}
                </div>
                <p className="text-xs font-black mt-1" style={{ color: m.color }}>{m.name}</p>
                <p className="text-xs text-white/40">{m.role}</p>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 4 - crew.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="flex flex-col items-center opacity-25">
                <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center text-2xl">❓</div>
                <p className="text-xs mt-1 text-white/30">{t.result.emptySlot ?? '???'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {earned.length > 0 && (
        <div className="w-full max-w-md mb-6">
          <p className="text-center text-xs font-black text-blue-300 mb-3 tracking-widest">{t.result.badgesTitle}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {earned.map((b, i) => (
              <div key={b.id}
                className="flex items-center gap-2 rounded-2xl px-3 py-2 border border-yellow-400/30 animate-bounceonce"
                style={{ background: 'rgba(245,158,11,0.1)', animationDelay: `${i * 0.1}s` }}>
                <span className="text-2xl">{b.emoji}</span>
                <div>
                  <p className="text-yellow-400 text-xs font-black">{b.label}</p>
                  <p className="text-white/40 text-xs">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {bountyBonusPoints > 0 && (
        <div className="w-full max-w-md mb-6 animate-slideup rounded-3xl p-4 border border-cyan-400/20"
          style={{ background: 'rgba(6,182,212,0.07)', backdropFilter: 'blur(8px)' }}>
          <p className="text-center text-xs font-black text-cyan-300 mb-1 tracking-widest">{t.result.bountyBonusTitle}</p>
          <p className="text-center text-xs text-white/40 mb-3">{t.result.bountyBonusDesc(bountyBonusPoints)}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(bountyBonuses).map(([stat, pts]) => {
              const statInfo = t.stats[stat];
              return (
                <div key={stat} className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 border border-cyan-400/30"
                  style={{ background: 'rgba(6,182,212,0.1)' }}>
                  <span className="text-base">{statInfo.emoji}</span>
                  <span className={`text-xs font-black ${statInfo.color}`}>{statInfo.label}</span>
                  <span className="text-cyan-400 text-xs font-black">+{pts}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <PuzzleReveal character={character} bounty={bounty} decisions={decisions} crew={crew} />

      <div className="w-full max-w-md mt-6 rounded-3xl p-5 border border-white/10 animate-slideup"
        style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)' }}>
        <p className="font-black text-blue-200 mb-3 text-sm tracking-widest">{t.result.adventureTitle}</p>
        <div className="space-y-2">
          {decisions.map((d, i) => (
            <div key={i} className="flex justify-between text-xs text-white/60">
              <span className="truncate mr-2">{d.success ? '✅' : '⚠️'} {d.scenarioTitle}</span>
              <span className={`font-black shrink-0 ${d.bountyBonus >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                {d.bountyBonus >= 0 ? '+' : ''}{formatBounty(d.bountyBonus)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 flex justify-between font-black">
          <span className="text-blue-200">{t.result.finalBounty}</span>
          <span className="text-yellow-400 font-mono">{formatBounty(bounty)}</span>
        </div>
      </div>

      <button onClick={() => { playClick(); onRestart(); }}
        className="mt-6 px-8 py-3 rounded-2xl border-2 border-white/20 text-white font-black hover:border-yellow-400 hover:text-yellow-400 active:scale-95 transition-all">
        {t.result.playAgain}
      </button>
    </div>
  );
}
