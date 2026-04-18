import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import WantedPoster from './WantedPoster';
import { playFanfare, playSelect, playClick } from '../utils/sounds';

const GRID = 3;
const TOTAL = GRID * GRID;
const EMPTY = TOTAL - 1;

function getNeighbors(idx) {
  const row = Math.floor(idx / GRID), col = idx % GRID;
  const n = [];
  if (row > 0) n.push(idx - GRID);
  if (row < GRID - 1) n.push(idx + GRID);
  if (col > 0) n.push(idx - 1);
  if (col < GRID - 1) n.push(idx + 1);
  return n;
}

function shufflePuzzle() {
  const s = Array.from({ length: TOTAL }, (_, i) => i);
  let empty = EMPTY;
  for (let i = 0; i < 300; i++) {
    const ns = getNeighbors(empty);
    const pick = ns[Math.floor(Math.random() * ns.length)];
    [s[empty], s[pick]] = [s[pick], s[empty]];
    empty = pick;
  }
  return s;
}

function isSolved(tiles) {
  return tiles.every((v, i) => v === i);
}

export default function PuzzleReveal({ character, bounty, decisions, crew }) {
  const captureRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imgSize, setImgSize] = useState(null);
  const [tiles, setTiles] = useState(null);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [hint, setHint] = useState(false);
  const captured = useRef(false);

  useEffect(() => {
    if (captured.current) return;
    const timer = setTimeout(async () => {
      if (!captureRef.current) return;
      captured.current = true;
      await document.fonts.ready;
      const canvas = await html2canvas(captureRef.current, {
        scale: 1, useCORS: true, allowTaint: true, logging: false,
      });
      setImgSize({ w: canvas.width, h: canvas.height });
      setImageUrl(canvas.toDataURL('image/png'));
      setTiles(shufflePuzzle());
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  function handleTileClick(cellIdx) {
    if (solved || !tiles) return;
    const emptyIdx = tiles.indexOf(EMPTY);
    if (!getNeighbors(emptyIdx).includes(cellIdx)) return;
    playSelect();
    const next = [...tiles];
    [next[emptyIdx], next[cellIdx]] = [next[cellIdx], next[emptyIdx]];
    const newMoves = moves + 1;
    setTiles(next);
    setMoves(newMoves);
    if (isSolved(next)) {
      setSolved(true);
      setTimeout(() => {
        playFanfare();
        confetti({ particleCount: 180, spread: 100, origin: { y: 0.4 }, colors: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#a855f7'] });
        setTimeout(() => confetti({ particleCount: 80, spread: 140, origin: { x: 0.1, y: 0.5 } }), 400);
        setTimeout(() => confetti({ particleCount: 80, spread: 140, origin: { x: 0.9, y: 0.5 } }), 700);
      }, 150);
    }
  }

  function showHint() {
    playClick();
    setHint(true);
    setTimeout(() => setHint(false), 2000);
  }

  function downloadPoster() {
    if (!imageUrl) return;
    playClick();
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `wanted_${character.name.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const DISPLAY_W = 300;
  const tileW = imgSize ? DISPLAY_W / GRID : 100;
  const tileH = imgSize ? (imgSize.h / GRID) * (DISPLAY_W / imgSize.w) : 100;
  const bgW = imgSize ? DISPLAY_W : 300;
  const bgH = imgSize ? imgSize.h * (DISPLAY_W / imgSize.w) : 300;

  return (
    <div className="flex flex-col items-center gap-4">

      {!imageUrl ? (
        /* Poster visible while capturing — replaced by puzzle once done */
        <div className="relative">
          <WantedPoster ref={captureRef} character={character} bounty={bounty} decisions={decisions} hideDownload />
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-sm"
            style={{ background: 'rgba(10,30,60,0.85)', backdropFilter: 'blur(2px)' }}>
            <div className="text-5xl float mb-3">⏳</div>
            <p className="text-blue-200 font-black text-lg">Preparando tu recompensa...</p>
          </div>
        </div>
      ) : !solved ? (
        <div className="flex flex-col items-center gap-3 animate-fadein">
          <p className="text-yellow-400 font-black text-xl text-center"
            style={{ fontFamily: 'Bangers, sans-serif', letterSpacing: '0.05em' }}>
            🧩 ¡MONTA EL PUZZLE!
          </p>
          <p className="text-blue-200 text-sm text-center">Descubre tu cartel de recompensa</p>
          <p className="text-white/40 text-xs">{moves} movimientos</p>

          {/* Puzzle grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID}, ${tileW}px)`,
            gap: 4,
            padding: 6,
            borderRadius: 20,
            background: 'rgba(255,255,255,0.06)',
            border: '2px solid rgba(255,255,255,0.1)',
            position: 'relative',
          }}>
            {/* Hint overlay */}
            {hint && imageUrl && (
              <div style={{
                position: 'absolute', inset: 6, borderRadius: 14, zIndex: 10,
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${bgW}px ${bgH}px`,
                backgroundPosition: 'center',
                opacity: 0.85,
              }} />
            )}

            {tiles && tiles.map((tileValue, cellIdx) => {
              const isEmpty = tileValue === EMPTY;
              const tileRow = Math.floor(tileValue / GRID);
              const tileCol = tileValue % GRID;
              const isMovable = getNeighbors(tiles.indexOf(EMPTY)).includes(cellIdx);

              return (
                <div key={cellIdx}
                  onClick={() => handleTileClick(cellIdx)}
                  style={{
                    width: tileW,
                    height: tileH,
                    borderRadius: 10,
                    cursor: isEmpty ? 'default' : isMovable ? 'pointer' : 'default',
                    backgroundImage: isEmpty ? 'none' : `url(${imageUrl})`,
                    backgroundSize: `${bgW}px ${bgH}px`,
                    backgroundPosition: `-${tileCol * tileW}px -${tileRow * tileH}px`,
                    background: isEmpty ? 'rgba(255,255,255,0.03)' : undefined,
                    border: isEmpty
                      ? '2px dashed rgba(255,255,255,0.08)'
                      : isMovable
                        ? '2px solid rgba(245,158,11,0.6)'
                        : '2px solid rgba(255,255,255,0.15)',
                    transition: 'border-color 0.15s, transform 0.1s',
                    transform: isMovable && !isEmpty ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isMovable && !isEmpty ? '0 0 12px rgba(245,158,11,0.3)' : 'none',
                  }}
                />
              );
            })}
          </div>

          <div className="flex gap-3 mt-1">
            <button onClick={showHint}
              className="px-4 py-2 rounded-xl border-2 border-white/20 text-white/60 font-bold text-sm hover:border-yellow-400/60 hover:text-yellow-400 active:scale-95 transition-all">
              👁️ Pista (2s)
            </button>
            <button onClick={() => { setTiles(shufflePuzzle()); setMoves(0); playClick(); }}
              className="px-4 py-2 rounded-xl border-2 border-white/20 text-white/60 font-bold text-sm hover:border-red-400/60 hover:text-red-400 active:scale-95 transition-all">
              🔀 Mezclar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 animate-popin">
          <p className="text-yellow-400 font-black text-2xl text-center"
            style={{ fontFamily: 'Bangers, sans-serif', letterSpacing: '0.05em' }}>
            🎉 ¡PUZZLE RESUELTO!
          </p>
          <p className="text-white/60 text-sm">{moves} movimientos</p>
          <img src={imageUrl} style={{ width: DISPLAY_W, borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }} alt="Wanted poster" />
          <button onClick={downloadPoster}
            className="px-6 py-3 rounded-2xl font-black text-stone-900 active:scale-95 transition-all"
            style={{
              fontFamily: 'Bangers, sans-serif', letterSpacing: '0.06em', fontSize: 18,
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              boxShadow: '0 4px 20px rgba(245,158,11,0.5)',
            }}>
            📥 DESCARGAR POSTER
          </button>
        </div>
      )}
    </div>
  );
}
