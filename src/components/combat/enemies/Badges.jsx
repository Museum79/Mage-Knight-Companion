import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ABILITY_FR, TYPE_FR, ABILITY_RULES, RESISTANCE_RULE, IMMUNITY_RULE } from '../../../data/combatConstants'

export function Badges({ enemy }) {
  const [activeTooltip, setActiveTooltip] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })
  const badgeRefs = useRef({})

  useEffect(() => {
    const handleClose = () => setActiveTooltip(null)
    document.addEventListener('click', handleClose)
    return () => document.removeEventListener('click', handleClose)
  }, [])

  const toggleTooltip = (id, e) => {
    e.stopPropagation()
    if (badgeRefs.current[id]) {
      const rect = badgeRefs.current[id].getBoundingClientRect()
      setTooltipPos({
        top: rect.bottom + 8,
        left: rect.left,
      })
    }
    setActiveTooltip(prev => prev === id ? null : id)
  }

  const hasAny = enemy.abilities.length > 0 || enemy.resistances.length > 0 || enemy.immunities.length > 0
  if (!hasAny) return null

  return (
    <div className="flex flex-wrap gap-2">
      {enemy.abilities.map(a => {
        const id = `ability-${a}`
        const rule = ABILITY_RULES[a]
        return (
          <div key={a}>
            <button
              ref={el => badgeRefs.current[id] = el}
              onClick={e => toggleTooltip(id, e)}
              className="text-xs bg-stone-900 text-amber-200 border border-amber-800/50 px-2.5 py-1 rounded-full cursor-pointer hover:border-amber-700/80 active:scale-95 transition-all"
            >
              {rule ? `${rule.icon} ${ABILITY_FR[a]}` : ABILITY_FR[a]}
            </button>
            {activeTooltip === id && rule && createPortal(
              <Tooltip label={rule.label} desc={rule.desc} borderColor="border-amber-800/60" pos={tooltipPos} />,
              document.body
            )}
          </div>
        )
      })}
      {enemy.resistances.map(r => {
        const id = `res-${r}`
        return (
          <div key={r}>
            <button
              ref={el => badgeRefs.current[id] = el}
              onClick={e => toggleTooltip(id, e)}
              className="text-xs bg-amber-900/40 text-amber-200 border border-amber-500/40 px-2.5 py-1 rounded-full cursor-pointer hover:border-amber-500/60 active:scale-95 transition-all"
            >
              {RESISTANCE_RULE.icon} Rés. {TYPE_FR[r] ?? r}
            </button>
            {activeTooltip === id && createPortal(
              <Tooltip label={`Rés. ${TYPE_FR[r] ?? r}`} desc={RESISTANCE_RULE.desc} borderColor="border-amber-600/60" pos={tooltipPos} />,
              document.body
            )}
          </div>
        )
      })}
      {enemy.immunities.map(ii => {
        const id = `imm-${ii}`
        return (
          <div key={ii}>
            <button
              ref={el => badgeRefs.current[id] = el}
              onClick={e => toggleTooltip(id, e)}
              className="text-xs bg-red-900/40 text-red-200 border border-red-500/40 px-2.5 py-1 rounded-full cursor-pointer hover:border-red-500/60 active:scale-95 transition-all"
            >
              {IMMUNITY_RULE.icon} Imm. {TYPE_FR[ii] ?? ii}
            </button>
            {activeTooltip === id && createPortal(
              <Tooltip label={`Imm. ${TYPE_FR[ii] ?? ii}`} desc={IMMUNITY_RULE.desc} borderColor="border-red-700/60" pos={tooltipPos} />,
              document.body
            )}
          </div>
        )
      })}
    </div>
  )
}

function Tooltip({ label, desc, borderColor, pos }) {
  return (
    <div
      className={`fixed w-56 rounded-lg border ${borderColor} bg-stone-950/95 p-3 z-9999 shadow-lg pointer-events-auto`}
      style={{
        top: `${pos.top}px`,
        left: `${pos.left}px`,
      }}
      onClick={e => e.stopPropagation()}
    >
      <p className="font-display font-bold text-sm text-amber-100 mb-1">{label}</p>
      <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
    </div>
  )
}
