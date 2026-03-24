import { useState } from 'react'
import useFitnessStore from '../../store/fitnessStore'
import { getTodayKey } from '../../utils/dates'

export default function NutritionForm({ onClose }) {
  const saveNutrition = useFitnessStore(s => s.saveNutrition)
  const existing = useFitnessStore(s => s.todayNutrition)

  const [form, setForm] = useState({
    calories: existing?.calories || '',
    protein: existing?.protein || '',
    carbs: existing?.carbs || '',
    fat: existing?.fat || '',
  })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const validate = () => {
    const e = {}
    const cal = Number(form.calories)
    const pro = Number(form.protein)
    const carb = Number(form.carbs)
    const fat = Number(form.fat)

    if (!form.calories || cal < 0) e.calories = 'Must be >= 0'
    if (!form.protein || pro < 0) e.protein = 'Must be >= 0'
    if (!form.carbs || carb < 0) e.carbs = 'Must be >= 0'
    if (!form.fat || fat < 0) e.fat = 'Must be >= 0'

    // Protein calories can't exceed total calories (4 cal/g)
    if (pro * 4 > cal && cal > 0) e.protein = 'Protein calories exceed total'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const data = {
      calories: Number(form.calories),
      protein: Number(form.protein),
      carbs: Number(form.carbs),
      fat: Number(form.fat),
      meals: existing?.meals || [],
    }
    saveNutrition(getTodayKey(), data)
    setSaved(true)
    if (onClose) setTimeout(onClose, 800)
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-green-400 mb-4">Log Nutrition</h3>
      <p className="text-sm text-gray-400 mb-6">Enter today's totals</p>

      <div className="grid grid-cols-2 gap-4">
        {[
          { key: 'calories', label: 'Calories', unit: 'kcal' },
          { key: 'protein', label: 'Protein', unit: 'g' },
          { key: 'carbs', label: 'Carbs', unit: 'g' },
          { key: 'fat', label: 'Fat', unit: 'g' },
        ].map(({ key, label, unit }) => (
          <div key={key}>
            <label className="block text-sm text-gray-300 mb-1">{label} ({unit})</label>
            <input
              type="number"
              min="0"
              value={form[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-green-400"
              placeholder="0"
            />
            {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-500 rounded font-semibold transition-colors"
      >
        {saved ? '✓ Saved!' : 'Save Nutrition'}
      </button>
    </form>
  )
}
