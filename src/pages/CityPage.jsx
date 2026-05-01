import { useState } from 'react'
import { ChevronLeft, ChevronRight, Home, Building2, Gem, Sparkles, BookOpen, Lock, Shield, Skull, Landmark, Wand2, Eye, Flame, Swords, Map } from 'lucide-react'

import btnForteresse from '../assets/img/lieux-boutons/fortress.webp'
import btnMines from '../assets/img/lieux-boutons/mine-cristal.webp'
import btnMonastere from '../assets/img/lieux-boutons/monastere.webp'
import btnVillage from '../assets/img/lieux-boutons/village.webp'
import btnTombeau from '../assets/img/lieux-boutons/Tombeau.webp'
import btnSombres from '../assets/img/lieux-boutons/sombreTerrier.webp'
import btnTourDeMage from '../assets/img/lieux-boutons/tourDeMage.webp'
import btnDraconien from '../assets/img/lieux-boutons/repaireDraconien.webp'

import antre from '../assets/img/lieux/Antre.webp'
import cite from '../assets/img/lieux/Cite.webp'
import clairiere from '../assets/img/lieux/ClairiereMagique.webp'
import coutMouvement from '../assets/img/lieux/CoutDeMouvement.webp'
import donjon from '../assets/img/lieux/Donjon.webp'
import draconien from '../assets/img/lieux/Draconien.webp'
import forteresse from '../assets/img/lieux/Forteresse.webp'
import mines from '../assets/img/lieux/MinesDeCristal.webp'
import monastere from '../assets/img/lieux/Monastere.webp'
import orques from '../assets/img/lieux/OrquesMaraudeurs.webp'
import ruines from '../assets/img/lieux/Ruines.webp'
import sombres from '../assets/img/lieux/Sombres Terriers.webp'
import tombeau from '../assets/img/lieux/Tombeau.webp'
import tourDeMage from '../assets/img/lieux/TourDeMage.webp'
import village from '../assets/img/lieux/Village.webp'

const CATEGORIES = [
  {
    id: 'allie',
    label: 'Lieux alliés',
    accent: '#f59e0b',
    border: 'rgba(180,130,40,0.55)',
    overlay: 'linear-gradient(180deg, transparent 35%, rgba(120,80,10,0.82) 100%)',
    labelClass: 'text-amber-400',
    dotClass: 'bg-amber-400',
    lieux: [
      { id: 'village',   label: 'Village',           img: village,   icon: Home,     btnImg: btnVillage    },
      { id: 'monastere', label: 'Monastère',          img: monastere, icon: BookOpen,  btnImg: btnMonastere  },
      { id: 'cite',      label: 'Cité',               img: cite,      icon: Building2 },
      { id: 'mines',     label: 'Mines de Cristal',   img: mines,     icon: Gem,       btnImg: btnMines      },
      { id: 'clairiere', label: 'Clairière Magique',  img: clairiere, icon: Sparkles  },
    ],
  },
  {
    id: 'ennemi',
    label: 'Lieux ennemis',
    accent: '#f87171',
    border: 'rgba(180,50,40,0.55)',
    overlay: 'linear-gradient(180deg, transparent 35%, rgba(100,20,15,0.85) 100%)',
    labelClass: 'text-red-400',
    dotClass: 'bg-red-500',
    lieux: [
      { id: 'donjon',      label: 'Donjon',            img: donjon,     icon: Lock     },
      { id: 'forteresse',  label: 'Forteresse',        img: forteresse, icon: Shield,   btnImg: btnForteresse },
      { id: 'antre',       label: 'Antre',             img: antre,      icon: Skull    },
      { id: 'ruines',      label: 'Ruines',            img: ruines,     icon: Landmark },
      { id: 'tombeau',     label: 'Tombeau',           img: tombeau,    icon: Skull,  btnImg: btnTombeau    },
      { id: 'tourDeMage',  label: 'Tour de Mage',      img: tourDeMage, icon: Wand2,  btnImg: btnTourDeMage },
      { id: 'sombres',     label: 'Sombres Terriers',  img: sombres,    icon: Eye,    btnImg: btnSombres    },
      { id: 'draconien',   label: 'Repaire Draconien', img: draconien,  icon: Flame,  btnImg: btnDraconien },
      { id: 'orques',      label: 'Orques Maraudeurs', img: orques,     icon: Swords   },
    ],
  },
  {
    id: 'reference',
    label: 'Référence',
    accent: '#94a3b8',
    border: 'rgba(100,110,130,0.45)',
    overlay: 'linear-gradient(180deg, transparent 35%, rgba(20,25,35,0.82) 100%)',
    labelClass: 'text-slate-400',
    dotClass: 'bg-slate-500',
    lieux: [
      { id: 'coutMvt', label: 'Coût de Mouvement', img: coutMouvement, icon: Map },
    ],
  },
]

const ALL_LIEUX = CATEGORIES.flatMap(cat =>
  cat.lieux.map(l => ({ ...l, category: cat }))
)

function LieuCard({ lieu, category, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-full flex flex-col justify-end px-3 py-3 rounded-xl transition-all active:scale-[0.97] overflow-hidden"
      style={{
        minHeight: '7rem',
        background: `linear-gradient(135deg, rgba(22,20,17,0.95) 0%, rgba(11,11,10,0.9) 100%)`,
        border: `1px solid ${category.border}`,
        boxShadow: `inset 0 0 0 1px rgba(255,236,204,0.04), 0 4px 14px rgba(0,0,0,0.35)`,
      }}
    >
      {/* Image de fond */}
      {lieu.btnImg && (
        <img
          src={lieu.btnImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.7 }}
        />
      )}

      {/* Overlay léger en bas pour lisibilité du titre */}
      {lieu.btnImg && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 65%, rgba(8,7,5,0.15) 100%)' }}
        />
      )}

      {/* Titre en bas */}
      <span
        className="relative z-10 font-display font-bold text-base leading-tight text-center w-full"
        style={{ color: '#f0e4c4', textShadow: lieu.btnImg ? '0 1px 4px rgba(0,0,0,0.9)' : 'none' }}
      >
        {lieu.label}
      </span>
    </button>
  )
}

export default function CityPage() {
  const [selected, setSelected] = useState(null)

  const selectedIdx = selected
    ? ALL_LIEUX.findIndex(l => l.id === selected.id)
    : -1

  const goPrev = () => {
    if (selectedIdx > 0) setSelected(ALL_LIEUX[selectedIdx - 1])
  }
  const goNext = () => {
    if (selectedIdx < ALL_LIEUX.length - 1) setSelected(ALL_LIEUX[selectedIdx + 1])
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">

      {/* En-tête fixe */}
      <div className="shrink-0 px-4 pt-6 pb-4">
        <h1
          className="font-display text-4xl tracking-[0.12em] uppercase"
          style={{ color: '#f0e4c4', textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 0 40px rgba(200,150,40,0.15)' }}
        >
          Lieux
        </h1>
        <p className="text-[11px] tracking-widest mt-1 uppercase" style={{ color: 'rgba(160,140,100,0.7)' }}>
          Touche une vignette pour voir la carte
        </p>
      </div>

      {/* Zone scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {CATEGORIES.map(cat => (
          <section key={cat.id} className="mb-8">
            {/* Titre de catégorie */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-2 h-2 rounded-full shrink-0 ${cat.dotClass}`}
                style={{ boxShadow: `0 0 5px ${cat.accent}` }} />
              <h2 className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${cat.labelClass}`}>
                {cat.label}
              </h2>
              <div className="flex-1 h-px ml-1" style={{ background: `linear-gradient(90deg, ${cat.border}, transparent)` }} />
            </div>

            {/* Grille 2 colonnes */}
            <div className="grid grid-cols-2 gap-2">
              {cat.lieux.map(lieu => (
                <LieuCard
                  key={lieu.id}
                  lieu={lieu}
                  category={cat}
                  onClick={() => setSelected({ ...lieu, category: cat })}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Lightbox plein écran */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(4,3,2,0.97)', backdropFilter: 'blur(12px)' }}
          onClick={() => setSelected(null)}
        >
          {/* Barre haute : nom */}
          <div className="shrink-0 px-4 pt-5 pb-3">
            <p
              className="font-display text-2xl tracking-widest"
              style={{ color: selected.category.accent, textShadow: `0 0 16px ${selected.category.accent}50` }}
            >
              {selected.label}
            </p>
          </div>

          {/* Image — prend tout l'espace restant */}
          <div className="flex-1 min-h-0 flex items-center justify-center px-4">
            <img
              src={selected.img}
              alt={selected.label}
              loading="lazy"
              className="max-w-full max-h-full object-contain rounded-2xl"
              style={{
                border: `1px solid ${selected.category.border}`,
                boxShadow: `0 0 60px rgba(0,0,0,0.8), 0 0 0 1px ${selected.category.border}`,
              }}
            />
          </div>

          {/* Navigation bas */}
          <div className="shrink-0 flex items-center justify-between px-6 py-5" onClick={e => e.stopPropagation()}>
            <button
              onClick={goPrev}
              disabled={selectedIdx === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-20 active:scale-95"
              style={{ background: 'rgba(40,35,28,0.9)', border: '1px solid rgba(120,100,60,0.3)', color: '#d4b87a' }}
            >
              <ChevronLeft size={16} />
              Précédent
            </button>

            <span className="text-xs" style={{ color: 'rgba(140,120,85,0.6)' }}>
              {selectedIdx + 1} / {ALL_LIEUX.length}
            </span>

            <button
              onClick={goNext}
              disabled={selectedIdx === ALL_LIEUX.length - 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-20 active:scale-95"
              style={{ background: 'rgba(40,35,28,0.9)', border: '1px solid rgba(120,100,60,0.3)', color: '#d4b87a' }}
            >
              Suivant
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
