import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { HEROES } from '../data/heroes'

export const useGameStore = create(persist(
  (set) => ({
    isActive: false,
    heroId: null,
    scenarioId: null,
    playerDeck: {},
    handCards: {},
    cardModes: {},
    selectedEnemy: null,

    startGame: (heroId, scenarioId) => {
      const hero = HEROES.find(h => h.id === heroId)
      if (!hero) return

      const deck = {}
      hero.starterDeckIds.forEach(id => {
        deck[id] = (deck[id] || 0) + 1
      })

      set({ isActive: true, heroId, scenarioId, playerDeck: deck })
    },

    endGame: () => {
      set({ isActive: false, heroId: null, scenarioId: null, playerDeck: {}, handCards: {}, cardModes: {} })
    },

    addCard: (cardId) => set(s => ({
      playerDeck: { ...s.playerDeck, [cardId]: (s.playerDeck[cardId] || 0) + 1 }
    })),

    removeCard: (cardId) => set(s => {
      const deck = { ...s.playerDeck }
      if ((deck[cardId] || 0) > 1) {
        deck[cardId]--
      } else {
        delete deck[cardId]
      }
      return { playerDeck: deck }
    }),

    addHandCard: (cardId) => set(s => ({
      handCards: { ...s.handCards, [cardId]: (s.handCards[cardId] || 0) + 1 }
    })),

    removeHandCard: (cardId) => set(s => {
      if ((s.handCards[cardId] || 0) <= 1) {
        const modes = { ...s.cardModes }
        delete modes[cardId]
        const hand = { ...s.handCards }
        delete hand[cardId]
        return { handCards: hand, cardModes: modes }
      }
      return {
        handCards: { ...s.handCards, [cardId]: s.handCards[cardId] - 1 }
      }
    }),

    setCardMode: (cardId, mode) => set(s => ({
      cardModes: { ...s.cardModes, [cardId]: mode }
    })),

    clearHand: () => set({ handCards: {}, cardModes: {} }),

    setSelectedEnemy: (enemy) => set({ selectedEnemy: enemy }),
  }),
  { name: 'mage-knight-game' }
))
