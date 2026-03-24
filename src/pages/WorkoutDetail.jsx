import useFitnessStore from '../store/fitnessStore'
import { getLast7Days, formatDate } from '../utils/dates'
import WorkoutForm from '../components/Forms/WorkoutForm'
import { useState } from 'react'

export default function WorkoutDetail() {
  const weeklyWorkouts = useFitnessStore(s => s.weeklyWorkouts)
  const getWeekTotals = useFitnessStore(s => s.getWeekTotals)
  const [showForm, setShowForm] = useState(false)

  const days = getLast7Days().slice().reverse()
  const totals = getWeekTotals()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold mb-2">Workout Logs</h2>
          <p className="text-gray-400">Last 7 days</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded font-semibold transition-colors"
        >
          {showForm ? 'Cancel' : '+ Log Workout'}
        </button>
      </div>

      {showForm && (
        <WorkoutForm onClose={() => setShowForm(false)} />
      )}

      {/* Week Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="stat-label">Workouts This Week</div>
          <div className="stat-value">{totals.workoutCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Volume</div>
          <div className="stat-value">{totals.totalVolume.toLocaleString()} lbs</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Calories Burned</div>
          <div className="stat-value">{totals.totalCalsBurned.toLocaleString()}</div>
        </div>
      </div>

      {/* Workout Cards */}
      <div className="space-y-4">
        {days.map(dateKey => {
          const workouts = weeklyWorkouts[dateKey] || []
          if (workouts.length === 0) {
            return (
              <div key={dateKey} className="stat-card opacity-60">
                <div className="text-sm text-gray-400">{formatDate(dateKey)}</div>
                <div className="text-gray-500 mt-2">Rest Day</div>
              </div>
            )
          }
          return workouts.map((w, i) => (
            <div key={`${dateKey}-${i}`} className="stat-card">
              <div className="flex justify-between items-start mb-3">
                <div className="text-sm text-gray-400">{formatDate(dateKey)}</div>
                <span className="text-xs px-2 py-1 bg-green-900 text-green-400 rounded">Completed</span>
              </div>
              <div className="flex gap-6 text-sm text-gray-300 mb-3">
                <span>Duration: {w.duration} min</span>
                <span>Volume: {(w.volume || 0).toLocaleString()} lbs</span>
                <span>Cals: {w.caloriesBurned || 0}</span>
              </div>
              <div className="text-gray-200">
                <span className="text-gray-500 text-sm mr-2">Exercises:</span>
                {w.exercises}
              </div>
            </div>
          ))
        })}
      </div>
    </div>
  )
}
