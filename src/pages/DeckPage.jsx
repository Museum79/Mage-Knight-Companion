import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Minus, AlertCircle } from 'lucide-react'
import { ALL_CARDS } from '../data/cards'
import { HEROES } from '../data/heroes'
import { SCENARIOS } from '../data/scenarios'
import { useGameStore } from '../store/gameStore'
import { CARD_COLOR_THEME, COLOR_GROUPS } from '../data/combatConstants'

export function DeckPage() {
  const navigate = useNavigate()
  const { isActive, heroId, scenarioId, playerDeck, addCard, removeCard } = useGameStore()
  const [activeColor, setActiveColor] = useState('red')
  const [showAddCard, setShowAddCard] = useState(false)
  const [confirmRemove, setConfirmRemove] = useState(null)
  const [addCardColor, setAddCardColor] = useState('red')
  const [selectedCardDetail, setSelectedCardDetail] = useState(null)

  const getColorTextStyles = (color) => {
    const colorMap = {
      red: { title: '#FFD4CC', secondary: 'rgba(255,170,160,0.7)', accent: '#FF9999', buttonBg: 'rgba(248,113,113,0.2)', buttonBorder: 'rgba(248,113,113,0.6)' },
      blue: { title: '#CCE5FF', secondary: 'rgba(170,220,255,0.7)', accent: '#99CCFF', buttonBg: 'rgba(147,197,253,0.2)', buttonBorder: 'rgba(147,197,253,0.6)' },
      green: { title: '#CCFFCC', secondary: 'rgba(170,255,170,0.7)', accent: '#99FF99', buttonBg: 'rgba(134,239,172,0.2)', buttonBorder: 'rgba(134,239,172,0.6)' },
      purple: { title: '#E5D5FF', secondary: 'rgba(220,180,255,0.7)', accent: '#C9B3FF', buttonBg: 'rgba(196,181,253,0.2)', buttonBorder: 'rgba(196,181,253,0.6)' },
      white: { title: '#F5EDDD', secondary: 'rgba(225,210,180,0.7)', accent: '#D4C5A0', buttonBg: 'rgba(226,213,181,0.2)', buttonBorder: 'rgba(226,213,181,0.6)' },
      gold: { title: '#FEF3C7', secondary: 'rgba(254,243,199,0.7)', accent: '#FBBF24', buttonBg: 'rgba(251,191,36,0.2)', buttonBorder: 'rgba(251,191,36,0.6)' },
    }
    return colorMap[color] || colorMap.gold
  }

  const hero = HEROES.find(h => h.id === heroId)
  const scenario = SCENARIOS.find(s => s.id === scenarioId)

  const cardsInDeck = useMemo(() => {
    return Object.entries(playerDeck).map(([id, count]) => {
      const card = ALL_CARDS.find(c => c.id === id)
      return card ? { ...card, count } : null
    }).filter(Boolean)
  }, [playerDeck])

  const tilesForActiveColor = useMemo(() => {
    return cardsInDeck
      .filter(card => card.color === activeColor)
      .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
  }, [activeColor, cardsInDeck])

  const totalCards = Object.values(playerDeck).reduce((a, b) => a + b, 0)

  if (!isActive) {
    return (
      <div className="flex flex-col h-full overflow-hidden p-4">
        <div className="flex-1 flex flex-col items-center justify-center">
          <AlertCircle size={48} style={{ color: 'rgba(160,140,100,0.5)' }} className="mb-4" />
          <h2 className="font-display text-2xl" style={{ color: '#f0e4c4', marginBottom: '0.5rem' }}>
            Aucune partie en cours
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(160,140,100,0.8)' }}>
            Créez une partie pour gérer votre deck
          </p>
          <button
            onClick={() => navigate('/setup')}
            className="px-6 py-3 rounded-lg font-display font-bold text-stone-900 bg-linear-to-r from-amber-400 to-amber-500 active:scale-95 transition-all"
          >
            ⚔️ Créer une partie
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-linear-to-b from-slate-900 via-slate-850 to-slate-800">
      {/* En-tête */}
      <div className="shrink-0 px-4 pt-6 pb-4 border-b border-slate-700/30">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="font-display text-3xl tracking-[0.12em] uppercase" style={{ color: '#f0e4c4' }}>
            Mon Deck
          </h1>
          <button
            onClick={() => setShowAddCard(true)}
            className="shrink-0 py-2.5 px-4 rounded-lg font-display font-bold text-sm text-stone-900 bg-linear-to-r from-amber-400 to-amber-500 active:scale-95 hover:shadow-lg hover:shadow-amber-500/40 transition-all whitespace-nowrap"
          >
            ➕ Ajouter une carte
          </button>
        </div>
        <div className="text-xs" style={{ color: 'rgba(160,140,100,0.8)' }}>
          {hero?.name} • {scenario?.name} • {totalCards} cartes
        </div>
      </div>

      {/* Tabs de couleur */}
      <div className="shrink-0 flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none border-b border-slate-700/30">
        {COLOR_GROUPS.map(({ color, label }) => {
          const theme = CARD_COLOR_THEME[color]
          const countInGroup = cardsInDeck
            .filter(c => c.color === color)
            .reduce((sum, c) => sum + c.count, 0)

          return (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 hover:scale-105"
              style={{
                background: activeColor === color
                  ? `linear-gradient(135deg, ${theme.accent}30 0%, ${theme.accent}15 100%)`
                  : 'rgba(51,51,70,0.5)',
                border: `2px solid ${activeColor === color ? theme.accent : 'rgba(100,120,150,0.3)'}`,
                color: activeColor === color ? theme.accent : 'rgba(140,150,170,0.7)',
                boxShadow: activeColor === color ? `0 0 20px ${theme.accent}30` : 'none',
              }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: theme.accent }} />
              {label}
              {countInGroup > 0 && (
                <span
                  className="min-w-5 h-5 px-1 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{ background: theme.accent, color: '#0f0c08' }}
                >
                  {countInGroup}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Grille de cartes */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {tilesForActiveColor.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm" style={{ color: 'rgba(160,140,100,0.6)' }}>
              Aucune carte de cette couleur
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {tilesForActiveColor.map(card => {
              const theme = CARD_COLOR_THEME[card.color]
              return (
                <div
                  key={card.id}
                  className="p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:-translate-y-1 group"
                  style={{
                    background: `linear-gradient(135deg, rgba(51,65,85,0.6) 0%, rgba(30,41,59,0.5) 100%)`,
                    border: `2px solid ${theme.accent}40`,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.3), inset 0 0 1px ${theme.accent}20`,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm leading-tight" style={{ color: '#f0e4c4' }}>
                        {card.name}
                      </p>
                    </div>
                    <span
                      className="ml-1 px-2 py-0.5 rounded text-xs font-bold shrink-0 transition-all duration-200"
                      style={{
                        background: `${theme.accent}30`,
                        color: theme.accent,
                        border: `1px solid ${theme.accent}60`,
                      }}
                    >
                      ×{card.count}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmRemove(card.id)}
                      className="flex-1 py-2 rounded text-xs font-bold transition-all active:scale-95 hover:opacity-90"
                      style={{
                        background: 'rgba(239,68,68,0.2)',
                        color: '#fca5a5',
                        border: '1.5px solid rgba(239,68,68,0.5)',
                      }}
                    >
                      <Minus size={14} className="mx-auto" />
                    </button>
                    <button
                      onClick={() => addCard(card.id)}
                      className="flex-1 py-2 rounded text-xs font-bold transition-all active:scale-95 hover:opacity-90"
                      style={{
                        background: 'rgba(34,197,94,0.2)',
                        color: '#86efac',
                        border: '1.5px solid rgba(34,197,94,0.5)',
                      }}
                    >
                      <Plus size={14} className="mx-auto" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Barre inférieure */}
      <div className="shrink-0 px-4 pb-4 pt-3 border-t border-slate-700/30 bg-linear-to-t from-slate-900 to-slate-850 backdrop-blur-sm flex gap-3">
        <button
          onClick={() => navigate('/combat')}
          className="flex-1 py-3 rounded-lg font-display font-bold text-sm text-amber-200 mk-panel active:opacity-70 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
        >
          ⚔️ Aller au combat
        </button>
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-3 rounded-lg font-display font-bold text-sm text-slate-300 active:opacity-70 hover:shadow-lg hover:shadow-slate-500/20 transition-all"
          style={{ background: 'rgba(100,116,139,0.15)', border: '1.5px solid rgba(100,116,139,0.4)' }}
        >
          ✕ Fermer
        </button>
      </div>

      {/* Modal de confirmation suppression de carte */}
      {confirmRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(4,3,2,0.85)' }}>
          <div className="bg-linear-to-br from-slate-900 via-slate-850 to-slate-800 p-6 rounded-2xl border border-slate-700/50 max-w-sm" style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          }}>
            <h3 className="font-display text-2xl mb-3" style={{ color: '#f0e4c4' }}>
              🗑️ Retirer cette carte?
            </h3>
            <p className="text-sm mb-6 font-semibold" style={{ color: '#d4b87a' }}>
              {ALL_CARDS.find(c => c.id === confirmRemove)?.name}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmRemove(null)}
                className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all hover:opacity-90"
                style={{ background: 'rgba(80,68,50,0.4)', color: '#d4b87a', border: '1px solid rgba(80,68,50,0.6)' }}
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  removeCard(confirmRemove)
                  setConfirmRemove(null)
                }}
                className="flex-1 py-2.5 rounded-lg text-sm font-bold text-stone-900 active:scale-95 hover:shadow-lg hover:shadow-red-500/30 transition-all"
                style={{ background: 'rgb(239, 68, 68)' }}
              >
                Retirer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajouter une carte */}
      {showAddCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto" style={{ background: 'rgba(4,3,2,0.85)' }}>
          <div className="w-full max-w-5xl bg-linear-to-br from-slate-900 via-slate-850 to-slate-800 rounded-2xl border border-slate-700/50 flex flex-col h-[90vh] max-h-[90vh]" style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)',
          }}>
            {/* Header */}
            <div className="shrink-0 px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-700/30">
              <h3 className="font-display text-2xl tracking-wide" style={{ color: '#f0e4c4' }}>
                📚 Ajouter une carte
              </h3>
              <button
                onClick={() => setShowAddCard(false)}
                className="p-2 rounded-lg transition-all active:scale-90 hover:bg-slate-700/30"
                style={{ color: '#d4b87a' }}
              >
                ✕
              </button>
            </div>

            {/* Tabs de couleur */}
            <div className="shrink-0 flex gap-2 px-6 py-4 overflow-x-auto scrollbar-none border-b border-slate-700/30 flex-wrap">
              {COLOR_GROUPS.map(({ color, label }) => {
                const theme = CARD_COLOR_THEME[color]
                return (
                  <button
                    key={color}
                    onClick={() => setAddCardColor(color)}
                    className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 hover:scale-105"
                    style={{
                      background: addCardColor === color
                        ? `linear-gradient(135deg, ${theme.accent}30 0%, ${theme.accent}15 100%)`
                        : 'rgba(51,51,70,0.5)',
                      border: `2px solid ${addCardColor === color ? theme.accent : 'rgba(100,120,150,0.3)'}`,
                      color: addCardColor === color ? theme.accent : 'rgba(140,150,170,0.7)',
                      boxShadow: addCardColor === color ? `0 0 20px ${theme.accent}30` : 'none',
                    }}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: theme.accent }} />
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Contenu - Grille de cartes */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {ALL_CARDS.filter(c => c.color === addCardColor).map(card => {
                  const count = playerDeck[card.id] || 0
                  const theme = CARD_COLOR_THEME[addCardColor]
                  const hasDescription = card.basicText || card.poweredText
                  const isSpell = card.category === 'spell'
                  const isArtifact = card.category === 'artifact'

                  return (
                    <button
                      key={card.id}
                      onClick={() => {
                        if (hasDescription) {
                          setSelectedCardDetail(card)
                        } else {
                          addCard(card.id)
                        }
                      }}
                      className={`w-full transition-all duration-200 active:scale-95 hover:scale-105 hover:-translate-y-1 text-left group flex flex-col relative bg-metal-${card.color}`}
                      style={{
                        border: `3px solid ${CARD_COLOR_THEME[card.color]?.accent || '#fbbf24'}`,
                        borderRadius: '0.75rem',
                        padding: '0.625rem',
                      }}
                    >
                      {/* Titre */}
                      <p
                        className="font-display font-bold text-sm leading-tight mb-2 flex-1 text-center"
                        style={{ color: '#ffffff' }}
                      >
                        {card.name}
                      </p>

                      {/* Footer */}
                      <div className="flex items-end justify-between pt-1.5 gap-1.5">
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-[10px] mb-0.5 transition-all duration-200 truncate"
                            style={{ color: '#ffffff' }}
                          >
                            Copies: {count}
                          </p>
                          <p
                            className="text-[10px] font-bold truncate"
                            style={{ color: '#ffffff' }}
                          >
                            {card.type || (isSpell ? 'Sort' : isArtifact ? 'Artefact' : 'Enchantement')}
                          </p>
                        </div>
                        <div
                          className="flex items-center justify-center w-7 h-7 rounded-lg font-bold text-xs transition-all duration-200 group-hover:scale-110 shrink-0"
                          style={{
                            background: getColorTextStyles(card.color).buttonBg,
                            color: getColorTextStyles(card.color).accent,
                            border: `1.5px solid ${getColorTextStyles(card.color).buttonBorder}`,
                          }}
                        >
                          {hasDescription ? '📖' : '+'}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails de la carte */}
      {selectedCardDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto" style={{ background: 'rgba(4,3,2,0.85)' }}>
          {selectedCardDetail.category === 'spell' ? (
            // Style pour Spells - Inspiration vraie carte du jeu
            <div
              className="p-8 rounded-2xl max-w-2xl w-full flex flex-col"
              style={{
                background: 'linear-gradient(135deg, rgba(40,30,80,0.9) 0%, rgba(30,25,60,0.85) 100%)',
                border: '4px solid #8B5CF6',
                boxShadow: '0 20px 60px rgba(139,92,246,0.5), inset 0 1px 1px rgba(139,92,246,0.2)',
              }}
            >
              {/* Contenu de la carte style vrai jeu */}
              {(() => {
                const manaSymbols = {
                  red: '🔴',
                  blue: '🔵',
                  green: '🟢',
                  white: '⚪',
                  black: '⚫',
                }

                const getManaDisplay = (mana) => {
                  if (!mana) return null
                  const manaList = Array.isArray(mana) ? mana : [mana]
                  return manaList.map((m, idx) => (
                    <span key={idx} className="text-2xl" title={`Coût: ${m}`}>
                      {manaSymbols[m] || '?'}
                    </span>
                  ))
                }

                return (
                  <div className="space-y-6 flex-1">
                    {/* PARTIE HAUTE - Nom normal */}
                    <div>
                      <h2 className="font-display text-3xl font-bold text-center mb-4" style={{ color: '#E0D5FF' }}>
                        {selectedCardDetail.name.toUpperCase()}
                      </h2>

                      {/* Contenu : Coût à gauche, texte à droite */}
                      <div className="flex gap-4 items-start">
                        {selectedCardDetail.basicCost && (
                          <div className="flex gap-1 shrink-0 pt-1">
                            {getManaDisplay(selectedCardDetail.basicCost.mana)}
                          </div>
                        )}
                        <p className="text-sm leading-relaxed flex-1" style={{ color: '#E0D5FF', fontWeight: '500' }}>
                          {selectedCardDetail.basicText || selectedCardDetail.basicEffect}
                        </p>
                      </div>
                    </div>

                    {/* Séparation */}
                    {selectedCardDetail.poweredName && (
                      <div className="border-t-2 border-purple-500/40 pt-6">
                        {/* PARTIE BASSE - Nom surpuissant */}
                        <h2 className="font-display text-3xl font-bold text-center mb-4" style={{ color: '#C4B5FD' }}>
                          {selectedCardDetail.poweredName.toUpperCase()}
                        </h2>

                        {/* Contenu : Coût à gauche, texte à droite */}
                        <div className="flex gap-4 items-start">
                          {selectedCardDetail.poweredCost && (
                            <div className="flex gap-1 shrink-0 pt-1">
                              {getManaDisplay(selectedCardDetail.poweredCost.mana)}
                            </div>
                          )}
                          <p className="text-sm leading-relaxed flex-1" style={{ color: '#C4B5FD', fontWeight: '500' }}>
                            {selectedCardDetail.poweredText || selectedCardDetail.poweredEffect}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t-2 border-purple-500/30">
                <button
                  onClick={() => setSelectedCardDetail(null)}
                  className="flex-1 py-3 rounded-lg text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    background: 'rgba(139,92,246,0.15)',
                    color: '#A78BFA',
                    border: '2px solid rgba(139,92,246,0.5)',
                  }}
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    addCard(selectedCardDetail.id)
                    setSelectedCardDetail(null)
                  }}
                  className="flex-1 py-3 rounded-lg text-sm font-bold text-white transition-all hover:shadow-lg active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    boxShadow: '0 4px 15px rgba(139,92,246,0.5)',
                  }}
                >
                  ✓ Ajouter au deck
                </button>
              </div>
            </div>
          ) : (
            // Style classique pour les autres catégories
            <div className="bg-linear-to-br from-slate-900 via-slate-850 to-slate-800 p-8 rounded-2xl border border-slate-700/50 max-w-2xl w-full" style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)',
            }}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-3xl font-bold mb-2" style={{ color: '#f0e4c4' }}>
                    {selectedCardDetail.name}
                  </h3>
                  {selectedCardDetail.poweredName && (
                    <p className="text-sm" style={{ color: 'rgba(212,184,122,0.8)' }}>
                      ⚡ Puissance: <span className="font-semibold">{selectedCardDetail.poweredName}</span>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCardDetail(null)}
                  className="shrink-0 p-2 rounded-lg transition-all active:scale-90 hover:bg-slate-700/30"
                  style={{ color: '#d4b87a' }}
                >
                  ✕
                </button>
              </div>

              {/* Contenu de la carte */}
              <div className="space-y-5 mb-8">
                {selectedCardDetail.basicText && (
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(51,65,85,0.4)', border: '1px solid rgba(100,150,200,0.2)' }}>
                    <p className="text-xs font-bold uppercase mb-2" style={{ color: 'rgba(150,200,255,0.8)', letterSpacing: '0.05em' }}>
                      📖 Mode de base
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#f0e4c4' }}>
                      {selectedCardDetail.basicText}
                    </p>
                  </div>
                )}

                {selectedCardDetail.basicEffect && (
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(51,65,85,0.4)', border: '1px solid rgba(100,150,200,0.2)' }}>
                    <p className="text-xs font-bold uppercase mb-2" style={{ color: 'rgba(150,200,255,0.8)', letterSpacing: '0.05em' }}>
                      ✨ Effet de base
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#f0e4c4' }}>
                      {selectedCardDetail.basicEffect}
                    </p>
                  </div>
                )}

                {selectedCardDetail.poweredText && (
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(200,150,70,0.15)', border: '1px solid rgba(212,184,122,0.3)' }}>
                    <p className="text-xs font-bold uppercase mb-2" style={{ color: 'rgba(212,184,122,0.9)', letterSpacing: '0.05em' }}>
                      ⚡ Mode renforcé
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#d4b87a' }}>
                      {selectedCardDetail.poweredText}
                    </p>
                  </div>
                )}

                {selectedCardDetail.poweredEffect && (
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(200,150,70,0.15)', border: '1px solid rgba(212,184,122,0.3)' }}>
                    <p className="text-xs font-bold uppercase mb-2" style={{ color: 'rgba(212,184,122,0.9)', letterSpacing: '0.05em' }}>
                      ✨ Effet renforcé
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#d4b87a' }}>
                      {selectedCardDetail.poweredEffect}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCardDetail(null)}
                  className="flex-1 py-3 rounded-lg text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    background: 'rgba(80,68,50,0.4)',
                    color: '#d4b87a',
                    border: '1px solid rgba(80,68,50,0.6)',
                  }}
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    addCard(selectedCardDetail.id)
                    setSelectedCardDetail(null)
                  }}
                  className="flex-1 py-3 rounded-lg text-sm font-bold text-stone-900 transition-all hover:shadow-lg hover:shadow-green-500/30 active:scale-95"
                  style={{ background: 'rgb(34, 197, 94)' }}
                >
                  ✓ Ajouter au deck
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
