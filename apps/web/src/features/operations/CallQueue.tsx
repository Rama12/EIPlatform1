import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Clock, 
  MapPin,
  User,
  Smartphone,
  AlertTriangle,
  ArrowRight,
  MoreVertical,
  UserPlus,
  RefreshCw
} from 'lucide-react'

const queuedCalls = [
  {
    id: 'CALL-4523',
    customer: { name: 'Robert Chen', phone: '+1 555-0123', initials: 'RC' },
    device: 'iPhone 15 Pro Max',
    issue: 'Face ID not working',
    priority: 'high',
    waitTime: '15 min',
    location: 'Downtown SF',
    distance: '1.2 km',
    matchedTechs: 4,
  },
  {
    id: 'CALL-4522',
    customer: { name: 'Amy Wilson', phone: '+1 555-0124', initials: 'AW' },
    device: 'MacBook Air M2',
    issue: 'Screen flickering',
    priority: 'normal',
    waitTime: '22 min',
    location: 'Mission District',
    distance: '3.5 km',
    matchedTechs: 3,
  },
  {
    id: 'CALL-4521',
    customer: { name: 'James Park', phone: '+1 555-0125', initials: 'JP' },
    device: 'Samsung Galaxy S24',
    issue: 'Battery drain',
    priority: 'normal',
    waitTime: '28 min',
    location: 'SOMA',
    distance: '2.1 km',
    matchedTechs: 5,
  },
  {
    id: 'CALL-4520',
    customer: { name: 'Maria Garcia', phone: '+1 555-0126', initials: 'MG' },
    device: 'iPad Pro 12.9"',
    issue: 'Cracked screen',
    priority: 'urgent',
    waitTime: '35 min',
    location: 'Nob Hill',
    distance: '4.2 km',
    matchedTechs: 2,
  },
  {
    id: 'CALL-4519',
    customer: { name: 'David Kim', phone: '+1 555-0127', initials: 'DK' },
    device: 'Sony WH-1000XM5',
    issue: 'No audio output',
    priority: 'low',
    waitTime: '42 min',
    location: 'Pacific Heights',
    distance: '5.8 km',
    matchedTechs: 3,
  },
]

const availableTechs = [
  { name: 'Mike Johnson', distance: '0.8 km', rating: 4.9, jobs: 3, skills: ['iPhone', 'iPad'] },
  { name: 'Sarah Chen', distance: '1.5 km', rating: 4.8, jobs: 2, skills: ['MacBook', 'iPhone'] },
  { name: 'Alex Wong', distance: '2.2 km', rating: 4.9, jobs: 4, skills: ['Samsung', 'Sony'] },
]

const priorityConfig = {
  urgent: { label: 'Urgent', class: 'badge-accent' },
  high: { label: 'High', class: 'badge-warning' },
  normal: { label: 'Normal', class: 'badge-primary' },
  low: { label: 'Low', class: 'badge-neutral' },
}

export function CallQueue() {
  const [selectedCall, setSelectedCall] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Call Queue
          </h1>
          <p className="text-surface-400">
            {queuedCalls.length} calls waiting for assignment
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost btn-sm">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="btn-primary">
            Auto-Assign All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
          <input 
            type="text" 
            className="input pl-11" 
            placeholder="Search calls..."
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-surface-500" />
          <div className="flex gap-1 bg-surface-800 rounded-lg p-1">
            {['all', 'urgent', 'high', 'normal'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-violet-600 text-white'
                    : 'text-surface-400 hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Queue List */}
        <div className="lg:col-span-2 space-y-3">
          {queuedCalls.map((call) => (
            <div 
              key={call.id}
              className={`card p-5 cursor-pointer transition-all ${
                selectedCall === call.id 
                  ? 'ring-2 ring-primary-500 bg-primary-900/10' 
                  : 'hover:bg-surface-800/80'
              }`}
              onClick={() => setSelectedCall(call.id)}
            >
              <div className="flex items-start gap-4">
                {/* Customer Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-white">{call.customer.initials}</span>
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-white">{call.customer.name}</h3>
                    <span className={priorityConfig[call.priority as keyof typeof priorityConfig].class}>
                      {call.priority === 'urgent' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {priorityConfig[call.priority as keyof typeof priorityConfig].label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-surface-400 mb-2">
                    <Smartphone className="w-4 h-4" />
                    <span>{call.device}</span>
                    <span className="text-surface-600">•</span>
                    <span>{call.issue}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-surface-500">
                      <MapPin className="w-3 h-3" />
                      {call.location}
                    </div>
                    <div className="flex items-center gap-1 text-surface-500">
                      <User className="w-3 h-3" />
                      {call.matchedTechs} techs nearby
                    </div>
                  </div>
                </div>

                {/* Wait Time & Actions */}
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1 text-warning-500 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{call.waitTime}</span>
                  </div>
                  <span className="font-mono text-xs text-surface-500">{call.id}</span>
                </div>

                <button className="p-2 text-surface-500 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Assignment Panel */}
        <div className="space-y-6">
          {selectedCall ? (
            <>
              {/* Selected Call Summary */}
              <div className="card p-6">
                <h3 className="text-sm font-medium text-surface-400 mb-4">Selected Call</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-surface-400">Call ID</span>
                    <span className="font-mono text-primary-400">{selectedCall}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-400">Wait Time</span>
                    <span className="text-warning-500 font-medium">
                      {queuedCalls.find(c => c.id === selectedCall)?.waitTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-400">Distance</span>
                    <span className="text-white">
                      {queuedCalls.find(c => c.id === selectedCall)?.distance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Available Technicians */}
              <div className="card p-6">
                <h3 className="text-sm font-medium text-surface-400 mb-4">
                  Assign Technician
                </h3>
                <div className="space-y-3">
                  {availableTechs.map((tech, i) => (
                    <button 
                      key={i}
                      className="w-full p-3 rounded-xl bg-surface-800/50 hover:bg-surface-700 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-white">
                            {tech.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white">{tech.name}</p>
                          <p className="text-xs text-surface-400">
                            {tech.distance} away • ⭐ {tech.rating} • {tech.jobs} jobs today
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
                
                <button className="btn-primary w-full mt-4">
                  <UserPlus className="w-4 h-4" />
                  Assign Selected
                </button>
              </div>
            </>
          ) : (
            <div className="card p-8 text-center">
              <User className="w-12 h-12 text-surface-600 mx-auto mb-3" />
              <h3 className="font-medium text-white mb-1">Select a Call</h3>
              <p className="text-sm text-surface-400">
                Click on a call to view details and assign a technician
              </p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="card p-6">
            <h3 className="text-sm font-medium text-surface-400 mb-4">Queue Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-display font-bold text-white">18m</p>
                <p className="text-xs text-surface-400">Avg Wait</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-success-400">12</p>
                <p className="text-xs text-surface-400">Available Techs</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-warning-500">2</p>
                <p className="text-xs text-surface-400">Urgent Calls</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-white">94%</p>
                <p className="text-xs text-surface-400">SLA Compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




