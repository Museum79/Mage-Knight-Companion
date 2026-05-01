// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { X } from 'lucide-react'
import heroImg from '../assets/hero.png'
import titleMKC from '../assets/titleMKC.png'
import rulesIcon from '../assets/icons/rules.svg'
import combatIcon from '../assets/icons/combat.svg'
import placesIcon from '../assets/icons/places.svg'
import createGameIcon from '../assets/icons/create-game.svg'
import grandDragon from '../assets/img/ennemies/grandDragon.webp'
import dragonFeu from '../assets/img/ennemies/dragon-feu.webp'
import forteresse from '../assets/img/lieux/Forteresse.webp'
import { Embers } from '../components/effects/Embers'
import { useGameStore } from '../store/gameStore'
import { HEROES } from '../data/heroes'
import { SCENARIOS } from '../data/scenarios'
import styles from './HomePage.module.css'

const CHAPTERS = [
  {
    key: 'rules',
    to: '/rules',
    img: grandDragon,
    icon: rulesIcon,
    title: "L'Oracle des Règles",
    sub: 'Consulte les arcanes écrits',
    accent: '#d4a849',
    count: '247 entrées',
  },
  {
    key: 'combat',
    to: '/combat',
    img: dragonFeu,
    icon: combatIcon,
    title: 'Le Conseil de Guerre',
    sub: 'Forge ta stratégie de combat',
    accent: '#c4503a',
    count: 'Simulateur',
  },
  {
    key: 'places',
    to: '/map',
    img: forteresse,
    icon: placesIcon,
    title: 'Atlas des Terres',
    sub: 'Cartographie des lieux',
    accent: '#7a9c8e',
    count: '16 lieux',
  },
]

export function HomePage() {
  const navigate = useNavigate()
  const { isActive, heroId, scenarioId, playerDeck, endGame } = useGameStore()
  const [active, setActive] = useState(null)

  const hero = HEROES.find(h => h.id === heroId)
  const scenario = SCENARIOS.find(s => s.id === scenarioId)
  const totalCards = Object.values(playerDeck || {}).reduce((a, b) => a + b, 0)

  const displayChapters = !isActive
    ? [
        {
          key: 'create-game',
          to: '/setup',
          img: heroImg,
          icon: createGameIcon,
          title: 'Créer une Partie',
          sub: 'Lance ta quête personnelle',
          accent: '#8b5cf6',
          count: 'Nouvelle',
        },
        ...CHAPTERS,
      ]
    : CHAPTERS

  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-slate-950">
      {/* Hero backdrop (top portion only) */}
      <div className={styles.heroBackdrop}>
        <img src={heroImg} alt="" className={styles.heroImg} />
        <div className={styles.heroFade} />
      </div>

      {/* Atmospheric ember particles */}
      <Embers />

      {/* Logo */}
      <div className={styles.logoWrap} style={{ paddingTop: 'max(env(safe-area-inset-top), 20px)' }}>
        <img src={titleMKC} alt="Mage Knight Companion" className={styles.logo} />
      </div>

      {/* Immersive quote */}
      <div className={styles.quote}>
        « Que ferez-vous, noble Mage Knight ? »
      </div>

      {/* Game status */}
      {isActive && (
        <div className={styles.chapters} style={{ paddingTop: 0, paddingBottom: '1rem' }}>
          <div className="px-4 py-3 rounded-2xl" style={{
            background: 'linear-gradient(135deg, rgba(40,35,28,0.85) 0%, rgba(25,20,15,0.8) 100%)',
            border: `1.5px solid ${hero?.glowColor}`,
            boxShadow: `0 0 40px ${hero?.glowColor}60, 0 8px 32px rgba(0,0,0,0.6)`,
          }}>
            {/* Header with image and info */}
            <div className="flex items-center gap-4 mb-3">
              {/* Hero image */}
              <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden" style={{
                border: `2px solid ${hero?.glowColor}`,
                boxShadow: `0 0 20px ${hero?.glowColor}60`,
              }}>
                <img
                  src={hero?.image}
                  alt={hero?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase" style={{ color: 'rgba(160,140,100,0.9)', letterSpacing: '0.05em' }}>Partie en cours</p>
                <p className="font-display text-lg font-bold leading-tight" style={{ color: '#f0e4c4' }}>
                  {hero?.name}
                </p>
                <p className="text-xs mt-1" style={{ color: 'rgba(160,140,100,0.8)' }}>
                  {scenario?.name} • {totalCards} cartes
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => endGame()}
                className="shrink-0 p-2 rounded-lg transition-all active:scale-90 hover:opacity-80"
                style={{
                  background: 'rgba(220,38,38,0.2)',
                  color: '#fca5a5',
                  border: '1px solid rgba(220,38,38,0.3)',
                }}
                title="Terminer la partie"
              >
                <X size={20} />
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/combat')}
                className="flex-1 py-2.5 rounded-lg font-display font-bold text-sm text-stone-900 bg-linear-to-r from-amber-400 to-amber-500 active:scale-95 transition-all hover:shadow-lg hover:shadow-amber-900/30"
              >
                ⚔️ Au combat
              </button>
              <button
                onClick={() => navigate('/deck')}
                className="flex-1 py-2.5 rounded-lg font-display font-bold text-sm text-amber-200 mk-panel active:opacity-70 hover:opacity-90 transition-opacity"
              >
                📦 Gérer le deck
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grimoire chapters & Create game */}
      <div className={styles.chapters}>
        {displayChapters.map((ch, i) => (
          <button
            key={ch.key}
            onClick={() => navigate(ch.to)}
            onMouseEnter={() => setActive(ch.key)}
            onMouseLeave={() => setActive(null)}
            className={styles.chapter}
            style={{
              borderColor: active === ch.key ? `${ch.accent}99` : 'rgba(116,95,63,0.35)',
              transform: active === ch.key ? 'scale(1.01)' : 'scale(1)',
              boxShadow: active === ch.key
                ? `0 8px 24px rgba(0,0,0,0.6), 0 0 24px ${ch.accent}33`
                : '0 4px 16px rgba(0,0,0,0.5)',
            }}
            aria-label={`${ch.title}: ${ch.sub}`}
          >
            {/* Background image */}
            <div
              className={styles.chapterBg}
              style={{
                backgroundImage: `url(${ch.img})`,
                backgroundPosition: 'center 20%',
                backgroundSize: 'cover',
                opacity: active === ch.key ? 0.35 : 0.22,
              }}
            />
            {/* Tint overlay (strong, masks any in-image text) */}
            <div
              className={styles.chapterTint}
              style={{
                background: `linear-gradient(95deg, rgba(8,6,4,0.88) 0%, rgba(14,10,6,0.78) 55%, ${ch.accent}40 100%)`,
              }}
            />

            {/* Top-right ornament */}
            <svg className={styles.ornamentTR} viewBox="0 0 48 48">
              <path d="M2 2 L46 2 L46 16 M46 2 L32 16" stroke={ch.accent} strokeWidth="1" fill="none" />
              <circle cx="46" cy="2" r="2" fill={ch.accent} />
            </svg>
            {/* Bottom-left ornament (rotated) */}
            <svg className={styles.ornamentBL} viewBox="0 0 48 48">
              <path d="M2 2 L46 2 L46 16 M46 2 L32 16" stroke={ch.accent} strokeWidth="1" fill="none" />
              <circle cx="46" cy="2" r="2" fill={ch.accent} />
            </svg>

            {/* Content */}
            <div className={styles.chapterContent}>
              {/* Diamond-framed icon */}
              <div className={styles.iconWrap}>
                <svg className={styles.iconFrame} viewBox="0 0 52 52">
                  <polygon points="26,2 50,26 26,50 2,26" fill="none" stroke={ch.accent} strokeWidth="1" opacity="0.6" />
                  <polygon points="26,8 44,26 26,44 8,26" fill="none" stroke={ch.accent} strokeWidth="0.6" strokeDasharray="2 2" opacity="0.5" />
                </svg>
                <img
                  src={ch.icon}
                  alt=""
                  className={styles.iconImg}
                  style={{ filter: `drop-shadow(0 0 6px ${ch.accent})` }}
                />
              </div>

              {/* Text */}
              <div className={styles.chapterText}>
                {ch.key !== 'create-game' && (
                  <div className={styles.chapterLabel} style={{ color: ch.accent }}>
                    CHAPITRE {CHAPTERS.findIndex(c => c.key === ch.key) + 1}
                  </div>
                )}
                <div className={styles.chapterTitle}>{ch.title}</div>
                <div className={styles.chapterSub}>{ch.sub}</div>
                <div className={styles.chapterCount}>⊞ {ch.count}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}