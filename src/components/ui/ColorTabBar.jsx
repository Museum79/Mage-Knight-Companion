import { CARD_COLOR_THEME, COLOR_GROUPS } from '../../data/combatConstants'
import { TabBar } from './TabBar'

export function ColorTabBar({ activeColor, onChange, countsByColor = {} }) {
  const tabs = COLOR_GROUPS.map(colorId => ({
    id: colorId,
    label: colorId.charAt(0).toUpperCase() + colorId.slice(1),
    accent: CARD_COLOR_THEME[colorId]?.bg,
    badge: countsByColor[colorId] !== undefined ? countsByColor[colorId] : undefined,
  }))

  return <TabBar tabs={tabs} activeTab={activeColor} onChange={onChange} />
}
