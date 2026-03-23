import { useState } from 'react'

export default function Setup({ onSetupComplete }) {
  const [keys, setKeys] = useState({
    fitbodKey: '',
    mfpKey: '',
    wyzeKey: '',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setKeys(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (keys.fitbodKey && keys.mfpKey && keys.wyzeKey) {
      localStorage.setItem('fitbodKey', keys.fitbodKey)
      localStorage.setItem('mfpKey', keys.mfpKey)
      localStorage.setItem('wyzeKey', keys.wyzeKey)
      setSaved(true)
      setTimeout(onSetupComplete, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700">
        <h1 className="text-3xl font-bold text-green-400 mb-2">Setup</h1>
        <p className="text-gray-400 mb-6">Add your API keys to get started</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Fitbod API Key
            </label>
            <input
              type="password"
              name="fitbodKey"
              placeholder="paste_your_fitbod_key"
              value={keys.fitbodKey}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              MyFitnessPal API Key
            </label>
            <input
              type="password"
              name="mfpKey"
              placeholder="paste_your_mfp_key"
              value={keys.mfpKey}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Wyze Scale API Key
            </label>
            <input
              type="password"
              name="wyzeKey"
              placeholder="paste_your_wyze_key"
              value={keys.wyzeKey}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-500 rounded font-semibold transition-colors"
        >
          {saved ? '✓ Saved!' : 'Save & Continue'}
        </button>

        <p className="text-xs text-gray-500 mt-4">
          Keys are stored locally and never sent to external servers.
        </p>
      </div>
    </div>
  )
}
