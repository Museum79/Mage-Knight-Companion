import { getCardModeData } from '../utils/combatAnalysis'
import { CARD_COLOR_THEME } from '../../../data/combatConstants'
import { SectionHeader } from '../common/SectionHeader'

export function ModeSelector({ handEntries, onSetCardMode }) {
  const modes = ['normal', 'powered', 'tilt_attack', 'tilt_block']
  const modeLabels = {
    normal: 'Normal',
    powered: '⚡ Puissant',
    tilt_attack: '↗ Incl. Atq',
    tilt_block: '↗ Incl. Blc',
  }

  return (
    <div className="mk-panel rounded-[1.1rem] overflow-hidden">
      <SectionHeader eyebrow="Main" title="Mode des cartes" subtitle="Sélectionnez le mode de jeu." />
      <div className="px-3 py-3 flex flex-col gap-4">
        {handEntries.map(({ card, count, mode }) => {
          const theme = CARD_COLOR_THEME[card.color]

          return (
            <div
              key={card.id}
              className="rounded-[0.9rem] px-3 py-3"
              style={{
                background: 'rgba(14,11,8,0.75)',
                border: `1px solid ${theme.border}55`,
              }}
            >
              {/* Card name row */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: theme.accent, boxShadow: `0 0 6px ${theme.accent}` }}
                />
                <p className="font-display font-bold text-sm text-amber-100 flex-1 truncate">{card.name}</p>
                {count > 1 && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ background: theme.accent + '22', color: theme.accent }}
                  >
                    ×{count}
                  </span>
                )}
              </div>

              {/* 2x2 mode grid */}
              <div className="grid grid-cols-2 gap-1.5">
                {modes.map(m => {
                  const modeData = getCardModeData(card, m)
                  const isActive = mode === m

                  return (
                    <button
                      key={m}
                      onClick={() => onSetCardMode(card.id, m)}
                      className="rounded-lg py-2 px-2 transition-all active:scale-95 flex flex-col gap-0.5 text-center"
                      style={{
                        background: isActive ? theme.accent + '22' : 'rgba(8,6,4,0.85)',
                        border: `1.5px solid ${isActive ? theme.border : 'rgba(60,50,35,0.5)'}`,
                      }}
                    >
                      <p
                        className="text-[10px] font-bold leading-tight"
                        style={{ color: isActive ? theme.accent : 'rgba(90,78,55,0.8)' }}
                      >
                        {modeLabels[m]}
                      </p>
                      <p
                        className="text-[9px] leading-tight"
                        style={{ color: isActive ? theme.accent + 'dd' : 'rgba(90,78,55,0.6)' }}
                      >
                        {modeData.summary}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
