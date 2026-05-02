import { CARD_COLOR_THEME, COLOR_GROUPS } from '../../data/combatConstants'
import { TabBar } from './TabBar'

export function ColorTabBar({ activeColor, onChange, countsByColor = {} }) {
  const tabs = COLOR_GROUPS.map(({ color, label }) => ({
    id: color,
    label,
    accent: CARD_COLOR_THEME[color]?.accent,
    badge: countsByColor[color] !== undefined ? countsByColor[color] : undefined,
  }))

  return <TabBar tabs={tabs} activeTab={activeColor} onChange={onChange} />
}
