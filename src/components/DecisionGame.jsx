import { useState } from 'react';
import { scenarios } from '../data/scenarios';
import { playClick, playSuccess, playFail, playSelect } from '../utils/sounds';

const ISLANDS = [
  { name: 'Foosha', emoji: '🏝️' },
  { name: 'Shells Town', emoji: '⚓' },
  { name: 'Orange Town', emoji: '🍊' },
  { name: 'Syrup Village', emoji: '🌿' },
  { name: 'Baratie', emoji: '🍖' },
  { name: 'Arlong Park', emoji: '🦈' },
];

export default function DecisionGame({ character, onComplete }) {
  const [step, setStep] = useState(0);
  const [decisions, setDecisions] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const scenario = scenarios[step];

  function choose(choice) {
    const effectiveStats = Object.fromEntries(
      Object.entries(character.stats).map(([k, v]) => [
        k, v + (character.devilFruit?.statBonus?.[k] ?? 0),
      ])
    );
    const meetsRequirement =
      !choice.statRequired || effectiveStats[choice.statRequired] >= choice.statMin;

    if (meetsRequirement) playSuccess(); else playFail();

    const result = {
      ...choice,
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      success: meetsRequirement,
      bountyBonus: meetsRequirement ? choice.bountyBonus : Math.round(choice.bountyBonus * 0.4),
    };
    setFeedback({ result, meetsRequirement });
  }

  function next() {
    playClick();
    const allDecisions = [...decisions, feedback.result];
    setFeedback(null);
    if (step + 1 >= scenarios.length) {
      onComplete(allDecisions);
    } else {
      setDecisions(allDecisions);
      setStep((s) => s + 1);
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-4 py-10 animate-fadein">

      {/* Island map progress */}
      <div className="w-full max-w-md mb-6">
        <p className="text-center text-xs text-stone-500 mb-3 tracking-widest uppercase">Ruta pirata</p>
        <div className="flex items-center justify-between">
          {ISLANDS.map((island, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-lg
                    transition-all duration-500
                    ${current ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50 scale-110 animate-bounce-once' : ''}
                    ${done ? 'bg-yellow-700' : ''}
                    ${!done && !current ? 'bg-stone-800' : ''}
                  `}>
                    {done ? '✅' : island.emoji}
                  </div>
                  <span className={`text-xs mt-1 transition-colors ${current ? 'text-yellow-400 font-bold' : done ? 'text-yellow-700' : 'text-stone-600'}`}>
                    {island.name}
                  </span>
                </div>
                {i < ISLANDS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-4 transition-colors duration-500 ${i < step ? 'bg-yellow-700' : 'bg-stone-800'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-stone-900 rounded-2xl p-6 shadow-xl border border-stone-700 animate-slideup">
        {!feedback ? (
          <>
            <div className="text-5xl text-center mb-4 animate-popin">{scenario.image}</div>
            <h2 className="text-xl font-bold text-yellow-400 text-center mb-2">{scenario.title}</h2>
            <p className="text-stone-300 text-sm text-center mb-6 leading-relaxed">{scenario.description}</p>

            <div className="space-y-3">
              {scenario.choices.map((choice, i) => {
                const effectiveStat = choice.statRequired
                  ? (character.stats[choice.statRequired] ?? 0) + (character.devilFruit?.statBonus?.[choice.statRequired] ?? 0)
                  : null;
                const canDo = !choice.statRequired || effectiveStat >= choice.statMin;

                return (
                  <button
                    key={i}
                    onClick={() => { playSelect(); choose(choice); }}
                    className="w-full text-left rounded-xl px-4 py-3 border border-stone-700 bg-stone-800 hover:border-yellow-500 hover:bg-yellow-500/5 active:scale-95 transition-all text-sm text-stone-200"
                  >
                    <span>{choice.text}</span>
                    {choice.statRequired && (
                      <span className={`ml-2 text-xs ${canDo ? 'text-green-400' : 'text-red-400'}`}>
                        ({choice.statRequired} {choice.statMin}+: {canDo ? '✓' : `solo tienes ${effectiveStat}`})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 animate-slideup">
            <div className="text-5xl animate-popin">{feedback.meetsRequirement ? '✅' : '⚠️'}</div>
            <h2 className="text-lg font-bold text-yellow-400">{scenario.title}</h2>
            <p className="text-stone-300 text-sm leading-relaxed">{feedback.result.feedback}</p>
            {feedback.result.bountyBonus !== 0 && (
              <p className={`text-sm font-mono font-bold ${feedback.result.bountyBonus > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {feedback.result.bountyBonus > 0 ? '+' : ''}{(feedback.result.bountyBonus / 1_000_000).toFixed(1)}M de recompensa
              </p>
            )}
            {!feedback.meetsRequirement && (
              <p className="text-xs text-stone-500">No tenías los stats suficientes. Recompensa reducida.</p>
            )}
            <button
              onClick={next}
              className="w-full py-3 rounded-xl bg-yellow-500 text-stone-950 font-bold hover:bg-yellow-400 active:scale-95 transition-all"
            >
              {step + 1 >= scenarios.length ? 'Ver mi recompensa final 🏴‍☠️' : 'Siguiente isla →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
