import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users,
  ShieldCheck,
  Tag,
  Settings,
  Zap,
  LogOut,
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/users', label: 'User Management', icon: Users },
  { path: '/admin/verification', label: 'Verification', icon: ShieldCheck },
  { path: '/admin/skills', label: 'Skills & Categories', icon: Tag },
  { path: '/admin/config', label: 'System Config', icon: Settings },
]

export function AdminLayout() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Sidebar */}
      <aside className={`hidden lg:flex flex-col ${collapsed ? 'w-20' : 'w-64'} bg-surface-900 border-r border-surface-700/50 transition-all duration-300`}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-surface-700/50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-display font-semibold text-white block">EI Platform</span>
              <span className="text-xs text-surface-500">Admin Panel</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                location.pathname === item.path
                  ? 'bg-rose-600/20 text-rose-400 hover:bg-rose-600/30'
                  : 'text-surface-400 hover:bg-surface-800 hover:text-white'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && item.label}
            </Link>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="mx-3 mb-4 p-3 rounded-lg bg-surface-800 text-surface-400 hover:text-white hover:bg-surface-700 transition-all flex items-center justify-center"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-90' : '-rotate-90'}`} />
        </button>

        {/* User */}
        <div className="p-4 border-t border-surface-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-white">AD</span>
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Admin User</p>
                  <p className="text-xs text-surface-500">Super Admin</p>
                </div>
                <button className="p-2 text-surface-500 hover:text-white transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-surface-700/50 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-semibold text-white">Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2 rounded-lg transition-all ${
                location.pathname === item.path
                  ? 'bg-rose-600/20 text-rose-400'
                  : 'text-surface-400 hover:bg-surface-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:pt-0 pt-16 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}



