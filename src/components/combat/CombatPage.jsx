import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { ALL_CARDS } from '../../data/cards'
import { useGameStore } from '../../store/gameStore'
import { analyzeCombat, canFullyBlock } from './utils/combatAnalysis'
import { VerdictBar } from './VerdictBar'
import { EnemyPill } from './EnemyPill'
import { HandCardItem } from './HandCardItem'
import { EnemyCarousel } from './enemies/EnemyCarousel'

export function CombatPage() {
  const navigate = useNavigate()
  const { isActive, playerDeck, handCards, cardModes, selectedEnemy, addHandCard, removeHandCard, setCardMode, clearHand, setSelectedEnemy } = useGameStore()
  const [showEnemyModal, setShowEnemyModal] = useState(false)

  const selectedCards = useMemo(
    () =>
      Object.entries(handCards).flatMap(([id, count]) => {
        const card = ALL_CARDS.find(c => c.id === id)
        return card ? Array(count).fill({ ...card, mode: cardModes[id] || 'normal' }) : []
      }),
    [handCards, cardModes]
  )

  const analysis = useMemo(() => analyzeCombat(selectedEnemy, selectedCards), [selectedCards, selectedEnemy])

  const totalCount = Object.values(handCards).reduce((a, b) => a + b, 0)

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-950">
      {/* Header */}
      <div className="shrink-0 px-4 pt-6 pb-4 border-b border-slate-800/50">
        <h1 className="font-display text-3xl tracking-[0.12em] uppercase" style={{ color: '#f0e4c4' }}>
          ⚔️ Combat
        </h1>
      </div>

      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <div className="space-y-4 pt-4">
          {/* Enemy section */}
          <EnemyPill
            selectedEnemy={selectedEnemy}
            onSelectClick={() => setShowEnemyModal(true)}
          />

          {/* Verdict bar - always visible */}
          <VerdictBar enemy={selectedEnemy} analysis={analysis} />

          {/* Hand section */}
          {totalCount > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-bold text-sm tracking-wide" style={{ color: '#f0e4c4' }}>
                  Main ({totalCount} carte{totalCount > 1 ? 's' : ''})
                </h2>
                <button
                  onClick={clearHand}
                  className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
                >
                  Effacer
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(handCards).map(([cardId, count]) => {
                  const card = ALL_CARDS.find(c => c.id === cardId)
                  if (!card) return null
                  const contrib = analysis?.cardContribs?.find(c => c.card.id === cardId)
                  return (
                    <HandCardItem
                      key={cardId}
                      card={card}
                      count={count}
                      mode={cardModes[cardId] || 'normal'}
                      contribution={contrib}
                      onSetMode={setCardMode}
                      onRemove={removeHandCard}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Add card CTA */}
          <button
            onClick={() => navigate('/combat/cards')}
            className="w-full py-3 px-4 rounded-[1.1rem] font-display font-bold text-sm tracking-wide text-stone-900 bg-linear-to-r from-amber-400 to-amber-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-900/20"
          >
            + Ajouter une carte
          </button>
        </div>
      </div>

      {/* Enemy selection modal */}
      {showEnemyModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-800/50">
            <h2 className="font-display text-2xl font-bold" style={{ color: '#f0e4c4' }}>
              Sélectionner un ennemi
            </h2>
            <button
              onClick={() => setShowEnemyModal(false)}
              className="text-slate-400 hover:text-slate-200"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <EnemyCarousel
              onSelect={en => {
                setSelectedEnemy(en)
                setShowEnemyModal(false)
              }}
            />
          </div>
        </div>
      )}


    </div>
  )
}
