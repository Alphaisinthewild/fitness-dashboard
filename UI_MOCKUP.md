# Fitness Dashboard - UI Mockup

## Layout Overview

**Dark mode** (charcoal #1a1a1a background, white text, accent color: neon green #00ff41 for Wolf's dominance theme).

---

## Page 1: Today's Summary (Landing)

```
┌─────────────────────────────────────────────────────────────────┐
│                    WOLF'S TRANSFORMATION                         │
│ Mon, Mar 23, 2026                                     Status: 🔋 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  TODAY'S STATS                                                    │
│  ┌──────────────────┬──────────────────┬──────────────────┐     │
│  │  CALORIES        │  PROTEIN         │  WORKOUTS        │     │
│  │  2,180 / 2,250   │  182g / 185g     │  1 / 1 Planned   │     │
│  │  ✅ -70 deficit  │  ✅ -3g to goal  │  ✅ Complete     │     │
│  └──────────────────┴──────────────────┴──────────────────┘     │
│                                                                   │
│  ┌──────────────────┐                                            │
│  │  STEPS (Today)   │                                            │
│  │  8,500           │  🎯 Goal: 10,000                           │
│  │  [████░░░░░░░░░] │  85% complete                              │
│  └──────────────────┘                                            │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│  QUICK LINKS                                                     │
│  [ View Full Nutrition ]  [ Today's Workouts ]  [ Progress ]   │
├─────────────────────────────────────────────────────────────────┤
│  LAST UPDATED: 2:15 PM                                           │
│  All data syncing...                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Page 2: Weekly Trends

```
┌─────────────────────────────────────────────────────────────────┐
│  WEEKLY TRENDS                                    < Back          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  WEIGHT PROGRESS (Goal: 335 → 180)                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Current: 298.5 lbs  |  Lost: 36.5 lbs (16.8%)          │   │
│  │ Trend: -2.3 lbs/week                                    │   │
│  │ [Line Chart: 8-week curve downward]                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  CALORIE DEFICIT vs TARGET                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Target deficit: 2,250-2,300 cal/day                     │   │
│  │ This week avg: 2,195 cal/day (-350 total vs target)     │   │
│  │ [Bar chart: Daily breakdown Mon-Sun]                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  PROTEIN CONSISTENCY                                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 6 / 7 days hit goal (185g+)  ✅ 95% consistency         │   │
│  │ Mon: 185g ✓  Tue: 188g ✓  Wed: 182g ✓  Thu: 190g ✓    │   │
│  │ Fri: 185g ✓  Sat: 165g ✗  Sun: 192g ✓                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  VOLUME PROGRESSION (Training Volume LBS)                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Week 1 (Mar 9-15):  74,200 lbs                          │   │
│  │ Week 2 (Mar 16-22): 75,300 lbs (+1.5%)                  │   │
│  │ Week 3 (Mar 23+):   In progress... 14,800 lbs           │   │
│  │ [Trend: ✅ Steadily climbing]                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Page 3: Workout Detail View (Last 7 Days)

```
┌─────────────────────────────────────────────────────────────────┐
│  WORKOUT LOGS                                       < Back       │
├─────────────────────────────────────────────────────────────────┤
│  Last 7 Days                                                     │
│                                                                   │
│  📅 Mon, Mar 23 — CHEST DAY (COMPLETED)                         │
│  ├─ Duration: 75 min  |  Volume: 15,240 lbs  |  Cals: 450     │
│  ├─ Barbell Bench Press     [6x315, 5x325, 4x335, 3x345]  🏆   │
│  ├─ Incline Dumbbell Press  [4x80, 4x85, 4x90]                │
│  ├─ Cable Flye              [3x12, 3x12, 3x12]                │
│  └─ Tricep Dips             [BW+90x8, BW+100x6, BW+110x4]     │
│                                                                   │
│  📅 Sun, Mar 22 — BACK & BICEPS (COMPLETED)                    │
│  ├─ Duration: 82 min  |  Volume: 18,900 lbs  |  Cals: 520     │
│  ├─ Deadlift (conv)         [455x3, 475x2, 495x1]         🏆   │
│  ├─ Bent Barbell Row        [315x6, 315x5, 315x4]             │
│  ├─ Pull-ups (BW+50)        [4x5, 4x5, 4x4]                    │
│  └─ Barbell Curl            [155x6, 155x5, 155x4]              │
│                                                                   │
│  📅 Sat, Mar 21 — REST DAY                                      │
│  │ Active recovery: 45 min walk                                 │
│                                                                   │
│  📅 Fri, Mar 20 — LEGS (COMPLETED)                             │
│  ├─ Duration: 90 min  |  Volume: 22,100 lbs  |  Cals: 580     │
│  ├─ Barbell Squat          [405x5, 415x3, 425x2]               │
│  ├─ Leg Press              [900x8, 950x6, 1000x4]              │
│  ├─ Leg Curl               [200x8, 210x6, 220x4]               │
│  └─ Calf Raises            [500x12, 550x10, 600x8]             │
│                                                                   │
│  [← Previous Week]  [→ Next Week]                               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Page 4: Nutrition Breakdown

```
┌─────────────────────────────────────────────────────────────────┐
│  NUTRITION BREAKDOWN                              < Back         │
├─────────────────────────────────────────────────────────────────┤
│  Today: Mon, Mar 23                                              │
│                                                                   │
│  MACROS (Total: 2,180 cal)                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │        Protein: 182g (33.3%)  ✅ Under 185g target      │   │
│  │        ╱──────────╲                                      │   │
│  │       │  Carbs:    │  Protein                            │   │
│  │       │  245g      │    │                                │   │
│  │    Fat│  (44.9%)  │   182g                              │   │
│  │     73g│           │                                      │   │
│  │   (30.1%)╲─ ─ ─ ─╱ Carbs 245g                           │   │
│  │        │ Pie Chart │                                      │   │
│  │        ╲──────────╱                                      │   │
│  │                                                          │   │
│  │  [Pie chart visual with color zones]                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  MEAL TIMELINE                                                   │
│  ┌──────────────┬──────────┬──────────┬──────────┐             │
│  │ BREAKFAST    │ LUNCH    │ SNACK    │ DINNER   │             │
│  │ 08:00        │ 12:30    │ 16:00    │ 19:00    │             │
│  │              │          │          │          │             │
│  │ 550 cal      │ 750 cal  │ 200 cal  │ 680 cal  │             │
│  │ P: 45g       │ P: 65g   │ P: 25g   │ P: 47g   │             │
│  │              │          │          │          │             │
│  │ Oats, eggs,  │ Chicken, │ Protein  │ Salmon,  │             │
│  │ banana       │ rice,    │ shake    │ sweet    │             │
│  │              │ broccoli │          │ potato   │             │
│  └──────────────┴──────────┴──────────┴──────────┘             │
│                                                                   │
│  VS TARGET                                                       │
│  Calories:  2,180 / 2,250  (70 under ✅)                        │
│  Protein:   182g / 185g    (3g under, acceptable ✅)            │
│  Carbs:     245g / 270g    (25g under)                          │
│  Fat:       73g / 75g      (2g under ✅)                        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Page 5: Progress Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  PROGRESS DASHBOARD                               < Back         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  THE JOURNEY: 335 lbs → 180 lbs (Goal)                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │   │
│  │ 298.5 lbs  |  16.8% Complete  |  Remaining: 118.5 lbs  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  STARTING vs CURRENT COMPARISON                                 │
│  ┌──────────────────────┬──────────────────────┐               │
│  │ STARTING (Day 1)     │ CURRENT (Today)      │               │
│  ├──────────────────────┼──────────────────────┤               │
│  │ Weight: 335 lbs      │ Weight: 298.5 lbs    │               │
│  │ Muscle %: 29.0       │ Muscle %: 34.2       │               │
│  │ Fat %: 38.5          │ Fat %: 32.1          │               │
│  │ BMI: 33.5            │ BMI: 29.8            │               │
│  └──────────────────────┴──────────────────────┘               │
│                                                                   │
│  MUSCLE RETENTION SCORE: 88 / 100  🏆                           │
│  Muscle gained despite weight loss. You're doing it right.      │
│                                                                   │
│  KEY METRICS                                                     │
│  ├─ Total fat lost: ~13.2 lbs                                   │
│  ├─ Total muscle gained: ~2.1 lbs                               │
│  ├─ Average weekly loss: -2.3 lbs                               │
│  ├─ Days on plan: 45                                             │
│  ├─ Workouts completed: 38 / 42 planned                         │
│  ├─ Protein adherence: 91%                                      │
│  └─ Consistency score: 94%                                      │
│                                                                   │
│  MILESTONES 🎯                                                   │
│  ✅ 310 lbs (reached)   | 290 lbs (next)   | 270 lbs           │
│  ✅ 30% fat (reached)   | 28% fat (target) | 25% fat (lean)    │
│  ✅ 50 PRs this cycle   | 75 PRs (next)    | 100 PRs           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Color Palette

- **Background:** #1a1a1a (charcoal)
- **Cards:** #2d2d2d (slightly lighter)
- **Text:** #ffffff (white)
- **Accent (Primary):** #00ff41 (neon green) — for highlights, progress bars, success states
- **Accent (Secondary):** #ff6b6b (red) — for warnings, items needing attention
- **Accent (Info):** #4a9eff (blue) — for info boxes, neutral states
- **Charts:** Green gradient (#00ff41 → #00b300) for uptrends

## Responsive Breakpoints

- **Mobile (< 640px):** Single column, stacked cards, full-width charts
- **Tablet (640px - 1024px):** 2-column grid where applicable
- **Desktop (> 1024px):** Full dashboard layout, side-by-side comparisons

## Interactive Elements

- **Hover effects:** Cards lift slightly, accent color intensifies
- **Charts:** Tooltips on hover showing exact values
- **Date pickers:** Smooth transitions between days/weeks
- **API status:** Real-time indicators (green = synced, yellow = syncing, red = error)
- **Refresh button:** Manual sync option in header
