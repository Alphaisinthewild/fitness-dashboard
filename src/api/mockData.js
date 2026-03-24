import { getTodayKey, getLast7Days } from '../utils/dates'
import { saveDay, saveBodyComp, loadDay, loadBodyCompHistory } from '../utils/storage'

const SEED_WORKOUTS = [
  {
    exercises: 'Barbell Bench Press, Incline DB Press, Cable Flye, Tricep Dips',
    duration: 75,
    volume: 15240,
    caloriesBurned: 450,
    muscleGroups: ['chest', 'triceps', 'shoulders'],
  },
  {
    exercises: 'Deadlift, Bent Barbell Row, Pull-ups, Barbell Curl',
    duration: 82,
    volume: 18900,
    caloriesBurned: 520,
    muscleGroups: ['back', 'biceps'],
  },
  {
    exercises: 'Rest Day - Active Recovery (45 min walk)',
    duration: 45,
    volume: 0,
    caloriesBurned: 180,
    muscleGroups: ['cardio'],
  },
  {
    exercises: 'Barbell Squat, Leg Press, Leg Curl, Calf Raises',
    duration: 90,
    volume: 22100,
    caloriesBurned: 580,
    muscleGroups: ['legs'],
  },
  {
    exercises: 'OHP, Lateral Raises, Face Pulls, Shrugs',
    duration: 65,
    volume: 12400,
    caloriesBurned: 380,
    muscleGroups: ['shoulders', 'traps'],
  },
]

const SEED_NUTRITION = [
  { calories: 2180, protein: 182, carbs: 245, fat: 73, meals: [
    { name: 'Breakfast', calories: 550, protein: 45, time: '08:00' },
    { name: 'Lunch', calories: 750, protein: 65, time: '12:30' },
    { name: 'Snack', calories: 200, protein: 25, time: '16:00' },
    { name: 'Dinner', calories: 680, protein: 47, time: '19:00' },
  ]},
  { calories: 2220, protein: 188, carbs: 250, fat: 70, meals: [
    { name: 'Breakfast', calories: 600, protein: 50, time: '07:30' },
    { name: 'Lunch', calories: 700, protein: 60, time: '12:00' },
    { name: 'Snack', calories: 220, protein: 28, time: '15:30' },
    { name: 'Dinner', calories: 700, protein: 50, time: '19:30' },
  ]},
  { calories: 2150, protein: 180, carbs: 240, fat: 72, meals: [
    { name: 'Breakfast', calories: 500, protein: 42, time: '08:30' },
    { name: 'Lunch', calories: 780, protein: 68, time: '13:00' },
    { name: 'Snack', calories: 190, protein: 22, time: '16:30' },
    { name: 'Dinner', calories: 680, protein: 48, time: '18:30' },
  ]},
  { calories: 2300, protein: 190, carbs: 260, fat: 76, meals: [
    { name: 'Breakfast', calories: 580, protein: 48, time: '07:00' },
    { name: 'Lunch', calories: 720, protein: 62, time: '12:15' },
    { name: 'Snack', calories: 250, protein: 30, time: '16:00' },
    { name: 'Dinner', calories: 750, protein: 50, time: '19:00' },
  ]},
  { calories: 2100, protein: 165, carbs: 235, fat: 68, meals: [
    { name: 'Breakfast', calories: 480, protein: 38, time: '09:00' },
    { name: 'Lunch', calories: 680, protein: 55, time: '13:30' },
    { name: 'Snack', calories: 200, protein: 25, time: '16:00' },
    { name: 'Dinner', calories: 740, protein: 47, time: '20:00' },
  ]},
  { calories: 2250, protein: 185, carbs: 255, fat: 74, meals: [
    { name: 'Breakfast', calories: 560, protein: 46, time: '08:00' },
    { name: 'Lunch', calories: 730, protein: 63, time: '12:30' },
    { name: 'Snack', calories: 210, protein: 26, time: '16:00' },
    { name: 'Dinner', calories: 750, protein: 50, time: '19:00' },
  ]},
  { calories: 2200, protein: 192, carbs: 248, fat: 71, meals: [
    { name: 'Breakfast', calories: 570, protein: 50, time: '07:45' },
    { name: 'Lunch', calories: 710, protein: 62, time: '12:00' },
    { name: 'Snack', calories: 230, protein: 30, time: '15:30' },
    { name: 'Dinner', calories: 690, protein: 50, time: '19:15' },
  ]},
]

const SEED_BODY_COMP = [
  { date: null, weight: 335, fatPercent: 38.5, musclePercent: 29.0, bmi: 33.5 }, // starting - will be set to 60 days ago
  { date: null, weight: 325, fatPercent: 37.2, musclePercent: 30.1, bmi: 32.5 },
  { date: null, weight: 318, fatPercent: 36.0, musclePercent: 31.0, bmi: 31.8 },
  { date: null, weight: 312, fatPercent: 35.1, musclePercent: 31.8, bmi: 31.2 },
  { date: null, weight: 306, fatPercent: 34.0, musclePercent: 32.5, bmi: 30.6 },
  { date: null, weight: 302, fatPercent: 33.2, musclePercent: 33.4, bmi: 30.2 },
  { date: null, weight: 300.8, fatPercent: 32.6, musclePercent: 33.8, bmi: 30.1 },
  { date: null, weight: 298.5, fatPercent: 32.1, musclePercent: 34.2, bmi: 29.8 },
]

export function seedDataIfEmpty() {
  // Check if we already have data
  const today = getTodayKey()
  if (loadDay(today, 'nutrition') && loadBodyCompHistory().length > 0) {
    return // already seeded
  }

  const days = getLast7Days()

  // Seed nutrition for last 7 days
  days.forEach((d, i) => {
    if (!loadDay(d, 'nutrition')) {
      saveDay(d, 'nutrition', SEED_NUTRITION[i % SEED_NUTRITION.length])
    }
  })

  // Seed workouts for last 7 days (skip rest days)
  days.forEach((d, i) => {
    if (!loadDay(d, 'workouts')) {
      const workout = SEED_WORKOUTS[i % SEED_WORKOUTS.length]
      saveDay(d, 'workouts', [{ ...workout, id: `seed_${i}`, date: d }])
    }
  })

  // Seed body comp history over ~60 days
  if (loadBodyCompHistory().length === 0) {
    SEED_BODY_COMP.forEach((entry, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (SEED_BODY_COMP.length - 1 - i) * 7)
      saveBodyComp({ ...entry, date: d.toISOString().slice(0, 10) })
    })
  }
}
