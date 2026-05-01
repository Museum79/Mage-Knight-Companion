import { X } from 'lucide-react'
import { CARD_COLOR_THEME } from '../../data/combatConstants'
import { getModeLabel } from '../combat/utils/combatAnalysis'

export function HandCardItem({
  card,
  count,
  mode,
  contribution,
  onSetMode,
  onRemove,
}) {
  const colorTheme = CARD_COLOR_THEME[card.color]
  const dotColor = colorTheme?.bg || '#fbbf24'

  // Determine contribution text and color
  let atkText = null
  let blkText = null
  let atkColor = '#94a3b8'
  let blkColor = '#94a3b8'

  if (contribution) {
    if (contribution.atk !== null) {
      atkText = `${contribution.atk}${contribution.atkNote ? '*' : ''}`
      atkColor = contribution.atk === 0 ? '#ef4444' : '#22c55e'
    }
    if (contribution.blk !== null) {
      blkText = `${contribution.blk}${contribution.blkNote ? '*' : ''}`
      blkColor = contribution.blk === 0 ? '#ef4444' : '#22c55e'
    }
  }

  const modes = ['normal', 'powered', 'tilt_attack', 'tilt_block']

  return (
    <div className="rounded-[1.1rem] border p-3" style={{ borderColor: colorTheme?.accent || '#fbbf24', background: 'rgba(14,11,8,0.6)' }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div className="w-3 h-3 rounded-full shrink-0 mt-1.5" style={{ background: dotColor }} />
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-sm text-amber-100 truncate">
              {card.name}
              {count > 1 && <span className="text-xs text-slate-400 ml-1">×{count}</span>}
            </p>
            {contribution && (
              <div className="flex gap-4 mt-1 text-[11px]">
                {atkText && (
                  <div>
                    <span style={{ color: atkColor }}>⚔ {atkText}</span>
                    {contribution.atkNote && (
                      <p className="text-[9px] text-slate-400 mt-0.5">{contribution.atkNote}</p>
                    )}
                  </div>
                )}
                {blkText && (
                  <div>
                    <span style={{ color: blkColor }}>🛡 {blkText}</span>
                    {contribution.blkNote && (
                      <p className="text-[9px] text-slate-400 mt-0.5">{contribution.blkNote}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => onRemove(card.id)}
          className="text-slate-500 hover:text-slate-300 transition-colors shrink-0"
          aria-label="Retirer"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {modes.map(m => (
          <button
            key={m}
            onClick={() => onSetMode(card.id, m)}
            className={`flex-1 min-w-fit px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all ${
              mode === m
                ? 'opacity-100'
                : 'opacity-60 hover:opacity-80'
            }`}
            style={{
              background: mode === m ? colorTheme?.accent : 'rgba(14,11,8,0.8)',
              color: mode === m ? '#0a0803' : colorTheme?.accent || '#fbbf24',
              border: `1px solid ${colorTheme?.accent || '#fbbf24'}`,
              borderOpacity: mode === m ? 1 : 0.3,
            }}
          >
            {getModeLabel(m)}
          </button>
        ))}
      </div>
    </div>
  )
}
