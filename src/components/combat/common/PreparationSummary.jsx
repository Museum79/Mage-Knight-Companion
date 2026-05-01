export function PreparationSummary({ totalCount }) {
  const ready = totalCount > 0

  return (
    <div className="mk-panel rounded-[1.1rem] px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500">Préparation</p>
          <p className="text-sm text-amber-100">
            {ready ? `${totalCount} carte${totalCount > 1 ? 's' : ''} dans la main` : 'Aucune carte sélectionnée'}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {ready ? 'Vous pouvez continuer vers le combat.' : 'Ajoutez les cartes réellement piochées.'}
          </p>
        </div>
        <span
          className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{
            background: ready ? 'rgba(34,197,94,0.14)' : 'rgba(90,74,50,0.22)',
            border: `1px solid ${ready ? 'rgba(34,197,94,0.28)' : 'rgba(90,74,50,0.38)'}`,
            color: ready ? '#4ade80' : '#d6c6a5',
          }}
        >
          {ready ? 'Prêt' : 'En cours'}
        </span>
      </div>
    </div>
  )
}
