import { Link } from 'react-router-dom'

export default function Sidebar() {
  const navItems = [
    { label: 'Today', path: '/', icon: '📊' },
    { label: 'Weekly Trends', path: '/trends', icon: '📈' },
    { label: 'Workouts', path: '/workouts', icon: '🏋️' },
    { label: 'Nutrition', path: '/nutrition', icon: '🥗' },
    { label: 'Progress', path: '/progress', icon: '🎯' },
  ]

  return (
    <aside className="w-48 bg-gray-800 border-r border-gray-700 p-6">
      <nav className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors text-gray-300 hover:text-green-400"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <hr className="border-gray-700 my-8" />

      <div className="space-y-4">
        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-400 hover:text-green-400">
          ⚙️ Settings
        </Link>
        <Link to="/setup" className="block px-4 py-2 text-sm text-gray-400 hover:text-green-400">
          🔑 API Keys
        </Link>
      </div>
    </aside>
  )
}
