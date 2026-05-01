export function TabBar({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap relative group"
          style={{
            background: activeTab === tab.id
              ? 'rgba(200, 160, 40, 0.25)'
              : 'rgba(40, 35, 28, 0.6)',
            border: activeTab === tab.id
              ? `1px solid ${tab.accent || '#c8a028'}`
              : '1px solid rgba(116, 95, 63, 0.3)',
            color: activeTab === tab.id ? '#e8cc60' : '#a58a63',
          }}
        >
          <span>{tab.label}</span>
          {tab.badge !== undefined && (
            <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full"
              style={{
                background: 'rgba(200, 160, 40, 0.3)',
                color: '#e8cc60',
              }}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
