export function calculateBounty(character, decisions) {
  const baseBounty = 1_000_000;

  const statTotal =
    character.stats.strength +
    character.stats.speed +
    character.stats.intelligence +
    character.stats.stealth +
    character.stats.charisma;

  const fruit = character.devilFruit;
  const fruitMultiplier = fruit?.bountyMultiplier ?? 1.0;

  const decisionBonuses = decisions.reduce((sum, d) => sum + (d.bountyBonus ?? 0), 0);

  const raw = (baseBounty + statTotal * 500_000 + decisionBonuses) * fruitMultiplier;
  return Math.max(0, Math.round(raw / 100_000) * 100_000);
}

export function formatBounty(amount) {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(0)}M`;
  return `${(amount / 1_000).toFixed(0)}K`;
}

export function getBountyRank(amount) {
  if (amount >= 500_000_000) return { rank: 'Yonko', color: 'text-red-400' };
  if (amount >= 200_000_000) return { rank: 'Gran Corsario', color: 'text-orange-400' };
  if (amount >= 100_000_000) return { rank: 'Supernoeva', color: 'text-yellow-400' };
  if (amount >= 50_000_000) return { rank: 'Pirata Notorio', color: 'text-lime-400' };
  if (amount >= 10_000_000) return { rank: 'Pirata Conocido', color: 'text-sky-400' };
  return { rank: 'Pirata Novato', color: 'text-stone-400' };
}
