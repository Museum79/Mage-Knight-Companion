import { useRef, useEffect } from 'react'

export function useScrollToBottom(deps, threshold = 120) {
  const scrollRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, deps)

  return { scrollRef, bottomRef }
}
