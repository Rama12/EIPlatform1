import { useState } from 'react'
import { 
  Search, 
  Filter, 
  MapPin, 
  Star,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Navigation
} from 'lucide-react'

const technicians = [
  {
    id: 1,
    name: 'Mike Johnson',
    initials: 'MJ',
    status: 'busy',
    currentJob: 'iPhone 14 Pro - Screen',
    location: 'Downtown SF',
    distance: '1.2 km',
    rating: 4.9,
    jobsToday: 5,
    skills: ['Apple', 'Samsung', 'Sony'],
    eta: '15 min remaining',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    initials: 'SC',
    status: 'available',
    currentJob: null,
    location: 'Mission District',
    distance: '2.5 km',
    rating: 4.8,
    jobsToday: 4,
    skills: ['MacBook', 'iPad', 'iPhone'],
    eta: null,
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 3,
    name: 'Alex Wong',
    initials: 'AW',
    status: 'en_route',
    currentJob: 'MacBook Pro - Battery',
    location: 'SOMA',
    distance: '0.8 km',
    rating: 4.9,
    jobsToday: 6,
    skills: ['MacBook', 'PC', 'Audio'],
    eta: '8 min to arrival',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 4,
    name: 'Lisa Kim',
    initials: 'LK',
    status: 'busy',
    currentJob: 'Samsung TV - Display',
    location: 'Pacific Heights',
    distance: '4.1 km',
    rating: 4.7,
    jobsToday: 3,
    skills: ['TV', 'Audio', 'Gaming'],
    eta: '45 min remaining',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 5,
    name: 'David Park',
    initials: 'DP',
    status: 'available',
    currentJob: null,
    location: 'Nob Hill',
    distance: '3.2 km',
    rating: 4.6,
    jobsToday: 2,
    skills: ['Samsung', 'LG', 'Sony'],
    eta: null,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 6,
    name: 'Emma Wilson',
    initials: 'EW',
    status: 'offline',
    currentJob: null,
    location: 'Last: Financial District',
    distance: '-',
    rating: 4.8,
    jobsToday: 0,
    skills: ['iPhone', 'iPad', 'Apple Watch'],
    eta: null,
    color: 'from-gray-500 to-gray-600',
  },
]

const statusConfig = {
  available: { label: 'Available', class: 'bg-success-500', dotClass: 'bg-success-500' },
  busy: { label: 'Busy', class: 'bg-primary-500', dotClass: 'bg-primary-500' },
  en_route: { label: 'En Route', class: 'bg-warning-500', dotClass: 'bg-warning-500' },
  offline: { label: 'Offline', class: 'bg-surface-500', dotClass: 'bg-surface-500' },
}

export function TechnicianGrid() {
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredTechs = technicians.filter(tech => 
    filter === 'all' || tech.status === filter
  )

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Technician Availability
          </h1>
          <p className="text-surface-400">
            {technicians.filter(t => t.status === 'available').length} available, {technicians.filter(t => t.status === 'busy').length} busy, {technicians.filter(t => t.status === 'en_route').length} en route
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
          <input 
            type="text" 
            className="input pl-11" 
            placeholder="Search technicians..."
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-surface-800 rounded-lg p-1">
            {['all', 'available', 'busy', 'en_route', 'offline'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-violet-600 text-white'
                    : 'text-surface-400 hover:text-white'
                }`}
              >
                {f === 'en_route' ? 'En Route' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTechs.map((tech) => (
          <div 
            key={tech.id} 
            className={`card p-5 ${tech.status === 'offline' ? 'opacity-60' : ''}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${tech.color} flex items-center justify-center`}>
                  <span className="text-sm font-semibold text-white">{tech.initials}</span>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ${statusConfig[tech.status as keyof typeof statusConfig].dotClass} border-2 border-surface-800`} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{tech.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-surface-300">{tech.rating}</span>
                    <span className="text-surface-600">•</span>
                    <span className="text-surface-400">{tech.jobsToday} jobs</span>
                  </div>
                </div>
              </div>
              <button className="p-1.5 text-surface-500 hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Status */}
            <div className={`rounded-lg p-3 mb-4 ${
              tech.status === 'available' 
                ? 'bg-success-500/10 border border-success-500/30' 
                : tech.status === 'offline'
                  ? 'bg-surface-700/50'
                  : 'bg-surface-800/50'
            }`}>
              {tech.currentJob ? (
                <>
                  <p className="text-sm font-medium text-white mb-1">{tech.currentJob}</p>
                  <div className="flex items-center gap-1 text-xs text-surface-400">
                    <Clock className="w-3 h-3" />
                    {tech.eta}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  {tech.status === 'available' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-success-500" />
                      <span className="text-sm text-success-400">Ready for assignment</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-surface-500" />
                      <span className="text-sm text-surface-400">Currently offline</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-surface-400 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{tech.location}</span>
              {tech.distance !== '-' && (
                <>
                  <span className="text-surface-600">•</span>
                  <span>{tech.distance}</span>
                </>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 mb-4">
              {tech.skills.map((skill) => (
                <span key={skill} className="px-2 py-0.5 rounded text-xs bg-surface-700 text-surface-300">
                  {skill}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="btn-secondary btn-sm flex-1">
                <Phone className="w-4 h-4" />
                Call
              </button>
              <button className="btn-ghost btn-sm flex-1">
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
              {tech.status !== 'offline' && (
                <button className="btn-ghost btn-sm">
                  <Navigation className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTechs.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-surface-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No technicians found</h3>
          <p className="text-surface-400">Try adjusting your filter criteria.</p>
        </div>
      )}
    </div>
  )
}



