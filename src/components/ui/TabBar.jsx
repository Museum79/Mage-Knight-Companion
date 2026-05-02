export function TabBar({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-1.5 px-3 pb-2 overflow-x-auto scrollbar-none">
      {tabs.map(tab => {
        const accentColor = tab.accent || '#c8a028'
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all"
            style={{
              background: activeTab === tab.id ? accentColor + '22' : 'rgba(18,14,10,0.8)',
              border: `1px solid ${activeTab === tab.id ? accentColor : 'rgba(80,68,50,0.35)'}`,
              color: activeTab === tab.id ? accentColor : 'rgba(120,100,70,0.75)',
            }}
          >
            {tab.badge === undefined && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accentColor }} />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className="min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ background: accentColor, color: '#0f0c08' }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
