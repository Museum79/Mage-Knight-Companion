import { useState, useMemo } from 'react'
import { ALL_CARDS } from '../../../data/cards'
import { ColorTabBar } from '../../ui/ColorTabBar'
import { CardLibraryTile } from './CardLibraryTile'

export function CardLibrary({ ref, handCards, onAdd, onRemove, deckFilter, getEffectiveness }) {
  const [activeColor, setActiveColor] = useState('red')

  const countsByColor = useMemo(() => {
    const counts = {}
    ALL_CARDS.forEach(card => {
      if (!deckFilter || deckFilter[card.id] > 0) {
        counts[card.color] = (counts[card.color] || 0) + (handCards[card.id] || 0)
      }
    })
    return counts
  }, [handCards, deckFilter])

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
      <ColorTabBar activeColor={activeColor} onChange={setActiveColor} countsByColor={countsByColor} />

      {/* 2-column tile grid */}
      <div ref={ref} className="flex-1 overflow-y-auto px-2.5 pb-6">
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
