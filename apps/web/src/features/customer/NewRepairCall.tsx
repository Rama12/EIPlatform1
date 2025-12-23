import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  ArrowRight, 
  Smartphone, 
  Laptop, 
  Tv, 
  Headphones,
  Camera,
  Gamepad2,
  Upload,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react'

const deviceTypes = [
  { id: 'smartphone', label: 'Smartphone', icon: Smartphone },
  { id: 'laptop', label: 'Laptop/PC', icon: Laptop },
  { id: 'tv', label: 'TV/Display', icon: Tv },
  { id: 'audio', label: 'Audio', icon: Headphones },
  { id: 'camera', label: 'Camera', icon: Camera },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
]

const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Other']

const commonIssues = [
  'Screen cracked/broken',
  'Battery not charging',
  'Not turning on',
  'Water damage',
  'Software issues',
  'Speaker/microphone problem',
  'Button not working',
  'Other',
]

export function NewRepairCall() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    issue: '',
    description: '',
    photos: [] as string[],
    urgent: false,
  })

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen py-8 px-6 lg:px-10 bg-surface-100">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/customer/dashboard" className="inline-flex items-center gap-2 text-surface-500 hover:text-surface-900 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-display font-bold text-surface-900">
            Request a Repair
          </h1>
          <p className="text-surface-500 mt-2">
            Tell us about your device and we'll connect you with the right technician.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                step === s 
                  ? 'bg-primary-600 text-white' 
                  : step > s 
                    ? 'bg-success-600 text-white' 
                    : 'bg-surface-200 text-surface-500'
              }`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 rounded ${step > s ? 'bg-success-600' : 'bg-surface-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Device Selection */}
        {step === 1 && (
          <div className="card p-8 animate-fade-in">
            <h2 className="text-xl font-display font-semibold text-surface-900 mb-6">
              What device needs repair?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {deviceTypes.map((device) => (
                <button
                  key={device.id}
                  onClick={() => updateField('deviceType', device.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.deviceType === device.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-surface-200 hover:border-surface-300 bg-white'
                  }`}
                >
                  <device.icon className={`w-8 h-8 mx-auto mb-2 ${
                    formData.deviceType === device.id ? 'text-primary-600' : 'text-surface-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    formData.deviceType === device.id ? 'text-surface-900' : 'text-surface-600'
                  }`}>
                    {device.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="label">Brand</label>
                <select 
                  className="input"
                  value={formData.brand}
                  onChange={(e) => updateField('brand', e.target.value)}
                >
                  <option value="">Select brand</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Model</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="e.g., iPhone 14 Pro"
                  value={formData.model}
                  onChange={(e) => updateField('model', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                className="btn-primary"
                onClick={() => setStep(2)}
                disabled={!formData.deviceType || !formData.brand}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Issue Details */}
        {step === 2 && (
          <div className="card p-8 animate-fade-in">
            <h2 className="text-xl font-display font-semibold text-surface-900 mb-6">
              What's the issue?
            </h2>

            <div className="mb-6">
              <label className="label">Select Issue Type</label>
              <div className="flex flex-wrap gap-2">
                {commonIssues.map((issue) => (
                  <button
                    key={issue}
                    onClick={() => updateField('issue', issue)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      formData.issue === issue
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-surface-200 text-surface-600 hover:border-surface-300'
                    }`}
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="label">Additional Details</label>
              <textarea 
                className="input min-h-32 resize-none"
                placeholder="Describe the issue in detail. When did it start? Any relevant information..."
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label className="label">Upload Photos (Optional)</label>
              <div className="border-2 border-dashed border-surface-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer bg-surface-50">
                <Upload className="w-10 h-10 text-surface-400 mx-auto mb-3" />
                <p className="text-surface-600 mb-1">Drag and drop photos here</p>
                <p className="text-sm text-surface-400">or click to browse</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-warning-50 border border-warning-200 mb-8">
              <Clock className="w-5 h-5 text-warning-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-warning-700">Need urgent repair?</p>
                <p className="text-xs text-surface-600">Priority handling with faster technician assignment</p>
              </div>
              <button 
                onClick={() => updateField('urgent', !formData.urgent)}
                className={`w-12 h-7 rounded-full transition-colors ${
                  formData.urgent ? 'bg-warning-500' : 'bg-surface-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  formData.urgent ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex justify-between">
              <button className="btn-ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button 
                className="btn-primary"
                onClick={() => setStep(3)}
                disabled={!formData.issue}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Location & Confirm */}
        {step === 3 && (
          <div className="card p-8 animate-fade-in">
            <h2 className="text-xl font-display font-semibold text-surface-900 mb-6">
              Confirm & Submit
            </h2>

            {/* Summary */}
            <div className="bg-surface-50 rounded-xl p-5 mb-6 border border-surface-200">
              <h3 className="text-sm font-medium text-surface-500 mb-4">Repair Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-surface-500">Device</span>
                  <span className="text-surface-900 font-medium">{formData.brand} {formData.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Issue</span>
                  <span className="text-surface-900 font-medium">{formData.issue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Priority</span>
                  <span className={formData.urgent ? 'text-warning-600 font-medium' : 'text-surface-600'}>
                    {formData.urgent ? 'Urgent' : 'Standard'}
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="label">Service Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input 
                  type="text" 
                  className="input pl-12" 
                  placeholder="Enter your address"
                  defaultValue="123 Main Street, San Francisco, CA 94102"
                />
              </div>
              <button className="mt-2 text-sm text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Use current location
              </button>
            </div>

            {/* Preferred Time */}
            <div className="mb-8">
              <label className="label">Preferred Time</label>
              <div className="grid grid-cols-3 gap-3">
                {['ASAP', 'Today', 'Tomorrow'].map((time) => (
                  <button
                    key={time}
                    className="px-4 py-3 rounded-lg border border-surface-200 text-surface-600 hover:border-primary-500 hover:text-surface-900 transition-all bg-white"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button className="btn-ghost" onClick={() => setStep(2)}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <Link to="/customer/track/CALL-2024-NEW" className="btn-primary">
                <CheckCircle2 className="w-4 h-4" />
                Submit Request
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
