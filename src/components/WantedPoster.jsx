import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { formatBounty, getBountyRank } from '../utils/bountyCalculator';

export default function WantedPoster({ character, bounty, decisions }) {
  const posterRef = useRef(null);
  const { rank, color } = getBountyRank(bounty);

  const dominantTrait = (() => {
    const traits = decisions.map((d) => d.trait);
    const counts = {};
    traits.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'unknown';
  })();

  const traitLabels = {
    ruthless: 'Sin piedad',
    honorable: 'Código de honor',
    friendly: 'Alma de marinero',
    brave: 'Temerario',
    cunning: 'Astuto',
    cautious: 'Prudente',
    robin_hood: 'Héroe del pueblo',
    free_spirit: 'Espíritu libre',
    pragmatic: 'Pragmático',
  };

  async function downloadPoster() {
    if (!posterRef.current) return;
    const canvas = await html2canvas(posterRef.current, { scale: 2, useCORS: true });
    const link = document.createElement('a');
    link.download = `wanted_${character.name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Poster */}
      <div
        ref={posterRef}
        className="w-72 bg-amber-100 rounded-sm shadow-2xl overflow-hidden"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {/* Header */}
        <div className="bg-stone-900 py-3 text-center">
          <p className="text-amber-400 text-xs tracking-[0.3em] font-bold">GOBIERNO MUNDIAL</p>
          <p className="text-white text-xs tracking-widest mt-0.5">SE BUSCA</p>
        </div>

        {/* WANTED text */}
        <div className="bg-amber-200 text-center py-2 border-y-2 border-stone-800">
          <p className="text-stone-900 font-black text-4xl tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>
            WANTED
          </p>
          <p className="text-stone-700 text-xs tracking-widest">DEAD OR ALIVE</p>
        </div>

        {/* Silhouette / avatar */}
        <div className="bg-amber-50 flex items-center justify-center py-6 border-b-2 border-stone-800">
          <div className="w-36 h-44 bg-stone-700 rounded-sm flex items-center justify-center text-7xl">
            🏴‍☠️
          </div>
        </div>

        {/* Name */}
        <div className="bg-amber-200 text-center py-2 border-y-2 border-stone-800 px-2">
          <p className="text-stone-900 font-black text-xl truncate tracking-wide uppercase">
            {character.name}
          </p>
          {character.devilFruit?.id !== 'none' && (
            <p className="text-stone-600 text-xs mt-0.5">usuario de {character.devilFruit.name}</p>
          )}
        </div>

        {/* Bounty */}
        <div className="bg-amber-100 text-center py-3 border-b-2 border-stone-800">
          <p className="text-stone-500 text-xs tracking-widest mb-0.5">RECOMPENSA</p>
          <p className="text-stone-900 font-black text-3xl" style={{ fontFamily: 'Impact, sans-serif' }}>
            {formatBounty(bounty)}
          </p>
          <p className="text-stone-500 text-xs">berries</p>
        </div>

        {/* Details */}
        <div className="bg-amber-50 px-4 py-3 text-xs text-stone-700 space-y-1">
          <div className="flex justify-between">
            <span>Origen:</span>
            <span className="font-semibold">{character.origin}</span>
          </div>
          <div className="flex justify-between">
            <span>Rango:</span>
            <span className="font-semibold">{rank}</span>
          </div>
          <div className="flex justify-between">
            <span>Estilo:</span>
            <span className="font-semibold">{traitLabels[dominantTrait] ?? dominantTrait}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-900 py-1.5 text-center">
          <p className="text-amber-400 text-xs tracking-widest">Marine HQ</p>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={downloadPoster}
        className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 transition-colors text-sm"
      >
        📥 Descargar poster
      </button>
    </div>
  );
}
