import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ListTodo,
  Users,
  AlertTriangle,
  Bell,
  Search
} from 'lucide-react'
import brandname from '../assets/brandname.jpg'
import { LogoutButton } from '../components/LogoutButton'

const navItems = [
  { path: '/operations/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/operations/queue', label: 'Call Queue', icon: ListTodo },
  { path: '/operations/technicians', label: 'Technicians', icon: Users },
  { path: '/operations/escalations', label: 'Escalations', icon: AlertTriangle },
]

export function OperationsLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-surface-100 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-surface-200">
        {/* Logo */}
        <Link to="/" className="h-16 flex items-center gap-3 px-6 border-b border-surface-200 hover:bg-surface-50 transition-colors">
          <div>
            <img src={brandname} alt="AIthertech" className="h-5 w-auto object-contain" />
            <span className="text-xs text-surface-500">Operations Center</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'nav-link-active' : 'nav-link'}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.label === 'Escalations' && (
                <span className="ml-auto w-5 h-5 rounded-full bg-accent-600 text-white text-xs flex items-center justify-center">
                  3
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Live Stats */}
        <div className="mx-3 mb-4 p-4 rounded-xl bg-surface-50 border border-surface-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-subtle" />
            <span className="text-xs font-medium text-surface-500">Live Status</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">Active Calls</span>
              <span className="font-medium text-surface-900">24</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">In Queue</span>
              <span className="font-medium text-warning-600">7</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">Available Techs</span>
              <span className="font-medium text-success-600">12</span>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="p-4 border-t border-surface-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">SC</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-900 truncate">Sarah Chen</p>
              <p className="text-xs text-surface-500">Operations Manager</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-surface-200 bg-white shadow-sm flex items-center justify-between px-6">
          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input 
              type="text" 
              placeholder="Search calls, technicians..." 
              className="input pl-10 py-2 text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-surface-500 hover:text-surface-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-500" />
            </button>
            <div className="lg:hidden flex items-center gap-2">
              {navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`p-2 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'bg-violet-50 text-violet-700'
                      : 'text-surface-500 hover:bg-surface-100 hover:text-surface-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
