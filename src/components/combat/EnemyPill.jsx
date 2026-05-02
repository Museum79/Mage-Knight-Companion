import { CARD_COLOR_THEME } from '../../data/combatConstants'

export function EnemyPill({ selectedEnemy, onSelectClick }) {
  if (!selectedEnemy) {
    return (
      <button
        onClick={onSelectClick}
        className="w-full px-4 py-3 rounded-[1.1rem] bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm font-bold hover:bg-amber-500/20 transition-all active:scale-95"
      >
        ⚔️ Choisir un ennemi
      </button>
    )
  }

  const categoryLabel = {
    orc: 'Orque',
    dungeon: 'Donjon',
    mage_tower: 'Tour du Mage',
    keep: 'Forteresse',
    city: 'Cité',
    draconum: 'Draconum',
  }[selectedEnemy.category] || selectedEnemy.category

  const dmgTypeColor = CARD_COLOR_THEME[selectedEnemy.attackType.toLowerCase()]?.accent || '#fbbf24'

  return (
    <button
      onClick={onSelectClick}
      className="w-full px-4 py-3 rounded-[1.1rem] border bg-slate-900/60 border-slate-700/50 hover:border-slate-600/50 transition-all text-left active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-display text-lg font-bold text-amber-100 truncate">
            {selectedEnemy.name}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            <span className="text-slate-500">{categoryLabel}</span>
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-[10px] px-2 py-1 rounded bg-slate-800/80 text-slate-300">
              🛡 {selectedEnemy.armor}
            </span>
            <span className="text-[10px] px-2 py-1 rounded bg-slate-800/80" style={{ color: dmgTypeColor }}>
              ⚔ {selectedEnemy.attack} {selectedEnemy.attackType}
            </span>
            {selectedEnemy.abilities.length > 0 && (
              <span className="text-[10px] px-2 py-1 rounded bg-slate-800/80 text-slate-300">
                {selectedEnemy.abilities.join(' · ')}
              </span>
            )}
          </div>
        </div>
        <span className="text-xs text-slate-400 shrink-0 mt-1 font-display">CHANGER</span>
      </div>
    </button>
  )
}
