import useFitnessStore from '../store/fitnessStore'
import NutritionForm from '../components/Forms/NutritionForm'
import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

export default function NutritionBreakdown() {
  const todayNutrition = useFitnessStore(s => s.todayNutrition)
  const goals = useFitnessStore(s => s.goals)
  const [showForm, setShowForm] = useState(false)

  const n = todayNutrition || { calories: 0, protein: 0, carbs: 0, fat: 0, meals: [] }

  const macroData = [
    { name: 'Protein', value: n.protein * 4, grams: n.protein, color: '#00ff41' },
    { name: 'Carbs', value: n.carbs * 4, grams: n.carbs, color: '#4a9eff' },
    { name: 'Fat', value: n.fat * 9, grams: n.fat, color: '#ff6b6b' },
  ]

  const totalMacroCals = macroData.reduce((s, d) => s + d.value, 0)

  const macroWithPercent = macroData.map(d => ({
    ...d,
    percent: totalMacroCals > 0 ? Math.round((d.value / totalMacroCals) * 100) : 0,
  }))

  const vsTarget = [
    { label: 'Calories', current: n.calories, goal: goals.calories, unit: '' },
    { label: 'Protein', current: n.protein, goal: goals.protein, unit: 'g' },
    { label: 'Carbs', current: n.carbs, goal: goals.carbs, unit: 'g' },
    { label: 'Fat', current: n.fat, goal: goals.fat, unit: 'g' },
  ]

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric',
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold mb-2">Nutrition Breakdown</h2>
          <p className="text-gray-400">Today: {today}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded font-semibold transition-colors"
        >
          {showForm ? 'Cancel' : '+ Log Nutrition'}
        </button>
      </div>

      {showForm && (
        <NutritionForm onClose={() => setShowForm(false)} />
      )}

      {/* Macro Pie Chart */}
      <div className="stat-card">
        <div className="stat-label mb-4">Macros (Total: {n.calories} cal)</div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroWithPercent}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {macroWithPercent.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', borderRadius: '8px' }}
                  formatter={(value, name, props) => [`${props.payload.grams}g (${props.payload.percent}%)`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {macroWithPercent.map(m => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-gray-300 w-16">{m.name}</span>
                <span className="font-bold text-white">{m.grams}g</span>
                <span className="text-gray-400">({m.percent}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meal Timeline */}
      {n.meals && n.meals.length > 0 && (
        <div className="stat-card">
          <div className="stat-label mb-4">Meal Timeline</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {n.meals.map((meal, i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="text-green-400 font-semibold text-sm">{meal.name}</div>
                <div className="text-xs text-gray-400 mb-2">{meal.time}</div>
                <div className="text-lg font-bold">{meal.calories} cal</div>
                <div className="text-sm text-gray-400">P: {meal.protein}g</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VS Target */}
      <div className="stat-card">
        <div className="stat-label mb-4">vs Target</div>
        <div className="space-y-3">
          {vsTarget.map(({ label, current, goal, unit }) => {
            const diff = current - goal
            const pct = goal > 0 ? Math.min(100, Math.round((current / goal) * 100)) : 0
            return (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{label}</span>
                  <span>
                    <span className="text-white font-semibold">{current}{unit}</span>
                    <span className="text-gray-400"> / {goal}{unit}</span>
                    <span className={`ml-2 ${diff <= 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                      ({diff <= 0 ? '' : '+'}{diff}{unit})
                    </span>
                  </span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
