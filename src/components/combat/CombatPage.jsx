import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ALL_CARDS } from '../../data/cards'
import { useGameStore } from '../../store/gameStore'
import { analyzeCombat } from './utils/combatAnalysis'
import { HandCardItem } from './HandCardItem'
import { EnemyCarousel } from './enemies/EnemyCarousel'
import { EnemyBanner } from './enemies/EnemyBanner'
import { CombatSummary } from './resolution/CombatSummary'

const STEPS = [
  { id: 0, label: 'Ennemi' },
  { id: 1, label: 'Main' },
  { id: 2, label: 'Résultat' },
]

export function CombatPage() {
  const navigate = useNavigate()
  const { selectedEnemy, handCards, cardModes, addHandCard, removeHandCard, setCardMode, clearHand, setSelectedEnemy } = useGameStore()
  const [step, setStep] = useState(() => selectedEnemy ? 1 : 0)

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

  const handleSelectEnemy = (enemy) => {
    setSelectedEnemy(enemy)
    setStep(1)
  }

  const handleStepClick = (stepId) => {
    if (stepId < step) {
      setStep(stepId)
    }
  }

  const handleClearAndReset = () => {
    clearHand()
    setStep(0)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-950">
      {/* Header */}
      <div className="shrink-0 px-4 pt-6 pb-4 border-b border-slate-800/50">
        <h1 className="font-display text-3xl tracking-[0.12em] uppercase" style={{ color: '#f0e4c4' }}>
          ⚔️ Combat
        </h1>
      </div>

      {/* Progress bar */}
      <div className="shrink-0 px-4 py-3 border-b border-slate-800/30 bg-slate-900/30">
        <div className="flex items-center justify-center gap-6">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center gap-3">
              <button
                onClick={() => handleStepClick(s.id)}
                disabled={s.id > step}
                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs transition-all ${
                  s.id < step
                    ? 'bg-green-900/40 text-green-400 cursor-pointer hover:bg-green-800/50'
                    : s.id === step
                      ? 'bg-amber-900/50 text-amber-200'
                      : 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                }`}
              >
                {s.id < step ? '✓' : s.id + 1}
              </button>
              <span className={`text-xs font-bold tracking-wide ${
                s.id <= step ? 'text-amber-100' : 'text-slate-500'
              }`}>
                {s.label}
              </span>
              {idx < STEPS.length - 1 && (
                <ChevronRight size={16} className="text-slate-600 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Step 0: Enemy Selection */}
        {step === 0 && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="shrink-0 px-4 py-4">
              <h2 className="font-display text-lg font-bold" style={{ color: '#f0e4c4' }}>
                Choisir un ennemi
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <EnemyCarousel selectedEnemy={selectedEnemy} onSelect={handleSelectEnemy} />
            </div>
          </div>
        )}

        {/* Step 1: Hand Building */}
        {step === 1 && selectedEnemy && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Enemy banner header */}
            <div className="shrink-0 px-4 py-3 border-b border-slate-700/50">
              <div className="rounded-[1.1rem] overflow-hidden">
                <EnemyBanner enemy={selectedEnemy} analysis={null} />
              </div>
              <button
                onClick={() => setStep(0)}
                className="mt-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"
              >
                ← Changer d'ennemi
              </button>
            </div>

            {/* Hand section */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
              <div className="space-y-3">
                {totalCount === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-8">
                    Aucune carte dans la main. Ajoutez des cartes pour commencer.
                  </p>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display font-bold text-sm" style={{ color: '#f0e4c4' }}>
                        Main ({totalCount})
                      </h3>
                      <button
                        onClick={() => clearHand()}
                        className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        Effacer
                      </button>
                    </div>
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
                  </>
                )}
              </div>
            </div>

            {/* Footer sticky */}
            <div className="shrink-0 px-4 py-4 border-t border-slate-800/50 space-y-2 bg-slate-900/50">
              <button
                onClick={() => navigate('/combat/cards')}
                className="w-full py-3 px-4 rounded-[1.1rem] font-display font-bold text-sm tracking-wide text-stone-900 bg-linear-to-r from-amber-400 to-amber-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-900/20"
              >
                ＋ Ajouter des cartes
              </button>
              <button
                onClick={() => setStep(2)}
                className="w-full py-2.5 px-4 rounded-[1.1rem] font-display font-bold text-sm tracking-wide transition-all"
                style={{
                  background: 'rgba(214, 179, 106, 0.15)',
                  color: '#e8cc60',
                  border: '1px solid rgba(214, 179, 106, 0.3)',
                }}
              >
                Voir le résultat →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Result */}
        {step === 2 && selectedEnemy && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 pt-6 pb-20">
              <CombatSummary enemy={selectedEnemy} analysis={analysis} />
            </div>

            {/* Footer sticky */}
            <div className="shrink-0 px-4 py-4 border-t border-slate-800/50 space-y-2 bg-slate-900/50">
              <button
                onClick={() => setStep(1)}
                className="w-full py-2.5 px-4 rounded-[1.1rem] font-display font-bold text-sm tracking-wide transition-all"
                style={{
                  background: 'rgba(214, 179, 106, 0.15)',
                  color: '#e8cc60',
                  border: '1px solid rgba(214, 179, 106, 0.3)',
                }}
              >
                ← Modifier la main
              </button>
              <button
                onClick={handleClearAndReset}
                className="w-full py-3 px-4 rounded-[1.1rem] font-display font-bold text-sm tracking-wide text-stone-900 bg-linear-to-r from-amber-400 to-amber-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-900/20"
              >
                Nouveau combat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
