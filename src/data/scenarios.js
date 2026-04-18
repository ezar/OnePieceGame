export const scenarios = [
  {
    id: 1,
    title: 'El mapa del tesoro',
    description:
      'Encuentras un mapa que parece llevar al One Piece... pero pertenece a otro pirata que lo perdió hace días y está buscándolo desesperadamente.',
    image: '🗺️',
    choices: [
      {
        text: 'Quedártelo. El tesoro es para quien lo encuentra.',
        trait: 'ruthless',
        bountyBonus: 5_000_000,
        feedback: 'Los Marines añaden 5 millones a tu recompensa. ¡Eres un pirata de verdad!',
      },
      {
        text: 'Devolverlo a su dueño. Un mapa robado trae mala suerte.',
        trait: 'honorable',
        bountyBonus: 1_000_000,
        feedback: 'El pirata agradecido te da información valiosa sobre la ruta.',
      },
      {
        text: 'Proponer ir juntos y repartir el tesoro.',
        trait: 'friendly',
        statRequired: 'charisma', statMin: 3,
        bountyBonus: 3_000_000,
        feedback: '¡Formas una alianza inesperada! Los Marines vigilan a ambos.',
        recruitId: 'usopp',
        recruitCondition: 'success',
      },
    ],
  },
  {
    id: 2,
    title: 'Marines en el puerto',
    description:
      'Al llegar a una isla, ves que los Marines tienen bloqueado el puerto y están revisando todos los barcos. ¡Tu recompensa ya es considerable!',
    image: '⚓',
    choices: [
      {
        text: '¡Enfrentarlos directamente! No tienes miedo de nadie.',
        trait: 'brave',
        statRequired: 'strength', statMin: 4,
        bountyBonus: 8_000_000,
        feedback: '¡Derrotas a los Marines! Tu recompensa se dispara.',
        recruitId: 'zoro',
        recruitCondition: 'success',
      },
      {
        text: 'Disfrazarte y pasar desapercibido.',
        trait: 'cunning',
        statRequired: 'stealth', statMin: 3,
        bountyBonus: 0,
        feedback: 'Pasas sin que te detecten. Los Marines siguen buscando.',
      },
      {
        text: 'Buscar una entrada alternativa por el mar.',
        trait: 'cautious',
        statRequired: 'intelligence', statMin: 2,
        bountyBonus: 500_000,
        feedback: 'Encuentras una cueva submarina. Llegas tarde pero a salvo.',
      },
    ],
  },
  {
    id: 3,
    title: 'El pueblo hambriento',
    description:
      'Un pueblo bajo el dominio de un tirano local. La gente pasa hambre mientras el jefe acumula comida. ¡Te piden ayuda!',
    image: '🏘️',
    choices: [
      {
        text: 'Robar la comida al tirano y dársela al pueblo.',
        trait: 'robin_hood',
        bountyBonus: 4_000_000,
        feedback: 'El pueblo te llama héroe. Los Marines te llaman criminal.',
        recruitId: 'sanji',
        recruitCondition: 'always',
      },
      {
        text: 'Enfrentar al tirano en un duelo justo.',
        trait: 'honorable',
        statRequired: 'strength', statMin: 3,
        bountyBonus: 6_000_000,
        feedback: '¡Derrota al tirano! El pueblo es libre y tu fama crece.',
        recruitId: 'sanji',
        recruitCondition: 'success',
      },
      {
        text: 'No es tu problema. Seguir navegando.',
        trait: 'ruthless',
        bountyBonus: 0,
        feedback: 'Avanzas más rápido, pero algo te pesa en el pecho.',
      },
    ],
  },
  {
    id: 4,
    title: 'La tormenta perfecta',
    description:
      'Una tormenta brutal amenaza tu barco. Puedes buscar refugio en una isla desconocida o intentar atravesarla para llegar antes a tu destino.',
    image: '⛈️',
    choices: [
      {
        text: '¡Atravesar la tormenta! El tiempo es oro.',
        trait: 'brave',
        statRequired: 'strength', statMin: 3,
        bountyBonus: 2_000_000,
        feedback: '¡Lo logras por poco! La tripulación te admira (y te teme).',
      },
      {
        text: 'Buscar refugio y esperar. La mar no se desafía en vano.',
        trait: 'cautious',
        bountyBonus: 0,
        feedback: 'Llegas más tarde pero con el barco intacto.',
      },
      {
        text: 'Usar las corrientes de la tormenta para avanzar más rápido.',
        trait: 'cunning',
        statRequired: 'intelligence', statMin: 4,
        bountyBonus: 3_000_000,
        feedback: '¡Brillante! Llegas antes de lo esperado con una historia épica.',
        recruitId: 'nami',
        recruitCondition: 'success',
      },
    ],
  },
  {
    id: 5,
    title: 'La oferta del Gran Corsario',
    description:
      'Un poderoso corsario del Gobierno Mundial te ofrece un trato: trabaja para ellos y tendrás inmunidad, dinero y un barco nuevo.',
    image: '📜',
    choices: [
      {
        text: '¡Rechazarlo! La libertad no tiene precio.',
        trait: 'free_spirit',
        bountyBonus: 10_000_000,
        feedback: 'Tu recompensa se multiplica. ¡Eres una amenaza para el Gobierno!',
      },
      {
        text: 'Fingir aceptar para obtener información y luego escapar.',
        trait: 'cunning',
        statRequired: 'intelligence', statMin: 3,
        bountyBonus: 7_000_000,
        feedback: 'Obtienes información valiosa. El Gobierno está furioso.',
      },
      {
        text: 'Aceptar. El poder del Gobierno puede usarse para hacer el bien.',
        trait: 'pragmatic',
        bountyBonus: -5_000_000,
        feedback: 'Tu recompensa cae pero ahora tienes recursos oficiales.',
      },
    ],
  },
  {
    id: 6,
    title: 'El rival inesperado',
    description:
      'Un rival de tu pasado aparece en el mismo puerto. Tiene una tripulación más grande y dice que tu territorio le pertenece.',
    image: '⚔️',
    choices: [
      {
        text: '¡Desafiarlo a un duelo uno a uno!',
        trait: 'honorable',
        statRequired: 'strength', statMin: 4,
        bountyBonus: 8_000_000,
        feedback: '¡Ganas el duelo! Tu rival se retira con respeto.',
      },
      {
        text: 'Reclutar aliados locales antes del enfrentamiento.',
        trait: 'friendly',
        statRequired: 'charisma', statMin: 3,
        bountyBonus: 5_000_000,
        feedback: 'Con apoyo los superan en número. El rival huye.',
      },
      {
        text: 'Ignorarlo y zarpar. No vale la pena el riesgo.',
        trait: 'cautious',
        bountyBonus: 0,
        feedback: 'Evitas el conflicto. Tu rival dice que huiste.',
      },
    ],
  },
];
