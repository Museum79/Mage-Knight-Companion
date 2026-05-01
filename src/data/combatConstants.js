export const ATTACK_COLOR = {
  Physical: 'text-slate-300',
  Fire: 'text-red-400',
  Ice: 'text-blue-400',
  ColdFire: 'text-purple-400',
  Poison: 'text-green-400',
}

export const ATTACK_BG = {
  Physical: 'bg-slate-700',
  Fire: 'bg-red-800',
  Ice: 'bg-blue-800',
  ColdFire: 'bg-purple-800',
  Poison: 'bg-green-800',
}

export const TYPE_FR = {
  Physical: 'Physique',
  Fire: 'Feu',
  Ice: 'Glace',
  ColdFire: 'Feu Glacé',
  Poison: 'Poison',
}

export const ABILITY_FR = {
  Swift: 'Vif',
  Brutal: 'Brutal',
  Ranged: 'À distance',
  Fortified: 'Fortifié',
  Paralyze: 'Paralysie',
  Elusive: 'Insaisissable',
}

export const CARD_COLOR_THEME = {
  red: { accent: '#f87171', border: 'rgba(200,60,50,0.55)', activeBg: 'rgba(100,20,15,0.35)', dot: 'bg-red-500' },
  blue: { accent: '#93c5fd', border: 'rgba(60,110,200,0.55)', activeBg: 'rgba(20,45,120,0.35)', dot: 'bg-blue-500' },
  green: { accent: '#86efac', border: 'rgba(40,160,70,0.55)', activeBg: 'rgba(15,80,30,0.35)', dot: 'bg-green-500' },
  purple: { accent: '#c4b5fd', border: 'rgba(126,90,220,0.55)', activeBg: 'rgba(70,35,120,0.35)', dot: 'bg-violet-500' },
  white: { accent: '#e2d5b5', border: 'rgba(170,155,110,0.45)', activeBg: 'rgba(80,70,50,0.30)', dot: 'bg-stone-400' },
  gold: { accent: '#fbbf24', border: 'rgba(217,119,6,0.55)', activeBg: 'rgba(120,53,15,0.35)', dot: 'bg-amber-400' },
}

export const COLOR_GROUPS = [
  { color: 'red', label: 'Combat' },
  { color: 'blue', label: 'Magie' },
  { color: 'green', label: 'Mouvement' },
  { color: 'purple', label: 'Sorts' },
  { color: 'white', label: 'Influence' },
  { color: 'gold', label: 'Artefacts' },
]

export const CARD_KIND_LABELS = {
  action: 'Action',
  spell: 'Sort',
  advanced: 'Avancée',
  artifact: 'Artefact',
  wound: 'Blessure',
}

export const ENEMY_THEME = {
  orc: {
    label: 'Maraudeur',
    border: 'rgba(72, 195, 82, 0.72)',
    accent: 'rgba(65, 205, 80, 0.52)',
    background: 'linear-gradient(115deg, rgba(55, 185, 72, 0.62) 0%, rgba(28, 96, 42, 0.34) 28%, rgba(20, 16, 12, 0.95) 72%)',
    labelClass: 'text-green-400',
    cardOverlay: 'bg-gradient-to-t from-green-800 via-black/30 to-transparent',
    avatarBorder: 'border-green-700/70',
  },
  dungeon: {
    label: 'Donjon',
    border: 'rgba(194, 160, 110, 0.70)',
    accent: 'rgba(191, 152, 92, 0.48)',
    background: 'linear-gradient(115deg, rgba(174, 139, 92, 0.58) 0%, rgba(114, 84, 48, 0.32) 28%, rgba(18, 14, 10, 0.96) 72%)',
    labelClass: 'text-amber-500',
    cardOverlay: 'bg-gradient-to-t from-amber-900/65 via-black/10 to-transparent',
    avatarBorder: 'border-amber-600/70',
  },
  mage_tower: {
    label: 'Tour du mage',
    border: 'rgba(161, 119, 214, 0.74)',
    accent: 'rgba(158, 108, 214, 0.52)',
    background: 'linear-gradient(115deg, rgba(135, 90, 190, 0.60) 0%, rgba(86, 57, 122, 0.36) 28%, rgba(16, 13, 19, 0.96) 72%)',
    labelClass: 'text-purple-400',
    cardOverlay: 'bg-gradient-to-t from-purple-900 via-black/10 to-transparent',
    avatarBorder: 'border-purple-500/70',
  },
  keep: {
    label: 'Forteresse',
    border: 'rgba(210, 210, 210, 1.0)',
    accent: 'rgba(190, 190, 190, 0.90)',
    background: 'linear-gradient(115deg, rgba(200, 200, 200, 0.95) 0%, rgba(130, 130, 130, 0.70) 28%, rgba(14, 14, 14, 0.97) 72%)',
    labelClass: 'text-slate-200',
    cardOverlay: 'bg-gradient-to-t from-gray-300/80 via-gray-600/40 to-transparent',
    avatarBorder: 'border-gray-300/30',
  },
  city: {
    label: 'Cité',
    border: 'rgba(228, 223, 206, 0.72)',
    accent: 'rgba(219, 214, 191, 0.50)',
    background: 'linear-gradient(115deg, rgba(218, 211, 193, 0.56) 0%, rgba(131, 118, 94, 0.30) 28%, rgba(16, 13, 10, 0.96) 72%)',
    labelClass: 'text-stone-300',
    cardOverlay: 'bg-gradient-to-t from-stone-700/65 via-black/10 to-transparent',
    avatarBorder: 'border-stone-300/70',
  },
  draconum: {
    label: 'Draconum',
    border: 'rgba(203, 96, 77, 0.74)',
    accent: 'rgba(210, 94, 66, 0.52)',
    background: 'linear-gradient(115deg, rgba(177, 71, 53, 0.64) 0%, rgba(105, 40, 30, 0.36) 28%, rgba(18, 10, 9, 0.97) 72%)',
    labelClass: 'text-red-400',
    cardOverlay: 'bg-gradient-to-t from-red-900/65 via-black/10 to-transparent',
    avatarBorder: 'border-red-500/70',
  },
}

export const CATEGORY_ORDER = ['orc', 'dungeon', 'mage_tower', 'keep', 'city', 'draconum']

export const ABILITY_RULES = {
  Swift: {
    icon: '⚡',
    label: 'Vif',
    desc: 'Doit être bloqué intégralement. Si le blocage est insuffisant, les dégâts non bloqués sont doublés.',
  },
  Brutal: {
    icon: '💥',
    label: 'Brutal',
    desc: "Si l'ennemi n'est pas bloqué du tout, ses dégâts sont doublés.",
  },
  Ranged: {
    icon: '🏹',
    label: 'À distance',
    desc: 'Attaque avant la phase de combat. Les dégâts sont infligés indépendamment du blocage, sauf contre-mesure spéciale.',
  },
  Fortified: {
    icon: '🏰',
    label: 'Fortifié',
    desc: 'Requiert une attaque de type Siège pour infliger des dégâts. Les attaques normales sont totalement inefficaces.',
  },
  Paralyze: {
    icon: '💀',
    label: 'Paralysie',
    desc: "Si vous subissez ses dégâts sans les bloquer intégralement, vous êtes paralysé jusqu'à la fin du tour.",
  },
  Elusive: {
    icon: '👁️',
    label: 'Insaisissable',
    desc: "Ne peut être attaqué qu'avec des sorts ou compétences spéciales. Les attaques physiques ordinaires n'ont aucun effet.",
  },
}

export const RESISTANCE_RULE = {
  icon: '½',
  desc: 'Résistance : les dégâts de ce type sont divisés par 2 (arrondi vers le bas).',
}

export const IMMUNITY_RULE = {
  icon: '✗',
  desc: 'Immunité : cet ennemi est totalement insensible à ce type de dégâts — valeur réduite à 0.',
}
