import { OracleAvatar } from './OracleAvatar'

export function LoadingBubble() {
  return (
    <div className="flex gap-2 mb-4 mk-message-enter">
      <OracleAvatar pulse />
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(40,35,28,0.9) 0%, rgba(20,18,16,0.9) 100%)',
          border: '1px solid rgba(200,160,40,0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i}
              className="mk-rune text-sm"
              style={{ color: '#d4a849' }}
              aria-hidden="true">
              ◆
            </div>
          ))}
        </div>
        <span className="text-xs text-text-muted">L&apos;oracle consulte les arcanes…</span>
        <span className="absolute inset-0 mk-loading-shimmer pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,220,140,0.3), transparent)',
            width: '50%',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
