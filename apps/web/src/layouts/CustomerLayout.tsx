import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Plus, 
  Clock, 
  User,
  Zap,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/customer/dashboard', label: 'Dashboard', icon: Home },
  { path: '/customer/new-call', label: 'New Repair', icon: Plus },
  { path: '/customer/history', label: 'History', icon: Clock },
]

export function CustomerLayout() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Show simplified layout for landing page
  if (location.pathname === '/customer') {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-semibold text-white hidden sm:block">
                EI Platform
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-primary-600/20 text-primary-400'
                      : 'text-surface-400 hover:bg-surface-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 text-surface-400 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">John D.</span>
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-surface-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-700/50 bg-surface-900/95 backdrop-blur-lg">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-primary-600/20 text-primary-400'
                      : 'text-surface-400 hover:bg-surface-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-surface-400 hover:bg-surface-800 hover:text-white transition-all">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  )
}



