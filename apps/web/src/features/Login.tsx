import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  User, 
  Wrench, 
  LayoutDashboard, 
  Shield,
  LogIn
} from 'lucide-react'
import logo from '../assets/logo.jpg'
import brandname from '../assets/brandname.jpg'

const userTypes = [
  {
    id: 'customer',
    name: 'Customer',
    description: 'Request repairs and track service calls',
    icon: User,
    color: 'from-blue-500 to-cyan-400',
    path: '/customer/dashboard',
  },
  {
    id: 'tech',
    name: 'Technician',
    description: 'Manage jobs and update work logs',
    icon: Wrench,
    color: 'from-emerald-500 to-teal-400',
    path: '/technician/dashboard',
  },
  {
    id: 'ops',
    name: 'Operations',
    description: 'Monitor calls and manage technicians',
    icon: LayoutDashboard,
    color: 'from-violet-500 to-purple-400',
    path: '/operations/dashboard',
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access and configuration',
    icon: Shield,
    color: 'from-rose-500 to-orange-400',
    path: '/portal-selector',
  },
]

export function Login() {
  const [loginId, setLoginId] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmedId = loginId.trim().toLowerCase()
    const user = userTypes.find(u => u.id === trimmedId)

    if (user) {
      // Store the user type in session storage for logout functionality
      sessionStorage.setItem('userType', user.id)
      sessionStorage.setItem('userName', user.name)
      navigate(user.path)
    } else {
      setError('Invalid login ID. Please use: customer, tech, ops, or admin')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-surface-50 via-primary-50/30 to-surface-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjEyaDJ2NHptMC02aC0yVjZoMnY0em0wIDMwaC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHpNMjQgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWMTJoMnY0em0wLTZoLTJWNmgydjR6bTAgMzBoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Logo & Title */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-2xl bg-white shadow-lg shadow-primary-500/10 overflow-hidden">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex justify-center mb-4">
            <img src={brandname} alt="AIthertech" className="h-16 w-auto object-contain" />
          </div>
          <p className="text-xl text-surface-500">
            Electronics Repair Management System
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="card p-8">
            <h2 className="text-2xl font-display font-bold text-surface-900 mb-2 text-center">
              Sign In
            </h2>
            <p className="text-surface-500 text-center mb-6">
              Enter your login ID to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="loginId" className="block text-sm font-medium text-surface-700 mb-2">
                  Login ID
                </label>
                <input
                  id="loginId"
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Enter your login ID"
                  className="input-field w-full"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-error-600">
                    {error}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary w-full group">
                <LogIn className="w-5 h-5" />
                Sign In
              </button>
            </form>

            {/* Quick Reference */}
            <div className="mt-8 pt-8 border-t border-surface-200">
              <p className="text-xs text-surface-500 text-center mb-4 font-medium">
                Demo Login IDs:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setLoginId(type.id)}
                    className="flex items-center gap-2 p-3 rounded-lg border border-surface-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left group"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                      <type.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-surface-900 group-hover:text-primary-700">
                        {type.name}
                      </p>
                      <p className="text-xs text-surface-500 font-mono">
                        {type.id}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
          <a href="/" className="text-sm text-surface-500 hover:text-primary-600 transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative text-center py-6 text-surface-500 text-sm">
        <p>Aithertech &copy; 2024. All rights reserved.</p>
      </footer>
    </div>
  )
}

