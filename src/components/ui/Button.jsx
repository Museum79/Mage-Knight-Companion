export function Button({ children, variant = 'primary', size = 'md', className = '', disabled = false, onClick, type = 'button' }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'mk-control-accent text-slate-950 focus:ring-amber-500',
    secondary: 'mk-panel-soft text-text-primary focus:ring-slate-500',
    ghost: 'text-text-secondary hover:bg-surface-raised hover:text-text-primary focus:ring-slate-500',
    danger: 'bg-red-900/40 hover:bg-red-900/55 text-red-100 border border-red-700/40 focus:ring-red-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
