import { 
  AlertTriangle, 
  Clock, 
  User,
  MessageCircle,
  Phone,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Smartphone
} from 'lucide-react'

const escalations = [
  {
    id: 'ESC-001',
    callId: 'CALL-4510',
    type: 'sla_breach',
    title: 'SLA Breach - Wait time exceeded',
    description: 'Customer has been waiting for 45 minutes. Maximum SLA is 30 minutes for high priority calls.',
    customer: { name: 'Robert Chen', phone: '+1 555-0123' },
    device: 'iPhone 15 Pro Max',
    priority: 'critical',
    createdAt: '15 minutes ago',
    status: 'open',
  },
  {
    id: 'ESC-002',
    callId: 'CALL-4508',
    type: 'customer_complaint',
    title: 'Customer Complaint - Technician No-Show',
    description: 'Technician failed to arrive within the scheduled window. Customer is upset and requesting a callback.',
    customer: { name: 'Amy Wilson', phone: '+1 555-0124' },
    device: 'MacBook Air M2',
    priority: 'high',
    createdAt: '32 minutes ago',
    status: 'in_progress',
  },
  {
    id: 'ESC-003',
    callId: 'CALL-4505',
    type: 'quality_issue',
    title: 'Quality Issue - Repeat Repair Request',
    description: 'Customer reports same issue recurring after previous repair. This is the second repair request for the same problem.',
    customer: { name: 'James Park', phone: '+1 555-0125' },
    device: 'Samsung Galaxy S24',
    priority: 'medium',
    createdAt: '1 hour ago',
    status: 'open',
  },
]

const priorityConfig = {
  critical: { label: 'Critical', class: 'bg-red-500', borderClass: 'border-red-500/30', bgClass: 'bg-red-500/10' },
  high: { label: 'High', class: 'bg-orange-500', borderClass: 'border-orange-500/30', bgClass: 'bg-orange-500/10' },
  medium: { label: 'Medium', class: 'bg-yellow-500', borderClass: 'border-yellow-500/30', bgClass: 'bg-yellow-500/10' },
}

const typeLabels = {
  sla_breach: 'SLA Breach',
  customer_complaint: 'Customer Complaint',
  quality_issue: 'Quality Issue',
}

export function Escalations() {
  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Escalations
          </h1>
          <p className="text-surface-400">
            {escalations.filter(e => e.status === 'open').length} open escalations requiring attention
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost btn-sm">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        <div className="stat-card bg-red-500/10 border border-red-500/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-sm text-surface-400">Critical</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">1</p>
        </div>
        <div className="stat-card bg-orange-500/10 border border-orange-500/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-surface-400">High</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">1</p>
        </div>
        <div className="stat-card bg-yellow-500/10 border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-surface-400">Medium</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">1</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-success-500" />
            <span className="text-sm text-surface-400">Resolved Today</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">7</p>
        </div>
      </div>

      {/* Escalation List */}
      <div className="space-y-4">
        {escalations.map((escalation) => {
          const priority = priorityConfig[escalation.priority as keyof typeof priorityConfig]
          
          return (
            <div 
              key={escalation.id} 
              className={`card p-6 border-l-4 ${priority.borderClass}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Main Content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${priority.bgClass} flex items-center justify-center`}>
                        <AlertTriangle className={`w-5 h-5`} style={{ color: priority.class.replace('bg-', '') }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`badge ${priority.class.replace('bg-', 'bg-')}/20 text-white border ${priority.borderClass}`}>
                            {priority.label}
                          </span>
                          <span className="badge-neutral">
                            {typeLabels[escalation.type as keyof typeof typeLabels]}
                          </span>
                        </div>
                        <h3 className="font-semibold text-white mt-1">{escalation.title}</h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs text-surface-500">{escalation.id}</span>
                      <p className="text-xs text-surface-400 mt-1">{escalation.createdAt}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-surface-300 text-sm mb-4">{escalation.description}</p>

                  {/* Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-surface-400">
                      <User className="w-4 h-4" />
                      {escalation.customer.name}
                    </div>
                    <div className="flex items-center gap-2 text-surface-400">
                      <Smartphone className="w-4 h-4" />
                      {escalation.device}
                    </div>
                    <div className="flex items-center gap-2 text-primary-400">
                      <span className="font-mono">{escalation.callId}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2 lg:w-48">
                  <button className="btn-primary flex-1 lg:w-full">
                    <CheckCircle2 className="w-4 h-4" />
                    Resolve
                  </button>
                  <button className="btn-secondary flex-1 lg:w-full">
                    <Phone className="w-4 h-4" />
                    Call Customer
                  </button>
                  <button className="btn-ghost flex-1 lg:w-full">
                    <ArrowRight className="w-4 h-4" />
                    View Call
                  </button>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-700/50">
                <div className="flex items-center gap-2">
                  {escalation.status === 'open' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-sm text-red-400">Open - Requires Attention</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-sm text-yellow-400">In Progress</span>
                    </>
                  )}
                </div>
                <button className="text-sm text-surface-400 hover:text-white transition-colors flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  Add Note
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State (when no escalations) */}
      {escalations.length === 0 && (
        <div className="text-center py-16 card">
          <CheckCircle2 className="w-16 h-16 text-success-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">All Clear!</h3>
          <p className="text-surface-400">No escalations at the moment. Great job!</p>
        </div>
      )}
    </div>
  )
}



