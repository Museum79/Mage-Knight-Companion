import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { RulesPage } from './pages/RulesPage'
import { CombatPage } from './pages/CombatPage'
import CityPage from './pages/CityPage'
import { GameSetupPage } from './pages/GameSetupPage'
import { DeckPage } from './pages/DeckPage'
import { CardSelectionPage } from './pages/CardSelectionPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="rules" element={<RulesPage />} />
          <Route path="combat" element={<CombatPage />} />
          <Route path="combat/cards" element={<CardSelectionPage />} />
          <Route path="map" element={<CityPage/>}/>
          <Route path="setup" element={<GameSetupPage />} />
          <Route path="deck" element={<DeckPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
