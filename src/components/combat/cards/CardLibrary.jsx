import { useState, useMemo } from 'react'
import { ALL_CARDS } from '../../../data/cards'
import { CARD_COLOR_THEME, COLOR_GROUPS } from '../../../data/combatConstants'
import { CardLibraryTile } from './CardLibraryTile'

export function CardLibrary({ ref, handCards, onAdd, onRemove, deckFilter, getEffectiveness }) {
  const [activeColor, setActiveColor] = useState('red')

  const tilesForActiveColor = useMemo(() => {
    let filtered = ALL_CARDS.filter(card => card.color === activeColor)
    if (deckFilter) {
      filtered = filtered.filter(card => deckFilter[card.id] > 0)
    }
    return filtered.sort((a, b) => {
      const countDiff = (handCards[b.id] || 0) - (handCards[a.id] || 0)
      if (countDiff !== 0) return countDiff
      return a.name.localeCompare(b.name, 'fr')
    })
  }, [activeColor, handCards, deckFilter])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Color tab bar */}
      <div className="shrink-0 flex gap-1.5 px-3 pb-2 overflow-x-auto scrollbar-none">
        {COLOR_GROUPS.map(({ color, label }) => {
          const theme = CARD_COLOR_THEME[color]
          let cardsForColor = ALL_CARDS.filter(c => c.color === color)
          if (deckFilter) {
            cardsForColor = cardsForColor.filter(c => deckFilter[c.id] > 0)
          }
          const countInGroup = cardsForColor
            .reduce((sum, c) => sum + (handCards[c.id] || 0), 0)

          return (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all"
              style={{
                background: activeColor === color ? theme.accent + '22' : 'rgba(18,14,10,0.8)',
                border: `1px solid ${activeColor === color ? theme.border : 'rgba(80,68,50,0.35)'}`,
                color: activeColor === color ? theme.accent : 'rgba(120,100,70,0.75)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: theme.accent }} />
              {label}
              {countInGroup > 0 && (
                <span
                  className="min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{ background: theme.accent, color: '#0f0c08' }}
                >
                  {countInGroup}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 2-column tile grid */}
      <div ref={ref} className="flex-1 overflow-y-auto px-2.5 pb-3">
        <div className="grid grid-cols-2 gap-1.5">
          {tilesForActiveColor.map(card => (
            <CardLibraryTile
              key={card.id}
              card={card}
              count={handCards[card.id] || 0}
              onAdd={() => onAdd(card.id)}
              onRemove={() => onRemove(card.id)}
              effectiveness={getEffectiveness ? getEffectiveness(card) : null}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
