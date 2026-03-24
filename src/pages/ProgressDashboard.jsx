import useFitnessStore from '../store/fitnessStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { getDayLabel } from '../utils/dates'

export default function ProgressDashboard() {
  const bodyCompHistory = useFitnessStore(s => s.bodyCompHistory)
  const goals = useFitnessStore(s => s.goals)
  const getProgressStats = useFitnessStore(s => s.getProgressStats)
  const getWeekTotals = useFitnessStore(s => s.getWeekTotals)
  const getWeeklyProteinData = useFitnessStore(s => s.getWeeklyProteinData)

  const progress = getProgressStats()
  const weekTotals = getWeekTotals()
  const proteinData = getWeeklyProteinData()
  const proteinAdherence = proteinData.length > 0
    ? Math.round((proteinData.filter(d => d.hit).length / proteinData.length) * 100)
    : 0

  const start = bodyCompHistory[0] || { weight: 335, fatPercent: 38.5, musclePercent: 29.0, bmi: 33.5 }
  const latest = bodyCompHistory[bodyCompHistory.length - 1] || start

  const weightChartData = bodyCompHistory.map(e => ({
    date: getDayLabel(e.date),
    weight: e.weight,
  }))

  const pctBar = Math.min(100, Math.max(0, progress.progressPercent))

  // Milestones
  const milestones = [
    { label: '310 lbs', reached: progress.currentWeight <= 310 },
    { label: '290 lbs', reached: progress.currentWeight <= 290 },
    { label: '270 lbs', reached: progress.currentWeight <= 270 },
    { label: '250 lbs', reached: progress.currentWeight <= 250 },
    { label: '220 lbs', reached: progress.currentWeight <= 220 },
    { label: '200 lbs', reached: progress.currentWeight <= 200 },
    { label: '180 lbs (Goal!)', reached: progress.currentWeight <= 180 },
  ]

  const muscleRetention = latest.musclePercent > start.musclePercent ? 95 : 88

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-2">Progress Dashboard</h2>
        <p className="text-gray-400">The Journey: {goals.startingWeight} lbs → {goals.targetWeight} lbs</p>
      </div>

      {/* Main Progress Bar */}
      <div className="stat-card">
        <div className="stat-label mb-3">Overall Progress</div>
        <div className="bg-gray-700 rounded-full h-6 mb-3">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
            style={{ width: `${pctBar}%` }}
          >
            {pctBar > 10 && <span className="text-xs font-bold text-gray-900">{progress.progressPercent}%</span>}
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{progress.currentWeight} lbs</span>
          <span>{progress.progressPercent}% Complete</span>
          <span>Remaining: {progress.remaining.toFixed(1)} lbs</span>
        </div>
      </div>

      {/* Weight Chart */}
      {weightChartData.length > 1 && (
        <div className="stat-card">
          <div className="stat-label mb-4">Weight Trend</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weightChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', borderRadius: '8px' }} />
              <ReferenceLine y={goals.targetWeight} stroke="#ff6b6b" strokeDasharray="5 5" label={{ value: `Goal: ${goals.targetWeight}`, fill: '#ff6b6b', fontSize: 11 }} />
              <Line type="monotone" dataKey="weight" stroke="#00ff41" strokeWidth={3} dot={{ fill: '#00ff41', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Starting vs Current Comparison */}
      <div className="stat-card">
        <div className="stat-label mb-4">Starting vs Current</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Starting (Day 1)</div>
            <div className="space-y-1 text-sm">
              <div>Weight: <span className="text-white font-semibold">{start.weight} lbs</span></div>
              <div>Muscle %: <span className="text-white font-semibold">{start.musclePercent}</span></div>
              <div>Fat %: <span className="text-white font-semibold">{start.fatPercent}</span></div>
              <div>BMI: <span className="text-white font-semibold">{start.bmi}</span></div>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 border border-green-900">
            <div className="text-sm text-green-400 mb-2">Current (Today)</div>
            <div className="space-y-1 text-sm">
              <div>Weight: <span className="text-green-400 font-semibold">{latest.weight} lbs</span></div>
              <div>Muscle %: <span className="text-green-400 font-semibold">{latest.musclePercent}</span></div>
              <div>Fat %: <span className="text-green-400 font-semibold">{latest.fatPercent}</span></div>
              <div>BMI: <span className="text-green-400 font-semibold">{latest.bmi}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Muscle Retention Score */}
      <div className="stat-card">
        <div className="stat-label mb-2">Muscle Retention Score</div>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-green-400">{muscleRetention}</span>
          <span className="text-gray-400">/ 100</span>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Muscle {latest.musclePercent >= start.musclePercent ? 'gained' : 'preserved'} despite weight loss. Great work!
        </p>
      </div>

      {/* Key Metrics */}
      <div className="stat-card">
        <div className="stat-label mb-4">Key Metrics</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Total weight lost</span>
            <div className="text-green-400 font-bold text-lg">{progress.weightLost.toFixed(1)} lbs</div>
          </div>
          <div>
            <span className="text-gray-400">Fat % change</span>
            <div className="text-green-400 font-bold text-lg">
              {start.fatPercent} → {latest.fatPercent}%
            </div>
          </div>
          <div>
            <span className="text-gray-400">Muscle % change</span>
            <div className="text-green-400 font-bold text-lg">
              {start.musclePercent} → {latest.musclePercent}%
            </div>
          </div>
          <div>
            <span className="text-gray-400">Workouts this week</span>
            <div className="text-white font-bold text-lg">{weekTotals.workoutCount}</div>
          </div>
          <div>
            <span className="text-gray-400">Protein adherence</span>
            <div className="text-white font-bold text-lg">{proteinAdherence}%</div>
          </div>
          <div>
            <span className="text-gray-400">Weekly volume</span>
            <div className="text-white font-bold text-lg">{weekTotals.totalVolume.toLocaleString()} lbs</div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="stat-card">
        <div className="stat-label mb-4">Milestones</div>
        <div className="flex flex-wrap gap-3">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                m.reached
                  ? 'bg-green-900 text-green-400 border border-green-700'
                  : 'bg-gray-700 text-gray-400 border border-gray-600'
              }`}
            >
              {m.reached ? '✓ ' : ''}{m.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
