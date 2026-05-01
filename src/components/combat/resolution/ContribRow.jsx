import { ATTACK_BG, ATTACK_COLOR, TYPE_FR } from '../../../data/combatConstants'

export function ContribRow({ name, modeLabel, typeBase, value, effective, note }) {
  const unchanged = effective === value
  const dimmed = effective === 0
  return (
    <div className="py-2 border-b border-slate-800/40 last:border-0">
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <span className={`text-sm truncate block ${dimmed ? 'text-slate-500' : 'text-amber-200'}`}>
            {name}
            <span className={`ml-1 text-[10px] ${modeLabel === 'Puissant' ? 'text-amber-400' : 'text-slate-500'}`}>{modeLabel}</span>
          </span>
        </div>
        <span className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${ATTACK_BG[typeBase] || 'bg-slate-700'} ${ATTACK_COLOR[typeBase] || 'text-slate-300'}`}>
          {TYPE_FR[typeBase] ?? typeBase}
        </span>
        <div className="flex items-center gap-1 shrink-0 tabular-nums">
          <span className={`font-display text-sm ${dimmed ? 'text-slate-500' : 'text-amber-100'}`}>+{value}</span>
          {!unchanged && (
            <>
              <span className="text-slate-600 text-xs">→</span>
              <span className={`font-display font-bold text-sm ${effective > 0 ? 'text-amber-400' : 'text-slate-500'}`}>{effective}</span>
            </>
          )}
        </div>
      </div>
      {note && <p className="text-[10px] text-amber-500/80 mt-0.5">{note}</p>}
    </div>
  )
}
