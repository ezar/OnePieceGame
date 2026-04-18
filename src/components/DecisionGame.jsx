import { useState } from 'react';
import { scenarios } from '../data/scenarios';
import { CREW_MEMBERS } from '../data/crew';
import CrewCard from './CrewCard';
import { playClick, playSuccess, playFail, playSelect } from '../utils/sounds';

const ISLANDS = [
  { name: 'Foosha',       emoji: '🏝️' },
  { name: 'Shells Town',  emoji: '⚓' },
  { name: 'Orange Town',  emoji: '🍊' },
  { name: 'Syrup Village',emoji: '🌿' },
  { name: 'Baratie',      emoji: '🍖' },
  { name: 'Arlong Park',  emoji: '🦈' },
];

export default function DecisionGame({ character, onComplete }) {
  const [step, setStep] = useState(0);
  const [decisions, setDecisions] = useState([]);
  const [crew, setCrew] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [newMember, setNewMember] = useState(null);

  const scenario = scenarios[step];

  function getEffectiveStats() {
    const bonuses = crew.reduce((acc, m) => {
      Object.entries(m.bonus).forEach(([k, v]) => { acc[k] = (acc[k] || 0) + v; });
      return acc;
    }, {});
    return Object.fromEntries(
      Object.entries(character.stats).map(([k, v]) => [
        k, v + (character.devilFruit?.statBonus?.[k] ?? 0) + (bonuses[k] ?? 0),
      ])
    );
  }

  function choose(choice) {
    const effectiveStats = getEffectiveStats();
    const meetsReq = !choice.statRequired || effectiveStats[choice.statRequired] >= choice.statMin;
    if (meetsReq) playSuccess(); else playFail();

    const result = {
      ...choice,
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      success: meetsReq,
      bountyBonus: meetsReq ? choice.bountyBonus : Math.round(choice.bountyBonus * 0.4),
    };

    // Crew recruitment
    let recruited = null;
    if (choice.recruitId) {
      const alreadyHave = crew.some((m) => m.id === choice.recruitId);
      const shouldRecruit =
        !alreadyHave &&
        (choice.recruitCondition === 'always' || (choice.recruitCondition === 'success' && meetsReq));
      if (shouldRecruit) recruited = CREW_MEMBERS[choice.recruitId];
    }

    setFeedback({ result, meetsReq, recruited });
  }

  function next() {
    playClick();
    const { result, recruited } = feedback;
    const newDecisions = [...decisions, result];
    const newCrew = recruited ? [...crew, recruited] : crew;

    if (recruited) {
      setNewMember(recruited);
      setCrew(newCrew);
      setFeedback(null);
      setDecisions(newDecisions);
      if (step + 1 >= scenarios.length) {
        setTimeout(() => { setNewMember(null); onComplete(newDecisions, newCrew); }, 3600);
      } else {
        setTimeout(() => { setNewMember(null); setStep((s) => s + 1); }, 3600);
      }
    } else {
      setFeedback(null);
      if (step + 1 >= scenarios.length) {
        onComplete(newDecisions, newCrew);
      } else {
        setDecisions(newDecisions);
        setStep((s) => s + 1);
      }
    }
  }

  const effectiveStats = getEffectiveStats();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 animate-fadein">

      {newMember && (
        <CrewCard member={newMember} onDismiss={() => setNewMember(null)} />
      )}

      {/* Crew mini-bar */}
      {crew.length > 0 && (
        <div className="w-full max-w-md mb-3 flex items-center gap-2">
          <span className="text-xs text-blue-300 font-bold">Tripulación:</span>
          {crew.map((m) => (
            <span key={m.id} className="text-xl" title={m.name}>{m.emoji}</span>
          ))}
        </div>
      )}

      {/* Island map */}
      <div className="w-full max-w-md mb-5">
        <div className="flex items-center justify-between">
          {ISLANDS.map((island, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-500
                    ${current ? 'border-yellow-400 bg-yellow-400/20 scale-110 animate-bounce-once shadow-lg shadow-yellow-400/40' : ''}
                    ${done ? 'border-green-400 bg-green-400/20' : ''}
                    ${!done && !current ? 'border-white/20 bg-white/5' : ''}
                  `}>
                    {done ? '✅' : island.emoji}
                  </div>
                  <span className={`text-xs mt-1 font-bold transition-colors ${current ? 'text-yellow-400' : done ? 'text-green-400' : 'text-white/30'}`}>
                    {island.name}
                  </span>
                </div>
                {i < ISLANDS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-4 transition-all duration-700 ${i < step ? 'bg-green-400' : 'bg-white/10'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-3xl p-6 shadow-2xl border border-white/10 animate-slideup"
        style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>

        {!feedback ? (
          <>
            <div className="text-6xl text-center mb-4 animate-popin">{scenario.image}</div>
            <h2 className="text-2xl font-black text-yellow-400 text-center mb-2"
              style={{ fontFamily: 'Bangers, sans-serif', letterSpacing: '0.05em' }}>
              {scenario.title}
            </h2>
            <p className="text-blue-100 text-sm text-center mb-6 leading-relaxed">{scenario.description}</p>

            <div className="space-y-3">
              {scenario.choices.map((choice, i) => {
                const eff = choice.statRequired ? effectiveStats[choice.statRequired] : null;
                const canDo = !choice.statRequired || eff >= choice.statMin;
                return (
                  <button key={i}
                    onClick={() => { playSelect(); choose(choice); }}
                    className="w-full text-left rounded-2xl px-4 py-3 border-2 border-white/10 font-bold text-sm text-white active:scale-95 transition-all hover:border-yellow-400/60 hover:bg-yellow-400/10"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <span>{choice.text}</span>
                    {choice.recruitId && (
                      <span className="ml-2 text-xs text-yellow-300">★ puede reclutar tripulante</span>
                    )}
                    {choice.statRequired && (
                      <span className={`ml-2 text-xs font-black ${canDo ? 'text-green-400' : 'text-red-400'}`}>
                        [{choice.statRequired} {choice.statMin}+ {canDo ? '✓' : `✗ tienes ${eff}`}]
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 animate-slideup">
            <div className="text-6xl animate-popin">{feedback.meetsReq ? '🎉' : '😅'}</div>
            <h2 className="text-xl font-black text-yellow-400"
              style={{ fontFamily: 'Bangers, sans-serif', letterSpacing: '0.05em' }}>
              {scenario.title}
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">{feedback.result.feedback}</p>
            {feedback.result.bountyBonus !== 0 && (
              <div className={`inline-block rounded-full px-4 py-1 font-black text-lg ${
                feedback.result.bountyBonus > 0 ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
              }`}>
                {feedback.result.bountyBonus > 0 ? '+' : ''}
                {(feedback.result.bountyBonus / 1_000_000).toFixed(1)}M 💰
              </div>
            )}
            {feedback.recruited && (
              <div className="text-sm text-yellow-300 font-bold animate-wiggle">
                ✨ ¡{feedback.recruited.name} se une a tu tripulación!
              </div>
            )}
            {!feedback.meetsReq && (
              <p className="text-xs text-white/40">No tenías los stats suficientes. Recompensa reducida.</p>
            )}
            <button onClick={next}
              className="w-full py-3 rounded-2xl font-black text-lg text-stone-900 active:scale-95 transition-all"
              style={{
                fontFamily: 'Bangers, sans-serif',
                letterSpacing: '0.05em',
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                boxShadow: '0 4px 20px rgba(245,158,11,0.4)',
              }}>
              {step + 1 >= scenarios.length ? '¡VER MI RECOMPENSA! 🏴‍☠️' : 'SIGUIENTE ISLA →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
