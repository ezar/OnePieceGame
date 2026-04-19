const BASE_FRUITS = [
  { id: 'gomu', name: 'Gomu Gomu no Mi', type: 'Paramecia', statBonus: { strength: 3, speed: 1, intelligence: 0, stealth: 0, charisma: 1 }, bountyMultiplier: 1.4 },
  { id: 'hana', name: 'Hana Hana no Mi', type: 'Paramecia', statBonus: { strength: 1, speed: 2, intelligence: 2, stealth: 2, charisma: 0 }, bountyMultiplier: 1.3 },
  { id: 'bara', name: 'Bara Bara no Mi', type: 'Paramecia', statBonus: { strength: 2, speed: 3, intelligence: 0, stealth: 1, charisma: 1 }, bountyMultiplier: 1.2 },
  { id: 'supa', name: 'Supa Supa no Mi', type: 'Paramecia', statBonus: { strength: 4, speed: 1, intelligence: 0, stealth: 0, charisma: 0 }, bountyMultiplier: 1.5 },
  { id: 'mera', name: 'Mera Mera no Mi', type: 'Logia',     statBonus: { strength: 3, speed: 2, intelligence: 0, stealth: 0, charisma: 2 }, bountyMultiplier: 1.8 },
  { id: 'hie',  name: 'Hie Hie no Mi',  type: 'Logia',     statBonus: { strength: 2, speed: 1, intelligence: 2, stealth: 1, charisma: 1 }, bountyMultiplier: 1.7 },
  { id: 'yomi', name: 'Yomi Yomi no Mi',type: 'Paramecia', statBonus: { strength: 1, speed: 0, intelligence: 3, stealth: 2, charisma: 1 }, bountyMultiplier: 1.3 },
  { id: 'none', name: null, type: null, statBonus: { strength: 2, speed: 2, intelligence: 2, stealth: 2, charisma: 2 }, bountyMultiplier: 1.0 },
];

const DESCRIPTIONS = {
  es: { gomu: 'Te vuelves de goma. Inmune a rayos y golpes contundentes.', hana: 'Puedes brotar partes de tu cuerpo en cualquier superficie.', bara: 'Tu cuerpo puede separarse en piezas e inmune a cortes.', supa: 'Tu cuerpo se convierte en acero cortante.', mera: 'Controlas y te conviertes en fuego.', hie: 'Controlas y te conviertes en hielo.', yomi: 'Te permite revivir una vez tras la muerte.', none: 'Sin Akuma no Mi. Tu dominio del Haki y años de entrenamiento te dan +2 en todos los atributos.' },
  en: { gomu: 'Your body becomes rubber. Immune to lightning and blunt attacks.', hana: 'You can sprout body parts on any surface.', bara: 'Your body splits into pieces and is immune to cuts.', supa: 'Your body turns into cutting steel.', mera: 'You control and become fire.', hie: 'You control and become ice.', yomi: 'Allows you to revive once after death.', none: 'No Devil Fruit. Your Haki mastery and years of training grant you +2 to all attributes.' },
};

const NAMES_NONE = { es: 'Ninguna', en: 'None' };

export function getDevilFruits(lang = 'es') {
  const desc = DESCRIPTIONS[lang] ?? DESCRIPTIONS.es;
  const noneName = NAMES_NONE[lang] ?? NAMES_NONE.es;
  return BASE_FRUITS.map((f) => ({
    ...f,
    name: f.id === 'none' ? noneName : f.name,
    description: desc[f.id],
  }));
}

export const devilFruits = getDevilFruits('es');
