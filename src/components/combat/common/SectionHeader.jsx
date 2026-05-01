export function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="px-4 py-3 border-b border-slate-800/60 flex items-start justify-between gap-3">
      <div>
        {eyebrow && <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500">{eyebrow}</p>}
        <p className="text-sm text-amber-100">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
