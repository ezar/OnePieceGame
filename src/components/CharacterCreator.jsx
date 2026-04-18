import { useState } from 'react';
import { devilFruits } from '../data/devilFruits';
import { playClick, playSelect } from '../utils/sounds';

const STAT_LABELS = {
  strength:     { label: 'Fuerza',       emoji: '💪', color: 'text-red-400' },
  speed:        { label: 'Velocidad',    emoji: '⚡', color: 'text-yellow-400' },
  intelligence: { label: 'Inteligencia', emoji: '🧠', color: 'text-blue-400' },
  stealth:      { label: 'Sigilo',       emoji: '🌑', color: 'text-purple-400' },
  charisma:     { label: 'Carisma',      emoji: '✨', color: 'text-pink-400' },
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
  const fruit = devilFruits.find((f) => f.id === fruitId);

  function adjustStat(key, delta) {
    const next = stats[key] + delta;
    if (next < 1 || next > 6) return;
    if (delta > 0 && remaining <= 0) return;
    playSelect();
    setStats((s) => ({ ...s, [key]: next }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    playClick();
    onComplete({ name: name.trim(), origin, devilFruit: fruit, stats });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 animate-fadein">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl float mb-2">🏴‍☠️</div>
        <h1 className="text-5xl font-black text-yellow-400 tracking-wide"
          style={{ fontFamily: 'Bangers, sans-serif', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
          ONE PIECE
        </h1>
        <p className="text-blue-200 font-bold mt-1">¡Crea tu personaje pirata!</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">

        {/* Nombre */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
          <label className="block text-blue-200 font-bold text-sm mb-2">⚓ Tu nombre pirata</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ej. Monkey D. Luffy"
            maxLength={30}
            className="w-full rounded-xl px-4 py-3 text-white font-bold text-lg placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          />
        </div>

        {/* Origen */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
          <label className="block text-blue-200 font-bold text-sm mb-2">🌊 Mar de origen</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          >
            {['East Blue', 'West Blue', 'North Blue', 'South Blue', 'Grand Line'].map((s) => (
              <option key={s} value={s} style={{ background: '#0a3a6b' }}>{s}</option>
            ))}
          </select>
        </div>

        {/* Akuma no Mi */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
          <label className="block text-blue-200 font-bold text-sm mb-3">🍎 Akuma no Mi</label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {devilFruits.map((f) => (
              <button key={f.id} type="button"
                onClick={() => { playSelect(); setFruitId(f.id); }}
                className={`text-left rounded-xl px-3 py-2 border-2 transition-all text-sm font-bold active:scale-95 ${
                  fruitId === f.id
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                    : 'border-white/10 bg-white/5 text-white hover:border-white/30'
                }`}>
                <span>{f.name === 'Ninguna' ? '❌' : '🍎'} {f.name}</span>
                {f.type && <span className="block text-xs opacity-60">{f.type}</span>}
              </button>
            ))}
          </div>
          {fruit && fruit.id !== 'none' && (
            <p className="mt-3 text-xs text-blue-200 bg-white/5 rounded-xl px-3 py-2">{fruit.description}</p>
          )}
        </div>

        {/* Stats */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
          <div className="flex justify-between items-center mb-3">
            <label className="text-blue-200 font-bold text-sm">⚡ Atributos</label>
            <span className={`text-sm font-black rounded-full px-3 py-1 ${
              remaining === 0 ? 'bg-yellow-400 text-stone-900' : 'bg-white/10 text-blue-200'
            }`}>
              {remaining} pts
            </span>
          </div>
          <div className="space-y-2">
            {Object.entries(STAT_LABELS).map(([key, { label, emoji, color }]) => {
              const bonus = fruit?.statBonus?.[key] ?? 0;
              const total = stats[key] + bonus;
              return (
                <div key={key} className="flex items-center gap-2">
                  <span className={`text-sm font-bold w-28 ${color}`}>{emoji} {label}</span>
                  <button type="button" onClick={() => adjustStat(key, -1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-lg flex items-center justify-center active:scale-90 transition-all">
                    −
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className={`w-4 h-4 rounded-sm transition-all ${i < total ? color.replace('text-', 'bg-') : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <button type="button" onClick={() => adjustStat(key, 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-lg flex items-center justify-center active:scale-90 transition-all">
                    +
                  </button>
                  {bonus > 0 && <span className="text-xs text-yellow-400 font-bold">+{bonus}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit" disabled={!name.trim()}
          className="w-full py-4 rounded-2xl font-black text-xl text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
          style={{
            fontFamily: 'Bangers, sans-serif',
            letterSpacing: '0.08em',
            background: !name.trim() ? '#6b7280' : 'linear-gradient(135deg, #f59e0b, #ef4444)',
            boxShadow: name.trim() ? '0 4px 20px rgba(245,158,11,0.5)' : 'none',
          }}>
          ¡ZARPAR AL MAR! ⛵
        </button>
      </form>
    </div>
  );
}
