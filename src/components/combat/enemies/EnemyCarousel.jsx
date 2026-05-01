import { useState, useMemo } from 'react'
import { ENEMIES } from '../../../data/enemies'
import { ENEMY_THEME, CATEGORY_ORDER } from '../../../data/combatConstants'
import { EnemyGridCard } from './EnemyGridCard'

export function EnemyCarousel({ selectedEnemy, onSelect }) {
  const [activeTab, setActiveTab] = useState('orc')

  const enemiesByCategory = useMemo(() => {
    const groups = {}
    ENEMIES.forEach(e => {
      if (!groups[e.category]) groups[e.category] = []
      groups[e.category].push(e)
    })
    return groups
  }, [])

  const currentGroup = useMemo(() => {
    return enemiesByCategory[activeTab] || []
  }, [enemiesByCategory, activeTab])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Category tabs - improved design */}
      <div className="shrink-0 px-2 pt-2 pb-2 overflow-x-auto scrollbar-none">
        <div className="flex gap-1.5 min-w-min">
          {CATEGORY_ORDER.map(cat => {
            if (!enemiesByCategory[cat]) return null
            const catTheme = ENEMY_THEME[cat]
            const count = enemiesByCategory[cat].length
            const isActive = activeTab === cat

            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className="shrink-0 px-3.5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all active:scale-95 relative"
                style={{
                  color: isActive ? catTheme.accent : 'rgba(100,85,65,0.8)',
                  background: isActive ? 'rgba(0,0,0,0.4)' : 'rgba(20,16,12,0.3)',
                  border: `1px solid ${isActive ? catTheme.border : 'rgba(70,60,50,0.3)'}`,
                  borderRadius: '0.5rem',
                  boxShadow: isActive
                    ? `inset 0 1px 3px ${catTheme.accent}30, 0 0 8px ${catTheme.border}50`
                    : 'inset 0 1px 2px rgba(255,255,255,0.05)',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: catTheme.accent, opacity: isActive ? 1 : 0.4 }} />
                  <span>{catTheme.label}</span>
                  <span className="text-[10px] opacity-60 font-normal">({count})</span>
                </div>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{ background: catTheme.accent }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid of enemy cards - takes full space */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <div className="h-full flex items-center justify-center">
          <div className="grid grid-cols-3 gap-2.5 w-full auto-rows-max">
            {currentGroup.map((enemy) => (
              <EnemyGridCard
                key={enemy.id}
                enemy={enemy}
                isSelected={selectedEnemy?.id === enemy.id}
                onClick={() => onSelect(enemy)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
