import { useState, useEffect } from 'react'

export default function Header() {
  const [syncStatus, setSyncStatus] = useState('syncing')

  useEffect(() => {
    // Simulate sync check
    setTimeout(() => setSyncStatus('synced'), 2000)
  }, [])

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-8 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-green-400">WOLF'S TRANSFORMATION</h1>
          <p className="text-gray-400 text-sm">Real-time fitness tracking</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
            ⟳ Refresh
          </button>
          <div className={`text-xs px-3 py-2 rounded ${syncStatus === 'synced' ? 'bg-green-900 text-green-400' : 'bg-yellow-900 text-yellow-400'}`}>
            {syncStatus === 'synced' ? '✓ All synced' : '⋯ Syncing...'}
          </div>
        </div>
      </div>
    </header>
  )
}
