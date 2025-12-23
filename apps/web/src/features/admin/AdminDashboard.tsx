import { 
  Users, 
  UserCheck, 
  PhoneCall, 
  DollarSign,
  TrendingUp,
  ArrowRight,
  Calendar,
  Activity,
  Shield
} from 'lucide-react'

const stats = [
  { label: 'Total Users', value: '2,847', change: '+124', icon: Users, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  { label: 'Active Technicians', value: '156', change: '+12', icon: UserCheck, color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
  { label: 'Calls This Month', value: '4,521', change: '+8.3%', icon: PhoneCall, color: 'text-violet-400', bgColor: 'bg-violet-500/20' },
  { label: 'Revenue', value: '$127K', change: '+15.2%', icon: DollarSign, color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
]

const recentActivity = [
  { action: 'New technician registered', user: 'David Park', time: '5 min ago', type: 'registration' },
  { action: 'Technician verified', user: 'Emma Wilson', time: '15 min ago', type: 'verification' },
  { action: 'User role updated', user: 'John Davis', time: '32 min ago', type: 'role_change' },
  { action: 'New skill category added', user: 'Admin', time: '1 hour ago', type: 'config' },
  { action: 'System config updated', user: 'Admin', time: '2 hours ago', type: 'config' },
]

const pendingApprovals = [
  { name: 'Michael Brown', type: 'Technician Verification', submitted: '2 days ago' },
  { name: 'Jennifer Lee', type: 'Technician Verification', submitted: '1 day ago' },
  { name: 'Robert Taylor', type: 'Skill Certification', submitted: '3 hours ago' },
]

export function AdminDashboard() {
  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Admin Dashboard
          </h1>
          <p className="text-surface-400">
            System overview and management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-surface-500" />
          <span className="text-surface-400 text-sm">December 2024</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-success-500 text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
            <p className="text-sm text-surface-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Platform Health */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-semibold text-white">Platform Health</h2>
            <span className="badge-success">All Systems Operational</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-surface-400 text-sm">API Response Time</span>
                <span className="text-success-500 text-sm font-medium">45ms</span>
              </div>
              <div className="h-2 rounded-full bg-surface-700">
                <div className="h-full w-1/4 rounded-full bg-success-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-surface-400 text-sm">Database Load</span>
                <span className="text-primary-400 text-sm font-medium">32%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-700">
                <div className="h-full w-1/3 rounded-full bg-primary-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-surface-400 text-sm">Memory Usage</span>
                <span className="text-amber-400 text-sm font-medium">67%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-700">
                <div className="h-full w-2/3 rounded-full bg-amber-500" />
              </div>
            </div>
          </div>
          
          {/* Uptime */}
          <div className="mt-6 pt-6 border-t border-surface-700/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-surface-400">30-Day Uptime</span>
              <span className="text-white font-semibold">99.97%</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 h-6 rounded-sm ${
                    i === 12 ? 'bg-amber-500' : 'bg-success-500'
                  }`} 
                  title={`Day ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-white">Pending Approvals</h2>
            <span className="badge-warning">{pendingApprovals.length}</span>
          </div>
          <div className="space-y-4">
            {pendingApprovals.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface-800/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{item.name}</p>
                  <p className="text-xs text-surface-400">{item.type}</p>
                </div>
                <span className="text-xs text-surface-500">{item.submitted}</span>
              </div>
            ))}
          </div>
          <button className="btn-primary w-full mt-4">
            Review All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-white">Recent Activity</h2>
            <button className="text-sm text-primary-400 hover:text-primary-300">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-surface-700/50 last:border-0">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'registration' ? 'bg-blue-500/20' :
                  activity.type === 'verification' ? 'bg-emerald-500/20' :
                  activity.type === 'role_change' ? 'bg-violet-500/20' :
                  'bg-surface-700'
                }`}>
                  <Activity className={`w-5 h-5 ${
                    activity.type === 'registration' ? 'text-blue-400' :
                    activity.type === 'verification' ? 'text-emerald-400' :
                    activity.type === 'role_change' ? 'text-violet-400' :
                    'text-surface-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-white">{activity.action}</p>
                  <p className="text-sm text-surface-400">{activity.user}</p>
                </div>
                <span className="text-sm text-surface-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-lg font-display font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full p-3 rounded-lg bg-surface-800/50 hover:bg-surface-700 transition-colors text-left flex items-center justify-between group">
              <span className="text-surface-300">Add New User</span>
              <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
            </button>
            <button className="w-full p-3 rounded-lg bg-surface-800/50 hover:bg-surface-700 transition-colors text-left flex items-center justify-between group">
              <span className="text-surface-300">System Configuration</span>
              <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
            </button>
            <button className="w-full p-3 rounded-lg bg-surface-800/50 hover:bg-surface-700 transition-colors text-left flex items-center justify-between group">
              <span className="text-surface-300">View Reports</span>
              <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
            </button>
            <button className="w-full p-3 rounded-lg bg-surface-800/50 hover:bg-surface-700 transition-colors text-left flex items-center justify-between group">
              <span className="text-surface-300">Manage Notifications</span>
              <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}




