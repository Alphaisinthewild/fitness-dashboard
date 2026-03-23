import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import TodaySummary from './components/Dashboard/TodaySummary'
import Setup from './pages/Setup'
import './App.css'

export default function App() {
  const [apiKeysConfigured, setApiKeysConfigured] = useState(false)

  useEffect(() => {
    // Check if API keys are in localStorage
    const hasKeys = localStorage.getItem('fitbodKey') && 
                    localStorage.getItem('mfpKey') && 
                    localStorage.getItem('wyzeKey')
    setApiKeysConfigured(!!hasKeys)
  }, [])

  if (!apiKeysConfigured) {
    return <Setup onSetupComplete={() => setApiKeysConfigured(true)} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<TodaySummary />} />
              {/* More routes will be added */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}
