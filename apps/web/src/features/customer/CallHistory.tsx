import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Star, 
  ArrowRight,
  Smartphone,
  Laptop,
  Tv,
  Headphones,
  CheckCircle2,
  XCircle,
  Clock,
  Download
} from 'lucide-react'

const calls = [
  {
    id: 'CALL-2024-1200',
    device: 'Samsung Galaxy S23',
    deviceType: 'smartphone',
    issue: 'Water damage repair',
    status: 'completed',
    technician: 'Sarah Chen',
    completedAt: 'Dec 18, 2024',
    rating: 5,
    cost: '$189.00',
  },
  {
    id: 'CALL-2024-1180',
    device: 'Sony WH-1000XM5',
    deviceType: 'audio',
    issue: 'Left ear not working',
    status: 'completed',
    technician: 'Mike Johnson',
    completedAt: 'Dec 15, 2024',
    rating: 4,
    cost: '$75.00',
  },
  {
    id: 'CALL-2024-1150',
    device: 'MacBook Pro 14"',
    deviceType: 'laptop',
    issue: 'Keyboard replacement',
    status: 'completed',
    technician: 'Alex Wong',
    completedAt: 'Dec 10, 2024',
    rating: 5,
    cost: '$245.00',
  },
  {
    id: 'CALL-2024-1120',
    device: 'LG OLED C3',
    deviceType: 'tv',
    issue: 'Burn-in repair',
    status: 'cancelled',
    technician: '-',
    completedAt: 'Dec 5, 2024',
    rating: 0,
    cost: '-',
  },
  {
    id: 'CALL-2024-1090',
    device: 'iPhone 13',
    deviceType: 'smartphone',
    issue: 'Battery replacement',
    status: 'completed',
    technician: 'Mike Johnson',
    completedAt: 'Nov 28, 2024',
    rating: 5,
    cost: '$89.00',
  },
]

const deviceIcons = {
  smartphone: Smartphone,
  laptop: Laptop,
  tv: Tv,
  audio: Headphones,
}

const statusConfig = {
  completed: { label: 'Completed', icon: CheckCircle2, class: 'text-success-500' },
  cancelled: { label: 'Cancelled', icon: XCircle, class: 'text-surface-400' },
  pending: { label: 'Pending', icon: Clock, class: 'text-warning-500' },
}

export function CallHistory() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredCalls = calls.filter(call => {
    const matchesFilter = filter === 'all' || call.status === filter
    const matchesSearch = call.device.toLowerCase().includes(search.toLowerCase()) ||
                          call.id.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Call History
          </h1>
          <p className="text-surface-400">
            View and manage your past repair calls.
          </p>
        </div>
        <button className="btn-secondary">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
          <input 
            type="text" 
            className="input pl-11" 
            placeholder="Search by device or call ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-surface-500" />
          <div className="flex gap-1 bg-surface-800 rounded-lg p-1">
            {['all', 'completed', 'cancelled'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-primary-600 text-white'
                    : 'text-surface-400 hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calls List */}
      <div className="space-y-3">
        {filteredCalls.map((call) => {
          const DeviceIcon = deviceIcons[call.deviceType as keyof typeof deviceIcons]
          const status = statusConfig[call.status as keyof typeof statusConfig]
          
          return (
            <div key={call.id} className="card-hover p-5">
              <div className="flex items-center gap-5">
                {/* Device Icon */}
                <div className="w-14 h-14 rounded-xl bg-surface-700 flex items-center justify-center flex-shrink-0">
                  <DeviceIcon className="w-7 h-7 text-surface-300" />
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-white">{call.device}</h3>
                    <span className="font-mono text-xs text-surface-500">{call.id}</span>
                  </div>
                  <p className="text-sm text-surface-400">{call.issue}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-surface-500">{call.completedAt}</span>
                    {call.technician !== '-' && (
                      <span className="text-surface-400">by {call.technician}</span>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="hidden sm:flex flex-col items-end">
                  {call.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < call.rating ? 'text-yellow-500 fill-yellow-500' : 'text-surface-600'}`} 
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-surface-500 text-sm">No rating</span>
                  )}
                </div>

                {/* Status & Cost */}
                <div className="flex flex-col items-end gap-2">
                  <div className={`flex items-center gap-1.5 ${status.class}`}>
                    <status.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{status.label}</span>
                  </div>
                  <span className="text-lg font-semibold text-white">{call.cost}</span>
                </div>

                {/* Arrow */}
                <Link 
                  to={`/customer/track/${call.id}`}
                  className="p-2 text-surface-500 hover:text-primary-400 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredCalls.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-surface-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No calls found</h3>
          <p className="text-surface-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-700/50">
        <p className="text-sm text-surface-500">
          Showing {filteredCalls.length} of {calls.length} calls
        </p>
        <div className="flex gap-2">
          <button className="btn-ghost btn-sm" disabled>Previous</button>
          <button className="btn-ghost btn-sm">Next</button>
        </div>
      </div>
    </div>
  )
}



