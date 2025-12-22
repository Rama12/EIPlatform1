import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  User,
  Zap,
  LogOut,
  DollarSign
} from 'lucide-react'

const navItems = [
  { path: '/technician/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/technician/availability', label: 'Availability', icon: Calendar },
  { path: '/technician/profile', label: 'Profile', icon: User },
]

export function TechnicianLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-surface-900 border-r border-surface-700/50">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-surface-700/50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-display font-semibold text-white block">EI Platform</span>
            <span className="text-xs text-surface-500">Technician Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                ? 'nav-link-active'
                : 'nav-link'
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Earnings Card */}
        <div className="mx-3 mb-4 p-4 rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/30">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">This Week</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">$1,247.50</p>
          <p className="text-xs text-surface-400 mt-1">12 jobs completed</p>
        </div>

        {/* User */}
        <div className="p-4 border-t border-surface-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">MJ</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Mike Johnson</p>
              <p className="text-xs text-surface-500">Expert Technician</p>
            </div>
            <button className="p-2 text-surface-500 hover:text-white transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-surface-700/50 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-semibold text-white">Technician</span>
        </Link>
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2 rounded-lg transition-all ${
                location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                  ? 'bg-emerald-600/20 text-emerald-400'
                  : 'text-surface-400 hover:bg-surface-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:pt-0 pt-16">
        <Outlet />
      </main>
    </div>
  )
}



