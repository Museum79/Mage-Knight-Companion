import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { CARD_COLOR_THEME } from '../../data/combatConstants'
import { getModeLabel } from './utils/combatAnalysis'
import { Tooltip } from '../ui/Tooltip'

function EffectBanner({ variant, message }) {
  const isWarning = variant === 'warning'
  const isDanger = variant === 'danger'

  const bgColor = isDanger ? 'rgba(239,68,68,0.18)' : 'rgba(245,158,11,0.18)'
  const borderColor = isDanger ? 'rgba(239,68,68,0.4)' : 'rgba(245,158,11,0.4)'
  const textColor = isDanger ? '#f87171' : '#fbbf24'
  const icon = isDanger ? '✕' : '½'

  return (
    <Tooltip
      borderColor={isDanger ? 'border-red-700/60' : 'border-amber-600/60'}
      content={
        <div>
          <p className="font-display font-bold text-sm text-amber-100 mb-1">
            {isDanger ? '✕ Inefficace' : '½ Réduit'}
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">{message}</p>
        </div>
      }
    >
      <button
        className="w-full text-left px-2 py-1 rounded-lg mt-1.5 flex items-start gap-1.5 active:opacity-70 transition-opacity"
        style={{ background: bgColor, border: `1px solid ${borderColor}` }}
      >
        <span className="shrink-0 text-[10px] font-bold mt-0.5" style={{ color: textColor }}>{icon}</span>
        <p className="text-[10px] leading-snug" style={{ color: textColor }}>{message}</p>
      </button>
    </Tooltip>
  )
}

export function HandCardItem({
  card,
  count,
  mode,
  contribution,
  onSetMode,
  onRemove,
}) {
  const colorTheme = CARD_COLOR_THEME[card.color]
  const prevModeRef = useRef(mode)
  const [flashClass, setFlashClass] = useState('')

  useEffect(() => {
    if (prevModeRef.current === mode) return
    prevModeRef.current = mode

    const hasDangerAtk = contribution?.atk === 0 && contribution?.atkNote
    const hasWarnBlk = contribution?.blk !== null && contribution?.blkNote
    if (hasDangerAtk) setFlashClass('mk-warn-pulse')
    else if (hasWarnBlk) setFlashClass('mk-half-pulse')

    const t = setTimeout(() => setFlashClass(''), 600)
    return () => clearTimeout(t)
  }, [mode, contribution])

  let atkColor = '#94a3b8'
  let blkColor = '#94a3b8'

  if (contribution) {
    if (contribution.atk !== null) {
      atkColor = contribution.atk === 0 ? '#ef4444' : '#22c55e'
    }
    if (contribution.blk !== null) {
      blkColor = contribution.blk === 0 ? '#ef4444' : '#22c55e'
    }
  }

  const modes = ['normal', 'powered', 'tilt_attack', 'tilt_block']
  const modeAbbr = {
    normal: 'N',
    powered: 'Pui',
    tilt_attack: 'IA',
    tilt_block: 'IB',
  }

  return (
    <div className={flashClass}>
      {/* Main compact row */}
      <div
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border"
        style={{ borderColor: colorTheme?.border || '#fbbf24' }}
      >
        {/* Color indicator */}
        <div
          className="w-2 h-2 rounded-sm shrink-0"
          style={{ background: colorTheme?.accent || '#fbbf24' }}
        />

        {/* Card name */}
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-sm text-amber-100 truncate">
            {card.name}
            {count > 1 && <span className="text-xs text-slate-400 ml-1">×{count}</span>}
          </p>
        </div>

        {/* Contribution display */}
        {contribution && (
          <div className="flex gap-3 text-xs shrink-0">
            {contribution.atk !== null && (
              <span style={{ color: atkColor }}>⚔ {contribution.atk}</span>
            )}
            {contribution.blk !== null && (
              <span style={{ color: blkColor }}>🛡 {contribution.blk}</span>
            )}
          </div>
        )}

        {/* Mode buttons (4 small) */}
        <div className="flex gap-1 shrink-0">
          {modes.map(m => (
            <button
              key={m}
              onClick={() => onSetMode(card.id, m)}
              className="px-1.5 h-6 rounded text-[9px] font-bold uppercase tracking-wide transition-all active:opacity-60"
              style={{
                background: mode === m ? colorTheme?.accent : 'rgba(14,11,8,0.8)',
                color: mode === m ? '#0a0803' : colorTheme?.accent || '#fbbf24',
                border: `1px solid ${colorTheme?.accent || '#fbbf24'}`,
                opacity: mode === m ? 1 : 0.5,
              }}
            >
              {modeAbbr[m]}
            </button>
          ))}
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(card.id)}
          className="text-slate-500 hover:text-slate-300 transition-colors shrink-0"
          aria-label="Retirer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Effect banners (shown below if present) */}
      {contribution?.atk === 0 && contribution?.atkNote && (
        <EffectBanner variant="danger" message={contribution.atkNote} />
      )}
      {contribution?.blk !== null && contribution?.blkNote && (
        <EffectBanner variant="warning" message={contribution.blkNote} />
      )}
    </div>
  )
}
