export function Modal({ isOpen, onClose, children, size = 'sm', scrollable = false }) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-5xl h-[90vh]',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(4, 3, 2, 0.85)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`mk-panel rounded-2xl ${sizeClasses[size]} ${scrollable ? 'overflow-y-auto' : 'overflow-hidden'} max-h-[90vh]`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  )
}
