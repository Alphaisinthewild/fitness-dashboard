# Implementation Guide - Day 2 Onwards

This guide covers how to implement the remaining features once API keys are provided.

---

## Day 2: API Integration & Charts

### Step 1: Build API Wrapper Layer

Create `src/api/client.js`:
```javascript
import axios from 'axios'

const createClient = (baseURL, apiKey) => {
  return axios.create({
    baseURL,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    timeout: 10000
  })
}

export default createClient
```

### Step 2: Implement Fitbod API Wrapper

Create `src/api/fitbod.js`:
```javascript
import createClient from './client'

const getFitbodClient = () => {
  const apiKey = localStorage.getItem('fitbodKey')
  const baseURL = 'https://api.fitbod.me' // or env var
  return createClient(baseURL, apiKey)
}

export const getWorkoutLogs = async (days = 7) => {
  const client = getFitbodClient()
  const response = await client.get('/workouts', {
    params: { days, limit: 50 }
  })
  return response.data
}

export const getWorkoutStats = async (days = 7) => {
  const client = getFitbodClient()
  const response = await client.get('/stats', {
    params: { days }
  })
  return response.data
}

export const getPRs = async (days = 7) => {
  const client = getFitbodClient()
  const response = await client.get('/prs', {
    params: { days }
  })
  return response.data
}
```

### Step 3: Implement MyFitnessPal API Wrapper

Create `src/api/myfitnesspal.js`:
```javascript
import createClient from './client'

const getMFPClient = () => {
  const apiKey = localStorage.getItem('mfpKey')
  const baseURL = 'https://api.myfitnesspal.com'
  return createClient(baseURL, apiKey)
}

export const getDailyNutrition = async (date) => {
  const client = getMFPClient()
  const response = await client.get(`/food/date/${date}`)
  return response.data
}

export const getWeeklyNutrition = async () => {
  const client = getMFPClient()
  const response = await client.get('/food/weekly')
  return response.data
}

export const getMeals = async (date) => {
  const client = getMFPClient()
  const response = await client.get(`/meals/${date}`)
  return response.data
}
```

### Step 4: Implement Wyze Scale API Wrapper

Create `src/api/wyze.js`:
```javascript
import createClient from './client'

const getWyzeClient = () => {
  const apiKey = localStorage.getItem('wyzeKey')
  const baseURL = 'https://api.wyzeintelligent.com'
  return createClient(baseURL, apiKey)
}

export const getLatestMeasurement = async () => {
  const client = getWyzeClient()
  const response = await client.get('/measurements/latest')
  return response.data
}

export const getMeasurementHistory = async (days = 30) => {
  const client = getWyzeClient()
  const response = await client.get('/measurements/history', {
    params: { days, limit: 100 }
  })
  return response.data
}

export const getBodyComposition = async () => {
  const client = getWyzeClient()
  const response = await client.get('/body-composition')
  return response.data
}
```

---

## Step 5: Create Custom Hooks

Create `src/hooks/useAsync.js` (generic data fetcher):
```javascript
import { useState, useEffect } from 'react'

export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const execute = async () => {
    setStatus('pending')
    setData(null)
    setError(null)
    try {
      const response = await asyncFunction()
      setData(response)
      setStatus('success')
    } catch (err) {
      setError(err)
      setStatus('error')
    }
  }

  useEffect(() => {
    if (immediate) execute()
  }, [immediate])

  return { execute, status, data, error }
}
```

Create `src/hooks/useWorkouts.js`:
```javascript
import { useAsync } from './useAsync'
import { getWorkoutLogs, getWorkoutStats, getPRs } from '../api/fitbod'

export const useWorkouts = (days = 7) => {
  const {
    status: logsStatus,
    data: logs,
    error: logsError
  } = useAsync(() => getWorkoutLogs(days))

  const {
    status: statsStatus,
    data: stats,
    error: statsError
  } = useAsync(() => getWorkoutStats(days))

  return {
    status: logsStatus === 'pending' || statsStatus === 'pending' ? 'pending' : 'success',
    logs,
    stats,
    error: logsError || statsError,
    isLoading: logsStatus === 'pending' || statsStatus === 'pending'
  }
}
```

Similar hooks for `useNutrition.js` and `useBodyComposition.js`.

---

## Step 6: Implement Chart Components

Create `src/components/Charts/WeightTrendChart.jsx`:
```javascript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function WeightTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
        <XAxis dataKey="date" stroke="#999" />
        <YAxis stroke="#999" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #00ff41' }}
          labelStyle={{ color: '#fff' }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="weight" 
          stroke="#00ff41" 
          dot={{ fill: '#00ff41' }}
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="target" 
          stroke="#999" 
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

Repeat for:
- CalorieDeficitChart (BarChart)
- MacrosPieChart (PieChart)
- VolumeTrendChart (AreaChart)

---

## Step 7: Implement Zustand Store

Create `src/store/index.js`:
```javascript
import { create } from 'zustand'

export const useFitnessStore = create((set) => ({
  // Today's data
  today: {
    calories: { consumed: 0, goal: 2250 },
    protein: { consumed: 0, goal: 185 },
    workouts: { completed: 0, planned: 1 },
    steps: { current: 0, goal: 10000 }
  },
  
  // Weekly data
  weekly: {
    weights: [],
    calories: [],
    proteins: [],
    volumes: []
  },

  // State management
  isLoading: false,
  error: null,

  // Actions
  setTodayData: (data) => set((state) => ({
    today: { ...state.today, ...data }
  })),

  setWeeklyData: (data) => set((state) => ({
    weekly: { ...state.weekly, ...data }
  })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error })
}))
```

---

## Step 8: Connect Pages to Real Data

Update `src/components/Dashboard/WeeklyTrends.jsx`:
```javascript
import { useFitnessStore } from '../../store'
import { useWorkouts } from '../../hooks/useWorkouts'
import WeightTrendChart from '../Charts/WeightTrendChart'
import LoadingSpinner from '../Common/LoadingSpinner'

export default function WeeklyTrends() {
  const { logs, stats, isLoading, error } = useWorkouts(7)
  const weights = useFitnessStore((state) => state.weekly.weights)

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-red-400">Error loading data</div>

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-2">Weekly Trends</h2>
      </div>

      <div className="stat-card">
        <h3 className="text-2xl font-bold mb-4">Weight Progress</h3>
        <WeightTrendChart data={weights} />
      </div>

      <div className="stat-card">
        <h3 className="text-2xl font-bold mb-4">Volume Progression</h3>
        <p className="text-2xl text-green-400">{stats?.totalVolume || 0} lbs</p>
      </div>

      {/* More sections... */}
    </div>
  )
}
```

---

## Step 9: Error Handling & Loading States

Create `src/components/Common/LoadingSpinner.jsx`:
```javascript
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block animate-spin text-2xl">⟳</div>
        <p className="text-gray-400 mt-4">Loading your data...</p>
      </div>
    </div>
  )
}
```

Create `src/components/Common/ErrorBoundary.jsx`:
```javascript
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-900 border border-red-700 p-4 rounded text-red-200">
          Something went wrong. Please refresh the page.
        </div>
      )
    }
    return this.props.children
  }
}
```

---

## API Key Format Notes

The Setup page expects keys in this format:

**Fitbod**: Bearer token or API key  
**MyFitnessPal**: OAuth token or API key  
**Wyze**: OAuth token or API key  

Each API's documentation should specify exact header format. Adjust in `client.js` if needed.

---

## Testing with Mock Data

If actual API keys aren't ready, you can mock responses:

```javascript
// api/fitbod.js
export const getWorkoutLogs = async () => {
  return {
    workouts: [
      {
        id: 'mock_1',
        date: '2026-03-23',
        exercises: [
          { name: 'Bench Press', volume: 5850 }
        ]
      }
    ]
  }
}
```

---

## Performance Optimization

1. **Data Caching** - Use `useAsync` with conditional fetching
2. **Batched Requests** - Group API calls where possible
3. **Pagination** - Fetch last 7 days, not all history
4. **Lazy Loading** - Load charts on page scroll
5. **API Rate Limiting** - Respect API limits; use exponential backoff

---

## Deployment Checklist

Before going live:
- [ ] All API keys in `.env` (not committed)
- [ ] Build passes: `npm run build`
- [ ] No console errors in production
- [ ] Mobile responsive tested
- [ ] Dark mode looks good
- [ ] Charts load smoothly
- [ ] API error handling tested
- [ ] Page load time < 2s

---

## Key Files & Next Steps

| What | Where | Status |
|------|-------|--------|
| API wrappers | `src/api/` | ⏳ Ready to build |
| Custom hooks | `src/hooks/` | ⏳ Ready to build |
| Charts | `src/components/Charts/` | ⏳ Ready to build |
| Pages | `src/components/Dashboard/` | ⏳ Ready to connect |
| Store | `src/store/` | ⏳ Ready to build |

---

**Next**: Once API keys provided, follow steps 1-9 above to unlock real data.

_Built for speed and clarity._
