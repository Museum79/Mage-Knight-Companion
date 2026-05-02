import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors"
      style={{
        color: '#ffffff',
        background: 'transparent',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={28} /> : <Moon size={28} />}
    </button>
  )
}
