import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Camera,
  FileText,
  Package,
  DollarSign,
  Send,
  Plus,
  X
} from 'lucide-react'

const statusOptions = [
  { id: 'arrived', label: 'Arrived at Location', color: 'bg-blue-500' },
  { id: 'diagnosing', label: 'Diagnosing Issue', color: 'bg-violet-500' },
  { id: 'repairing', label: 'Repair In Progress', color: 'bg-amber-500' },
  { id: 'testing', label: 'Testing', color: 'bg-cyan-500' },
  { id: 'completed', label: 'Completed', color: 'bg-emerald-500' },
]

const existingLogs = [
  { time: '10:30 AM', status: 'arrived', note: 'Met with customer, reviewed the issue' },
  { time: '10:35 AM', status: 'diagnosing', note: 'Inspecting charging port and battery health' },
]

export function WorkLog() {
  const { jobId } = useParams()
  const [currentStatus, setCurrentStatus] = useState('diagnosing')
  const [note, setNote] = useState('')
  const [partsUsed, setPartsUsed] = useState<string[]>([])
  const [newPart, setNewPart] = useState('')

  const addPart = () => {
    if (newPart.trim()) {
      setPartsUsed([...partsUsed, newPart.trim()])
      setNewPart('')
    }
  }

  const removePart = (index: number) => {
    setPartsUsed(partsUsed.filter((_, i) => i !== index))
  }

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link to={`/technician/job/${jobId}`} className="inline-flex items-center gap-2 text-surface-400 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Job
        </Link>
        <h1 className="text-3xl font-display font-bold text-white">
          Work Log
        </h1>
        <p className="text-surface-400 mt-1 font-mono">{jobId}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Status Update */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-400" />
              Update Status
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setCurrentStatus(status.id)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    currentStatus === status.id
                      ? 'border-primary-500 bg-primary-600/10'
                      : 'border-surface-700 hover:border-surface-600'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${status.color} mb-2`} />
                  <span className={`text-sm font-medium ${
                    currentStatus === status.id ? 'text-white' : 'text-surface-300'
                  }`}>
                    {status.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-400" />
              Add Notes
            </h2>
            <textarea 
              className="input min-h-32 resize-none"
              placeholder="Describe what you're working on, any issues found, etc..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Parts Used */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary-400" />
              Parts Used
            </h2>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                className="input flex-1"
                placeholder="Add part name..."
                value={newPart}
                onChange={(e) => setNewPart(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPart()}
              />
              <button className="btn-primary" onClick={addPart}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {partsUsed.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {partsUsed.map((part, i) => (
                  <span key={i} className="badge-neutral flex items-center gap-2 px-3 py-1.5">
                    {part}
                    <button onClick={() => removePart(i)} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-surface-500 text-sm">No parts added yet</p>
            )}
          </div>

          {/* Photos */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary-400" />
              Add Photos
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <button className="aspect-square rounded-xl border-2 border-dashed border-surface-600 flex flex-col items-center justify-center gap-2 hover:border-primary-500 transition-colors">
                <Camera className="w-8 h-8 text-surface-500" />
                <span className="text-xs text-surface-500">Take Photo</span>
              </button>
              {/* Placeholder photos */}
              <div className="aspect-square rounded-xl bg-surface-700" />
              <div className="aspect-square rounded-xl bg-surface-700" />
            </div>
          </div>

          {/* Submit */}
          <button className="btn-primary w-full btn-lg">
            <Send className="w-5 h-5" />
            Submit Update
          </button>
        </div>

        {/* Timeline Sidebar */}
        <div className="lg:col-span-2">
          <div className="card p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Activity Log
            </h2>
            <div className="space-y-4">
              {existingLogs.map((log, i) => (
                <div key={i} className="relative pl-6">
                  <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${
                    statusOptions.find(s => s.id === log.status)?.color || 'bg-surface-600'
                  }`} />
                  {i < existingLogs.length - 1 && (
                    <div className="absolute left-1.5 top-4 w-0.5 h-full -translate-x-1/2 bg-surface-700" />
                  )}
                  <p className="text-xs text-surface-500 mb-1">{log.time}</p>
                  <p className="text-sm font-medium text-white">
                    {statusOptions.find(s => s.id === log.status)?.label}
                  </p>
                  <p className="text-sm text-surface-400 mt-0.5">{log.note}</p>
                </div>
              ))}
            </div>

            {/* Quick Complete */}
            <div className="mt-6 pt-6 border-t border-surface-700">
              <button className="btn-accent w-full">
                <CheckCircle2 className="w-4 h-4" />
                Mark as Completed
              </button>
              <p className="text-xs text-surface-500 text-center mt-2">
                This will prompt for signature
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



