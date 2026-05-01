import { ENEMY_THEME } from '../../../data/combatConstants'

export function EnemyGridCard({ enemy, isSelected, onClick }) {
  const theme = ENEMY_THEME[enemy.category]

  return (
    <button
      onClick={onClick}
      className="w-full aspect-square relative rounded-xl overflow-hidden border-2 text-left flex flex-col p-3 transition-all active:scale-95 group"
      style={{
        borderColor: isSelected ? theme.border : 'rgba(80,70,60,0.4)',
        background: 'linear-gradient(135deg, rgba(30,24,18,0.9) 0%, rgba(20,16,12,0.95) 100%)',
        boxShadow: isSelected
          ? `0 0 0 1px ${theme.border}, inset 0 1px 3px ${theme.accent}30, 0 12px 32px rgba(0,0,0,0.6), 0 0 24px ${theme.border}50`
          : 'inset 0 1px 2px rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* Enemy image/video background */}
      {enemy.video ? (
        <video
          src={enemy.video}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:opacity-100 opacity-90 transition-opacity"
        />
      ) : enemy.image && (
        <div
          className="absolute inset-0 group-hover:opacity-100 opacity-90 transition-opacity"
          style={{
            backgroundImage: `url(${enemy.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
      )}

      {/* Accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-80"
        style={{ background: `linear-gradient(90deg, ${theme.accent}80 0%, ${theme.accent}20 100%)` }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full">
        {/* Enemy name - centered bottom */}
        <div className="px-2 py-1.5 rounded-lg" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <p className="font-display font-bold text-xl text-center leading-tight line-clamp-2" style={{ color: theme.accent }}>
            {enemy.name}
          </p>
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <div
            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: theme.accent + '30',
              color: theme.accent,
              border: `1px solid ${theme.accent}`,
            }}
          >
            ✓
          </div>
        )}
      </div>
    </button>
  )
}
