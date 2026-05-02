import { describe, it, expect } from 'vitest'
import {
  isAttack,
  isBlock,
  canFullyBlock,
  getModeLabel,
  getCardModeData,
  analyzeCombat,
} from '../combatAnalysis'

// ─── Helpers ────────────────────────────────────────────────────────────────

function makeCard(overrides: Partial<{
  id: string
  name: string
  mode: string
  basicValue: number
  basicType: string
  poweredValue: number
  poweredType: string
  poweredName: string
}> = {}) {
  return {
    id: 'test',
    name: 'Test Card',
    mode: 'normal',
    basicValue: 4,
    basicType: 'Physical Attack',
    poweredValue: 6,
    poweredType: 'Physical Attack',
    ...overrides,
  }
}

// ─── Fixtures ───────────────────────────────────────────────────────────────

const gardien = {
  armor: 7,
  attack: 3,
  attackType: 'Physical',
  abilities: ['Fortified'],
  resistances: [],
  immunities: [],
}

const illusionniste = {
  armor: 3,
  attack: 4,
  attackType: 'Physical',
  abilities: ['Elusive'],
  resistances: [],
  immunities: [],
}

const meduse = {
  armor: 4,
  attack: 5,
  attackType: 'Physical',
  abilities: ['Paralyze'],
  resistances: [],
  immunities: [],
}

const grandDragon = {
  armor: 9,
  attack: 9,
  attackType: 'ColdFire',
  abilities: ['Brutal'],
  resistances: ['Physical'],
  immunities: ['Fire', 'Ice'],
}

const artilleur = {
  armor: 6,
  attack: 7,
  attackType: 'Fire',
  abilities: ['Ranged', 'Brutal'],
  resistances: [],
  immunities: [],
}

const cavalierLoup = {
  armor: 4,
  attack: 3,
  attackType: 'Physical',
  abilities: ['Swift'],
  resistances: [],
  immunities: [],
}

const golem = {
  armor: 5,
  attack: 4,
  attackType: 'Physical',
  abilities: [],
  resistances: ['Physical'],
  immunities: [],
}

const gargouille = {
  armor: 4,
  attack: 4,
  attackType: 'Physical',
  abilities: [],
  resistances: [],
  immunities: ['Physical'],
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('combatAnalysis', () => {

  describe('isAttack', () => {
    it('returns true for "Physical Attack"', () => {
      expect(isAttack('Physical Attack')).toBe(true)
    })

    it('returns true for "Fire Attack"', () => {
      expect(isAttack('Fire Attack')).toBe(true)
    })

    it('returns true for "ColdFire Attack"', () => {
      expect(isAttack('ColdFire Attack')).toBe(true)
    })

    it('returns true for "Siege Attack"', () => {
      expect(isAttack('Siege Attack')).toBe(true)
    })

    it('returns true for "Attack" alone', () => {
      expect(isAttack('Attack')).toBe(true)
    })

    it('returns true for "Any"', () => {
      expect(isAttack('Any')).toBe(true)
    })

    it('returns false for "Physical Block"', () => {
      expect(isAttack('Physical Block')).toBe(false)
    })

    it('returns false for "Block" alone', () => {
      expect(isAttack('Block')).toBe(false)
    })

    it('returns false for "Move"', () => {
      expect(isAttack('Move')).toBe(false)
    })
  })

  describe('isBlock', () => {
    it('returns true for "Physical Block"', () => {
      expect(isBlock('Physical Block')).toBe(true)
    })

    it('returns true for "Ice Block"', () => {
      expect(isBlock('Ice Block')).toBe(true)
    })

    it('returns true for "Block" alone', () => {
      expect(isBlock('Block')).toBe(true)
    })

    it('returns true for "Any"', () => {
      expect(isBlock('Any')).toBe(true)
    })

    it('returns false for "Physical Attack"', () => {
      expect(isBlock('Physical Attack')).toBe(false)
    })

    it('returns false for "Attack" alone', () => {
      expect(isBlock('Attack')).toBe(false)
    })

    it('returns false for "Fire Attack"', () => {
      expect(isBlock('Fire Attack')).toBe(false)
    })

    it('returns false for "Move"', () => {
      expect(isBlock('Move')).toBe(false)
    })
  })

  describe('canFullyBlock', () => {
    describe('Physical blocks Physical and Block', () => {
      it('Physical Block vs Physical', () => {
        expect(canFullyBlock('Physical Block', 'Physical')).toBe(true)
      })

      it('Block (plain) vs Physical — tests typeBase fix', () => {
        expect(canFullyBlock('Block', 'Physical')).toBe(true)
      })
    })

    describe('Fire blocks Ice and ColdFire', () => {
      it('Fire Block vs Ice', () => {
        expect(canFullyBlock('Fire Block', 'Ice')).toBe(true)
      })

      it('Fire Block vs ColdFire returns false (ColdFire only blocks ColdFire)', () => {
        expect(canFullyBlock('Fire Block', 'ColdFire')).toBe(false)
      })
    })

    describe('Ice blocks Fire and ColdFire', () => {
      it('Ice Block vs Fire', () => {
        expect(canFullyBlock('Ice Block', 'Fire')).toBe(true)
      })

      it('Ice Block vs ColdFire returns false (ColdFire only blocks ColdFire)', () => {
        expect(canFullyBlock('Ice Block', 'ColdFire')).toBe(false)
      })
    })

    describe('ColdFire blocks Fire and Ice and ColdFire', () => {
      it('ColdFire Block vs ColdFire', () => {
        expect(canFullyBlock('ColdFire Block', 'ColdFire')).toBe(true)
      })

      it('ColdFire Block vs Fire', () => {
        expect(canFullyBlock('ColdFire Block', 'Fire')).toBe(true)
      })

      it('ColdFire Block vs Ice', () => {
        expect(canFullyBlock('ColdFire Block', 'Ice')).toBe(true)
      })
    })

    describe('Poison blocks nothing (not in table)', () => {
      it('Poison Block vs Physical returns false', () => {
        expect(canFullyBlock('Poison Block', 'Physical')).toBe(false)
      })
    })

    describe('Any blocks everything', () => {
      it('Any vs Fire', () => {
        expect(canFullyBlock('Any', 'Fire')).toBe(true)
      })

      it('Any vs ColdFire', () => {
        expect(canFullyBlock('Any', 'ColdFire')).toBe(true)
      })

      it('Any vs Physical', () => {
        expect(canFullyBlock('Any', 'Physical')).toBe(true)
      })
    })

    describe('incompatible blocks return false', () => {
      it('Physical Block vs Fire', () => {
        expect(canFullyBlock('Physical Block', 'Fire')).toBe(false)
      })

      it('Physical Block vs Ice', () => {
        expect(canFullyBlock('Physical Block', 'Ice')).toBe(false)
      })

      it('Fire Block vs Physical', () => {
        expect(canFullyBlock('Fire Block', 'Physical')).toBe(false)
      })

      it('Ice Block vs Physical', () => {
        expect(canFullyBlock('Ice Block', 'Physical')).toBe(false)
      })
    })
  })

  describe('getModeLabel', () => {
    it.each([
      ['powered', 'Puissant'],
      ['tilt_attack', 'Incl. Atq'],
      ['tilt_block', 'Incl. Bloc'],
      ['normal', 'Normal'],
      ['', 'Normal'],
      ['unknown', 'Normal'],
    ])('getModeLabel(%s) === %s', (mode, expected) => {
      expect(getModeLabel(mode)).toBe(expected)
    })
  })

  describe('getCardModeData', () => {
    describe('mode normal', () => {
      it('uses basicValue and basicType', () => {
        const card = makeCard({ basicValue: 2, basicType: 'Physical Attack' })
        const result = getCardModeData(card, 'normal')
        expect(result.value).toBe(2)
        expect(result.type).toBe('Physical Attack')
      })

      it('sets modeLabel to Normal', () => {
        const result = getCardModeData(makeCard(), 'normal')
        expect(result.modeLabel).toBe('Normal')
      })

      it('uses card.name as displayName', () => {
        const card = makeCard({ name: 'Rage' })
        const result = getCardModeData(card, 'normal')
        expect(result.displayName).toBe('Rage')
      })

      it('includes summary in format +X Type', () => {
        const card = makeCard({ basicValue: 3, basicType: 'Fire Attack' })
        const result = getCardModeData(card, 'normal')
        expect(result.summary).toBe('+3 Fire Attack')
      })
    })

    describe('mode powered', () => {
      it('uses poweredValue and poweredType', () => {
        const card = makeCard({ poweredValue: 5, poweredType: 'Fire Attack' })
        const result = getCardModeData(card, 'powered')
        expect(result.value).toBe(5)
        expect(result.type).toBe('Fire Attack')
      })

      it('uses poweredName if available', () => {
        const card = makeCard({ name: 'Fireball', poweredName: 'Firestorm' })
        const result = getCardModeData(card, 'powered')
        expect(result.displayName).toBe('Firestorm')
      })

      it('falls back to name if no poweredName', () => {
        const card = makeCard({ name: 'Rage' })
        const result = getCardModeData(card, 'powered')
        expect(result.displayName).toBe('Rage')
      })

      it('sets modeLabel to Puissant', () => {
        const result = getCardModeData(makeCard(), 'powered')
        expect(result.modeLabel).toBe('Puissant')
      })
    })

    describe('mode tilt_attack', () => {
      it('forces value=1 and type=Physical Attack', () => {
        const card = makeCard({ basicValue: 3, basicType: 'Fire Attack' })
        const result = getCardModeData(card, 'tilt_attack')
        expect(result.value).toBe(1)
        expect(result.type).toBe('Physical Attack')
      })

      it('sets modeLabel to Incl. Atq', () => {
        const result = getCardModeData(makeCard(), 'tilt_attack')
        expect(result.modeLabel).toBe('Incl. Atq')
      })

      it('includes note about tilt', () => {
        const result = getCardModeData(makeCard(), 'tilt_attack')
        expect(result.note).toContain('Attaque')
      })
    })

    describe('mode tilt_block', () => {
      it('forces value=1 and type=Physical Block', () => {
        const card = makeCard({ basicValue: 3, basicType: 'Fire Attack' })
        const result = getCardModeData(card, 'tilt_block')
        expect(result.value).toBe(1)
        expect(result.type).toBe('Physical Block')
      })

      it('sets modeLabel to Incl. Bloc', () => {
        const result = getCardModeData(makeCard(), 'tilt_block')
        expect(result.modeLabel).toBe('Incl. Bloc')
      })

      it('includes note about tilt', () => {
        const result = getCardModeData(makeCard(), 'tilt_block')
        expect(result.note).toContain('Blocage')
      })
    })
  })

  describe('analyzeCombat', () => {
    describe('null guard', () => {
      it('returns null if selectedEnemy is null', () => {
        expect(analyzeCombat(null, [])).toBeNull()
      })

      it('returns null if selectedEnemy is undefined', () => {
        expect(analyzeCombat(undefined, [])).toBeNull()
      })

      it('works with empty card list', () => {
        const result = analyzeCombat(golem, [])
        expect(result).not.toBeNull()
        expect(result?.totalAtk).toBe(0)
        expect(result?.totalBlk).toBe(0)
      })
    })

    describe('enemy flags in result', () => {
      it('sets isSwift=true for Swift enemies', () => {
        const result = analyzeCombat(cavalierLoup, [])
        expect(result?.isSwift).toBe(true)
      })

      it('sets isBrutal=true for Brutal enemies', () => {
        const result = analyzeCombat(artilleur, [])
        expect(result?.isBrutal).toBe(true)
      })

      it('sets isRanged=true for Ranged enemies', () => {
        const result = analyzeCombat(artilleur, [])
        expect(result?.isRanged).toBe(true)
      })

      it('sets isParalyzed=true when Paralyze && insufficient block', () => {
        const card = makeCard({ basicValue: 1, basicType: 'Physical Block' })
        const result = analyzeCombat(meduse, [card])
        expect(result?.isParalyzed).toBe(true)
      })

      it('sets all flags false for normal enemies', () => {
        const result = analyzeCombat(golem, [])
        expect(result?.isSwift).toBe(false)
        expect(result?.isBrutal).toBe(false)
        expect(result?.isRanged).toBe(false)
        expect(result?.isParalyzed).toBe(false)
      })
    })

    describe('ATK — Fortified', () => {
      it('Physical Attack vs Fortified → atk=0 with note', () => {
        const card = makeCard({ basicValue: 4, basicType: 'Physical Attack' })
        const result = analyzeCombat(gardien, [card])
        expect(result?.cardContribs[0].atk).toBe(0)
        expect(result?.cardContribs[0].atkNote).toContain('Fortifié')
      })

      it('Fire Attack vs Fortified → atk=0', () => {
        const card = makeCard({ basicValue: 4, basicType: 'Fire Attack' })
        const result = analyzeCombat(gardien, [card])
        expect(result?.cardContribs[0].atk).toBe(0)
      })

      it('Siege Attack vs Fortified → passes check', () => {
        const card = makeCard({ mode: 'powered', poweredValue: 5, poweredType: 'Siege Attack' })
        const result = analyzeCombat(gardien, [card])
        expect(result?.cardContribs[0].atk).toBe(5)
      })

      it('Physical Block vs Fortified → atk=null (block only)', () => {
        const card = makeCard({ basicValue: 3, basicType: 'Physical Block' })
        const result = analyzeCombat(gardien, [card])
        expect(result?.cardContribs[0].atk).toBeNull()
      })
    })

    describe('ATK — Elusive', () => {
      it('Physical Attack vs Elusive → atk=0', () => {
        const card = makeCard({ basicValue: 3, basicType: 'Physical Attack' })
        const result = analyzeCombat(illusionniste, [card])
        expect(result?.cardContribs[0].atk).toBe(0)
      })

      it('Attack (plain, typeBase=Physical) vs Elusive → atk=0 — tests typeBase fix', () => {
        const card = makeCard({ basicValue: 2, basicType: 'Attack' })
        const result = analyzeCombat(illusionniste, [card])
        expect(result?.cardContribs[0].atk).toBe(0)
      })

      it('Fire Attack vs Elusive → passes (Fire is not Physical)', () => {
        const card = makeCard({ basicValue: 4, basicType: 'Fire Attack' })
        const result = analyzeCombat(illusionniste, [card])
        expect(result?.cardContribs[0].atk).toBe(4)
      })

      it('ColdFire Attack vs Elusive → passes', () => {
        const card = makeCard({ basicValue: 4, basicType: 'ColdFire Attack' })
        const result = analyzeCombat(illusionniste, [card])
        expect(result?.cardContribs[0].atk).toBe(4)
      })
    })

    describe('ATK — Direct Immunity', () => {
      it('Physical Attack vs Physical immunity → atk=0', () => {
        const card = makeCard({ basicValue: 5, basicType: 'Physical Attack' })
        const result = analyzeCombat(gargouille, [card])
        expect(result?.cardContribs[0].atk).toBe(0)
        expect(result?.cardContribs[0].atkNote).toContain('Physique')
      })

      it('Fire Attack vs Fire immunity → atk=0', () => {
        const fireImmune = { ...golem, immunities: ['Fire'] }
        const card = makeCard({ basicValue: 5, basicType: 'Fire Attack' })
        const result = analyzeCombat(fireImmune, [card])
        expect(result?.cardContribs[0].atk).toBe(0)
      })

      it('Fire Attack vs Physical immunity (different type) → atk=value', () => {
        const card = makeCard({ basicValue: 4, basicType: 'Fire Attack' })
        const result = analyzeCombat(gargouille, [card])
        expect(result?.cardContribs[0].atk).toBe(4)
      })
    })

    describe('ATK — ColdFire (7 combinations)', () => {
      it('ColdFire vs Fire+Ice immunity → atk=0', () => {
        const card = makeCard({ basicValue: 6, basicType: 'ColdFire Attack' })
        const result = analyzeCombat(grandDragon, [card])
        expect(result?.cardContribs[0].atk).toBe(0)
      })

      it('ColdFire vs Fire immunity only → atk=floor(value/2)', () => {
        const fireImmune = { ...golem, immunities: ['Fire'] }
        const card = makeCard({ basicValue: 6, basicType: 'ColdFire Attack' })
        const result = analyzeCombat(fireImmune, [card])
        expect(result?.cardContribs[0].atk).toBe(3)
      })

      it('ColdFire vs Ice immunity only → atk=floor(value/2)', () => {
        const iceImmune = { ...golem, immunities: ['Ice'] }
        const card = makeCard({ basicValue: 6, basicType: 'ColdFire Attack' })
        const result = analyzeCombat(iceImmune, [card])
        expect(result?.cardContribs[0].atk).toBe(3)
      })

      it('ColdFire vs Fire resistance only → atk=floor(value/2)', () => {
        const fireResist = { ...golem, resistances: ['Fire'] }
        const card = makeCard({ basicValue: 6, basicType: 'ColdFire Attack' })
        const result = analyzeCombat(fireResist, [card])
        expect(result?.cardContribs[0].atk).toBe(3)
      })

      it('ColdFire vs Ice resistance only → atk=floor(value/2)', () => {
        const iceResist = { ...golem, resistances: ['Ice'] }
        const card = makeCard({ basicValue: 6, basicType: 'ColdFire Attack' })
        const result = analyzeCombat(iceResist, [card])
        expect(result?.cardContribs[0].atk).toBe(3)
      })

      it('ColdFire vs no Fire/Ice resistance → atk=value', () => {
        const card = makeCard({ basicValue: 6, basicType: 'ColdFire Attack' })
        const result = analyzeCombat(golem, [card])
        expect(result?.cardContribs[0].atk).toBe(6)
      })

      it('ColdFire vs Fire+Ice immunity on grandDragon → atk=0', () => {
        const card = makeCard({ basicValue: 8, basicType: 'ColdFire Attack' })
        const result = analyzeCombat(grandDragon, [card])
        expect(result?.cardContribs[0].atk).toBe(0)
      })
    })

    describe('ATK — Simple Resistance', () => {
      it('Physical Attack 4 vs Physical resistance → atk=2', () => {
        const card = makeCard({ basicValue: 4, basicType: 'Physical Attack' })
        const result = analyzeCombat(golem, [card])
        expect(result?.cardContribs[0].atk).toBe(2)
      })

      it('Physical Attack 5 vs Physical resistance → atk=2 (floor)', () => {
        const card = makeCard({ basicValue: 5, basicType: 'Physical Attack' })
        const result = analyzeCombat(golem, [card])
        expect(result?.cardContribs[0].atk).toBe(2)
      })

      it('Fire Attack vs Physical resistance (different type) → atk=value', () => {
        const card = makeCard({ basicValue: 4, basicType: 'Fire Attack' })
        const result = analyzeCombat(golem, [card])
        expect(result?.cardContribs[0].atk).toBe(4)
      })

      it('Fortified takes priority over resistance', () => {
        const card = makeCard({ basicValue: 5, basicType: 'Physical Attack' })
        const result = analyzeCombat(gardien, [card])
        expect(result?.cardContribs[0].atk).toBe(0)
        expect(result?.cardContribs[0].atkNote).toContain('Fortifié')
      })
    })

    describe('BLOCK — full vs partial', () => {
      it('Physical Block vs Physical attack → full block', () => {
        const card = makeCard({ basicValue: 4, basicType: 'Physical Block' })
        const result = analyzeCombat(golem, [card])
        expect(result?.cardContribs[0].blk).toBe(4)
        expect(result?.cardContribs[0].blkNote).toBeNull()
      })

      it('Block (plain) vs Physical attack → full block — tests typeBase fix', () => {
        const card = makeCard({ basicValue: 3, basicType: 'Block' })
        const result = analyzeCombat(golem, [card])
        expect(result?.cardContribs[0].blk).toBe(3)
      })

      it('Fire Block vs Ice attack → full block', () => {
        const iceAttacker = { ...golem, attackType: 'Ice' }
        const card = makeCard({ basicValue: 4, basicType: 'Fire Block' })
        const result = analyzeCombat(iceAttacker, [card])
        expect(result?.cardContribs[0].blk).toBe(4)
      })

      it('Physical Block vs Fire attack → partial (÷2)', () => {
        const fireAttacker = { ...golem, attackType: 'Fire' }
        const card = makeCard({ basicValue: 4, basicType: 'Physical Block' })
        const result = analyzeCombat(fireAttacker, [card])
        expect(result?.cardContribs[0].blk).toBe(2)
        expect(result?.cardContribs[0].blkNote).toContain('÷2')
      })

      it('Physical Block 5 vs Fire attack → atk=2 (floor)', () => {
        const fireAttacker = { ...golem, attackType: 'Fire' }
        const card = makeCard({ basicValue: 5, basicType: 'Physical Block' })
        const result = analyzeCombat(fireAttacker, [card])
        expect(result?.cardContribs[0].blk).toBe(2)
      })

      it('Fire Block vs Physical attack → partial (÷2)', () => {
        const card = makeCard({ basicValue: 4, basicType: 'Fire Block' })
        const result = analyzeCombat(golem, [card])
        expect(result?.cardContribs[0].blk).toBe(2)
      })
    })

    describe('Swift — defense doubled', () => {
      it('Swift enemy attack=3 → blkNeeded=6', () => {
        const card = makeCard({ basicValue: 6, basicType: 'Physical Block' })
        const result = analyzeCombat(cavalierLoup, [card])
        expect(result?.blkNeeded).toBe(6)
        expect(result?.canSurvive).toBe(true)
      })

      it('Swift enemy, insufficient block → canSurvive=false', () => {
        const card = makeCard({ basicValue: 5, basicType: 'Physical Block' })
        const result = analyzeCombat(cavalierLoup, [card])
        expect(result?.blkNeeded).toBe(6)
        expect(result?.canSurvive).toBe(false)
      })

      it('Non-Swift enemy attack=4 → blkNeeded=4', () => {
        const card = makeCard({ basicValue: 4, basicType: 'Physical Block' })
        const result = analyzeCombat(golem, [card])
        expect(result?.blkNeeded).toBe(4)
        expect(result?.canSurvive).toBe(true)
      })

      it('Non-Swift enemy, insufficient block → canSurvive=false', () => {
        const card = makeCard({ basicValue: 3, basicType: 'Physical Block' })
        const result = analyzeCombat(golem, [card])
        expect(result?.blkNeeded).toBe(4)
        expect(result?.canSurvive).toBe(false)
      })
    })

    describe('Paralyze', () => {
      it('Paralyze with insufficient block → isParalyzed=true, canKill=false', () => {
        const card = makeCard({ basicValue: 3, basicType: 'Physical Block' })
        const result = analyzeCombat(meduse, [card])
        expect(result?.isParalyzed).toBe(true)
        expect(result?.canKill).toBe(false)
      })

      it('Paralyze with sufficient block, atk>=armor → isParalyzed=false, canKill=true', () => {
        const card = makeCard({ basicValue: 5, basicType: 'Physical Block' })
        const atkCard = makeCard({ id: 'atk', basicValue: 5, basicType: 'Physical Attack' })
        const result = analyzeCombat(meduse, [card, atkCard])
        expect(result?.isParalyzed).toBe(false)
        expect(result?.canKill).toBe(true)
      })

      it('Paralyze with sufficient block, atk<armor → isParalyzed=false, canKill=false', () => {
        const card = makeCard({ basicValue: 5, basicType: 'Physical Block' })
        const atkCard = makeCard({ id: 'atk', basicValue: 3, basicType: 'Physical Attack' })
        const result = analyzeCombat(meduse, [card, atkCard])
        expect(result?.isParalyzed).toBe(false)
        expect(result?.canKill).toBe(false)
      })

      it('Non-Paralyze enemy with insufficient block → isParalyzed=false', () => {
        const card = makeCard({ basicValue: 2, basicType: 'Physical Block' })
        const atkCard = makeCard({ id: 'atk', basicValue: 10, basicType: 'Physical Attack' })
        const result = analyzeCombat(golem, [card, atkCard])
        expect(result?.isParalyzed).toBe(false)
        expect(result?.canKill).toBe(true)
      })
    })

    describe('Multiple cards accumulation', () => {
      it('2× Physical Attack 3 vs Physical resistance → totalAtk=2', () => {
        const card1 = makeCard({ id: 'atk1', basicValue: 3, basicType: 'Physical Attack' })
        const card2 = makeCard({ id: 'atk2', basicValue: 3, basicType: 'Physical Attack' })
        const result = analyzeCombat(golem, [card1, card2])
        expect(result?.totalAtk).toBe(2)
      })

      it('3× Physical Block 2 vs Swift enemy → totalBlk=6, canSurvive=true', () => {
        const block1 = makeCard({ id: 'b1', basicValue: 2, basicType: 'Physical Block' })
        const block2 = makeCard({ id: 'b2', basicValue: 2, basicType: 'Physical Block' })
        const block3 = makeCard({ id: 'b3', basicValue: 2, basicType: 'Physical Block' })
        const result = analyzeCombat(cavalierLoup, [block1, block2, block3])
        expect(result?.totalBlk).toBe(6)
        expect(result?.canSurvive).toBe(true)
      })

      it('2 Physical Attack cards with resistance → both halved', () => {
        const card1 = makeCard({ id: 'atk1', basicValue: 3, basicType: 'Physical Attack' })
        const card2 = makeCard({ id: 'atk2', basicValue: 3, basicType: 'Physical Attack' })
        const result = analyzeCombat(golem, [card1, card2])
        expect(result?.totalAtk).toBe(2)
      })
    })

    describe('canKill', () => {
      it('totalAtk >= armor → canKill=true', () => {
        const card = makeCard({ basicValue: 6, basicType: 'Fire Attack' })
        const result = analyzeCombat(artilleur, [card])
        expect(result?.canKill).toBe(true)
      })

      it('totalAtk < armor → canKill=false', () => {
        const card = makeCard({ basicValue: 5, basicType: 'Fire Attack' })
        const result = analyzeCombat(artilleur, [card])
        expect(result?.canKill).toBe(false)
      })

      it('atk=armor → canKill=true (>=)', () => {
        const card = makeCard({ basicValue: 4, basicType: 'Fire Attack' })
        const result = analyzeCombat(gargouille, [card])
        expect(result?.canKill).toBe(true)
      })
    })

    describe('atkNeeded always equals armor', () => {
      it('atkNeeded = enemy.armor', () => {
        const card = makeCard()
        const result = analyzeCombat(grandDragon, [card])
        expect(result?.atkNeeded).toBe(9)
      })
    })
  })
})
