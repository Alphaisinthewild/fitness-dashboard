# 🚀 Quick Start - Fitness Dashboard Phase 2

**Status**: Production MVP Complete ✅

---

## 30-Second Setup

```bash
cd /Users/alpha/.openclaw/workspace/fitness-dashboard
npm install    # First time only
npm run dev    # Starts on http://localhost:3001
```

That's it! The app will open with 8 weeks of pre-populated seed data.

---

## What You'll See

### Setup Screen (First Load Only)
Enter any API keys (e.g., "test") → Click "Save & Continue"  
(They're stored locally, never sent anywhere)

### Today's Summary (Dashboard Home)
- Daily calorie & protein goals (progress bars)
- Today's workouts + muscle groups
- Latest Wyze Scale reading (weight, body fat %)
- Quick action buttons to log nutrition/workouts

### Weekly Trends (Charts)
- Weight progress curve (335 → 180 goal, currently 298.5 lbs)
- Calorie deficit bar chart (vs 2250 cal goal)
- Protein consistency % (95% of days hit goal)
- Training volume progression

### Workout Detail (Workout Log)
- Last 7 workouts in cards
- Total volume, calories, muscle groups
- Click to expand for full exercise list

### Nutrition Breakdown (Macros)
- Macro pie chart (protein/carbs/fat %)
- Meal timeline (breakfast, lunch, snack, dinner)
- Daily vs target bars

### Progress Dashboard (Transformation)
- Progress toward 180 lb goal (36.5 / 155 lbs = 23.6%)
- Body composition comparison (fat %, muscle %)
- Milestones achieved (20 lbs, 30 lbs lost)
- 7-day and 30-day weight trends

---

## Test the Forms

### Log Nutrition
1. Click "Today" → "Log Nutrition" button
2. Enter: Calories: 2000, Protein: 180, Carbs: 250, Fat: 70
3. Click "Save & Continue"
4. See updated totals on Today page

### Log Workout
1. Click "Today" → "Log Workout" button
2. Enter: Exercises: "Bench Press, Rows, Dips", Duration: 75, Volume: 12000, Calories: 400
3. Click "Log"
4. See on Today page and Workout Detail page

---

## Data Persistence

All data is saved in browser's **localStorage**:
- Reload the page → data still there
- Close browser → data persists
- Clear localStorage → resets to seed data

### View Raw Data (DevTools)
```javascript
// In browser console (F12)
localStorage.getItem('fitness_2026-03-24:nutrition')
localStorage.getItem('fitness_2026-03-24:workouts')
```

---

## Navigation

**Sidebar Menu (Left):**
- 📊 Today - Home dashboard
- 📈 Weekly Trends - 4 charts
- 🏋️ Workouts - 7-day log
- 🥗 Nutrition - Macro breakdown
- 🎯 Progress - Transformation tracker
- 🔑 API Keys - Setup screen

---

## Build & Deploy

```bash
# Build for production
npm run build

# Output: /dist folder (ready to deploy)

# Test build locally
npm run preview

# Deploy to Vercel (free)
npm install -g vercel
vercel
```

---

## Key Features

✅ **All 5 pages functional** - No stubs or TODOs  
✅ **Charts with real data** - Recharts, Tailwind styled  
✅ **Form validation** - Prevents negative values, protein < calories  
✅ **Dark theme** - Neon green accents throughout  
✅ **Responsive** - Works on mobile, tablet, desktop  
✅ **Data persists** - localStorage saves everything  
✅ **Seed data** - 8 weeks to explore immediately  

---

## Known Limitations

⚠️ **No real API calls yet** - Phase 3 will add Wyze/Fitbod/MFP  
⚠️ **Chunk size** - One 616KB bundle (can code-split in future)  
⚠️ **Single user** - localStorage only (multi-device sync in Phase 3)  

---

## Troubleshooting

**Dev server won't start?**
```bash
# Kill existing Vite process
pkill -f vite

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Data looks weird?**
```bash
# Clear localStorage and reset to seed data
localStorage.clear()
# Reload page
```

**Want fresh data?**
```bash
# Clear just fitness data
Object.keys(localStorage)
  .filter(k => k.startsWith('fitness_'))
  .forEach(k => localStorage.removeItem(k))
// Reload
```

---

## Next Steps (Phase 3)

1. **Connect real APIs**
   - Wyze Scale for automated weight tracking
   - Fitbod for real workout history
   - MyFitnessPal for nutrition logging

2. **Cloud sync**
   - Firebase or Supabase for multi-device sync
   - User accounts & authentication

3. **Mobile app**
   - React Native wrapper (same components!)
   - Push notifications for daily check-ins

---

## Questions?

- Check `PHASE2_COMPLETE.md` for full technical docs
- Review `DATA_SCHEMA.md` for API models
- See `UI_MOCKUP.md` for wireframe details

---

**Built with React 18 + Vite + Zustand + Recharts + Tailwind CSS**  
**Phase 2 Complete | Ready for Testing** ✅
