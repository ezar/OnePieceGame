import { useEffect } from 'react';
import { playSuccess } from '../utils/sounds';

export default function CrewCard({ member, onDismiss }) {
  useEffect(() => {
    playSuccess();
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 animate-fadein"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={onDismiss}
    >
      <div className="animate-popin text-center px-6 py-8 rounded-3xl border-2 max-w-xs w-full mx-4"
        style={{ background: `linear-gradient(135deg, #0c1e3e, ${member.color}33)`, borderColor: member.color }}
      >
        <p className="text-sm font-bold tracking-widest mb-2" style={{ color: member.color }}>
          ✦ NUEVO TRIPULANTE ✦
        </p>
        <div className="text-8xl float mb-4">{member.emoji}</div>
        <h2 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Bangers, sans-serif', letterSpacing: '0.05em' }}>
          {member.name}
        </h2>
        <p className="text-sm mb-3" style={{ color: member.color }}>{member.role}</p>
        <div className="rounded-xl px-4 py-2 mb-4 text-sm font-bold" style={{ background: `${member.color}22`, color: member.color }}>
          {member.bonusText}
        </div>
        <p className="text-stone-300 text-xs italic">"{member.quote}"</p>
        <p className="text-stone-500 text-xs mt-4">Toca para continuar</p>
      </div>
    </div>
  );
}
