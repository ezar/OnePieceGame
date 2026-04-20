import { useState } from 'react';
import { getDevilFruits } from '../data/devilFruits';
import { playClick, playSelect } from '../utils/sounds';
import { useLang } from '../i18n/LangContext';

const STAT_POINTS = 10;
const BASE_STATS = { strength: 1, speed: 1, intelligence: 1, stealth: 1, charisma: 1 };
const ORIGINS = ['East Blue', 'West Blue', 'North Blue', 'South Blue', 'Grand Line'];

export default function CharacterCreator({ onComplete }) {
  const { t, lang } = useLang();
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('East Blue');
  const [fruitId, setFruitId] = useState('none');
  const [stats, setStats] = useState({ ...BASE_STATS });

  const fruits = getDevilFruits(lang);
  const usedPoints = Object.values(stats).reduce((a, b) => a + b, 0) - 5;
  const remaining = STAT_POINTS - usedPoints;
  const fruit = fruits.find((f) => f.id === fruitId);

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
      <div className="text-center mb-8">
        <div className="text-6xl float mb-2">🏴‍☠️</div>
        <h1 className="text-5xl font-black text-yellow-400 tracking-wide"
          style={{ fontFamily: 'Bangers, sans-serif', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
          ONE PIECE
        </h1>
        <p className="text-blue-200 font-bold mt-1">{t.creator.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">

        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
          <label className="block text-blue-200 font-bold text-sm mb-2">{t.creator.nameLabel}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.creator.namePlaceholder}
            maxLength={30}
            className="w-full rounded-xl px-4 py-3 text-white font-bold text-lg placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          />
        </div>

        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
          <label className="block text-blue-200 font-bold text-sm mb-2">{t.creator.originLabel}</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          >
            {ORIGINS.map((s) => (
              <option key={s} value={s} style={{ background: '#0a3a6b' }}>{s}</option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
          <label className="block text-blue-200 font-bold text-sm mb-3">{t.creator.fruitLabel}</label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {fruits.map((f) => (
              <button key={f.id} type="button"
                onClick={() => { playSelect(); setFruitId(f.id); }}
                className={`text-left rounded-xl px-3 py-2 border-2 transition-all text-sm font-bold active:scale-95 ${
                  fruitId === f.id
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                    : 'border-white/10 bg-white/5 text-white hover:border-white/30'
                }`}>
                <span>{f.id === 'none' ? '💪' : '🍎'} {f.name}</span>
                {f.type && <span className="block text-xs opacity-60">{f.type}</span>}
              </button>
            ))}
          </div>
          {fruit && (
            <p className="mt-3 text-xs text-blue-200 bg-white/5 rounded-xl px-3 py-2">{fruit.description}</p>
          )}
        </div>

        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
          <div className="flex justify-between items-center mb-3">
            <label className="text-blue-200 font-bold text-sm">{t.creator.statsLabel}</label>
            <span className={`text-sm font-black rounded-full px-3 py-1 ${
              remaining === 0 ? 'bg-yellow-400 text-stone-900' : 'bg-white/10 text-blue-200'
            }`}>
              {remaining} {t.creator.remainingPts}
            </span>
          </div>
          <div className="space-y-2">
            {Object.entries(t.stats).map(([key, { label, emoji, color }]) => {
              const bonus = fruit?.statBonus?.[key] ?? 0;
              const total = stats[key] + bonus;
              return (
                <div key={key} className="flex items-center gap-2">
                  <span className={`text-sm font-bold w-24 shrink-0 ${color}`}>{emoji} {label}</span>
                  <button type="button" onClick={() => adjustStat(key, -1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-lg flex items-center justify-center active:scale-90 transition-all shrink-0">
                    −
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-sm transition-all ${i < stats[key] ? color.replace('text-', 'bg-') : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <button type="button" onClick={() => adjustStat(key, 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-lg flex items-center justify-center active:scale-90 transition-all shrink-0">
                    +
                  </button>
                  {bonus > 0 && (
                    <span className="text-xs font-black text-yellow-400 shrink-0 rounded px-1.5 py-0.5"
                      style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)' }}>
                      +{bonus}
                    </span>
                  )}
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
          {t.creator.submit}
        </button>
      </form>
    </div>
  );
}
