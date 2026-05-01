export function OracleAvatar({ pulse = false }) {
  return (
    <div className="relative w-8 h-8 shrink-0 mt-0.5 mr-2">
      {pulse && (
        <span className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: 'radial-gradient(circle, rgba(200,160,40,0.6), transparent)',
            animationDuration: '1.5s',
          }}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(200,160,40,0.5), rgba(100,80,30,0.3))',
          border: '1px solid rgba(200,160,40,0.4)',
          boxShadow: '0 0 12px rgba(200,160,40,0.3), inset 0 0 8px rgba(255,240,180,0.15)',
        }}>
        <div className="w-full h-full flex items-center justify-center text-[10px] font-display font-bold"
          style={{ color: '#d4a849', textShadow: '0 0 4px rgba(200,160,40,0.5)' }}>
          ◆
        </div>
      </div>
    </div>
  )
}
