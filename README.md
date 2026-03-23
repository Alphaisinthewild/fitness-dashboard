# Fitness Dashboard

Real-time fitness tracking dashboard for Wolf's transformation plan. Integrates with **Fitbod**, **MyFitnessPal**, and **Wyze Scale** APIs to provide comprehensive insights into workouts, nutrition, and body composition.

## 🎯 Features

- **Today's Summary**: Real-time stats on calories, protein, workouts, and steps
- **Weekly Trends**: Weight progress, calorie deficit tracking, protein consistency, and training volume
- **Workout Logs**: Last 7 days of workouts with exercise breakdown and PRs
- **Nutrition Breakdown**: Macro tracking, meal timeline, and daily targets
- **Progress Dashboard**: Overall transformation progress, muscle retention score, and milestones

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite
- **State**: Zustand (lightweight state management)
- **Charts**: Recharts (interactive data visualization)
- **Styling**: Tailwind CSS (dark mode enabled)
- **HTTP**: Axios (API client)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- API keys from Fitbod, MyFitnessPal, and Wyze Scale

### Installation

```bash
# Clone the repo
git clone https://github.com/Alphaisinthewild/fitness-dashboard.git
cd fitness-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

The dashboard will open at `http://localhost:3000`

### Setup

1. On first load, you'll see the Setup page
2. Paste your API keys (stored locally, never sent externally)
3. Click "Save & Continue"
4. Dashboard will sync data and display your stats

## 📊 Data Schema

See `DATA_SCHEMA.md` for complete API data models and store structure.

## 🎨 UI Mockups

See `UI_MOCKUP.md` for detailed page layouts and design specifications.

## 📁 Project Structure

See `PROJECT_STRUCTURE.md` for full directory layout and development timeline.

## 🔧 API Integration

### Fitbod
- Workout logs, exercise data, volume tracking, PRs
- Updates: Real-time after each workout
- Rate limit: 300 req/hour

### MyFitnessPal  
- Daily nutrition, macros, meal timeline
- Updates: Every 30 minutes
- Rate limit: 150 req/hour

### Wyze Scale
- Weight, muscle %, fat %, BMI
- Updates: Once daily
- Rate limit: 60 req/hour

## 🛠️ Development

### Available Scripts

```bash
npm run dev       # Start dev server with HMR
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run test      # Run tests
```

### Folder Structure

```
src/
├── api/           # API wrapper functions
├── components/    # React components
├── hooks/         # Custom hooks
├── pages/         # Page components
├── store/         # Zustand store
├── utils/         # Helper functions
└── styles/        # CSS & Tailwind config
```

## 📱 Responsive Design

- Mobile-first approach
- Fully responsive across all screen sizes
- Touch-friendly on tablets and phones

## 🎯 Performance Goals

- Page load: < 2s
- First contentful paint: < 1s
- Smooth 60 FPS animations
- Optimized API calls (no cascading requests)

## 🚢 Deployment

### GitHub Pages
```bash
npm run build
# Commit and push - automatic deploy via Actions
```

### Vercel
Connected to GitHub repo - auto-deploys on push

## 📝 Notes

- API keys are stored in browser localStorage only
- All data is pulled client-side (no backend required)
- Dark mode with neon green accents (#00ff41)
- Mobile-responsive throughout

## 🤝 Contributing

This is a personal project for Wolf's fitness transformation. Feedback and improvements welcome during development.

## 📄 License

MIT

---

**Sprint Timeline**: Mar 23-28, 2026  
**Status**: 🚀 In Development  
**Next Checkpoint**: Wolf review at 12 PM EDT daily
