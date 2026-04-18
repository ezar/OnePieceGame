import { useState } from 'react';
import { devilFruits } from '../data/devilFruits';
import { playClick, playSelect } from '../utils/sounds';

const STAT_LABELS = {
  strength: '💪 Fuerza',
  speed: '⚡ Velocidad',
  intelligence: '🧠 Inteligencia',
  stealth: '🌑 Sigilo',
  charisma: '✨ Carisma',
};

const STAT_POINTS = 10;

const BASE_STATS = { strength: 1, speed: 1, intelligence: 1, stealth: 1, charisma: 1 };

export default function CharacterCreator({ onComplete }) {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('East Blue');
  const [fruitId, setFruitId] = useState('none');
  const [stats, setStats] = useState({ ...BASE_STATS });

  const usedPoints = Object.values(stats).reduce((a, b) => a + b, 0) - 5;
  const remaining = STAT_POINTS - usedPoints;

  function adjustStat(key, delta) {
    const next = stats[key] + delta;
    if (next < 1 || next > 6) return;
    if (delta > 0 && remaining <= 0) return;
    setStats((s) => ({ ...s, [key]: next }));
  }

  const fruit = devilFruits.find((f) => f.id === fruitId);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    playClick();
    onComplete({ name: name.trim(), origin, devilFruit: fruit, stats });
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-4 py-10 animate-fadein">
      <h1 className="text-3xl font-bold text-yellow-400 mb-1 tracking-wide">⚓ ONE PIECE</h1>
      <p className="text-stone-400 mb-8 text-sm">Crea tu personaje pirata</p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-stone-900 rounded-2xl p-6 space-y-6 shadow-xl border border-stone-700"
      >
        {/* Nombre */}
        <div>
          <label className="block text-stone-300 text-sm mb-1">Nombre pirata</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ej. Monkey D. Luffy"
            maxLength={30}
            className="w-full bg-stone-800 border border-stone-600 rounded-lg px-4 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Origen */}
        <div>
          <label className="block text-stone-300 text-sm mb-1">Mar de origen</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full bg-stone-800 border border-stone-600 rounded-lg px-4 py-2 text-stone-100 focus:outline-none focus:border-yellow-500"
          >
            {['East Blue', 'West Blue', 'North Blue', 'South Blue', 'Grand Line'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Akuma no Mi */}
        <div>
          <label className="block text-stone-300 text-sm mb-2">Akuma no Mi</label>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {devilFruits.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => { playSelect(); setFruitId(f.id); }}
                className={`w-full text-left rounded-lg px-3 py-2 border transition-colors text-sm ${
                  fruitId === f.id
                    ? 'border-yellow-500 bg-yellow-500/10 text-yellow-300'
                    : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-stone-500'
                }`}
              >
                <span className="font-medium">{f.name}</span>
                {f.type && (
                  <span className="ml-2 text-xs text-stone-500">({f.type})</span>
                )}
                <p className="text-xs text-stone-400 mt-0.5">{f.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-stone-300 text-sm">Atributos</label>
            <span className={`text-xs font-mono ${remaining === 0 ? 'text-yellow-400' : 'text-stone-400'}`}>
              {remaining} puntos restantes
            </span>
          </div>
          <div className="space-y-2">
            {Object.entries(STAT_LABELS).map(([key, label]) => {
              const bonus = fruit?.statBonus?.[key] ?? 0;
              return (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-stone-300 text-sm w-36">{label}</span>
                  <button
                    type="button"
                    onClick={() => adjustStat(key, -1)}
                    className="w-7 h-7 rounded bg-stone-700 text-stone-300 hover:bg-stone-600 flex items-center justify-center text-lg leading-none"
                  >−</button>
                  <span className="w-5 text-center text-stone-100 font-mono text-sm">{stats[key]}</span>
                  <button
                    type="button"
                    onClick={() => adjustStat(key, 1)}
                    className="w-7 h-7 rounded bg-stone-700 text-stone-300 hover:bg-stone-600 flex items-center justify-center text-lg leading-none"
                  >+</button>
                  {bonus > 0 && (
                    <span className="text-xs text-yellow-400 ml-1">+{bonus} fruta</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full py-3 rounded-xl bg-yellow-500 text-stone-950 font-bold text-lg hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ¡Zarpar! ⛵
        </button>
      </form>
    </div>
  );
}
