import { formatBounty, getBountyRank } from './bountyCalculator';

const FRUIT_EMOJI = {
  gomu: '🌀', hana: '🌸', bara: '🔀', supa: '⚔️',
  mera: '🔥', hie: '❄️', yomi: '💀', none: null,
};

const TRAIT_LABELS = {
  ruthless: 'Sin piedad', honorable: 'Código de honor',
  friendly: 'Alma de marinero', brave: 'Temerario',
  cunning: 'Astuto', cautious: 'Prudente',
  robin_hood: 'Héroe del pueblo', free_spirit: 'Espíritu libre',
  pragmatic: 'Pragmático',
};

function divider(ctx, W, y) {
  const g = ctx.createLinearGradient(0, y, W, y);
  g.addColorStop(0, 'transparent');
  g.addColorStop(0.5, '#7a5c1e');
  g.addColorStop(1, 'transparent');
  ctx.strokeStyle = g;
  ctx.lineWidth = 1;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(16, y);
  ctx.lineTo(W - 16, y);
  ctx.stroke();
}

export async function renderPosterToCanvas({ character, bounty, decisions }) {
  await document.fonts.ready;

  const W = 300;
  const H = 530;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Parchment background
  const bg = ctx.createLinearGradient(0, 0, W * 0.6, H);
  bg.addColorStop(0, '#e8d5a3');
  bg.addColorStop(0.4, '#d4b96a');
  bg.addColorStop(0.7, '#c9a84c');
  bg.addColorStop(1, '#d6bc7a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Scanline texture
  for (let y = 0; y < H; y += 4) {
    ctx.fillStyle = 'rgba(0,0,0,0.012)';
    ctx.fillRect(0, y, W, 1);
  }

  // Inner border
  ctx.strokeStyle = 'rgba(100,70,10,0.4)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(8, 8, W - 16, H - 16);

  // ── HEADER ──────────────────────────────────────────────
  const headerH = 44;
  const hg = ctx.createLinearGradient(0, 0, 0, headerH);
  hg.addColorStop(0, '#1a1008');
  hg.addColorStop(1, '#2d1f0a');
  ctx.fillStyle = hg;
  ctx.fillRect(0, 0, W, headerH);

  ctx.strokeStyle = '#7a5c1e';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, headerH); ctx.lineTo(W, headerH); ctx.stroke();

  ctx.fillStyle = '#c9a84c';
  ctx.font = '700 9px Cinzel, serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ GOBIERNO MUNDIAL ✦', W / 2, 20);

  ctx.fillStyle = 'rgba(232,213,163,0.65)';
  ctx.font = '400 7px Cinzel, serif';
  ctx.fillText('MARINA FORD — CUARTEL GENERAL', W / 2, 35);

  // ── WANTED ───────────────────────────────────────────────
  ctx.fillStyle = '#1a0f00';
  ctx.font = '700 66px Oswald, sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.25)';
  ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 2; ctx.shadowBlur = 0;
  ctx.fillText('WANTED', W / 2, 118);
  ctx.shadowColor = 'transparent'; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;

  ctx.fillStyle = '#5c3d0a';
  ctx.font = '700 10px Cinzel, serif';
  ctx.fillText('DEAD OR ALIVE', W / 2, 132);

  divider(ctx, W, 140);

  // ── PHOTO ────────────────────────────────────────────────
  const px = 20, py = 148, pw = W - 40, ph = 162;
  const pg = ctx.createLinearGradient(px, py, px + pw, py + ph);
  pg.addColorStop(0, '#2a1f0d');
  pg.addColorStop(1, '#1a1208');
  ctx.fillStyle = pg;
  ctx.strokeStyle = '#7a5c1e';
  ctx.lineWidth = 3;
  ctx.fillRect(px, py, pw, ph);
  ctx.strokeRect(px, py, pw, ph);

  // Vignette
  const vig = ctx.createRadialGradient(
    px + pw / 2, py + ph / 2, pw * 0.15,
    px + pw / 2, py + ph / 2, pw * 0.72,
  );
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = vig;
  ctx.fillRect(px, py, pw, ph);

  // Center emoji
  ctx.font = '76px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏴‍☠️', W / 2, py + ph * 0.74);

  // Devil fruit badge
  const fe = FRUIT_EMOJI[character.devilFruit?.id];
  if (fe) {
    ctx.font = '22px serif';
    ctx.textAlign = 'right';
    ctx.fillText(fe, px + pw - 10, py + ph - 10);
  }

  divider(ctx, W, py + ph + 8);

  // ── NAME ─────────────────────────────────────────────────
  const nameSize = character.name.length > 16 ? 16 : character.name.length > 12 ? 19 : 22;
  ctx.fillStyle = '#1a0f00';
  ctx.font = `900 ${nameSize}px Cinzel, serif`;
  ctx.textAlign = 'center';
  const nameY = py + ph + 28;
  ctx.fillText(character.name.toUpperCase(), W / 2, nameY);

  let cursorY = nameY + 8;
  if (character.devilFruit?.id !== 'none') {
    ctx.fillStyle = '#6b4a12';
    ctx.font = 'italic 10px "IM Fell English", Georgia, serif';
    ctx.fillText(`Usuario de la ${character.devilFruit.name}`, W / 2, nameY + 14);
    cursorY = nameY + 22;
  }

  divider(ctx, W, cursorY + 4);

  // ── BOUNTY ───────────────────────────────────────────────
  cursorY += 18;
  ctx.fillStyle = '#5c3d0a';
  ctx.font = '700 8px Cinzel, serif';
  ctx.textAlign = 'center';
  ctx.fillText('RECOMPENSA', W / 2, cursorY);

  cursorY += 38;
  ctx.fillStyle = '#1a0f00';
  ctx.font = '700 42px Oswald, sans-serif';
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowOffsetX = 1; ctx.shadowOffsetY = 1; ctx.shadowBlur = 0;
  ctx.fillText(formatBounty(bounty), W / 2, cursorY);
  ctx.shadowColor = 'transparent'; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;

  cursorY += 12;
  ctx.fillStyle = '#5c3d0a';
  ctx.font = '400 8px Cinzel, serif';
  ctx.fillText('BERRIES', W / 2, cursorY);

  cursorY += 10;
  divider(ctx, W, cursorY + 2);
  cursorY += 14;

  // ── DETAILS ──────────────────────────────────────────────
  const { rank } = getBountyRank(bounty);
  const counts = {};
  decisions.forEach((d) => { counts[d.trait] = (counts[d.trait] || 0) + 1; });
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'unknown';

  const rows = [
    ['Origen', character.origin],
    ['Rango', rank],
    ['Estilo', TRAIT_LABELS[dominant] ?? dominant],
  ];

  rows.forEach(([label, value]) => {
    ctx.fillStyle = 'rgba(61,40,0,0.7)';
    ctx.font = '400 9px "IM Fell English", Georgia, serif';
    ctx.textAlign = 'left';
    ctx.fillText(label, 24, cursorY);

    ctx.fillStyle = '#3d2800';
    ctx.font = '700 9px "IM Fell English", Georgia, serif';
    ctx.textAlign = 'right';
    ctx.fillText(value, W - 24, cursorY);

    ctx.strokeStyle = 'rgba(100,70,10,0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.moveTo(24, cursorY + 3); ctx.lineTo(W - 24, cursorY + 3);
    ctx.stroke();
    ctx.setLineDash([]);

    cursorY += 16;
  });

  // ── FOOTER ───────────────────────────────────────────────
  cursorY += 4;
  const fg = ctx.createLinearGradient(0, cursorY, 0, H);
  fg.addColorStop(0, '#2d1f0a');
  fg.addColorStop(1, '#1a1008');
  ctx.fillStyle = fg;
  ctx.fillRect(0, cursorY, W, H - cursorY);

  ctx.strokeStyle = '#7a5c1e';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, cursorY); ctx.lineTo(W, cursorY); ctx.stroke();

  ctx.fillStyle = '#c9a84c';
  ctx.font = '700 8px Cinzel, serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ MARINE HQ ✦', W / 2, cursorY + 18);

  return canvas;
}
