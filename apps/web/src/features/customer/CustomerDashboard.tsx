import { Link } from 'react-router-dom'
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Smartphone,
  Laptop,
  Wrench,
  Star,
  MapPin
} from 'lucide-react'

const activeCalls = [
  {
    id: 'CALL-2024-1234',
    device: 'iPhone 14 Pro',
    issue: 'Cracked screen replacement',
    status: 'in_progress',
    technician: 'Mike Johnson',
    eta: '15 min',
    icon: Smartphone,
  },
  {
    id: 'CALL-2024-1235',
    device: 'MacBook Pro 16"',
    issue: 'Battery not charging',
    status: 'assigned',
    technician: 'Sarah Chen',
    eta: '2 hrs',
    icon: Laptop,
  },
]

const recentHistory = [
  {
    id: 'CALL-2024-1200',
    device: 'Samsung Galaxy S23',
    issue: 'Water damage repair',
    completedAt: '2 days ago',
    rating: 5,
    cost: '$189.00',
  },
  {
    id: 'CALL-2024-1180',
    device: 'Sony WH-1000XM5',
    issue: 'Left ear not working',
    completedAt: '1 week ago',
    rating: 4,
    cost: '$75.00',
  },
]

const statusConfig = {
  pending: { label: 'Pending', class: 'badge-warning' },
  assigned: { label: 'Assigned', class: 'badge-primary' },
  in_progress: { label: 'In Progress', class: 'badge-success' },
  completed: { label: 'Completed', class: 'badge-neutral' },
}

export function CustomerDashboard() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Welcome back, John
          </h1>
          <p className="text-surface-400">
            Here's what's happening with your repair calls.
          </p>
        </div>
        <Link to="/customer/new-call" className="btn-primary">
          <Plus className="w-5 h-5" />
          New Repair Call
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary-600/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary-400" />
            </div>
            <span className="text-surface-400 text-sm">Active Calls</span>
          </div>
          <p className="text-3xl font-display font-bold text-white">2</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success-500" />
            </div>
            <span className="text-surface-400 text-sm">Completed</span>
          </div>
          <p className="text-3xl font-display font-bold text-white">12</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-warning-500/20 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-warning-500" />
            </div>
            <span className="text-surface-400 text-sm">Total Spent</span>
          </div>
          <p className="text-3xl font-display font-bold text-white">$847</p>
        </div>
      </div>

      {/* Active Calls */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-semibold text-white">Active Calls</h2>
          <span className="badge-primary">
            <AlertCircle className="w-3 h-3 mr-1" />
            2 Active
          </span>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-4">
          {activeCalls.map((call) => (
            <Link 
              key={call.id} 
              to={`/customer/track/${call.id}`}
              className="card-hover p-5 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-700 flex items-center justify-center flex-shrink-0">
                  <call.icon className="w-6 h-6 text-surface-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white truncate">{call.device}</h3>
                    <span className={statusConfig[call.status as keyof typeof statusConfig].class}>
                      {statusConfig[call.status as keyof typeof statusConfig].label}
                    </span>
                  </div>
                  <p className="text-sm text-surface-400 mb-3">{call.issue}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Wrench className="w-4 h-4 text-surface-500" />
                      <span className="text-surface-300">{call.technician}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-success-500" />
                      <span className="text-success-500 font-medium">ETA: {call.eta}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-surface-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent History */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-semibold text-white">Recent History</h2>
          <Link to="/customer/history" className="text-sm text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Call ID</th>
                <th>Device</th>
                <th>Issue</th>
                <th>Completed</th>
                <th>Rating</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {recentHistory.map((call) => (
                <tr key={call.id}>
                  <td className="font-mono text-primary-400">{call.id}</td>
                  <td className="font-medium">{call.device}</td>
                  <td className="text-surface-400">{call.issue}</td>
                  <td className="text-surface-400">{call.completedAt}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < call.rating ? 'text-yellow-500 fill-yellow-500' : 'text-surface-600'}`} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="font-medium text-white">{call.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}




