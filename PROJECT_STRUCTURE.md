# Fitness Dashboard - Project Structure & Tech Stack

## Tech Stack Decision: **React + Vite**

**Why React:**
- Fastest scaffolding for dashboard components
- Excellent charting libraries (Recharts, Chart.js)
- Strong ecosystem for real-time data updates
- Mobile-responsive out of the box with Tailwind

**Why Vite (not Create React App):**
- ~10x faster dev server startup
- Instant HMR (hot module replacement)
- Modern ES6 + native support
- Smaller bundle size for fast initial load

---

## Project Structure

```
fitness-dashboard/
├── README.md
├── package.json
├── vite.config.js
├── index.html
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── main.jsx                    # App entry point
│   ├── App.jsx                     # Root component
│   ├── index.css                   # Global styles (Tailwind)
│   │
│   ├── api/                        # API integration layer
│   │   ├── fitbod.js              # Fitbod API wrapper
│   │   ├── myfitnesspal.js        # MyFitnessPal API wrapper
│   │   ├── wyze.js                # Wyze Scale API wrapper
│   │   └── client.js              # Shared HTTP client (axios)
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useWorkouts.js         # Fetch & manage workout data
│   │   ├── useNutrition.js        # Fetch & manage nutrition data
│   │   ├── useBodyComposition.js  # Fetch & manage weight/body data
│   │   └── useAsync.js            # Generic async data fetcher
│   │
│   ├── store/                      # State management (Zustand)
│   │   ├── index.js               # Store setup
│   │   ├── slices/
│   │   │   ├── fitnessSlice.js   # Fitness state
│   │   │   ├── authSlice.js      # API key management
│   │   │   └── uiSlice.js        # UI state (theme, loading, etc)
│   │   └── types.js               # TypeScript-like JSDoc types
│   │
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx         # Top nav with sync status
│   │   │   ├── Sidebar.jsx        # Navigation menu
│   │   │   └── Footer.jsx         # Last sync time
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── TodaySummary.jsx  # Page 1: Today's overview
│   │   │   ├── WeeklyTrends.jsx  # Page 2: Weekly stats
│   │   │   ├── WorkoutDetail.jsx # Page 3: Workout logs
│   │   │   ├── NutritionBreakdown.jsx # Page 4: Nutrition
│   │   │   └── ProgressDashboard.jsx  # Page 5: Overall progress
│   │   │
│   │   ├── Cards/
│   │   │   ├── StatCard.jsx       # Reusable stat box
│   │   │   ├── MiniChart.jsx      # Small inline charts
│   │   │   └── ProgressBar.jsx    # Progress visualization
│   │   │
│   │   ├── Charts/
│   │   │   ├── WeightTrendChart.jsx     # Line chart for weight
│   │   │   ├── CalorieDeficitChart.jsx  # Bar chart for calories
│   │   │   ├── MacrosPieChart.jsx       # Pie chart for macros
│   │   │   ├── VolumeTrendChart.jsx     # Volume progression
│   │   │   └── MealTimeline.jsx         # Horizontal meal chart
│   │   │
│   │   └── Common/
│   │       ├── LoadingSpinner.jsx
│   │       ├── ErrorBoundary.jsx
│   │       ├── DatePicker.jsx
│   │       └── Tooltip.jsx
│   │
│   ├── utils/
│   │   ├── formatters.js          # Format dates, numbers, units
│   │   ├── calculations.js        # Calculate deficits, trends, scores
│   │   ├── constants.js           # Config (goals, colors, etc)
│   │   └── validators.js          # Validate API keys
│   │
│   ├── pages/
│   │   ├── Setup.jsx              # Initial API key setup
│   │   └── Dashboard.jsx          # Main dashboard container
│   │
│   └── styles/
│       └── tailwind.config.js      # Tailwind config (dark mode, colors)
│
├── tests/
│   ├── __mocks__/
│   │   ├── fitbod.js
│   │   ├── myfitnesspal.js
│   │   └── wyze.js
│   │
│   └── components/
│       └── StatCard.test.jsx
│
└── .env.example
```

---

## Dependencies

### Core
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0"
}
```

### State Management & Data
```json
{
  "zustand": "^4.3.0",
  "axios": "^1.3.0"
}
```

### UI & Charts
```json
{
  "recharts": "^2.5.0",
  "tailwindcss": "^3.2.0",
  "autoprefixer": "^10.4.0"
}
```

### Dev Tools
```json
{
  "vite": "^4.1.0",
  "@vitejs/plugin-react": "^3.1.0",
  "vitest": "^0.29.0"
}
```

### Optional (Consider later if time permits)
```json
{
  "date-fns": "^2.29.0",
  "framer-motion": "^10.0.0"
}
```

---

## Setup Checklist

- [ ] Create GitHub repo: `fitness-dashboard`
- [ ] Initialize Vite React project
- [ ] Install dependencies
- [ ] Set up Tailwind CSS with dark mode
- [ ] Create `.env.example` with API key placeholders
- [ ] Build API wrapper layer (connect to Fitbod, MFP, Wyze)
- [ ] Implement Zustand store
- [ ] Create Layout & routing
- [ ] Build Charts component library
- [ ] Implement Pages (1-5 above)
- [ ] Connect real data from APIs
- [ ] Test on mobile (responsive design)
- [ ] Final styling & polish

---

## API Key Management

**Storage Strategy:**
- User enters API keys in Setup page
- Keys stored in localStorage (or Zustand store with optional persistence)
- Each API call includes keys in headers
- No keys committed to git (`.env` ignored)

**Environment Setup:**
```
VITE_FITBOD_API_BASE_URL=https://api.fitbod.me
VITE_MFP_API_BASE_URL=https://api.myfitnesspal.com
VITE_WYZE_API_BASE_URL=https://api.wyzeintelligent.com
```

---

## Development Timeline

**Day 1 (Today, Mon Mar 23):**
- Set up GitHub repo & Vite project
- Build API wrapper layer
- Create Layout & routing
- Implement TodaySummary page
- Get real data flowing
- **Checkpoint:** Wolf reviews at 12 PM EDT

**Day 2 (Tue Mar 24):**
- Build Charts component library
- Implement WeeklyTrends & WorkoutDetail pages
- Style all components with Tailwind
- Mobile responsive testing

**Day 3 (Wed Mar 25):**
- Implement NutritionBreakdown & ProgressDashboard
- Integrate real data from all APIs
- Polish animations & interactions
- Error handling & loading states

**Day 4 (Thu/Fri Mar 27-28):**
- Bug fixes & optimization
- Dark mode refinement
- Final styling & UX polish
- Deploy to GitHub Pages or Vercel

---

## Performance Goals

- Page load: < 2s
- First contentful paint: < 1s
- API calls batched (not cascading)
- Data caching where appropriate (avoid hammering APIs)
- Mobile: Full responsiveness, touch-friendly

---

## Deployment Options

1. **GitHub Pages** (Free, static)
   - Build output to `/docs` folder
   - Enable GH Pages in repo settings
   - URL: `https://Alphaisinthewild.github.io/fitness-dashboard`

2. **Vercel** (Free tier)
   - Connected to GitHub
   - Auto-deploy on push
   - URL: `fitness-dashboard.vercel.app`

3. **Self-hosted** (If Wolf prefers)
   - Build → Deploy to custom server
   - More control over API proxying

**Decision:** Default to GitHub Pages for simplicity + Vercel as backup.
