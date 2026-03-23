# Fitness Dashboard - Data Schema

## API Data Models

### 1. Fitbod API (Workout Data)

**Single Workout:**
```json
{
  "id": "fitbod_workout_123",
  "date": "2026-03-23",
  "duration_minutes": 75,
  "exercises": [
    {
      "name": "Barbell Bench Press",
      "sets": 4,
      "reps": [6, 5, 4, 3],
      "weights": [315, 325, 335, 345],
      "volume_lbs": 5850,
      "is_pr": true,
      "estimated_calories": 120
    }
  ],
  "total_volume_lbs": 15240,
  "estimated_calories": 450,
  "muscle_groups": ["chest", "triceps", "shoulders"]
}
```

**Aggregated (Last 7 days):**
```json
{
  "workouts_completed": 5,
  "total_volume_lbs": 75000,
  "total_calories_burned": 2250,
  "muscle_groups_trained": ["chest", "back", "legs", "shoulders"],
  "prs_this_week": 3,
  "average_session_duration": 72
}
```

### 2. MyFitnessPal API (Nutrition Data)

**Daily Summary:**
```json
{
  "date": "2026-03-23",
  "calories": {
    "consumed": 2180,
    "goal": 2250,
    "deficit": 70
  },
  "macros": {
    "protein": {
      "consumed": 182,
      "goal": 185,
      "percentage": 33.3
    },
    "carbs": {
      "consumed": 245,
      "goal": 270,
      "percentage": 44.9
    },
    "fat": {
      "consumed": 73,
      "goal": 75,
      "percentage": 30.1
    }
  },
  "meals": [
    {
      "name": "Breakfast",
      "calories": 550,
      "protein": 45,
      "time": "08:00"
    },
    {
      "name": "Lunch",
      "calories": 750,
      "protein": 65,
      "time": "12:30"
    },
    {
      "name": "Snack",
      "calories": 200,
      "protein": 25,
      "time": "16:00"
    },
    {
      "name": "Dinner",
      "calories": 680,
      "protein": 47,
      "time": "19:00"
    }
  ]
}
```

**Weekly Aggregated:**
```json
{
  "week": "2026-03-17_to_2026-03-23",
  "average_daily_calories": 2195,
  "total_protein_days_hit_goal": 6,
  "consistency_score": 85,
  "calories_vs_target": -350,
  "protein_consistency": 95,
  "carb_average": 248,
  "fat_average": 72
}
```

### 3. Wyze Scale API (Body Composition)

**Daily Measurement:**
```json
{
  "date": "2026-03-23",
  "weight_lbs": 298.5,
  "muscle_percentage": 34.2,
  "fat_percentage": 32.1,
  "bmi": 29.8,
  "measurement_time": "09:15"
}
```

**Aggregated (All-time Progress):**
```json
{
  "starting_weight": 335,
  "current_weight": 298.5,
  "target_weight": 180,
  "weight_lost": 36.5,
  "progress_percentage": 16.8,
  "starting_fat_percentage": 38.5,
  "current_fat_percentage": 32.1,
  "starting_muscle_percentage": 29.0,
  "current_muscle_percentage": 34.2,
  "muscle_retention_score": 88,
  "trend_7_days": -2.3,
  "trend_30_days": -8.1,
  "weekly_weigh_ins": [
    { "date": "2026-03-16", "weight": 300.8 },
    { "date": "2026-03-23", "weight": 298.5 }
  ]
}
```

## Redux Store Shape

```json
{
  "fitness": {
    "today": {
      "calories_consumed": 2180,
      "calories_goal": 2250,
      "protein_consumed": 182,
      "protein_goal": 185,
      "workouts_completed": 1,
      "workouts_planned": 1,
      "daily_steps": 8500
    },
    "weekly": {
      "weight_trend": [],
      "calorie_deficit_vs_target": -350,
      "protein_consistency": 95,
      "volume_progression": {
        "week_1": 74200,
        "week_2": 75300,
        "week_3": 76100
      }
    },
    "workouts": {
      "last_7_days": [],
      "loading": false,
      "error": null
    },
    "nutrition": {
      "today": {},
      "weekly": {},
      "loading": false
    },
    "body_composition": {
      "current": {},
      "history": [],
      "muscle_retention_score": 88,
      "progress_to_goal": 16.8
    },
    "api_status": {
      "fitbod": "connected",
      "myfitnesspal": "connected",
      "wyze": "connected"
    }
  }
}
```

## API Integration Points

### Fitbod
- Endpoint: Get workouts (last 7 days)
- Update frequency: After each workout (real-time)
- Rate limit: 300 req/hour

### MyFitnessPal
- Endpoint: Daily summary, meal log
- Update frequency: Every 30 mins or on-demand
- Rate limit: 150 req/hour

### Wyze Scale
- Endpoint: Latest measurement + history
- Update frequency: Daily (after morning weigh-in)
- Rate limit: 60 req/hour

## Data Refresh Strategy
- On app load: Fetch all data
- Every 30 minutes: Refresh nutrition & workouts
- Once daily: Refresh weight (no need to hammer multiple times)
- On user action: Refresh on-demand
