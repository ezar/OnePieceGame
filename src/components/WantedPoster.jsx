import { useRef, useState, forwardRef } from 'react';
import html2canvas from 'html2canvas';
import { formatBounty, getBountyRank } from '../utils/bountyCalculator';
import { useLang } from '../i18n/LangContext';

const FRUIT_EMOJI = {
  gomu: '🌀', hana: '🌸', bara: '🔀', supa: '⚔️',
  mera: '🔥', hie: '❄️', yomi: '💀', none: null,
};

const WantedPoster = forwardRef(function WantedPoster({ character, bounty, decisions, hideDownload = false }, captureRef) {
  const { t, lang } = useLang();
  const internalRef = useRef(null);
  const posterRef = captureRef || internalRef;
  const [downloading, setDownloading] = useState(false);
  const { rank } = getBountyRank(bounty, lang);
  const p = t.poster;

  const dominantTrait = (() => {
    const counts = {};
    decisions.forEach((d) => { if (d?.trait) counts[d.trait] = (counts[d.trait] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'unknown';
  })();

  async function downloadPoster() {
    if (!posterRef.current || downloading) return;
    setDownloading(true);
    try {
      await document.fonts.ready;
      const canvas = await html2canvas(posterRef.current, {
        scale: 2, useCORS: true, allowTaint: true, logging: false,
      });
      const filename = `wanted_${character.name.replace(/\s+/g, '_')}.png`;
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
    } finally {
      setDownloading(false);
    }
  }

  const fruitEmoji = FRUIT_EMOJI[character.devilFruit?.id];

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={posterRef}
        style={{
          width: 300,
          background: 'linear-gradient(160deg, #e8d5a3 0%, #d4b96a 40%, #c9a84c 70%, #d6bc7a 100%)',
          boxShadow: '0 0 0 2px #7a5c1e, 0 0 0 6px #c9a84c, 0 0 0 8px #7a5c1e, 6px 6px 24px rgba(0,0,0,0.6)',
          fontFamily: "'IM Fell English', Georgia, serif",
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)' }} />
        <div style={{ position: 'absolute', inset: 8, border: '1.5px solid rgba(100,70,10,0.4)', pointerEvents: 'none', zIndex: 2 }} />

        <div style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ background: 'linear-gradient(180deg, #1a1008 0%, #2d1f0a 100%)', padding: '10px 16px 8px', textAlign: 'center', borderBottom: '3px solid #7a5c1e' }}>
            <div style={{ fontFamily: "'Cinzel', serif", color: '#c9a84c', fontSize: 9, letterSpacing: '0.35em', fontWeight: 700 }}>
              {p.worldGov}
            </div>
            <div style={{ fontFamily: "'Cinzel', serif", color: '#e8d5a3', fontSize: 7, letterSpacing: '0.5em', marginTop: 3, opacity: 0.7 }}>
              {p.hq}
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '10px 12px 4px' }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 68, fontWeight: 700, lineHeight: 1, color: '#1a0f00', textShadow: '2px 2px 0 rgba(0,0,0,0.2)', letterSpacing: '0.05em' }}>
              WANTED
            </div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.4em', color: '#5c3d0a', marginTop: -2, fontWeight: 700 }}>
              DEAD OR ALIVE
            </div>
          </div>

          <div style={{ padding: '0 16px', margin: '6px 0' }}>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #7a5c1e, transparent)' }} />
          </div>

          <div style={{ padding: '0 20px', textAlign: 'center' }}>
            <div style={{ background: 'linear-gradient(160deg, #2a1f0d 0%, #1a1208 100%)', border: '3px solid #7a5c1e', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
              <div style={{ fontSize: 72, lineHeight: 1, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.8))' }}>🏴‍☠️</div>
              {fruitEmoji && (
                <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 22, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))', opacity: 0.9 }}>
                  {fruitEmoji}
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: '0 16px', margin: '8px 0 0' }}>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #7a5c1e, transparent)' }} />
          </div>

          <div style={{ textAlign: 'center', padding: '6px 12px 4px' }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: character.name.length > 16 ? 16 : character.name.length > 12 ? 19 : 22, color: '#1a0f00', letterSpacing: '0.08em', textTransform: 'uppercase', textShadow: '1px 1px 0 rgba(255,210,80,0.2)' }}>
              {character.name}
            </div>
            {character.devilFruit?.id !== 'none' && character.devilFruit?.name && (
              <div style={{ fontFamily: "'IM Fell English', serif", fontStyle: 'italic', fontSize: 10, color: '#6b4a12', marginTop: 3 }}>
                {p.fruitUser(character.devilFruit.name)}
              </div>
            )}
          </div>

          <div style={{ padding: '0 16px', margin: '4px 0' }}>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #7a5c1e, transparent)' }} />
          </div>

          <div style={{ textAlign: 'center', padding: '8px 12px' }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '0.5em', color: '#5c3d0a', fontWeight: 700 }}>{p.bountyLabel}</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: '#1a0f00', textShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}>
              {formatBounty(bounty)}
            </div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8, color: '#5c3d0a', letterSpacing: '0.3em' }}>{p.berries}</div>
          </div>

          <div style={{ padding: '0 16px', margin: '0 0 6px' }}>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #7a5c1e, transparent)' }} />
          </div>

          <div style={{ padding: '4px 24px 8px', fontSize: 9 }}>
            {[
              [p.origin, character.origin],
              [p.rank, rank],
              [p.style, t.traits[dominantTrait] ?? dominantTrait],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(100,70,10,0.3)', padding: '3px 0', fontFamily: "'IM Fell English', serif", color: '#3d2800' }}>
                <span style={{ opacity: 0.7 }}>{label}</span>
                <span style={{ fontWeight: 700 }}>{value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(180deg, #2d1f0a 0%, #1a1008 100%)', padding: '7px 16px 6px', textAlign: 'center', borderTop: '3px solid #7a5c1e' }}>
            <div style={{ fontFamily: "'Cinzel', serif", color: '#c9a84c', fontSize: 8, letterSpacing: '0.4em', fontWeight: 700 }}>
              {p.marineHQ}
            </div>
          </div>
        </div>
      </div>

      {!hideDownload && (
        <button onClick={downloadPoster} disabled={downloading}
          className="px-6 py-2.5 rounded-xl bg-amber-600 text-stone-950 font-bold hover:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm shadow-lg">
          {downloading ? '⏳...' : p.downloadBtn}
        </button>
      )}
    </div>
  );
});

export default WantedPoster;
