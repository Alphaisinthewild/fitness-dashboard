import { useState } from 'react'
import useFitnessStore from '../../store/fitnessStore'
import { getTodayKey } from '../../utils/dates'

export default function WorkoutForm({ onClose }) {
  const addWorkout = useFitnessStore(s => s.addWorkout)

  const [form, setForm] = useState({
    exercises: '',
    duration: '',
    volume: '',
    caloriesBurned: '',
  })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.exercises.trim()) e.exercises = 'Required'
    if (!form.duration || Number(form.duration) <= 0) e.duration = 'Must be > 0'
    if (!form.volume || Number(form.volume) < 0) e.volume = 'Must be >= 0'
    if (!form.caloriesBurned || Number(form.caloriesBurned) < 0) e.caloriesBurned = 'Must be >= 0'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const workout = {
      id: `workout_${Date.now()}`,
      date: getTodayKey(),
      exercises: form.exercises.trim(),
      duration: Number(form.duration),
      volume: Number(form.volume),
      caloriesBurned: Number(form.caloriesBurned),
    }
    addWorkout(getTodayKey(), workout)
    setSaved(true)
    if (onClose) setTimeout(onClose, 800)
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-green-400 mb-4">Log Workout</h3>
      <p className="text-sm text-gray-400 mb-6">Enter today's workout details</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Exercises</label>
          <textarea
            value={form.exercises}
            onChange={(e) => handleChange('exercises', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-green-400 h-20 resize-none"
            placeholder="e.g., Bench Press, Squats, Deadlifts"
          />
          {errors.exercises && <p className="text-red-400 text-xs mt-1">{errors.exercises}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Duration (min)</label>
            <input
              type="number"
              min="1"
              value={form.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-green-400"
              placeholder="60"
            />
            {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Volume (lbs)</label>
            <input
              type="number"
              min="0"
              value={form.volume}
              onChange={(e) => handleChange('volume', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-green-400"
              placeholder="15000"
            />
            {errors.volume && <p className="text-red-400 text-xs mt-1">{errors.volume}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Cals Burned</label>
            <input
              type="number"
              min="0"
              value={form.caloriesBurned}
              onChange={(e) => handleChange('caloriesBurned', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-green-400"
              placeholder="450"
            />
            {errors.caloriesBurned && <p className="text-red-400 text-xs mt-1">{errors.caloriesBurned}</p>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-500 rounded font-semibold transition-colors"
      >
        {saved ? '✓ Saved!' : 'Save Workout'}
      </button>
    </form>
  )
}
