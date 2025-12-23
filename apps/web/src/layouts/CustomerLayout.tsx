import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Plus, 
  Clock, 
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/logo.jpg'
import brandname from '../assets/brandname.jpg'

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
    <div className="min-h-screen bg-surface-100">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md overflow-hidden border border-surface-200">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <img src={brandname} alt="Brand Name" className="h-6 w-auto object-contain hidden sm:block" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 text-surface-600 hover:text-surface-900 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">John D.</span>
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-surface-600 hover:text-surface-900"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-200 bg-white">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-100 hover:text-surface-900 transition-all">
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
