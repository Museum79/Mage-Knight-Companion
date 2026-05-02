import { Tooltip } from '../../ui/Tooltip'
import { ABILITY_FR, TYPE_FR, ABILITY_RULES, RESISTANCE_RULE, IMMUNITY_RULE } from '../../../data/combatConstants'

export function Badges({ enemy }) {
  const hasAny = enemy.abilities.length > 0 || enemy.resistances.length > 0 || enemy.immunities.length > 0
  if (!hasAny) return null

  return (
    <div className="flex flex-wrap gap-2">
      {enemy.abilities.map(a => {
        const rule = ABILITY_RULES[a]
        return (
          <Tooltip
            key={a}
            borderColor="border-amber-800/60"
            content={
              rule ? (
                <div>
                  <p className="font-display font-bold text-sm text-amber-100 mb-1">{rule.label}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{rule.desc}</p>
                </div>
              ) : null
            }
          >
            <button className="text-xs bg-stone-900 text-amber-200 border border-amber-800/50 px-2.5 py-1 rounded-full cursor-pointer hover:border-amber-700/80 active:scale-95 transition-all">
              {rule ? `${rule.icon} ${ABILITY_FR[a]}` : ABILITY_FR[a]}
            </button>
          </Tooltip>
        )
      })}
      {enemy.resistances.map(r => (
        <Tooltip
          key={r}
          borderColor="border-amber-600/60"
          content={
            <div>
              <p className="font-display font-bold text-sm text-amber-100 mb-1">{`Rés. ${TYPE_FR[r] ?? r}`}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{RESISTANCE_RULE.desc}</p>
            </div>
          }
        >
          <button className="text-xs bg-amber-900/40 text-amber-200 border border-amber-500/40 px-2.5 py-1 rounded-full cursor-pointer hover:border-amber-500/60 active:scale-95 transition-all">
            {RESISTANCE_RULE.icon} Rés. {TYPE_FR[r] ?? r}
          </button>
        </Tooltip>
      ))}
      {enemy.immunities.map(ii => (
        <Tooltip
          key={ii}
          borderColor="border-red-700/60"
          content={
            <div>
              <p className="font-display font-bold text-sm text-amber-100 mb-1">{`Imm. ${TYPE_FR[ii] ?? ii}`}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{IMMUNITY_RULE.desc}</p>
            </div>
          }
        >
          <button className="text-xs bg-red-900/40 text-red-200 border border-red-500/40 px-2.5 py-1 rounded-full cursor-pointer hover:border-red-500/60 active:scale-95 transition-all">
            {IMMUNITY_RULE.icon} Imm. {TYPE_FR[ii] ?? ii}
          </button>
        </Tooltip>
      ))}
    </div>
  )
}
