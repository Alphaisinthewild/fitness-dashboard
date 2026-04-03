import { useState } from 'react'
import useFitnessStore from '../store/fitnessStore'
import '../styles/DailyDataEntry.css'

const SUPPLEMENTS = {
  'Pre-Workout': ['Ghost Legend', 'TMG', 'Turmeric Curcumin', 'ALCAR'],
  'Post-Workout': ['Whey Protein', 'Creatine', 'BCAAs'],
  'Breakfast': ['Vitamin D3', 'Omega-3', 'Multivitamin'],
  'Lunch': ['Vitamin D3'],
  'Dinner': ['Magnesium'],
  'Bedtime': ['Magnesium', 'ZMA']
}

export default function DailyDataEntry() {
  const [textInput, setTextInput] = useState('')
  const [selectedSupps, setSelectedSupps] = useState({})
  const [parseError, setParseError] = useState('')
  const addDailyEntry = useFitnessStore(s => s.addDailyEntry)

  const parseTextInput = (text) => {
    try {
      const lines = text.split('\n')
      const data = {}

      lines.forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim())
        if (!key || !value) return

        const lowerKey = key.toLowerCase()
        
        if (lowerKey.includes('date')) data.date = value
        if (lowerKey.includes('calories') && !lowerKey.includes('burned')) data.calories = parseInt(value)
        if (lowerKey.includes('protein')) data.protein = parseInt(value)
        if (lowerKey.includes('carbs')) data.carbs = parseInt(value)
        if (lowerKey.includes('fat')) data.fat = parseInt(value)
        if (lowerKey.includes('burned')) data.fitbodCalories = parseInt(value)
        if (lowerKey.includes('gym')) data.timeInGym = parseInt(value)
        if (lowerKey.includes('muscle') && lowerKey.includes('group')) data.muscleGroups = value.split(',').map(s => s.trim())
        if (lowerKey.includes('weight') && !lowerKey.includes('lean')) data.weight = parseFloat(value)
        if (lowerKey.includes('lean')) data.leanMuscle = parseFloat(value)
        if (lowerKey.includes('fat %')) data.fatPercent = parseFloat(value)
        if (lowerKey.includes('steps')) data.steps = parseInt(value)
      })

      return data
    } catch (e) {
      throw new Error('Failed to parse input. Make sure format is: Key: Value')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const parsed = parseTextInput(textInput)
      const entry = {
        date: parsed.date || new Date().toISOString().split('T')[0],
        nutrition: {
          calories: parsed.calories || 0,
          protein: parsed.protein || 0,
          carbs: parsed.carbs || 0,
          fat: parsed.fat || 0
        },
        workout: {
          caloriesBurned: parsed.fitbodCalories || 0,
          timeInGym: parsed.timeInGym || 0,
          muscleGroups: parsed.muscleGroups || []
        },
        measurements: {
          weight: parsed.weight || 0,
          leanMuscle: parsed.leanMuscle || 0,
          fatPercent: parsed.fatPercent || 0
        },
        steps: parsed.steps || 0,
        supplements: selectedSupps
      }

      addDailyEntry(entry)
      setTextInput('')
      setSelectedSupps({})
      setParseError('')
      alert('Entry saved!')
    } catch (err) {
      setParseError(err.message)
    }
  }

  const toggleSupplement = (category, supp) => {
    const key = `${category}-${supp}`
    setSelectedSupps(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="daily-entry">
      <h1>Daily Data Entry</h1>
      
      <div className="entry-container">
        <div className="text-input-section">
          <h2>Paste Your Data</h2>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={`Date: 2026-04-02
Calories: 2250
Protein: 280
Carbs: 150
Fat: 75
Fitbod Calories Burned: 1750
Time in Gym: 65
Muscle Groups: Chest, Shoulders, Triceps
Weight: 332.5
Lean Muscle: 158.2
Fat %: 48.9
Steps: 8240`}
          />
          {parseError && <div className="error">{parseError}</div>}
        </div>

        <div className="supplements-section">
          <h2>Supplements Taken</h2>
          {Object.entries(SUPPLEMENTS).map(([timeOfDay, supps]) => (
            <div key={timeOfDay} className="supp-group">
              <h3>{timeOfDay}</h3>
              {supps.map(supp => (
                <label key={supp} className="supp-checkbox">
                  <input
                    type="checkbox"
                    checked={!!selectedSupps[`${timeOfDay}-${supp}`]}
                    onChange={() => toggleSupplement(timeOfDay, supp)}
                  />
                  {supp}
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} className="submit-btn">
        Save Daily Entry
      </button>
    </div>
  )
}
