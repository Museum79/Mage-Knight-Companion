import { useState } from 'react'

export function useHandState() {
  const [handCards, setHandCards] = useState({})
  const [cardModes, setCardModes] = useState({})

  const addCard = id => setHandCards(p => ({ ...p, [id]: (p[id] || 0) + 1 }))

  const removeCard = id => {
    if ((handCards[id] || 0) <= 1) {
      setCardModes(p => {
        const next = { ...p }
        delete next[id]
        return next
      })
    }
    setHandCards(p => {
      const n = { ...p }
      n[id] > 1 ? n[id]-- : delete n[id]
      return n
    })
  }

  const setCardMode = (id, mode) => setCardModes(p => ({ ...p, [id]: mode }))

  const clearHand = () => {
    setHandCards({})
    setCardModes({})
  }

  return { handCards, cardModes, addCard, removeCard, setCardMode, clearHand }
}
