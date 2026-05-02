import { ATTACK_COLOR, ATTACK_BG, TYPE_FR, ENEMY_THEME } from '../../../data/combatConstants'
import { Badges } from './Badges'

export function EnemyBanner({ enemy, analysis }) {
  const theme = ENEMY_THEME[enemy.category] || ENEMY_THEME.dungeon
  const attackColor = ATTACK_COLOR[enemy.attackType] || 'text-slate-300'
  const attackBg = ATTACK_BG[enemy.attackType] || 'bg-slate-700'

  const showVerdict = analysis && (analysis.canKill || analysis.canSurvive !== undefined)

  const isVictory = showVerdict && analysis.canKill
  const verdictColors = {
    success: { bg: 'rgba(22,60,30,0.85)', text: '#4ade80' },
    fail: { bg: 'rgba(60,15,12,0.85)', text: '#f87171' },
  }
  const colors = isVictory ? verdictColors.success : verdictColors.fail
  const verdictText = isVictory ? 'Victoire' : 'Défaite'

  return (
    <div className="rounded-[1.1rem] border relative overflow-hidden" style={{ borderColor: theme.border }}>
      {enemy.image && (
        <div className="absolute inset-0">
          <img src={enemy.image} alt="" className="w-full h-full object-cover object-top" />
        </div>
      )}

      <div className={`absolute inset-0 pointer-events-none ${theme.cardOverlay}`} />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-3/5"
        style={{ background: 'linear-gradient(90deg, rgba(8,6,4,0.88) 0%, rgba(8,6,4,0.4) 80%, transparent 100%)' }}
      />

      <div className="relative flex flex-col h-full">
        {/* Top: Enemy info */}
        <div className="flex-1 p-4 flex flex-col justify-end">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <p className={`text-[10px] uppercase tracking-[0.22em] mb-0.5 opacity-80 ${theme.labelClass}`}>{theme.label}</p>
              <p className="font-display font-bold text-xl text-amber-100 leading-tight wrap-break-word">{enemy.name}</p>
            </div>
            <span className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${attackBg} ${attackColor}`}>
              {TYPE_FR[enemy.attackType] ?? enemy.attackType}
            </span>
          </div>
          <div className="flex gap-6 mb-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-amber-700 mb-0.5">Armure</p>
              <p className="font-display font-bold text-2xl text-amber-100">{enemy.armor}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-amber-700 mb-0.5">Attaque</p>
              <p className="font-display font-bold text-2xl text-red-400">{enemy.attack}</p>
            </div>
          </div>
          <Badges enemy={enemy} />
        </div>

        {/* Bottom: Verdict banner (if analysis provided) */}
        {showVerdict && (
          <div
            className="shrink-0 px-3 py-1.5 border-t"
            style={{
              background: colors.bg,
            }}
          >
            <p className="font-display text-sm font-bold tracking-wide text-center" style={{ color: colors.text }}>
              {verdictText}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
