import { Plus, Minus } from 'lucide-react'
import { CARD_COLOR_THEME } from '../../../data/combatConstants'
import { CardDisplay } from '../../ui/CardDisplay'

export function CardLibraryTile({ card, count, onAdd, onRemove, effectiveness }) {
  const theme = CARD_COLOR_THEME[card.color]

  const effectivenessBadge = effectiveness ? {
    full: { icon: '✅', color: '#22c55e', label: 'Efficace' },
    half: { icon: '⚠️', color: '#f59e0b', label: 'Réduit' },
    immune: { icon: '🚫', color: '#ef4444', label: 'Immunisé' },
  }[effectiveness] : null

  return (
    <CardDisplay
      card={card}
      style={{
        border: `1px solid ${count > 0 ? theme.border : 'rgba(80,68,50,0.35)'}`,
        boxShadow: count > 0 ? `0 0 0 1px ${theme.border}44, 0 4px 12px rgba(0,0,0,0.3)` : 'none',
      }}
      topRight={
        effectivenessBadge ? (
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
            style={{ background: `${effectivenessBadge.color}20`, border: `1px solid ${effectivenessBadge.color}` }}
            title={effectivenessBadge.label}
          >
            {effectivenessBadge.icon}
          </div>
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
