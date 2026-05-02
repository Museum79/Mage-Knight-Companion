import { CARD_COLOR_THEME } from '../../data/combatConstants'

export function CardDisplay({ card, header = null, footer = null, topRight = null, style = {} }) {
  const theme = CARD_COLOR_THEME[card.color]

  return (
    <div className="relative rounded-[1rem] overflow-hidden flex flex-col" style={{ background: 'rgba(18,15,11,0.88)', ...style }}>
      {/* Color accent left stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[1rem]" style={{ background: theme.accent }} />

      {/* Top-right overlay (e.g., effectiveness badge) */}
      {topRight && <div className="absolute top-1.5 right-1.5">{topRight}</div>}

      {/* Header slot (e.g., card name + count badge) */}
      {header && <div className="pt-1.5 pb-1 pl-2.5 pr-2">{header}</div>}

      {/* Two faces side by side */}
      <div className="px-2 py-1.5 flex gap-1">
        {/* Basic face */}
        <div className="flex-1 rounded-lg px-1 py-1" style={{ background: 'rgba(8,6,4,0.7)', border: '1px solid rgba(80,68,50,0.4)' }}>
          <p className="text-[6px] uppercase tracking-[0.14em] text-slate-600">Base</p>
          <p className="font-display text-sm font-bold text-amber-100 leading-none mt-0.5">
            {card.basicValue}
          </p>
          <p className="text-[7px] text-slate-400 mt-0.5 leading-tight truncate">
            {card.basicLabel || card.basicType}
          </p>
        </div>

        {/* Powered face */}
        <div className="flex-1 rounded-lg px-1 py-1" style={{ background: `${theme.accent}10`, border: `1px solid ${theme.border}55` }}>
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

      {/* Footer slot (e.g., buttons) */}
      {footer && <div className="px-2 pb-1.5">{footer}</div>}
    </div>
  )
}
