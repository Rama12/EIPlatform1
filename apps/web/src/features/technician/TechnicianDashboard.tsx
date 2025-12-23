import { Link } from 'react-router-dom'
import { 
  Navigation, 
  Clock, 
  DollarSign,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Laptop
} from 'lucide-react'

const activeJob = {
  id: 'JOB-2024-4567',
  customer: 'John Davis',
  device: 'iPhone 14 Pro',
  issue: 'Cracked screen replacement',
  address: '123 Main Street, San Francisco, CA',
  status: 'in_progress',
  startedAt: '10:30 AM',
  estimatedCompletion: '11:30 AM',
}

const nearbyJobs = [
  {
    id: 'JOB-2024-4568',
    device: 'MacBook Pro 16"',
    issue: 'Battery not charging',
    distance: '1.2 km',
    payout: '$120',
    urgency: 'normal',
    icon: Laptop,
  },
  {
    id: 'JOB-2024-4569',
    device: 'Samsung Galaxy S24',
    issue: 'Screen flickering',
    distance: '2.5 km',
    payout: '$85',
    urgency: 'urgent',
    icon: Smartphone,
  },
  {
    id: 'JOB-2024-4570',
    device: 'iPhone 15',
    issue: 'Battery replacement',
    distance: '3.1 km',
    payout: '$65',
    urgency: 'normal',
    icon: Smartphone,
  },
]

export function TechnicianDashboard() {
  return (
    <div className="p-6 lg:p-10 bg-surface-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-surface-900 mb-1">
            Dashboard
          </h1>
          <p className="text-surface-500">
            Monday, December 23, 2024
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge-success px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-success-600 mr-2" />
            Available
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        <div className="stat-card bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span className="text-surface-600 text-sm">Today's Earnings</span>
          </div>
          <p className="text-2xl font-display font-bold text-surface-900">$285.00</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-success-600" />
            <span className="text-surface-500 text-sm">Jobs Today</span>
          </div>
          <p className="text-2xl font-display font-bold text-surface-900">4</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-surface-500 text-sm">Rating</span>
          </div>
          <p className="text-2xl font-display font-bold text-surface-900">4.9</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-primary-600" />
            <span className="text-surface-500 text-sm">Avg Time</span>
          </div>
          <p className="text-2xl font-display font-bold text-surface-900">47m</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Job */}
        <section>
          <h2 className="text-xl font-display font-semibold text-surface-900 mb-4">
            Active Job
          </h2>
          <div className="card p-6 bg-gradient-to-br from-primary-50 to-white border-primary-200">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-success">In Progress</span>
              <span className="font-mono text-sm text-surface-400">{activeJob.id}</span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-surface-200 flex items-center justify-center">
                <span className="text-lg font-medium text-surface-700">JD</span>
              </div>
              <div>
                <h3 className="font-semibold text-surface-900">{activeJob.customer}</h3>
                <p className="text-sm text-surface-500">{activeJob.device}</p>
              </div>
            </div>

            <p className="text-surface-700 mb-4">{activeJob.issue}</p>

            <div className="flex items-start gap-2 text-sm text-surface-500 mb-6">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{activeJob.address}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-surface-200 mb-4">
              <div>
                <p className="text-xs text-surface-400">Started</p>
                <p className="font-medium text-surface-900">{activeJob.startedAt}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-surface-400">Duration</p>
                <p className="font-medium text-primary-600">32 min</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-surface-400">Est. Complete</p>
                <p className="font-medium text-surface-900">{activeJob.estimatedCompletion}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to={`/technician/job/${activeJob.id}/log`} className="btn-primary flex-1">
                Update Status
              </Link>
              <button className="btn-secondary">
                <Navigation className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Nearby Jobs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold text-surface-900">
              Available Jobs Nearby
            </h2>
            <span className="text-sm text-surface-400">3 available</span>
          </div>
          
          <div className="space-y-3">
            {nearbyJobs.map((job) => (
              <Link 
                key={job.id}
                to={`/technician/job/${job.id}`}
                className="card-hover p-4 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-100 flex items-center justify-center flex-shrink-0">
                  <job.icon className="w-6 h-6 text-surface-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-surface-900 truncate">{job.device}</h3>
                    {job.urgency === 'urgent' && (
                      <AlertCircle className="w-4 h-4 text-warning-600" />
                    )}
                  </div>
                  <p className="text-sm text-surface-500 truncate">{job.issue}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-emerald-600">{job.payout}</p>
                  <div className="flex items-center gap-1 text-sm text-surface-400">
                    <MapPin className="w-3 h-3" />
                    {job.distance}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-surface-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          <button className="btn-ghost w-full mt-4">
            View All Available Jobs
          </button>
        </section>
      </div>

      {/* Recent Completions */}
      <section className="mt-8">
        <h2 className="text-xl font-display font-semibold text-surface-900 mb-4">
          Today's Completions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { device: 'iPhone 13', issue: 'Battery', payout: '$65', time: '9:15 AM' },
            { device: 'iPad Pro', issue: 'Screen', payout: '$120', time: '8:30 AM' },
            { device: 'AirPods Pro', issue: 'No Sound', payout: '$45', time: '7:45 AM' },
          ].map((job, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-surface-900">{job.device}</span>
                <span className="text-emerald-600 font-medium">{job.payout}</span>
              </div>
              <p className="text-sm text-surface-500">{job.issue}</p>
              <p className="text-xs text-surface-400 mt-2">{job.time}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
