export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-surface-panel text-text-secondary',
    amber: 'bg-amber-900/50 text-amber-400 border border-amber-800/50',
    red: 'bg-red-900/50 text-red-400 border border-red-800/50',
    blue: 'bg-blue-900/50 text-blue-400 border border-blue-800/50',
    green: 'bg-green-900/50 text-green-400 border border-green-800/50',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
