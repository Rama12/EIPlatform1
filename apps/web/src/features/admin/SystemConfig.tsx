import { useState } from 'react'
import { 
  Settings, 
  Bell, 
  MapPin, 
  Clock, 
  DollarSign,
  Shield,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'

const configSections = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'allocation', label: 'Allocation Rules', icon: MapPin },
  { id: 'sla', label: 'SLA Settings', icon: Clock },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'security', label: 'Security', icon: Shield },
]

export function SystemConfig() {
  const [activeSection, setActiveSection] = useState('general')
  const [hasChanges, setHasChanges] = useState(false)

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            System Configuration
          </h1>
          <p className="text-surface-400">
            Manage platform settings and preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost">
            <RefreshCw className="w-4 h-4" />
            Reset to Defaults
          </button>
          <button className={`btn-primary ${hasChanges ? 'animate-pulse-subtle' : ''}`} disabled={!hasChanges}>
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasChanges && (
        <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-warning-500/10 border border-warning-500/30">
          <AlertTriangle className="w-5 h-5 text-warning-500" />
          <span className="text-warning-400">You have unsaved changes</span>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="card p-4">
          <nav className="space-y-1">
            {configSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-rose-600/20 text-rose-400'
                    : 'text-surface-400 hover:bg-surface-800 hover:text-white'
                }`}
              >
                <section.icon className="w-5 h-5" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          {activeSection === 'general' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-rose-400" />
                General Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="label">Platform Name</label>
                  <input 
                    type="text" 
                    className="input" 
                    defaultValue="EI Platform"
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="label">Support Email</label>
                  <input 
                    type="email" 
                    className="input" 
                    defaultValue="support@eiplatform.com"
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="label">Default Timezone</label>
                  <select className="input" onChange={() => setHasChanges(true)}>
                    <option>America/Los_Angeles (PST)</option>
                    <option>America/New_York (EST)</option>
                    <option>UTC</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50">
                  <div>
                    <p className="font-medium text-white">Maintenance Mode</p>
                    <p className="text-sm text-surface-400">Disable access for non-admin users</p>
                  </div>
                  <button 
                    className="w-12 h-7 rounded-full bg-surface-600 transition-colors"
                    onClick={() => setHasChanges(true)}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-md transform translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeSection === 'notifications' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-rose-400" />
                Notification Settings
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'New Call Notifications', desc: 'Alert when new repair calls are created' },
                  { label: 'Technician Assignment', desc: 'Notify when technicians are assigned' },
                  { label: 'SLA Breach Alerts', desc: 'Alert when SLA thresholds are exceeded' },
                  { label: 'Customer Feedback', desc: 'Notify on new ratings and reviews' },
                  { label: 'System Alerts', desc: 'Critical system notifications' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50">
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-surface-400">{item.desc}</p>
                    </div>
                    <button 
                      className="w-12 h-7 rounded-full bg-rose-500 transition-colors"
                      onClick={() => setHasChanges(true)}
                    >
                      <div className="w-5 h-5 rounded-full bg-white shadow-md transform translate-x-6 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Allocation Settings */}
          {activeSection === 'allocation' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-400" />
                Allocation Rules
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="label">Default Search Radius (km)</label>
                  <input 
                    type="number" 
                    className="input" 
                    defaultValue="25"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-xs text-surface-500 mt-1">Maximum distance to search for available technicians</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="label">Rating Weight</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="40"
                      onChange={() => setHasChanges(true)}
                    />
                    <p className="text-xs text-surface-500 mt-1">%</p>
                  </div>
                  <div>
                    <label className="label">Distance Weight</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="35"
                      onChange={() => setHasChanges(true)}
                    />
                    <p className="text-xs text-surface-500 mt-1">%</p>
                  </div>
                  <div>
                    <label className="label">Workload Weight</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="25"
                      onChange={() => setHasChanges(true)}
                    />
                    <p className="text-xs text-surface-500 mt-1">%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50">
                  <div>
                    <p className="font-medium text-white">Auto-Assignment</p>
                    <p className="text-sm text-surface-400">Automatically assign top-scored technician</p>
                  </div>
                  <button 
                    className="w-12 h-7 rounded-full bg-rose-500 transition-colors"
                    onClick={() => setHasChanges(true)}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-md transform translate-x-6 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SLA Settings */}
          {activeSection === 'sla' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-400" />
                SLA Settings
              </h2>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Standard Response Time (min)</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="60"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <label className="label">Urgent Response Time (min)</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="30"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Standard Completion Time (hours)</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="4"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <label className="label">Urgent Completion Time (hours)</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="2"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Escalation Threshold (min)</label>
                  <input 
                    type="number" 
                    className="input" 
                    defaultValue="45"
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-xs text-surface-500 mt-1">Time before automatic escalation is triggered</p>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Settings */}
          {activeSection === 'pricing' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-rose-400" />
                Pricing Configuration
              </h2>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Platform Fee (%)</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="15"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <label className="label">Minimum Service Fee ($)</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="25"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Urgent Surcharge (%)</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="25"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <label className="label">Distance Rate ($/km)</label>
                    <input 
                      type="number" 
                      className="input" 
                      defaultValue="1.50"
                      step="0.10"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-rose-400" />
                Security Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="label">Session Timeout (minutes)</label>
                  <input 
                    type="number" 
                    className="input" 
                    defaultValue="60"
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="label">Max Login Attempts</label>
                  <input 
                    type="number" 
                    className="input" 
                    defaultValue="5"
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50">
                  <div>
                    <p className="font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-surface-400">Require 2FA for all admin users</p>
                  </div>
                  <button 
                    className="w-12 h-7 rounded-full bg-rose-500 transition-colors"
                    onClick={() => setHasChanges(true)}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-md transform translate-x-6 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50">
                  <div>
                    <p className="font-medium text-white">IP Whitelist</p>
                    <p className="text-sm text-surface-400">Restrict admin access to specific IPs</p>
                  </div>
                  <button 
                    className="w-12 h-7 rounded-full bg-surface-600 transition-colors"
                    onClick={() => setHasChanges(true)}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-md transform translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}




