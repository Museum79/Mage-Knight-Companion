import { Plus, Minus } from 'lucide-react'
import { CARD_COLOR_THEME } from '../../../data/combatConstants'
import { CardDisplay, Tooltip } from '../../ui'

export function CardLibraryTile({ card, count, onAdd, onRemove, effectiveness }) {
  const theme = CARD_COLOR_THEME[card.color]

  const effectivenessBadge = effectiveness ? {
    full: { icon: '✦', color: '#4ade80', bgColor: 'rgba(34,197,94,0.18)', borderColor: 'rgba(34,197,94,0.5)' },
    half: { icon: '½', color: '#fbbf24', bgColor: 'rgba(245,158,11,0.18)', borderColor: 'rgba(245,158,11,0.5)' },
    immune: { icon: '✕', color: '#f87171', bgColor: 'rgba(239,68,68,0.18)', borderColor: 'rgba(239,68,68,0.5)' },
  }[effectiveness.level] : null

  return (
    <CardDisplay
      card={card}
      style={{
        border: `1px solid ${count > 0 ? theme.border : 'rgba(80,68,50,0.35)'}`,
        boxShadow: count > 0 ? `0 0 0 1px ${theme.border}44, 0 4px 12px rgba(0,0,0,0.3)` : 'none',
      }}
      topRight={
        effectivenessBadge && effectiveness ? (
          <Tooltip
            borderColor={effectiveness.level === 'immune' ? 'border-red-700/60' : effectiveness.level === 'half' ? 'border-amber-600/60' : 'border-green-700/60'}
            content={
              <div>
                <p className="font-display font-bold text-sm text-amber-100 mb-1">
                  {effectiveness.level === 'full' ? '✦ Efficace' : effectiveness.level === 'half' ? '½ Réduit' : '✕ Immunisé'}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">{effectiveness.note}</p>
              </div>
            }
          >
            <div
              className="px-1.5 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-0.5 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
              style={{
                background: effectivenessBadge.bgColor,
                border: `1px solid ${effectivenessBadge.borderColor}`,
                color: effectivenessBadge.color
              }}
            >
              {effectivenessBadge.icon}
              <span>
                {effectiveness.level === 'full' ? 'Efficace' : effectiveness.level === 'half' ? 'Réduit' : 'Immunisé'}
              </span>
            </div>
          </Tooltip>
        ) : null
      }
      header={
        <div className="flex items-start justify-between gap-1">
          <p className="font-display font-bold text-[12px] text-amber-100 leading-tight">
            {card.name}
          </p>
          {count > 0 && (
            <span
              className="shrink-0 min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center text-[8px] font-bold"
              style={{ background: theme.accent, color: '#0f0c08' }}
            >
              {count}
            </span>
          )}
        </div>
      }
      footer={
        <div className="flex gap-0.5">
          <button
            onClick={onRemove}
            disabled={count === 0}
            className="flex-1 h-6 rounded-lg flex items-center justify-center transition-opacity active:opacity-60 disabled:opacity-25"
            style={{
              background: 'rgba(30,25,18,0.9)',
              border: '1px solid rgba(80,70,50,0.4)',
              color: '#9ca3af',
            }}
          >
            <Minus size={11} />
          </button>
          <button
            onClick={onAdd}
            className="flex-1 h-6 rounded-lg flex items-center justify-center active:opacity-70"
            style={{
              background: `${theme.accent}20`,
              border: `1px solid ${theme.border}`,
              color: theme.accent,
            }}
          >
            <Plus size={11} />
          </button>
        </div>
      }
    />
  )
}
