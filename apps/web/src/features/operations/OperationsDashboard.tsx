import { Link } from 'react-router-dom'
import { 
  PhoneCall, 
  Users, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Timer
} from 'lucide-react'

const metrics = [
  { 
    label: 'Active Calls', 
    value: '24', 
    change: '+3', 
    trend: 'up',
    icon: PhoneCall,
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  { 
    label: 'In Queue', 
    value: '7', 
    change: '-2', 
    trend: 'down',
    icon: Clock,
    color: 'text-warning-600',
    bgColor: 'bg-warning-50',
  },
  { 
    label: 'Available Techs', 
    value: '12', 
    change: '+1', 
    trend: 'up',
    icon: Users,
    color: 'text-success-600',
    bgColor: 'bg-success-50',
  },
  { 
    label: 'Escalations', 
    value: '3', 
    change: '+1', 
    trend: 'up',
    icon: AlertTriangle,
    color: 'text-accent-600',
    bgColor: 'bg-accent-50',
  },
]

const recentCalls = [
  { id: 'CALL-4521', customer: 'John Davis', device: 'iPhone 14', status: 'in_progress', tech: 'Mike J.', eta: '15 min' },
  { id: 'CALL-4520', customer: 'Sarah Lee', device: 'MacBook Pro', status: 'assigned', tech: 'Alex W.', eta: '45 min' },
  { id: 'CALL-4519', customer: 'Tom Wilson', device: 'Samsung TV', status: 'pending', tech: '-', eta: '-' },
  { id: 'CALL-4518', customer: 'Emma Brown', device: 'iPad Air', status: 'in_progress', tech: 'Lisa K.', eta: '30 min' },
]

const topTechs = [
  { name: 'Mike Johnson', jobs: 8, rating: 4.9, status: 'busy' },
  { name: 'Sarah Chen', jobs: 7, rating: 4.8, status: 'available' },
  { name: 'Alex Wong', jobs: 6, rating: 4.9, status: 'available' },
  { name: 'Lisa Kim', jobs: 5, rating: 4.7, status: 'busy' },
]

const statusConfig = {
  pending: { label: 'Pending', class: 'badge-warning' },
  assigned: { label: 'Assigned', class: 'badge-primary' },
  in_progress: { label: 'In Progress', class: 'badge-success' },
}

export function OperationsDashboard() {
  return (
    <div className="p-6 lg:p-10 bg-surface-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-surface-900 mb-1">
            Operations Dashboard
          </h1>
          <p className="text-surface-500">
            Real-time overview of all repair operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge-success">
            <span className="w-2 h-2 rounded-full bg-success-600 mr-2 animate-pulse" />
            Live
          </span>
          <span className="text-surface-400 text-sm">
            Updated: Just now
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend === 'up' ? 'text-success-600' : 'text-accent-600'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {metric.change}
              </div>
            </div>
            <p className="text-3xl font-display font-bold text-surface-900">{metric.value}</p>
            <p className="text-sm text-surface-500 mt-1">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="p-4 border-b border-surface-200">
            <h2 className="text-lg font-display font-semibold text-surface-900">Live Map</h2>
          </div>
          <div className="h-80 bg-gradient-to-br from-surface-100 to-surface-200 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary-400 mx-auto mb-3" />
                <p className="text-surface-600 font-medium">Live Map View</p>
                <p className="text-sm text-surface-400">Technicians & Active Calls</p>
              </div>
            </div>
            {/* Mock markers */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-success-500 border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-primary-500 border-2 border-white shadow-lg" />
            <div className="absolute top-2/3 left-1/4 w-4 h-4 rounded-full bg-warning-500 border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-success-500 border-2 border-white shadow-lg" />
          </div>
          <div className="p-4 flex items-center justify-between bg-surface-50 border-t border-surface-200">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success-500" />
                <span className="text-sm text-surface-500">Available (12)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="text-sm text-surface-500">Busy (8)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning-500" />
                <span className="text-sm text-surface-500">En Route (5)</span>
              </div>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              Expand Map
            </button>
          </div>
        </div>

        {/* Top Technicians */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-surface-900">Top Technicians</h2>
            <Link to="/operations/technicians" className="text-sm text-primary-600 hover:text-primary-700">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {topTechs.map((tech, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-white">
                    {tech.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-surface-900 truncate">{tech.name}</p>
                  <p className="text-sm text-surface-500">{tech.jobs} jobs • ⭐ {tech.rating}</p>
                </div>
                <span className={`w-3 h-3 rounded-full ${
                  tech.status === 'available' ? 'bg-success-500' : 'bg-primary-500'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Calls */}
        <div className="lg:col-span-2 card">
          <div className="p-4 border-b border-surface-200 flex items-center justify-between">
            <h2 className="text-lg font-display font-semibold text-surface-900">Recent Calls</h2>
            <Link to="/operations/queue" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View Queue
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Call ID</th>
                  <th>Customer</th>
                  <th>Device</th>
                  <th>Status</th>
                  <th>Technician</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {recentCalls.map((call) => (
                  <tr key={call.id}>
                    <td className="font-mono text-primary-600">{call.id}</td>
                    <td className="text-surface-900">{call.customer}</td>
                    <td className="text-surface-500">{call.device}</td>
                    <td>
                      <span className={statusConfig[call.status as keyof typeof statusConfig].class}>
                        {statusConfig[call.status as keyof typeof statusConfig].label}
                      </span>
                    </td>
                    <td className="text-surface-600">{call.tech}</td>
                    <td className="text-success-600 font-medium">{call.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance */}
        <div className="card p-6">
          <h2 className="text-lg font-display font-semibold text-surface-900 mb-4">Today's Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-surface-500">Avg Response Time</span>
                <span className="text-success-600 font-medium">24 min</span>
              </div>
              <div className="h-2 rounded-full bg-surface-200">
                <div className="h-full w-3/4 rounded-full bg-success-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-surface-500">First-Time Fix Rate</span>
                <span className="text-primary-600 font-medium">92%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-200">
                <div className="h-full w-[92%] rounded-full bg-primary-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-surface-500">Customer Satisfaction</span>
                <span className="text-amber-600 font-medium">4.8/5</span>
              </div>
              <div className="h-2 rounded-full bg-surface-200">
                <div className="h-full w-[96%] rounded-full bg-amber-500" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-surface-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <CheckCircle2 className="w-6 h-6 text-success-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-surface-900">47</p>
                <p className="text-xs text-surface-500">Completed</p>
              </div>
              <div className="text-center">
                <Timer className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-surface-900">31</p>
                <p className="text-xs text-surface-500">In Progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
