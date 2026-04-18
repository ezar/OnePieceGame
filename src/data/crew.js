const CREW = {
  es: {
    zoro:  { id: 'zoro',  name: 'Roronoa Zoro', role: 'Espadachín',    emoji: '⚔️', color: '#22c55e', bonus: { strength: 3 },                  bonusText: '+3 Fuerza',              quote: '¡Nada me impedirá ser el mejor espadachín!' },
    nami:  { id: 'nami',  name: 'Nami',          role: 'Navegante',     emoji: '🗺️', color: '#f97316', bonus: { intelligence: 2, speed: 1 },    bonusText: '+2 Intel, +1 Veloc.',    quote: '¡Con mi navegación llegaremos a cualquier lugar!' },
    usopp: { id: 'usopp', name: 'Usopp',         role: 'Francotirador', emoji: '🎯', color: '#84cc16', bonus: { stealth: 2, charisma: 1 },      bonusText: '+2 Sigilo, +1 Carisma',  quote: '¡Soy el gran capitán Usopp!' },
    sanji: { id: 'sanji', name: 'Sanji',         role: 'Cocinero',      emoji: '🍖', color: '#eab308', bonus: { speed: 2, charisma: 2 },        bonusText: '+2 Veloc, +2 Carisma',   quote: '¡Nunca dejaré que nadie pase hambre!' },
  },
  en: {
    zoro:  { id: 'zoro',  name: 'Roronoa Zoro', role: 'Swordsman',  emoji: '⚔️', color: '#22c55e', bonus: { strength: 3 },               bonusText: '+3 Strength',              quote: 'Nothing will stop me from becoming the greatest swordsman!' },
    nami:  { id: 'nami',  name: 'Nami',          role: 'Navigator',  emoji: '🗺️', color: '#f97316', bonus: { intelligence: 2, speed: 1 }, bonusText: '+2 Intel, +1 Speed',       quote: "With my navigation we'll reach anywhere!" },
    usopp: { id: 'usopp', name: 'Usopp',         role: 'Sniper',     emoji: '🎯', color: '#84cc16', bonus: { stealth: 2, charisma: 1 },   bonusText: '+2 Stealth, +1 Charisma',  quote: 'I am the great Captain Usopp!' },
    sanji: { id: 'sanji', name: 'Sanji',         role: 'Cook',       emoji: '🍖', color: '#eab308', bonus: { speed: 2, charisma: 2 },     bonusText: '+2 Speed, +2 Charisma',    quote: 'I will never let anyone go hungry!' },
  },
};

export function getCrewMembers(lang = 'es') {
  return CREW[lang] ?? CREW.es;
}

export const CREW_MEMBERS = CREW.es;
