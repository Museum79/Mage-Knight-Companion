import { TYPE_FR } from '../../../data/combatConstants'

export function isAttack(type: string) {
  return type.includes('Attack') || type === 'Any'
}

export function isBlock(type: string) {
  return type.includes('Block') || type === 'Any'
}

export function canFullyBlock(cardType: string, enemyType: string) {
  const table = {
    Physical: ['Physical', 'Block'],
    Fire: ['Ice', 'ColdFire'],
    Ice: ['Fire', 'ColdFire'],
    ColdFire: ['ColdFire'],
    Poison: ['Physical'],
  }
  if (cardType === 'Any') return true
  const t = cardType.replace(' Block', '').replace(' Attack', '')
  return (table[enemyType as keyof typeof table] || []).includes(t)
}

export function getModeLabel(mode: string): string {
  if (mode === 'powered') return 'Puissant'
  if (mode === 'tilt_attack') return 'Incl. Atq'
  if (mode === 'tilt_block') return 'Incl. Bloc'
  return 'Normal'
}

export function getFaceSummary(card: any, face: 'basic' | 'powered'): string {
  const isPowered = face === 'powered'
  const value = isPowered ? card.poweredValue : card.basicValue
  const label = isPowered ? (card.poweredLabel || card.poweredType) : (card.basicLabel || card.basicType)
  return `${label} ${value}`
}

export function getCardModeData(card: any, mode: string) {
  if (mode === 'powered') {
    return {
      displayName: card.poweredName || card.name,
      value: card.poweredValue,
      type: card.poweredType,
      modeLabel: getModeLabel(mode),
      summary: `+${card.poweredValue} ${card.poweredType}`,
    }
  }

  if (mode === 'tilt_attack') {
    return {
      displayName: card.name,
      value: 1,
      type: 'Physical Attack',
      modeLabel: getModeLabel(mode),
      note: 'Carte jouee inclinee pour +1 Attaque.',
      summary: '+1 Attaque',
    }
  }

  if (mode === 'tilt_block') {
    return {
      displayName: card.name,
      value: 1,
      type: 'Physical Block',
      modeLabel: getModeLabel(mode),
      note: 'Carte jouee inclinee pour +1 Blocage.',
      summary: '+1 Blocage',
    }
  }

  return {
    displayName: card.name,
    value: card.basicValue,
    type: card.basicType,
    modeLabel: getModeLabel(mode),
    summary: `+${card.basicValue} ${card.basicType}`,
  }
}

export interface CardContrib {
  card: any
  displayName: string
  modeLabel: string
  type: string
  typeBase: string
  value: number
  atk: number | null
  atkNote: string | null
  blk: number | null
  blkNote: string | null
}

export interface CombatAnalysis {
  totalAtk: number
  totalBlk: number
  canKill: boolean
  canSurvive: boolean
  atkNeeded: number
  blkNeeded: number
  isSwift: boolean
  isBrutal: boolean
  isRanged: boolean
  isParalyzed: boolean
  cardContribs: CardContrib[]
}

export function analyzeCombat(selectedEnemy: any, selectedCards: any[]): CombatAnalysis | null {
  if (!selectedEnemy) return null

  const isFortified = selectedEnemy.abilities.includes('Fortified')
  const isElusive = selectedEnemy.abilities.includes('Elusive')

  const cardContribs: CardContrib[] = selectedCards.map(card => {
    const modeData = getCardModeData(card, card.mode)
    const type = modeData.type || 'Physical'
    const value = modeData.value
    const typeBase = (type === 'Attack' || type === 'Block') ? 'Physical'
      : type.replace(' Attack', '').replace(' Block', '')

    let atk: number | null = null
    let atkNote: string | null = null
    if (isAttack(type)) {
      // Check Fortified ability: only Siege attacks work
      if (isFortified && !type.includes('Siege')) {
        atk = 0
        atkNote = 'Attaque inefficace (Fortifié — Siège requis)'
      }
      // Check Elusive ability: Physical attacks don't work
      else if (isElusive && typeBase === 'Physical') {
        atk = 0
        atkNote = 'Attaque physique inefficace (Insaisissable)'
      }
      // Check immunities
      else if (selectedEnemy.immunities.includes(typeBase)) {
        atk = 0
        atkNote = `Imm. ${TYPE_FR[typeBase as keyof typeof TYPE_FR] ?? typeBase}`
      }
      // Check ColdFire combo (Fire+Ice immunity)
      else if (typeBase === 'ColdFire') {
        const fireImmune = selectedEnemy.immunities.includes('Fire')
        const iceImmune = selectedEnemy.immunities.includes('Ice')
        if (fireImmune && iceImmune) {
          atk = 0
          atkNote = 'Immunité Feu Glacé (Imm. Feu + Glace)'
        } else if (fireImmune || iceImmune) {
          atk = Math.floor(value / 2)
          atkNote = `Résistance partielle Feu Glacé (÷2 = ${Math.floor(value / 2)})`
        } else {
          const fireResist = selectedEnemy.resistances.includes('Fire')
          const iceResist = selectedEnemy.resistances.includes('Ice')
          if (fireResist || iceResist) {
            atk = Math.floor(value / 2)
            atkNote = `Résistance ${fireResist ? 'Feu' : 'Glace'} (Feu Glacé ÷2 = ${Math.floor(value / 2)})`
          } else {
            atk = value
          }
        }
      }
      // Check resistances
      else if (selectedEnemy.resistances.includes(typeBase)) {
        atk = Math.floor(value / 2)
        atkNote = `Rés. ${TYPE_FR[typeBase as keyof typeof TYPE_FR] ?? typeBase} (÷2 = ${Math.floor(value / 2)})`
      } else {
        atk = value
      }
      if (modeData.note) atkNote = atkNote ? `${modeData.note} ${atkNote}` : modeData.note
    }

    let blk: number | null = null
    let blkNote: string | null = null
    if (isBlock(type)) {
      if (canFullyBlock(type, selectedEnemy.attackType)) {
        blk = value
      } else {
        blk = Math.floor(value / 2)
        blkNote = `Parade inefficace vs ${TYPE_FR[selectedEnemy.attackType as keyof typeof TYPE_FR] ?? selectedEnemy.attackType} (÷2 = ${Math.floor(value / 2)})`
      }
      if (modeData.note) blkNote = blkNote ? `${modeData.note} ${blkNote}` : modeData.note
    }

    return {
      card,
      displayName: modeData.displayName,
      modeLabel: modeData.modeLabel,
      type,
      typeBase,
      value,
      atk,
      atkNote,
      blk,
      blkNote,
    }
  })

  const totalAtk = cardContribs.reduce((s, c) => s + (c.atk ?? 0), 0)
  const totalBlk = cardContribs.reduce((s, c) => s + (c.blk ?? 0), 0)
  const isSwift = selectedEnemy.abilities.includes('Swift')
  const isBrutal = selectedEnemy.abilities.includes('Brutal')
  const isRanged = selectedEnemy.abilities.includes('Ranged')
  const isParalyze = selectedEnemy.abilities.includes('Paralyze')
  const blkNeeded = selectedEnemy.attack * (isSwift ? 2 : 1)

  const canSurvive = totalBlk >= blkNeeded
  const isParalyzed = isParalyze && !canSurvive
  const canKill = isParalyzed ? false : totalAtk >= selectedEnemy.armor

  return {
    totalAtk,
    totalBlk,
    canKill,
    canSurvive,
    atkNeeded: selectedEnemy.armor,
    blkNeeded,
    isSwift,
    isBrutal,
    isRanged,
    isParalyzed,
    cardContribs,
  }
}
