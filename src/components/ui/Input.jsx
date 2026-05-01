export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full bg-surface-panel border border-border-control rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm ${className}`}
      {...props}
    />
  )
}

export function Textarea({ className = '', rows = 3, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full bg-surface-panel border border-border-control rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm resize-none ${className}`}
      {...props}
    />
  )
}
