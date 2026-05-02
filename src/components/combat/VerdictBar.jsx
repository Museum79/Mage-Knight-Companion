import { useState } from 'react'
import { Tooltip } from '../ui/Tooltip'

export function VerdictBar({ enemy, analysis }) {
  const [showLegend, setShowLegend] = useState(false)

  if (!analysis) {
    return (
      <div
        className="rounded-[1.1rem] border p-3 bg-slate-900/50"
        style={{ borderColor: 'rgba(80,70,50,0.2)' }}
      >
        <p className="text-xs text-slate-500 text-center">Sélectionnez un ennemi et ajoutez des cartes</p>
      </div>
    )
  }

  const { totalAtk, totalBlk, atkNeeded, blkNeeded, canKill, canSurvive, isSwift } = analysis

  // Si aucune carte n'a été ajoutée, afficher message neutre
  if (totalAtk === 0 && totalBlk === 0) {
    return (
      <div
        className="rounded-[1.1rem] border p-3 bg-slate-900/50"
        style={{ borderColor: 'rgba(80,70,50,0.2)' }}
      >
        <p className="text-xs text-slate-500 text-center">Ajoutez des cartes pour analyser le combat</p>
      </div>
    )
  }

  const isBrutal = enemy?.abilities.includes('Brutal')
  const dmgTaken = canSurvive ? 0 : enemy?.attack * (isBrutal ? 2 : 1)

  const verdictType = canKill && canSurvive ? 'success' : canKill ? 'partial' : 'fail'
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

  const colors = verdictColors[verdictType]

  const verdictText = canKill && canSurvive
    ? 'Victoire sans blessure'
    : canKill
      ? `Victoire — ${dmgTaken} blessure${dmgTaken > 1 ? 's' : ''}`
      : canSurvive
        ? 'Ennemi non tué'
        : 'Combat perdu'

  return (
    <div
      className="rounded-[1.1rem] border p-3"
      style={{
        background: colors.bg,
        borderColor: colors.border,
        boxShadow: `0 0 40px ${colors.glow}20`,
      }}
    >
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="rounded-lg px-3 py-1.5" style={{ background: 'rgba(14,11,8,0.58)', border: '1px solid rgba(80,70,50,0.35)' }}>
          <p className="text-[9px] uppercase tracking-wide text-slate-500">ATQ</p>
          <p className="font-display text-base font-bold flex items-center gap-1" style={{ color: canKill ? '#22c55e' : '#ef4444' }}>
            {totalAtk}/{atkNeeded}
            <span className="text-xs">{canKill ? '✓' : '✗'}</span>
          </p>
        </div>
        <div className="rounded-lg px-3 py-1.5" style={{ background: 'rgba(14,11,8,0.58)', border: '1px solid rgba(80,70,50,0.35)' }}>
          <p className="text-[9px] uppercase tracking-wide text-slate-500 flex items-center gap-1">
            {isSwift ? (
              <>
                BLQ <Tooltip
                  borderColor="border-amber-800/60"
                  content={
                    <div>
                      <p className="font-display font-bold text-sm text-amber-100 mb-1">Attaque Vif</p>
                      <p className="text-xs text-slate-300 leading-relaxed">Cet ennemi est Vif. Son attaque compte pour le double : vous devez bloquer la totalité de ses dégâts.</p>
                    </div>
                  }
                >
                  <span className="text-[8px] cursor-help opacity-70 hover:opacity-100">Vif</span>
                </Tooltip>
              </>
            ) : 'BLQ'}
          </p>
          <p className="font-display text-base font-bold flex items-center gap-1" style={{ color: canSurvive ? '#22c55e' : '#ef4444' }}>
            {totalBlk}/{blkNeeded}
            <span className="text-xs">{canSurvive ? '✓' : '✗'}</span>
          </p>
        </div>
      </div>
      <p className="font-display text-sm font-bold text-center mb-2" style={{ color: colors.text }}>
        {verdictText}
      </p>
      <button
        onClick={() => setShowLegend(!showLegend)}
        className="w-full text-[9px] text-slate-500 hover:text-slate-400 transition-colors text-center"
      >
        ⓘ {showLegend ? 'Masquer' : 'Légende'}
      </button>
      {showLegend && (
        <div className="mt-2 pt-2 border-t border-slate-700/30 space-y-1 text-[9px] text-slate-400">
          <div className="flex gap-2">
            <span className="font-bold text-amber-300 w-8">ATQ</span>
            <span>Vos dégâts totaux vs l'armure ennemie</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-amber-300 w-8">BLQ</span>
            <span>Votre blocage total vs l'attaque ennemie</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-amber-300 w-8">Vif</span>
            <span>Vous devez bloquer le double des dégâts</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-green-400 w-8">✓</span>
            <span>Seuil atteint — succès</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-red-400 w-8">✗</span>
            <span>Seuil non atteint — insuffisant</span>
          </div>
        </div>
      )}
    </div>
  )
}
