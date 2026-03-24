import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFitnessStore from '../../store/fitnessStore'
import NutritionForm from '../Forms/NutritionForm'
import WorkoutForm from '../Forms/WorkoutForm'

export default function TodaySummary() {
  const todayNutrition = useFitnessStore(s => s.todayNutrition)
  const todayWorkouts = useFitnessStore(s => s.todayWorkouts)
  const goals = useFitnessStore(s => s.goals)
  const getLatestBodyComp = useFitnessStore(s => s.getLatestBodyComp)
  const navigate = useNavigate()

  const [showNutritionForm, setShowNutritionForm] = useState(false)
  const [showWorkoutForm, setShowWorkoutForm] = useState(false)

  const n = todayNutrition || { calories: 0, protein: 0, carbs: 0, fat: 0 }
  const workoutCount = todayWorkouts.length
  const totalCalsBurned = todayWorkouts.reduce((s, w) => s + (w.caloriesBurned || 0), 0)
  const totalVolume = todayWorkouts.reduce((s, w) => s + (w.volume || 0), 0)
  const latestBody = getLatestBodyComp()

  const calDeficit = goals.calories - n.calories
  const proteinDelta = n.protein - goals.protein

  const getPercentage = (current, goal) => Math.min(100, Math.round((current / goal) * 100))

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-2">Today's Summary</h2>
        <p className="text-gray-400">{date}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calories Card */}
        <div className="stat-card">
          <div className="stat-label">Calories</div>
          <div className="stat-value">{n.calories.toLocaleString()}</div>
          <div className="text-sm text-gray-400 mt-2">
            {goals.calories} goal ·{' '}
            <span className={calDeficit >= 0 ? 'text-green-400' : 'text-yellow-400'}>
              {calDeficit >= 0 ? `-${calDeficit}` : `+${Math.abs(calDeficit)}`} deficit
            </span>
          </div>
          <div className="mt-4 bg-gray-700 rounded-full h-2">
            <div className="progress-fill" style={{ width: `${getPercentage(n.calories, goals.calories)}%` }} />
          </div>
        </div>

        {/* Protein Card */}
        <div className="stat-card">
          <div className="stat-label">Protein</div>
          <div className="stat-value">{n.protein}g</div>
          <div className="text-sm text-gray-400 mt-2">
            {goals.protein}g goal ·{' '}
            <span className={proteinDelta >= 0 ? 'text-green-400' : 'text-yellow-400'}>
              {proteinDelta >= 0 ? '+' : ''}{proteinDelta}g
            </span>
          </div>
          <div className="mt-4 bg-gray-700 rounded-full h-2">
            <div className="progress-fill" style={{ width: `${getPercentage(n.protein, goals.protein)}%` }} />
          </div>
        </div>

        {/* Workouts Card */}
        <div className="stat-card">
          <div className="stat-label">Workouts</div>
          <div className="stat-value">{workoutCount}</div>
          <div className="text-sm text-gray-400 mt-2">
            {workoutCount > 0 ? (
              <>
                <span className="text-green-400">✓ Complete</span> · {totalVolume.toLocaleString()} lbs · {totalCalsBurned} cal burned
              </>
            ) : (
              'No workouts logged yet today'
            )}
          </div>
        </div>
      </div>

      {/* Wyze Scale / Body Comp */}
      {latestBody && (
        <div className="stat-card">
          <div className="stat-label">Latest Scale Reading</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
            <div>
              <div className="text-2xl font-bold text-green-400">{latestBody.weight} lbs</div>
              <div className="text-xs text-gray-400">Weight</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{latestBody.fatPercent}%</div>
              <div className="text-xs text-gray-400">Body Fat</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{latestBody.musclePercent}%</div>
              <div className="text-xs text-gray-400">Muscle</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{latestBody.bmi}</div>
              <div className="text-xs text-gray-400">BMI</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">Date: {latestBody.date}</div>
        </div>
      )}

      {/* Quick Input Forms */}
      {showNutritionForm && (
        <NutritionForm onClose={() => setShowNutritionForm(false)} />
      )}
      {showWorkoutForm && (
        <WorkoutForm onClose={() => setShowWorkoutForm(false)} />
      )}

      {/* Quick Links */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setShowNutritionForm(!showNutritionForm)}
          className="flex-1 min-w-[140px] px-6 py-3 bg-green-600 hover:bg-green-500 rounded font-semibold transition-colors"
        >
          {showNutritionForm ? 'Cancel' : '+ Log Nutrition'}
        </button>
        <button
          onClick={() => setShowWorkoutForm(!showWorkoutForm)}
          className="flex-1 min-w-[140px] px-6 py-3 bg-green-600 hover:bg-green-500 rounded font-semibold transition-colors"
        >
          {showWorkoutForm ? 'Cancel' : '+ Log Workout'}
        </button>
        <button
          onClick={() => navigate('/nutrition')}
          className="flex-1 min-w-[140px] px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded font-semibold transition-colors"
        >
          Full Nutrition
        </button>
        <button
          onClick={() => navigate('/workouts')}
          className="flex-1 min-w-[140px] px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded font-semibold transition-colors"
        >
          Workouts
        </button>
        <button
          onClick={() => navigate('/progress')}
          className="flex-1 min-w-[140px] px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded font-semibold transition-colors"
        >
          Progress
        </button>
      </div>

      {/* Last Updated */}
      <div className="text-xs text-gray-500 border-t border-gray-700 pt-4">
        Last updated: {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} · Data from localStorage
      </div>
    </div>
  )
}
