import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Home, BookOpen, Swords, Layers } from 'lucide-react'
import wallpaperDay from '../assets/wallpaper-day.webp'
import wallpaperNight from '../assets/wallpaper-night.webp'
import placesIcon from '../assets/icons/places.svg'
import { ThemeToggle } from './ui/ThemeToggle'
import { useThemeStore } from '../store/themeStore'

const NAV = [
  { to: '/',       icon: Home,     label: 'Accueil', end: true  },
  { to: '/rules',  icon: BookOpen, label: 'Oracle',  end: false },
  { to: '/combat', icon: Swords,   label: 'Combat',  end: false },
  { to: '/map',    imgSrc: placesIcon, label: 'Lieux', end: false },
  { to: '/deck',   icon: Layers,   label: 'Deck',   end: false },
]

export function Layout() {
  const { pathname } = useLocation()
  const { theme } = useThemeStore()
  const isHome = pathname === '/'

  return (
    <div className="relative min-h-screen flex flex-col" style={{ color: 'var(--text-primary)', background: isHome ? 'var(--bg-primary)' : 'transparent' }}>

      {!isHome && (
        <>
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: theme === 'light' ? 0 : 1,
            transition: 'opacity 0.6s ease-in-out',
            zIndex: 0,
            pointerEvents: 'none',
          }}>
            <img
              src={wallpaperNight}
              alt=""
              className="h-full w-full object-cover select-none"
            />
          </div>
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: theme === 'light' ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
            zIndex: 0,
            pointerEvents: 'none',
          }}>
            <img
              src={wallpaperDay}
              alt=""
              className="h-full w-full object-cover select-none"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(6,5,4,0.52)_0%,rgba(10,8,7,0.28)_28%,rgba(7,6,5,0.42)_100%)] pointer-events-none" />
        </>
      )}

      {/* Theme toggle - always absolute, positioned at top right */}
      <div className="fixed top-0 right-0 z-20 p-3 sm:p-4" style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)', paddingRight: 'max(env(safe-area-inset-right), 12px)' }}>
        <ThemeToggle />
      </div>

      <main className="relative z-10 flex-1 overflow-hidden">
        {!isHome && (
          <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(5,4,4,0.18)_0%,rgba(8,6,5,0.24)_38%,rgba(6,5,4,0.3)_100%)] pointer-events-none" />
        )}
        <div className="relative z-10 h-full">
          <Outlet />
        </div>
      </main>

      {/* Bottom navigation */}
      <nav className={`relative z-10 shrink-0 border-t border-slate-800/40 ${isHome ? 'bg-slate-950/98 backdrop-blur' : 'mk-panel-soft'}`} style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}>
        <div className="flex">
          {NAV.map(({ to, icon: Icon, imgSrc, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-3 sm:py-2.5 text-[11px] font-medium tracking-wide transition-colors ${
                  isActive ? 'text-gold-300' : 'text-[#8d7756]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {imgSrc
                    ? <img src={imgSrc} alt="" style={{ width: 20, height: 20, opacity: isActive ? 1 : 0.45 }} />
                    : <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
                  }
                  <span className={isActive ? 'font-display' : ''}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
