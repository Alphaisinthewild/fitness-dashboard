import { create } from 'zustand'
import { getTodayKey, getLast7Days } from '../utils/dates'
import { saveDay, loadDay, loadAllOfType, saveBodyComp, loadBodyCompHistory } from '../utils/storage'

const useFitnessStore = create((set, get) => ({
  // Today's nutrition
  todayNutrition: null,
  // Today's workouts (array)
  todayWorkouts: [],
  // Last 7 days nutrition map { dateKey: data }
  weeklyNutrition: {},
  // Last 7 days workouts map { dateKey: [workouts] }
  weeklyWorkouts: {},
  // Body composition history
  bodyCompHistory: [],
  // Goals
  goals: {
    calories: 2250,
    protein: 185,
    carbs: 270,
    fat: 75,
    steps: 10000,
    startingWeight: 335,
    targetWeight: 180,
  },

  // Load all data from localStorage
  loadAll: () => {
    const today = getTodayKey()
    const days = getLast7Days()
    const todayNutrition = loadDay(today, 'nutrition')
    const todayWorkoutsRaw = loadDay(today, 'workouts')
    const todayWorkouts = todayWorkoutsRaw || []
    const weeklyNutrition = loadAllOfType('nutrition', days)
    const weeklyWorkouts = {}
    for (const d of days) {
      const w = loadDay(d, 'workouts')
      if (w) weeklyWorkouts[d] = w
    }
    const bodyCompHistory = loadBodyCompHistory()
    set({ todayNutrition, todayWorkouts, weeklyNutrition, weeklyWorkouts, bodyCompHistory })
  },

  // Save nutrition for a date
  saveNutrition: (dateKey, data) => {
    saveDay(dateKey, 'nutrition', data)
    const today = getTodayKey()
    set(state => ({
      todayNutrition: dateKey === today ? data : state.todayNutrition,
      weeklyNutrition: { ...state.weeklyNutrition, [dateKey]: data },
    }))
  },

  // Add a workout for a date
  addWorkout: (dateKey, workout) => {
    const existing = loadDay(dateKey, 'workouts') || []
    const updated = [...existing, workout]
    saveDay(dateKey, 'workouts', updated)
    const today = getTodayKey()
    set(state => ({
      todayWorkouts: dateKey === today ? updated : state.todayWorkouts,
      weeklyWorkouts: { ...state.weeklyWorkouts, [dateKey]: updated },
    }))
  },

  // Add daily entry (nutrition + workout + measurements + supplements)
  addDailyEntry: (entry) => {
    const dateKey = entry.date || getTodayKey()
    
    // Save nutrition
    if (entry.nutrition) {
      const nutrition = {
        calories: entry.nutrition.calories,
        protein: entry.nutrition.protein,
        carbs: entry.nutrition.carbs,
        fat: entry.nutrition.fat,
        date: dateKey,
      }
      saveDay(dateKey, 'nutrition', nutrition)
    }

    // Save workout
    if (entry.workout && (entry.workout.caloriesBurned || entry.workout.timeInGym)) {
      const workout = {
        date: dateKey,
        caloriesBurned: entry.workout.caloriesBurned,
        duration: entry.workout.timeInGym,
        muscleGroups: entry.workout.muscleGroups,
        volume: 0, // Can be calculated later
      }
      const existing = loadDay(dateKey, 'workouts') || []
      const updated = [...existing, workout]
      saveDay(dateKey, 'workouts', updated)
    }

    // Save measurements
    if (entry.measurements) {
      const comp = {
        date: dateKey,
        weight: entry.measurements.weight,
        musclePercent: entry.measurements.leanMuscle ? ((entry.measurements.leanMuscle / entry.measurements.weight) * 100) : null,
        fatPercent: entry.measurements.fatPercent,
        bmi: entry.measurements.weight ? 703 * (entry.measurements.weight / (70 * 70)) : null,
      }
      saveBodyComp(comp)
    }

    // Save supplements (localStorage as is)
    if (entry.supplements) {
      localStorage.setItem(`supplements-${dateKey}`, JSON.stringify(entry.supplements))
    }

    // Save steps
    if (entry.steps) {
      localStorage.setItem(`steps-${dateKey}`, entry.steps.toString())
    }

    // Reload all
    get().loadAll()
  },

  // Save body composition
  saveBodyComp: (data) => {
    saveBodyComp(data)
    set({ bodyCompHistory: loadBodyCompHistory() })
  },

  // Aggregation helpers
  getWeeklyCalorieData: () => {
    const state = get()
    const days = getLast7Days()
    return days.map(d => ({
      date: d,
      consumed: state.weeklyNutrition[d]?.calories || 0,
      goal: state.goals.calories,
    }))
  },

  getWeeklyProteinData: () => {
    const state = get()
    const days = getLast7Days()
    return days.map(d => ({
      date: d,
      consumed: state.weeklyNutrition[d]?.protein || 0,
      goal: state.goals.protein,
      hit: (state.weeklyNutrition[d]?.protein || 0) >= state.goals.protein,
    }))
  },

  getWeeklyVolumeData: () => {
    const state = get()
    const days = getLast7Days()
    return days.map(d => {
      const workouts = state.weeklyWorkouts[d] || []
      const volume = workouts.reduce((sum, w) => sum + (w.volume || 0), 0)
      return { date: d, volume }
    })
  },

  getWeekTotals: () => {
    const state = get()
    const days = getLast7Days()
    let totalVolume = 0
    let totalCalsBurned = 0
    let workoutCount = 0
    for (const d of days) {
      const workouts = state.weeklyWorkouts[d] || []
      workoutCount += workouts.length
      for (const w of workouts) {
        totalVolume += w.volume || 0
        totalCalsBurned += w.caloriesBurned || 0
      }
    }
    return { totalVolume, totalCalsBurned, workoutCount }
  },

  getLatestBodyComp: () => {
    const state = get()
    const h = state.bodyCompHistory
    return h.length > 0 ? h[h.length - 1] : null
  },

  getProgressStats: () => {
    const state = get()
    const latest = state.bodyCompHistory.length > 0 ? state.bodyCompHistory[state.bodyCompHistory.length - 1] : null
    const goals = state.goals
    if (!latest) {
      return {
        currentWeight: goals.startingWeight,
        weightLost: 0,
        progressPercent: 0,
        remaining: goals.startingWeight - goals.targetWeight,
      }
    }
    const weightLost = goals.startingWeight - latest.weight
    const totalToLose = goals.startingWeight - goals.targetWeight
    const progressPercent = Math.round((weightLost / totalToLose) * 1000) / 10
    return {
      currentWeight: latest.weight,
      weightLost,
      progressPercent: Math.max(0, progressPercent),
      remaining: latest.weight - goals.targetWeight,
      fatPercent: latest.fatPercent,
      musclePercent: latest.musclePercent,
      bmi: latest.bmi,
    }
  },
}))

export default useFitnessStore
