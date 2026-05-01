import { BookOpen, Sparkles, ChevronRight } from 'lucide-react'

const SUGGESTIONS = [
  { text: 'Comment fonctionne le blocage en combat ?', icon: '⚔️' },
  { text: 'Quelle est la différence entre jour et nuit ?', icon: '🌙' },
  { text: 'Comment utiliser les cristaux de mana ?', icon: '💎' },
  { text: "Comment fonctionne l'attaque à distance ?", icon: '🏹' },
  { text: 'Comment recruter des unités ?', icon: '🛡️' },
  { text: "Qu'est-ce que la fortification ?", icon: '🏰' },
]

function FloatingSparkle({ left, top, delay, size }) {
  return (
    <div className="mk-sparkle-float absolute"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true">
      <Sparkles size={size} className="text-gold-600/60" />
    </div>
  )
}

export function EmptyState({ onSelect, isLoading }) {
  return (
    <div className="flex flex-col items-center gap-6 pt-2 pb-2 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <FloatingSparkle left={10} top={15} delay={0} size={7} />
        <FloatingSparkle left={85} top={8} delay={1.2} size={9} />
        <FloatingSparkle left={92} top={40} delay={2.5} size={6} />
        <FloatingSparkle left={5} top={55} delay={0.8} size={8} />
      </div>

      {/* Emblème de l'Oracle */}
      <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
        <div className="absolute inset-0 rounded-full mk-emblem-aura"
          style={{ background: 'radial-gradient(circle, rgba(200,160,40,0.7) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="absolute rounded-full"
          style={{ inset: 2, border: '1px solid rgba(200,160,40,0.22)', borderRadius: '50%' }}
          aria-hidden="true"
        />
        <div className="absolute rounded-full mk-emblem-ring-rotate"
          style={{ inset: 8, border: '1px dashed rgba(200,160,40,0.18)', borderRadius: '50%' }}
          aria-hidden="true"
        />
        <div className="relative w-16 h-16 rounded-full flex items-center justify-center mk-emblem-breathe"
          style={{
            background: 'linear-gradient(135deg, rgba(28,23,17,0.98) 0%, rgba(12,10,8,0.96) 100%)',
            border: '1px solid rgba(200,160,40,0.4)',
            boxShadow: '0 0 20px rgba(200,160,40,0.12), inset 0 0 0 1px rgba(255,240,190,0.06)',
          }}>
          <BookOpen size={26} className="text-gold-300" />
        </div>
      </div>

      {/* Titre + divider */}
      <div className="text-center w-full px-6 relative">
        <p className="font-display font-bold text-[#f0e3c4] tracking-widest uppercase text-sm">
          L&apos;Oracle est prêt
        </p>
        <div className="flex items-center gap-3 mt-2.5">
          <div className="flex-1 h-px relative overflow-hidden"
            style={{ background: 'linear-gradient(to right, transparent, rgba(200,160,40,0.3))' }}>
            <span className="absolute inset-0 mk-divider-shimmer"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,220,140,0.6), transparent)' }}
            />
          </div>
          <Sparkles size={10} className="text-gold-500 shrink-0 mk-sparkle-spin" />
          <div className="flex-1 h-px relative overflow-hidden"
            style={{ background: 'linear-gradient(to left, transparent, rgba(200,160,40,0.3))' }}>
            <span className="absolute inset-0 mk-divider-shimmer"
              style={{
                background: 'linear-gradient(to left, transparent, rgba(255,220,140,0.6), transparent)',
                animationDelay: '1.5s',
              }}
            />
          </div>
        </div>
        <p className="text-[#a58a63] text-xs mt-2">Choisissez une suggestion ou posez votre question</p>
      </div>

      {/* Suggestions avec entrée décalée */}
      <div className="w-full flex flex-col gap-1.5">
        {SUGGESTIONS.map(({ text, icon }, i) => (
          <button
            key={text}
            onClick={() => !isLoading && onSelect(text)}
            className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-2xl group transition-all active:scale-[0.985] relative overflow-hidden mk-suggestion-enter hover:border-gold-600/40"
            style={{
              background: 'linear-gradient(135deg, rgba(22,18,13,0.96) 0%, rgba(12,10,8,0.94) 100%)',
              border: '1px solid rgba(116,95,63,0.18)',
              boxShadow: 'inset 0 0 0 1px rgba(255,236,204,0.03)',
              animationDelay: `${i * 60 + 250}ms`,
            }}>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(200,160,40,0.06), transparent)' }}
              aria-hidden="true"
            />
            <span className="text-base shrink-0 w-6 text-center leading-none relative">{icon}</span>
            <span className="flex-1 text-sm text-[#d4c4a0] relative">{text}</span>
            <ChevronRight size={13} className="text-gold-600 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all relative" />
          </button>
        ))}
      </div>
    </div>
  )
}
