import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { CardLibrary } from '../components/combat/cards/CardLibrary'
import { useGameStore } from '../store/gameStore'
import { canFullyBlock } from '../components/combat/utils/combatAnalysis'

export function CardSelectionPage() {
  const navigate = useNavigate()
  const { isActive, playerDeck, handCards, selectedEnemy, addHandCard, removeHandCard } = useGameStore()

  const getCardEffectiveness = card => {
    if (!selectedEnemy || !card.basicType) return null
    const type = card.basicType
    if (type === 'Any') return 'full'

    const typeBase = type.replace(' Attack', '').replace(' Block', '')

    if (selectedEnemy.immunities?.includes(typeBase)) {
      return 'immune'
    }
    if (selectedEnemy.resistances?.includes(typeBase)) {
      return 'half'
    }
    if (type.includes('Attack')) {
      return 'full'
    }
    if (type.includes('Block')) {
      return canFullyBlock(type, selectedEnemy.attackType) ? 'full' : 'half'
    }

    return null
  }

  return (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Header */}
      <div className="shrink-0 px-4 py-4 border-b border-slate-800/50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-3"
        >
          <ChevronLeft size={20} />
          Retour
        </button>
        <h1 className="font-display text-2xl font-bold" style={{ color: '#f0e4c4' }}>
          Sélectionner des cartes
        </h1>
      </div>

      {/* Card library */}
      <div className="flex-1 overflow-hidden">
        <CardLibrary
          handCards={handCards}
          onAdd={addHandCard}
          onRemove={removeHandCard}
          deckFilter={isActive ? playerDeck : undefined}
          getEffectiveness={getCardEffectiveness}
        />
      </div>
    </div>
  )
}
