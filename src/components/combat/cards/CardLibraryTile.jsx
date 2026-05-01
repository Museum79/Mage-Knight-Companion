import { Plus, Minus } from 'lucide-react'
import { CARD_COLOR_THEME } from '../../../data/combatConstants'

export function CardLibraryTile({ card, count, onAdd, onRemove, effectiveness }) {
  const theme = CARD_COLOR_THEME[card.color]

  const effectivenessBadge = effectiveness ? {
    full: { icon: '✅', color: '#22c55e', label: 'Efficace' },
    half: { icon: '⚠️', color: '#f59e0b', label: 'Réduit' },
    immune: { icon: '🚫', color: '#ef4444', label: 'Immunisé' },
  }[effectiveness] : null

  return (
    <div
      className="relative rounded-[1rem] overflow-hidden flex flex-col"
      style={{
        background: 'rgba(18,15,11,0.88)',
        border: `1px solid ${count > 0 ? theme.border : 'rgba(80,68,50,0.35)'}`,
        boxShadow:
          count > 0
            ? `0 0 0 1px ${theme.border}44, 0 4px 12px rgba(0,0,0,0.3)`
            : 'none',
      }}
    >
      {/* Color accent left stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[1rem]" style={{ background: theme.accent }} />

      {/* Effectiveness badge */}
      {effectivenessBadge && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: `${effectivenessBadge.color}20`, border: `1px solid ${effectivenessBadge.color}` }} title={effectivenessBadge.label}>
          {effectivenessBadge.icon}
        </div>
      )}

      {/* Card name + count badge */}
      <div className="pt-1.5 pb-1 pl-2.5 pr-2 flex items-start justify-between gap-1">
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

      {/* Two faces side by side */}
      <div className="px-2 pb-1.5 flex gap-1">
        {/* Basic face */}
        <div
          className="flex-1 rounded-lg px-1 py-1"
          style={{ background: 'rgba(8,6,4,0.7)', border: '1px solid rgba(80,68,50,0.4)' }}
        >
          <p className="text-[6px] uppercase tracking-[0.14em] text-slate-600">Base</p>
          <p className="font-display text-sm font-bold text-amber-100 leading-none mt-0.5">
            {card.basicValue}
          </p>
          <p className="text-[7px] text-slate-400 mt-0.5 leading-tight truncate">
            {card.basicLabel || card.basicType}
          </p>
        </div>

        {/* Powered face */}
        <div
          className="flex-1 rounded-lg px-1 py-1"
          style={{ background: `${theme.accent}10`, border: `1px solid ${theme.border}55` }}
        >
          <p className="text-[6px] uppercase tracking-[0.14em]" style={{ color: theme.accent + '99' }}>
            Puissant
          </p>
          <p className="font-display text-sm font-bold leading-none mt-0.5" style={{ color: theme.accent }}>
            {card.poweredValue}
          </p>
          <p className="text-[7px] mt-0.5 leading-tight truncate" style={{ color: theme.accent + 'aa' }}>
            {card.poweredLabel || card.poweredType}
          </p>
        </div>
      </div>

      {/* Add/Remove row */}
      <div className="mx-2 mb-1.5 flex gap-0.5">
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
    </div>
  )
}
