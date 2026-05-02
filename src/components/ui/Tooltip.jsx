import { useState, useEffect, useRef, cloneElement } from 'react'
import { createPortal } from 'react-dom'

export function Tooltip({ content, children, borderColor = 'border-amber-800/60', placement = 'below' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)

  useEffect(() => {
    const handleClose = () => setIsOpen(false)
    if (isOpen) {
      document.addEventListener('click', handleClose)
      return () => document.removeEventListener('click', handleClose)
    }
  }, [isOpen])

  const toggleTooltip = (e) => {
    e.stopPropagation()
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      let top = rect.bottom + 8
      if (placement === 'above') {
        top = rect.top - 8
      }
      let left = rect.left
      // Clamp horizontally to prevent off-screen tooltips (critical on 375px mobile)
      left = Math.min(left, window.innerWidth - 240)
      setPos({ top, left })
    }
    setIsOpen(prev => !prev)
  }

  // Clone children to attach ref and onClick without wrapping in another button
  const triggerElement = cloneElement(children, {
    ref: triggerRef,
    onClick: toggleTooltip,
  })

  return (
    <>
      {triggerElement}
      {isOpen && createPortal(
        <div
          className={`fixed w-56 rounded-lg border ${borderColor} bg-[rgba(18,14,10,0.97)] p-3 z-[9999] shadow-lg pointer-events-auto`}
          style={{
            top: `${pos.top}px`,
            left: `${pos.left}px`,
          }}
          onClick={e => e.stopPropagation()}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  )
}
