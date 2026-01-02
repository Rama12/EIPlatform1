import { Link } from 'react-router-dom'
import { 
  User, 
  Wrench, 
  LayoutDashboard, 
  Shield,
  ChevronRight
} from 'lucide-react'
import logo from '../assets/logo.jpg'
import { LogoutButton } from '../components/LogoutButton'

const portals = [
  {
    name: 'Customer Portal',
    description: 'Request repairs, track calls, and manage your service history',
    icon: User,
    path: '/customer',
    color: 'from-blue-500 to-cyan-400',
    bgGlow: 'group-hover:shadow-blue-500/20',
  },
  {
    name: 'Technician Portal',
    description: 'Manage jobs, update work logs, and track your earnings',
    icon: Wrench,
    path: '/technician/dashboard',
    color: 'from-emerald-500 to-teal-400',
    bgGlow: 'group-hover:shadow-emerald-500/20',
  },
  {
    name: 'Operations Dashboard',
    description: 'Monitor calls, assign technicians, manage escalations, and manage spares',
    icon: LayoutDashboard,
    path: '/operations/dashboard',
    color: 'from-violet-500 to-purple-400',
    bgGlow: 'group-hover:shadow-violet-500/20',
  },
  {
    name: 'Admin Panel',
    description: 'Manage users, verify technicians, view spares inventory and configure the system',
    icon: Shield,
    path: '/admin/dashboard',
    color: 'from-rose-500 to-orange-400',
    bgGlow: 'group-hover:shadow-rose-500/20',
  },
]

export function PortalSelector() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-surface-50 via-primary-50/30 to-surface-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjEyaDJ2NHptMC02aC0yVjZoMnY0em0wIDMwaC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHpNMjQgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWMTJoMnY0em0wLTZoLTJWNmgydjR6bTAgMzBoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Header with Logo, Title and Logout */}
        <div className="w-full max-w-4xl hidden md:flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg shadow-primary-500/10 overflow-hidden flex-shrink-0">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <p className="text-xl text-surface-500">
              Electronics Repair Platform (ERP)
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {portals.map((portal, index) => (
            <Link
              key={portal.path}
              to={portal.path}
              className={`group card-hover p-6 animate-slide-up ${portal.bgGlow} hover:shadow-xl`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center shadow-lg`}>
                  <portal.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-semibold text-surface-900 group-hover:text-primary-600 transition-colors">
                      {portal.name}
                    </h2>
                    <ChevronRight className="w-5 h-5 text-surface-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="mt-2 text-surface-500 text-sm leading-relaxed">
                    {portal.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mockup Indicator */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <span className="badge-primary text-sm">
            UI Mockup Preview
          </span>
          <p className="mt-3 text-surface-500 text-sm">
            Select a portal to explore the interface mockups
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative text-center py-6 text-surface-500 text-sm">
        <p>Aithertech &copy; 2026. All rights reserved.</p>
      </footer>
    </div>
  )
}




