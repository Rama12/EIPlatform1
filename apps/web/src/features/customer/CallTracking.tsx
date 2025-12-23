import { Link, useParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  MessageCircle,
  Phone,
  Star,
  User,
  Wrench,
  Navigation,
  Package
} from 'lucide-react'

const timelineEvents = [
  { 
    time: '10:30 AM', 
    title: 'Call Created', 
    description: 'Repair request submitted',
    status: 'completed',
    icon: Package,
  },
  { 
    time: '10:35 AM', 
    title: 'Technician Assigned', 
    description: 'Mike Johnson accepted the job',
    status: 'completed',
    icon: User,
  },
  { 
    time: '10:45 AM', 
    title: 'En Route', 
    description: 'Technician is on the way',
    status: 'completed',
    icon: Navigation,
  },
  { 
    time: '11:00 AM', 
    title: 'Repair In Progress', 
    description: 'Work has started',
    status: 'current',
    icon: Wrench,
  },
  { 
    time: 'Estimated', 
    title: 'Completed', 
    description: '~30 minutes remaining',
    status: 'pending',
    icon: CheckCircle2,
  },
]

export function CallTracking() {
  const { callId } = useParams()

  return (
    <div className="min-h-screen py-8 px-6 lg:px-10 bg-surface-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/customer/dashboard" className="inline-flex items-center gap-2 text-surface-500 hover:text-surface-900 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-surface-900">
                Track Your Repair
              </h1>
              <p className="text-surface-500 mt-1 font-mono">{callId}</p>
            </div>
            <span className="badge-success text-sm px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-success-600 mr-2 animate-pulse-subtle" />
              In Progress
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="card overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-surface-100 to-surface-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                    <p className="text-surface-600">Live Map View</p>
                    <p className="text-sm text-surface-400">Technician location tracking</p>
                  </div>
                </div>
                {/* ETA Badge */}
                <div className="absolute top-4 left-4 bg-white shadow-md rounded-xl px-4 py-2 border border-surface-200">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-success-600" />
                    <span className="text-sm font-medium text-surface-900">ETA: 15 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card p-6">
              <h2 className="text-lg font-display font-semibold text-surface-900 mb-6">
                Status Timeline
              </h2>
              <div className="relative">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex gap-4 pb-8 last:pb-0">
                    {/* Line */}
                    {index < timelineEvents.length - 1 && (
                      <div className={`absolute left-5 top-10 w-0.5 h-full -translate-x-1/2 ${
                        event.status === 'completed' ? 'bg-success-500' : 'bg-surface-200'
                      }`} style={{ height: 'calc(100% - 40px)', top: `${index * 80 + 40}px` }} />
                    )}
                    
                    {/* Icon */}
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      event.status === 'completed' 
                        ? 'bg-success-600'
                        : event.status === 'current'
                          ? 'bg-primary-600 animate-pulse-subtle'
                          : 'bg-surface-200'
                    }`}>
                      <event.icon className={`w-5 h-5 ${
                        event.status === 'pending' ? 'text-surface-400' : 'text-white'
                      }`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${
                          event.status === 'pending' ? 'text-surface-400' : 'text-surface-900'
                        }`}>
                          {event.title}
                        </h3>
                        <span className="text-sm text-surface-400">{event.time}</span>
                      </div>
                      <p className="text-sm text-surface-500 mt-0.5">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technician Card */}
            <div className="card p-6">
              <h3 className="text-sm font-medium text-surface-500 mb-4">Your Technician</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <span className="text-xl font-semibold text-white">MJ</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-surface-900">Mike Johnson</h4>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                    <span className="text-sm text-surface-400 ml-1">(4.9)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary flex-1 btn-sm">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
                <button className="btn-primary flex-1 btn-sm">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </button>
              </div>
            </div>

            {/* Device Info */}
            <div className="card p-6">
              <h3 className="text-sm font-medium text-surface-500 mb-4">Device Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-surface-500">Device</span>
                  <span className="text-surface-900">iPhone 14 Pro</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Issue</span>
                  <span className="text-surface-900">Cracked Screen</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Priority</span>
                  <span className="text-warning-600 font-medium">Urgent</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="card p-6 bg-accent-50 border-accent-200">
              <h3 className="text-sm font-medium text-surface-600 mb-3">Need Help?</h3>
              <p className="text-sm text-surface-500 mb-4">
                Having issues with your repair? Contact support or cancel the call.
              </p>
              <button className="btn-ghost w-full text-accent-600 hover:bg-accent-100">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
