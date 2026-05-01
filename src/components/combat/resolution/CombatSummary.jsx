import { SectionHeader } from '../common/SectionHeader'
import { ContribRow } from './ContribRow'

export function VerdictBanner({ enemy, analysis }) {
  const { totalAtk, totalBlk, atkNeeded, blkNeeded, canKill, canSurvive, isSwift } = analysis

  const isBrutal = enemy.abilities.includes('Brutal')
  const dmgTaken = canSurvive ? 0 : enemy.attack * (isBrutal ? 2 : 1)

  const verdictColors = {
    success: {
      bg: 'rgba(22,60,30,0.85)',
      border: 'rgba(34,197,94,0.35)',
      glow: '#22c55e',
      text: '#4ade80',
    },
    partial: {
      bg: 'rgba(50,35,10,0.85)',
      border: 'rgba(180,120,20,0.4)',
      glow: '#d97706',
      text: '#fbbf24',
    },
    fail: {
      bg: 'rgba(60,15,12,0.85)',
      border: 'rgba(185,40,30,0.4)',
      glow: '#ef4444',
      text: '#f87171',
    },
  }

  const verdictType = canKill && canSurvive ? 'success' : canKill ? 'partial' : 'fail'
  const colors = verdictColors[verdictType]

  const verdictText = canKill && canSurvive
    ? 'Victoire sans blessure !'
    : canKill
      ? `Victoire — ${dmgTaken} blessure${dmgTaken > 1 ? 's' : ''}`
      : canSurvive
        ? 'Ennemi non tué'
        : 'Combat perdu — fuyez !'

  return (
    <div
      className="rounded-[1.1rem] border p-4"
      style={{
        background: colors.bg,
        borderColor: colors.border,
        boxShadow: `0 0 40px ${colors.glow}20`,
      }}
    >
      <p className="font-display text-2xl font-bold tracking-wide text-center mb-1" style={{ color: colors.text }}>
        {verdictText}
      </p>
      {dmgTaken > 0 && (
        <p className="text-center text-xs text-slate-400">
          {dmgTaken} blessure{dmgTaken > 1 ? 's' : ''} subie{dmgTaken > 1 ? 's' : ''}
          {isBrutal ? ' (Brutal ×2)' : ''}
        </p>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <ScorePill
          label="Attaque"
          current={totalAtk}
          needed={atkNeeded}
          ok={canKill}
        />
        <ScorePill
          label={isSwift ? 'Blocage Vif' : 'Blocage'}
          current={totalBlk}
          needed={blkNeeded}
          ok={canSurvive}
        />
      </div>
    </div>
  )
}

function ScorePill({ label, current, needed, ok }) {
  return (
    <div className="rounded-[0.9rem] px-3 py-2" style={{ background: 'rgba(14,11,8,0.58)', border: '1px solid rgba(80,70,50,0.35)' }}>
      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className={`mt-1 font-display text-lg font-bold ${ok ? 'text-green-400' : 'text-red-400'}`}>
        {current}/{needed}
        <span className="ml-1 text-xs">{ok ? '✓' : '✗'}</span>
      </p>
    </div>
  )
}

export function ContribTables({ enemy, analysis }) {
  const { cardContribs, totalAtk, totalBlk, atkNeeded, blkNeeded, canKill, canSurvive, isSwift } = analysis

  const atkCards = cardContribs.filter(c => c.atk !== null)
  const blkCards = cardContribs.filter(c => c.blk !== null)

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
      {atkCards.length > 0 && (
        <div className="mk-panel rounded-[1.1rem] overflow-hidden">
          <SectionHeader
            eyebrow="Attaque"
            title={`${totalAtk} / ${atkNeeded}`}
            subtitle={canKill ? 'Suffisant' : `Manque ${atkNeeded - totalAtk}`}
          />
          <div className="px-4 py-1">
            {atkCards.map((c, i) => (
              <ContribRow
                key={i}
                name={c.displayName}
                modeLabel={c.modeLabel}
                typeBase={c.typeBase}
                value={c.value}
                effective={c.atk}
                note={c.atkNote}
              />
            ))}
          </div>
        </div>
      )}

      {blkCards.length > 0 && (
        <div className="mk-panel rounded-[1.1rem] overflow-hidden">
          <SectionHeader
            eyebrow="Blocage"
            title={`${totalBlk} / ${blkNeeded}${isSwift ? ' (Vif)' : ''}`}
            subtitle={canSurvive ? 'Suffisant' : `Manque ${blkNeeded - totalBlk}`}
          />
          <div className="px-4 py-1">
            {blkCards.map((c, i) => (
              <ContribRow
                key={i}
                name={c.displayName}
                modeLabel={c.modeLabel}
                typeBase={c.typeBase}
                value={c.value}
                effective={c.blk}
                note={c.blkNote}
              />
            ))}
          </div>
        </div>
      )}

      {atkCards.length === 0 && blkCards.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-4 md:col-span-2">Aucune carte de combat dans la main.</p>
      )}
    </div>
  )
}

export function CombatSummary({ enemy, analysis }) {
  return (
    <div className="flex flex-col gap-3">
      <VerdictBanner enemy={enemy} analysis={analysis} />
      <ContribTables enemy={enemy} analysis={analysis} />
    </div>
  )
}
