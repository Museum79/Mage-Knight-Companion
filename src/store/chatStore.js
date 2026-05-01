import { create } from 'zustand'

let nextId = 1

export const useChatStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  sendMessage: async (question) => {
    const userMessage = {
      id: String(nextId++),
      role: 'user',
      content: question,
      timestamp: new Date(),
    }

    set(state => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
      error: null,
    }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`)
      }

      const data = await response.json()

      const assistantMessage = {
        id: String(nextId++),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
      }

      set(state => ({
        messages: [...state.messages, assistantMessage],
        isLoading: false,
      }))
    } catch (err) {
      set({
        isLoading: false,
        error: err.message || 'Impossible de contacter l\'oracle. Vérifiez votre connexion.',
      })
    }
  },

  clearError: () => set({ error: null }),
  clearMessages: () => set({ messages: [], error: null }),
}))
