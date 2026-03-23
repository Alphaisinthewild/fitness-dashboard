import { useState } from 'react'

export default function TodaySummary() {
  // Mock data - will be replaced with real API data
  const [todayData] = useState({
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }),
    calories: { consumed: 2180, goal: 2250, deficit: 70 },
    protein: { consumed: 182, goal: 185, delta: -3 },
    workouts: { completed: 1, planned: 1 },
    steps: { current: 8500, goal: 10000 },
  })

  const getPercentage = (current, goal) => Math.round((current / goal) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold mb-2">Today's Summary</h2>
        <p className="text-gray-400">{todayData.date}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calories Card */}
        <div className="stat-card">
          <div className="stat-label">Calories</div>
          <div className="stat-value">{todayData.calories.consumed}</div>
          <div className="text-sm text-gray-400 mt-2">
            {todayData.calories.goal} goal · <span className="text-green-400">-{todayData.calories.deficit}</span> deficit
          </div>
          <div className="mt-4 bg-gray-700 rounded-full h-2">
            <div 
              className="progress-fill"
              style={{ width: `${getPercentage(todayData.calories.consumed, todayData.calories.goal)}%` }}
            />
          </div>
        </div>

        {/* Protein Card */}
        <div className="stat-card">
          <div className="stat-label">Protein</div>
          <div className="stat-value">{todayData.protein.consumed}g</div>
          <div className="text-sm text-gray-400 mt-2">
            {todayData.protein.goal}g goal · <span className="text-yellow-400">{todayData.protein.delta}g</span>
          </div>
          <div className="mt-4 bg-gray-700 rounded-full h-2">
            <div 
              className="progress-fill"
              style={{ width: `${getPercentage(todayData.protein.consumed, todayData.protein.goal)}%` }}
            />
          </div>
        </div>

        {/* Workouts Card */}
        <div className="stat-card">
          <div className="stat-label">Workouts</div>
          <div className="stat-value">{todayData.workouts.completed}/{todayData.workouts.planned}</div>
          <div className="text-sm text-gray-400 mt-2">
            {todayData.workouts.completed === todayData.workouts.planned ? '✅ Complete' : '⏳ In progress'}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="stat-card">
        <div className="stat-label">Daily Steps</div>
        <div className="flex items-baseline gap-4">
          <div className="stat-value">{todayData.steps.current.toLocaleString()}</div>
          <div className="text-gray-400">/ {todayData.steps.goal.toLocaleString()} goal</div>
        </div>
        <div className="mt-4 bg-gray-700 rounded-full h-3">
          <div 
            className="progress-fill"
            style={{ width: `${getPercentage(todayData.steps.current, todayData.steps.goal)}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-400">
          {getPercentage(todayData.steps.current, todayData.steps.goal)}% complete
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4">
        <button className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-500 rounded font-semibold transition-colors">
          View Full Nutrition
        </button>
        <button className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded font-semibold transition-colors">
          Today's Workouts
        </button>
        <button className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded font-semibold transition-colors">
          Progress Dashboard
        </button>
      </div>

      {/* Last Updated */}
      <div className="text-xs text-gray-500 border-t border-gray-700 pt-4">
        Last updated: 2:15 PM EDT · All data syncing...
      </div>
    </div>
  )
}
