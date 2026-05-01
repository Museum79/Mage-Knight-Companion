import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { HEROES } from '../data/heroes'

export const useGameStore = create(persist(
  (set) => ({
    isActive: false,
    heroId: null,
    scenarioId: null,
    playerDeck: {},

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
      set({ isActive: false, heroId: null, scenarioId: null, playerDeck: {} })
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
  }),
  { name: 'mage-knight-game' }
))
