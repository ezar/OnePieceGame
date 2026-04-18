import { translations } from '../i18n/translations';

export function calculateBounty(character, decisions) {
  const statTotal = Object.values(character.stats).reduce((a, b) => a + b, 0);
  const fruitMultiplier = character.devilFruit?.bountyMultiplier ?? 1.0;
  const decisionBonuses = decisions.reduce((sum, d) => sum + (d.bountyBonus ?? 0), 0);
  const raw = (1_000_000 + statTotal * 500_000 + decisionBonuses) * fruitMultiplier;
  return Math.max(0, Math.round(raw / 100_000) * 100_000);
}

export function formatBounty(amount) {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(0)}M`;
  return `${(amount / 1_000).toFixed(0)}K`;
}

export function getBountyRank(amount, lang = 'es') {
  const ranks = translations[lang]?.ranks ?? translations.es.ranks;
  for (const r of ranks) {
    if (amount >= r.min) return { rank: r.rank, color: r.color };
  }
  return ranks[ranks.length - 1];
}
