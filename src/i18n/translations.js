export const translations = {
  es: {
    switchTo: '🇬🇧 EN',

    creator: {
      subtitle: '¡Crea tu personaje pirata!',
      nameLabel: '⚓ Tu nombre pirata',
      namePlaceholder: 'ej. Monkey D. Luffy',
      originLabel: '🌊 Mar de origen',
      fruitLabel: '🍎 Akuma no Mi',
      statsLabel: '⚡ Atributos',
      remainingPts: 'pts',
      submit: '¡ZARPAR AL MAR! ⛵',
    },

    stats: {
      strength:     { label: 'Fuerza',        emoji: '💪', color: 'text-red-400' },
      speed:        { label: 'Velocidad',      emoji: '⚡', color: 'text-yellow-400' },
      intelligence: { label: 'Inteligencia',   emoji: '🧠', color: 'text-blue-400' },
      stealth:      { label: 'Sigilo',         emoji: '🌑', color: 'text-purple-400' },
      charisma:     { label: 'Carisma',        emoji: '✨', color: 'text-pink-400' },
    },

    fruits: {
      none: 'Ninguna',
      gomu: 'Te vuelves de goma. Inmune a rayos y golpes contundentes.',
      hana: 'Puedes brotar partes de tu cuerpo en cualquier superficie.',
      bara: 'Tu cuerpo puede separarse en piezas e inmune a cortes.',
      supa: 'Tu cuerpo se convierte en acero cortante.',
      mera: 'Controlas y te conviertes en fuego.',
      hie:  'Controlas y te conviertes en hielo.',
      yomi: 'Te permite revivir una vez tras la muerte.',
    },

    game: {
      crewLabel: 'Tripulación:',
      recruitTag: '★ puede reclutar tripulante',
      statYouHave: 'tienes',
      insufficientStats: 'No tenías los stats suficientes. Recompensa reducida.',
      nextIsland: 'SIGUIENTE ISLA →',
      seeBounty: '¡VER MI RECOMPENSA! 🏴‍☠️',
      joinsCrew: (name) => `¡${name} se une a tu tripulación!`,
    },

    result: {
      title: '¡PARTIDA COMPLETADA!',
      crewTitle: '⛵ TU TRIPULACIÓN',
      badgesTitle: '🏆 LOGROS',
      adventureTitle: '📜 TU AVENTURA',
      finalBounty: 'Recompensa final',
      playAgain: '¡JUGAR DE NUEVO! 🔄',
    },

    puzzle: {
      preparing: 'Preparando tu recompensa...',
      heading: '🧩 ¡MONTA EL PUZZLE!',
      sub: 'Descubre tu cartel de recompensa',
      movesLabel: 'movimientos',
      hint: '👁️ Pista (2s)',
      shuffle: '🔀 Mezclar',
      solved: '🎉 ¡PUZZLE RESUELTO!',
      download: '📥 DESCARGAR POSTER',
    },

    poster: {
      worldGov: '✦ GOBIERNO MUNDIAL ✦',
      hq: 'MARINA FORD — CUARTEL GENERAL',
      fruitUser: (name) => `Usuario de la ${name}`,
      bountyLabel: 'RECOMPENSA',
      berries: 'BERRIES',
      origin: 'Origen',
      rank: 'Rango',
      style: 'Estilo',
      marineHQ: '✦ MARINE HQ ✦',
      downloadBtn: '📥 Descargar poster',
    },

    crewCard: {
      newMember: '✦ NUEVO TRIPULANTE ✦',
      tapToContinue: 'Toca para continuar',
    },

    badges: {
      yonko:    { label: 'Nivel Yonko',      desc: '500M+ de recompensa' },
      supernova:{ label: 'Supernoeva',        desc: '100M+ de recompensa' },
      honor:    { label: 'Código Bushido',    desc: '2+ decisiones honorables' },
      heroe:    { label: 'Héroe del Pueblo',  desc: 'Robaste a los ricos' },
      libre:    { label: 'Espíritu Libre',    desc: 'Rechazaste el poder' },
      astuto:   { label: 'Zorro del Mar',     desc: '2+ decisiones astutas' },
      perfecto: { label: 'Partida Perfecta',  desc: '¡Todo éxitos!' },
      crew4:    { label: 'Capitán Completo',  desc: 'Reclutaste a toda la tripulación' },
    },

    ranks: [
      { min: 500_000_000, rank: 'Yonko',           color: 'text-red-400' },
      { min: 200_000_000, rank: 'Gran Corsario',    color: 'text-orange-400' },
      { min: 100_000_000, rank: 'Supernoeva',       color: 'text-yellow-400' },
      { min: 50_000_000,  rank: 'Pirata Notorio',   color: 'text-lime-400' },
      { min: 10_000_000,  rank: 'Pirata Conocido',  color: 'text-sky-400' },
      { min: 0,           rank: 'Pirata Novato',    color: 'text-stone-400' },
    ],

    traits: {
      ruthless:    'Sin piedad',
      honorable:   'Código de honor',
      friendly:    'Alma de marinero',
      brave:       'Temerario',
      cunning:     'Astuto',
      cautious:    'Prudente',
      robin_hood:  'Héroe del pueblo',
      free_spirit: 'Espíritu libre',
      pragmatic:   'Pragmático',
    },
  },

  // ─── ENGLISH ────────────────────────────────────────────────────────────────

  en: {
    switchTo: '🇪🇸 ES',

    creator: {
      subtitle: 'Create your pirate character!',
      nameLabel: '⚓ Your pirate name',
      namePlaceholder: 'e.g. Monkey D. Luffy',
      originLabel: '🌊 Sea of origin',
      fruitLabel: '🍎 Devil Fruit',
      statsLabel: '⚡ Attributes',
      remainingPts: 'pts',
      submit: 'SET SAIL! ⛵',
    },

    stats: {
      strength:     { label: 'Strength',      emoji: '💪', color: 'text-red-400' },
      speed:        { label: 'Speed',          emoji: '⚡', color: 'text-yellow-400' },
      intelligence: { label: 'Intelligence',   emoji: '🧠', color: 'text-blue-400' },
      stealth:      { label: 'Stealth',        emoji: '🌑', color: 'text-purple-400' },
      charisma:     { label: 'Charisma',       emoji: '✨', color: 'text-pink-400' },
    },

    fruits: {
      none: 'None',
      gomu: 'Your body becomes rubber. Immune to lightning and blunt attacks.',
      hana: 'You can sprout body parts on any surface.',
      bara: 'Your body splits into pieces and is immune to cuts.',
      supa: 'Your body turns into cutting steel.',
      mera: 'You control and become fire.',
      hie:  'You control and become ice.',
      yomi: 'Allows you to revive once after death.',
    },

    game: {
      crewLabel: 'Crew:',
      recruitTag: '★ can recruit crew member',
      statYouHave: 'you have',
      insufficientStats: "You didn't have enough stats. Reduced bounty.",
      nextIsland: 'NEXT ISLAND →',
      seeBounty: 'SEE MY BOUNTY! 🏴‍☠️',
      joinsCrew: (name) => `${name} joins your crew!`,
    },

    result: {
      title: 'GAME COMPLETE!',
      crewTitle: '⛵ YOUR CREW',
      badgesTitle: '🏆 ACHIEVEMENTS',
      adventureTitle: '📜 YOUR ADVENTURE',
      finalBounty: 'Final bounty',
      playAgain: 'PLAY AGAIN! 🔄',
    },

    puzzle: {
      preparing: 'Preparing your bounty...',
      heading: '🧩 SOLVE THE PUZZLE!',
      sub: 'Discover your wanted poster',
      movesLabel: 'moves',
      hint: '👁️ Hint (2s)',
      shuffle: '🔀 Shuffle',
      solved: '🎉 PUZZLE SOLVED!',
      download: '📥 DOWNLOAD POSTER',
    },

    poster: {
      worldGov: '✦ WORLD GOVERNMENT ✦',
      hq: 'MARINEFORD — HEADQUARTERS',
      fruitUser: (name) => `User of the ${name}`,
      bountyLabel: 'BOUNTY',
      berries: 'BERRIES',
      origin: 'Origin',
      rank: 'Rank',
      style: 'Style',
      marineHQ: '✦ MARINE HQ ✦',
      downloadBtn: '📥 Download poster',
    },

    crewCard: {
      newMember: '✦ NEW CREW MEMBER ✦',
      tapToContinue: 'Tap to continue',
    },

    badges: {
      yonko:    { label: 'Yonko Level',     desc: '500M+ bounty' },
      supernova:{ label: 'Supernova',        desc: '100M+ bounty' },
      honor:    { label: 'Bushido Code',     desc: '2+ honorable decisions' },
      heroe:    { label: "People's Hero",    desc: 'You robbed from the rich' },
      libre:    { label: 'Free Spirit',      desc: 'You rejected power' },
      astuto:   { label: 'Sea Fox',          desc: '2+ cunning decisions' },
      perfecto: { label: 'Perfect Run',      desc: 'All successes!' },
      crew4:    { label: 'Full Captain',     desc: 'Recruited the full crew' },
    },

    ranks: [
      { min: 500_000_000, rank: 'Yonko',            color: 'text-red-400' },
      { min: 200_000_000, rank: 'Warlord',           color: 'text-orange-400' },
      { min: 100_000_000, rank: 'Supernova',         color: 'text-yellow-400' },
      { min: 50_000_000,  rank: 'Notorious Pirate',  color: 'text-lime-400' },
      { min: 10_000_000,  rank: 'Known Pirate',      color: 'text-sky-400' },
      { min: 0,           rank: 'Rookie Pirate',     color: 'text-stone-400' },
    ],

    traits: {
      ruthless:    'Ruthless',
      honorable:   'Code of Honor',
      friendly:    'Seafarer Soul',
      brave:       'Fearless',
      cunning:     'Cunning',
      cautious:    'Cautious',
      robin_hood:  "People's Hero",
      free_spirit: 'Free Spirit',
      pragmatic:   'Pragmatic',
    },
  },
};
