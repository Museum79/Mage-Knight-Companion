import arythea from '../assets/img/heroes/Arythea.webp'
import goldyx from '../assets/img/heroes/Goldyx.webp'
import norowas from '../assets/img/heroes/Norowas.webp'
import tovak from '../assets/img/heroes/Tovak.webp'

export const HEROES = [
  {
    id: 'arythea',
    name: 'Arythea',
    subtitle: 'La Magicienne de Combat',
    color: '#f87171',
    glowColor: '#ef4444',
    image: arythea,
    starterDeckIds: [
      'march', 'march', 'stamina', 'rage', 'threaten',
      'swiftness', 'concentration', 'promising_target', 'improvisation',
      'arythea_battle_versatility', 'arythea_battle_skill',
      'arythea_fire_bolt', 'arythea_crystallize', 'arythea_spin_attack',
    ],
  },
  {
    id: 'goldyx',
    name: 'Goldyx',
    subtitle: 'Le Mage Draconien',
    color: '#86efac',
    glowColor: '#22c55e',
    image: goldyx,
    starterDeckIds: [
      'march', 'march', 'stamina', 'rage', 'threaten',
      'swiftness', 'concentration', 'promising_target', 'improvisation',
      'goldyx_will_focus', 'goldyx_cold_toughness',
      'goldyx_pure_magic', 'goldyx_tranquility', 'goldyx_demolish',
    ],
  },
  {
    id: 'norowas',
    name: 'Norowas',
    subtitle: "L'Elfe des Plaines",
    color: '#93c5fd',
    glowColor: '#ffffff',
    image: norowas,
    starterDeckIds: [
      'march', 'march', 'stamina', 'rage', 'threaten',
      'swiftness', 'concentration', 'promising_target', 'improvisation',
      'norowas_noble_manners', 'norowas_peaceful',
      'norowas_swift', 'norowas_determination', 'norowas_leadership',
    ],
  },
  {
    id: 'tovak',
    name: 'Tovak',
    subtitle: 'Le Chevalier Draconien',
    color: '#c4b5fd',
    glowColor: '#eab308',
    image: tovak,
    starterDeckIds: [
      'march', 'march', 'stamina', 'rage', 'threaten',
      'swiftness', 'concentration', 'promising_target', 'improvisation',
      'tovak_instinct', 'tovak_blood_rage',
      'tovak_ruthless', 'tovak_resistance', 'tovak_scout_ahead',
    ],
  },
]
