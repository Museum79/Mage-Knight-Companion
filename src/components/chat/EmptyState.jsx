import { BookOpen, Sparkles } from 'lucide-react'

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

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <FloatingSparkle left={10} top={15} delay={0} size={7} />
        <FloatingSparkle left={85} top={8} delay={1.2} size={9} />
      </div>

      <div className="relative flex items-center justify-center" style={{ width: 64, height: 64 }}>
        <div className="absolute inset-0 rounded-full mk-emblem-aura"
          style={{ background: 'radial-gradient(circle, rgba(200,160,40,0.5) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative w-12 h-12 rounded-full flex items-center justify-center mk-emblem-breathe"
          style={{
            background: 'linear-gradient(135deg, rgba(28,23,17,0.98) 0%, rgba(12,10,8,0.96) 100%)',
            border: '1px solid rgba(200,160,40,0.4)',
            boxShadow: '0 0 16px rgba(200,160,40,0.1)',
          }}>
          <BookOpen size={20} className="text-gold-300" />
        </div>
      </div>

      <div className="text-center px-6">
        <p className="text-[#f0e3c4] text-sm font-display tracking-wide">Posez votre question</p>
      </div>
    </div>
  )
}
