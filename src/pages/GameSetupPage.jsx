import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { SCENARIOS } from '../data/scenarios'
import { HEROES } from '../data/heroes'
import { useGameStore } from '../store/gameStore'

export function GameSetupPage() {
  const navigate = useNavigate()
  const startGame = useGameStore(s => s.startGame)

  const [step, setStep] = useState(0)
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [selectedHero, setSelectedHero] = useState(null)
  const [heroIndex, setHeroIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const ref0 = useRef()
  const ref1 = useRef()
  const stepRefs = [ref0, ref1]
  const touchStartX = useRef(null)
  const isDragging = useRef(false)

  const goTo = n => {
    setStep(n)
    setTimeout(() => stepRefs[n]?.current?.scrollTo({ top: 0 }), 50)
  }

  const handleConfirm = () => {
    startGame(selectedHero.id, selectedScenario.id)
    navigate('/')
  }

  const currentHero = HEROES[heroIndex]

  const prevHero = () => {
    setHeroIndex((heroIndex - 1 + HEROES.length) % HEROES.length)
    setSelectedHero(HEROES[(heroIndex - 1 + HEROES.length) % HEROES.length])
  }

  const nextHero = () => {
    setHeroIndex((heroIndex + 1) % HEROES.length)
    setSelectedHero(HEROES[(heroIndex + 1) % HEROES.length])
  }

  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
    isDragging.current = true
  }

  const handleTouchMove = e => {
    if (touchStartX.current === null) return
    const delta = e.touches[0].clientX - touchStartX.current
    setDragOffset(Math.max(-100, Math.min(100, delta)))
  }

  const handleTouchEnd = () => {
    if (Math.abs(dragOffset) > 50) {
      dragOffset < 0 ? nextHero() : prevHero()
    }
    setDragOffset(0)
    touchStartX.current = null
    isDragging.current = false
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* En-tête */}
      <div className="shrink-0 px-4 pt-6 pb-4">
        <h1 className="font-display text-3xl tracking-[0.12em] uppercase" style={{ color: '#f0e4c4' }}>
          Nouvelle partie
        </h1>
        <p className="text-[11px] tracking-widest mt-1 uppercase" style={{ color: 'rgba(160,140,100,0.7)' }}>
          Étape {step + 1} sur 2
        </p>
      </div>

      {/* Contenu des étapes */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ width: '200%', transform: `translateX(${-step * 50}%)` }}>

          {/* Étape 0 : Scénario */}
          <div ref={ref0} className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="mb-4">
              <p className="text-sm" style={{ color: 'rgba(160,140,100,0.9)' }}>Choisissez un scénario</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SCENARIOS.map(scenario => (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario)}
                  className="p-4 rounded-lg text-left transition-all"
                  style={{
                    background: selectedScenario?.id === scenario.id
                      ? 'linear-gradient(135deg, rgba(200,150,70,0.3) 0%, rgba(120,80,30,0.2) 100%)'
                      : 'rgba(40,35,28,0.8)',
                    border: selectedScenario?.id === scenario.id
                      ? '1px solid rgba(217,119,6,0.6)'
                      : '1px solid rgba(80,68,50,0.35)',
                  }}
                >
                  <div className="font-display font-bold text-lg" style={{ color: '#f0e4c4' }}>
                    {scenario.name}
                  </div>
                  <div className="text-xs mt-2" style={{ color: 'rgba(160,140,100,0.7)' }}>
                    {scenario.description}
                  </div>
                  <div className="text-xs mt-2 flex gap-3" style={{ color: 'rgba(160,140,100,0.8)' }}>
                    <span>👥 {scenario.players} joueur(s)</span>
                    <span>⏱ {scenario.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Étape 1 : Héros - Carrousel */}
          <div ref={ref1} className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col items-center justify-center">
            <div className="mb-8 text-center">
              <p className="text-sm" style={{ color: 'rgba(160,140,100,0.9)' }}>Choisissez votre héros</p>
            </div>

            {/* Carrousel */}
            <div className="flex items-center justify-center w-full max-w-2xl">
              {/* Hero card */}
              <div className="flex-1 max-w-md">
                <button
                  onClick={() => {
                    if (!isDragging.current) {
                      if (selectedHero?.id === currentHero.id) {
                        setSelectedHero(null)
                      } else {
                        setSelectedHero(currentHero)
                      }
                    }
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="relative w-full h-96 rounded-2xl overflow-hidden cursor-pointer block touch-none"
                  style={{
                    boxShadow: selectedHero?.id === currentHero.id
                      ? `0 0 45px ${currentHero.glowColor}, 0 0 30px ${currentHero.glowColor}80, 0 20px 50px rgba(0,0,0,0.8)`
                      : `0 0 40px ${currentHero.glowColor}40, 0 20px 50px rgba(0,0,0,0.8)`,
                    transform: `translateX(${dragOffset}px) scale(${selectedHero?.id === currentHero.id ? 1.02 : 1})`,
                    transition: isDragging.current ? 'none' : 'transform 0.3s ease',
                  }}
                >
                  {/* Image */}
                  <img
                    src={currentHero.image}
                    alt={currentHero.name}
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                    style={{ pointerEvents: 'none' }}
                  />

                  {/* Dark gradient overlay at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 100%)',
                      height: '50%',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-center">
                    <div className="font-display font-bold text-2xl" style={{ color: '#f0e4c4' }}>
                      {currentHero.name}
                    </div>
                    <div className="text-sm mt-2" style={{ color: 'rgba(160,140,100,0.8)' }}>
                      {currentHero.subtitle}
                    </div>
                    <div className="text-xs mt-2" style={{ color: 'rgba(160,140,100,0.7)' }}>
                      {currentHero.starterDeckIds.length} cartes de départ
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex gap-2 mt-8">
              {HEROES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setHeroIndex(i)
                    setSelectedHero(HEROES[i])
                  }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: i === heroIndex ? '#f0e4c4' : 'rgba(160,140,100,0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barre de navigation inférieure */}
      <div className="shrink-0 px-3 pb-4 pt-3 border-t border-slate-800/50 bg-stone-950/90 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {step > 0 && (
            <button
              onClick={() => goTo(step - 1)}
              className="flex items-center gap-1.5 px-3 py-3 rounded-[1.1rem] mk-panel text-sm text-amber-200 active:opacity-70 shrink-0"
            >
              <ChevronLeft size={16} />
              Retour
            </button>
          )}

          {step === 0 && (
            <button
              onClick={() => goTo(1)}
              disabled={!selectedScenario}
              className="flex-1 py-3 rounded-[1.1rem] font-display font-bold text-sm tracking-wide text-stone-900 bg-linear-to-r from-amber-400 to-amber-500 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-900/20 truncate px-3"
            >
              {selectedScenario ? 'Suivant →' : 'Choisissez un scénario'}
            </button>
          )}

          {step === 1 && (
            <button
              onClick={handleConfirm}
              disabled={!selectedHero}
              className="flex-1 py-3 rounded-[1.1rem] font-display font-bold text-sm tracking-wide text-stone-900 bg-linear-to-r from-amber-400 to-amber-500 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-900/20"
            >
              {selectedHero ? '⚔️ Démarrer la partie' : 'Choisissez un héros'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
