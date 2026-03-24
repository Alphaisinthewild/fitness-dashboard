import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import TodaySummary from './components/Dashboard/TodaySummary'
import WeeklyTrends from './pages/WeeklyTrends'
import WorkoutDetail from './pages/WorkoutDetail'
import NutritionBreakdown from './pages/NutritionBreakdown'
import ProgressDashboard from './pages/ProgressDashboard'
import Setup from './pages/Setup'
import useFitnessStore from './store/fitnessStore'
import { seedDataIfEmpty } from './api/mockData'
import './App.css'

export default function App() {
  const [apiKeysConfigured, setApiKeysConfigured] = useState(false)
  const loadAll = useFitnessStore(s => s.loadAll)

  useEffect(() => {
    const hasKeys = localStorage.getItem('fitbodKey') &&
                    localStorage.getItem('mfpKey') &&
                    localStorage.getItem('wyzeKey')
    setApiKeysConfigured(!!hasKeys)
  }, [])

  useEffect(() => {
    if (apiKeysConfigured) {
      seedDataIfEmpty()
      loadAll()
    }
  }, [apiKeysConfigured, loadAll])

  if (!apiKeysConfigured) {
    return <Setup onSetupComplete={() => setApiKeysConfigured(true)} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8 overflow-auto">
            <Routes>
              <Route path="/" element={<TodaySummary />} />
              <Route path="/trends" element={<WeeklyTrends />} />
              <Route path="/workouts" element={<WorkoutDetail />} />
              <Route path="/nutrition" element={<NutritionBreakdown />} />
              <Route path="/progress" element={<ProgressDashboard />} />
              <Route path="/setup" element={<Setup onSetupComplete={() => {}} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}
