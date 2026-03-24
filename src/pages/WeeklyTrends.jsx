import useFitnessStore from '../store/fitnessStore'
import { getDayLabel } from '../utils/dates'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'

export default function WeeklyTrends() {
  const getWeeklyCalorieData = useFitnessStore(s => s.getWeeklyCalorieData)
  const getWeeklyProteinData = useFitnessStore(s => s.getWeeklyProteinData)
  const getWeeklyVolumeData = useFitnessStore(s => s.getWeeklyVolumeData)
  const bodyCompHistory = useFitnessStore(s => s.bodyCompHistory)
  const goals = useFitnessStore(s => s.goals)
  const getProgressStats = useFitnessStore(s => s.getProgressStats)

  const calorieData = getWeeklyCalorieData().map(d => ({
    ...d, day: getDayLabel(d.date),
  }))
  const proteinData = getWeeklyProteinData().map(d => ({
    ...d, day: getDayLabel(d.date),
  }))
  const volumeData = getWeeklyVolumeData().map(d => ({
    ...d, day: getDayLabel(d.date),
  }))
  const progress = getProgressStats()

  const weightData = bodyCompHistory.map(e => ({
    date: getDayLabel(e.date),
    weight: e.weight,
  }))

  const proteinDaysHit = proteinData.filter(d => d.hit).length
  const proteinConsistency = proteinData.length > 0
    ? Math.round((proteinDaysHit / proteinData.length) * 100)
    : 0

  const avgCalories = calorieData.length > 0
    ? Math.round(calorieData.reduce((s, d) => s + d.consumed, 0) / calorieData.length)
    : 0

  const chartTooltipStyle = {
    contentStyle: { backgroundColor: '#2d2d2d', border: '1px solid #404040', borderRadius: '8px' },
    labelStyle: { color: '#9ca3af' },
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-2">Weekly Trends</h2>
        <p className="text-gray-400">Performance overview for the last 7 days</p>
      </div>

      {/* Weight Progress */}
      <div className="stat-card">
        <div className="stat-label mb-1">Weight Progress (Goal: {goals.startingWeight} → {goals.targetWeight})</div>
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-2xl font-bold text-green-400">{progress.currentWeight} lbs</span>
          <span className="text-gray-400">Lost: {progress.weightLost.toFixed(1)} lbs ({progress.progressPercent}%)</span>
        </div>
        {weightData.length > 1 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip {...chartTooltipStyle} />
              <ReferenceLine y={goals.targetWeight} stroke="#ff6b6b" strokeDasharray="5 5" label={{ value: 'Goal', fill: '#ff6b6b', fontSize: 11 }} />
              <Line type="monotone" dataKey="weight" stroke="#00ff41" strokeWidth={2} dot={{ fill: '#00ff41', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-sm">Not enough weight data for chart yet</p>
        )}
      </div>

      {/* Calorie Deficit */}
      <div className="stat-card">
        <div className="stat-label mb-1">Calorie Intake vs Target</div>
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-lg text-gray-300">Avg: {avgCalories} cal/day</span>
          <span className="text-gray-400">Target: {goals.calories} cal/day</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={calorieData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip {...chartTooltipStyle} />
            <ReferenceLine y={goals.calories} stroke="#ff6b6b" strokeDasharray="5 5" />
            <Bar dataKey="consumed" fill="#00ff41" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Protein Consistency */}
      <div className="stat-card">
        <div className="stat-label mb-1">Protein Consistency</div>
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-2xl font-bold text-green-400">{proteinDaysHit} / 7 days</span>
          <span className="text-gray-400">{proteinConsistency}% hit goal ({goals.protein}g+)</span>
        </div>
        <div className="flex gap-2">
          {proteinData.map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="text-xs text-gray-400 mb-1">{d.day}</div>
              <div className={`text-sm font-semibold ${d.hit ? 'text-green-400' : 'text-red-400'}`}>
                {d.consumed}g
              </div>
              <div className="text-xs">{d.hit ? '✓' : '✗'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Volume Progression */}
      <div className="stat-card">
        <div className="stat-label mb-1">Training Volume (lbs)</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={volumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip {...chartTooltipStyle} />
            <Line type="monotone" dataKey="volume" stroke="#4a9eff" strokeWidth={2} dot={{ fill: '#4a9eff', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
