import { Link, useParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  Navigation, 
  Phone, 
  MessageCircle,
  Clock,
  MapPin,
  DollarSign,
  Smartphone,
  AlertCircle,
  CheckCircle2,
  User,
  FileText
} from 'lucide-react'

const jobDetails = {
  id: 'JOB-2024-4568',
  customer: {
    name: 'Emily Parker',
    phone: '+1 (555) 123-4567',
    initials: 'EP',
  },
  device: {
    type: 'MacBook Pro 16"',
    brand: 'Apple',
    model: 'MacBook Pro 16" 2023',
    issue: 'Battery not charging',
    description: 'The laptop shows it\'s plugged in but the battery percentage never increases. Tried different chargers with no luck. Started happening about a week ago.',
  },
  location: {
    address: '456 Oak Avenue, Apt 12B',
    city: 'San Francisco, CA 94108',
    distance: '1.2 km',
    estimatedTime: '8 min',
  },
  payout: {
    base: '$100.00',
    bonus: '$20.00',
    total: '$120.00',
  },
  status: 'pending',
  urgency: 'normal',
  scheduledAt: 'Today, 2:00 PM - 3:00 PM',
}

export function JobDetail() {
  const { jobId } = useParams()

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/technician/dashboard" className="inline-flex items-center gap-2 text-surface-400 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-display font-bold text-white">
                Job Details
              </h1>
              {jobDetails.urgency === 'urgent' && (
                <span className="badge-warning">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Urgent
                </span>
              )}
            </div>
            <p className="font-mono text-surface-500">{jobId}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-emerald-400">{jobDetails.payout.total}</p>
            <p className="text-sm text-surface-400">Estimated Payout</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Card */}
          <div className="card p-6">
            <h2 className="text-sm font-medium text-surface-400 mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Customer Information
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-lg font-semibold text-white">{jobDetails.customer.initials}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{jobDetails.customer.name}</h3>
                  <p className="text-surface-400">{jobDetails.customer.phone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary btn-sm">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
                <button className="btn-ghost btn-sm">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </button>
              </div>
            </div>
          </div>

          {/* Device Card */}
          <div className="card p-6">
            <h2 className="text-sm font-medium text-surface-400 mb-4 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Device Details
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-surface-500 mb-1">Brand</p>
                <p className="font-medium text-white">{jobDetails.device.brand}</p>
              </div>
              <div>
                <p className="text-xs text-surface-500 mb-1">Model</p>
                <p className="font-medium text-white">{jobDetails.device.model}</p>
              </div>
              <div>
                <p className="text-xs text-surface-500 mb-1">Issue Type</p>
                <p className="font-medium text-white">{jobDetails.device.issue}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-surface-500 mb-2">Customer Description</p>
              <p className="text-surface-300 text-sm leading-relaxed bg-surface-800/50 rounded-lg p-4">
                {jobDetails.device.description}
              </p>
            </div>
          </div>

          {/* Location Card */}
          <div className="card p-6">
            <h2 className="text-sm font-medium text-surface-400 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </h2>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1">
                <p className="font-medium text-white">{jobDetails.location.address}</p>
                <p className="text-surface-400">{jobDetails.location.city}</p>
              </div>
              <div className="text-right">
                <p className="text-primary-400 font-medium">{jobDetails.location.distance}</p>
                <p className="text-sm text-surface-500">~{jobDetails.location.estimatedTime} drive</p>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="h-48 rounded-xl bg-surface-700 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-surface-500 mx-auto mb-2" />
                <p className="text-surface-400">Map Preview</p>
              </div>
            </div>
            
            <button className="btn-primary w-full mt-4">
              <Navigation className="w-4 h-4" />
              Navigate to Location
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Schedule */}
          <div className="card p-6">
            <h3 className="text-sm font-medium text-surface-400 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Scheduled Time
            </h3>
            <p className="text-white font-medium">{jobDetails.scheduledAt}</p>
          </div>

          {/* Payout Breakdown */}
          <div className="card p-6">
            <h3 className="text-sm font-medium text-surface-400 mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Payout Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-surface-400">Base Rate</span>
                <span className="text-white">{jobDetails.payout.base}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-400">Distance Bonus</span>
                <span className="text-emerald-400">+{jobDetails.payout.bonus}</span>
              </div>
              <div className="border-t border-surface-700 pt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-white">Total</span>
                  <span className="font-bold text-emerald-400">{jobDetails.payout.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="btn-primary w-full btn-lg">
              <CheckCircle2 className="w-5 h-5" />
              Accept Job
            </button>
            <button className="btn-ghost w-full text-surface-400">
              Decline
            </button>
          </div>

          {/* Notes */}
          <div className="card p-6 bg-surface-800/30">
            <h3 className="text-sm font-medium text-surface-400 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Helpful Tips
            </h3>
            <ul className="text-sm text-surface-400 space-y-2">
              <li>• MacBook Pro battery issues often need SMC reset first</li>
              <li>• Check the MagSafe port for debris</li>
              <li>• Battery replacement requires pentalobe screwdriver</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}




