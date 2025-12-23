import { useState } from 'react'
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Clock,
  FileText,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const pendingVerifications = [
  {
    id: 1,
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    phone: '+1 555-0201',
    location: 'San Francisco, CA',
    submittedAt: '2 days ago',
    documents: ['ID Verification', 'Background Check', 'Certifications'],
    skills: ['iPhone Repair', 'MacBook Repair', 'iPad Repair'],
    certifications: ['Apple Certified iOS Technician', 'CompTIA A+'],
    experience: '5 years',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Jennifer Lee',
    email: 'jennifer.l@email.com',
    phone: '+1 555-0202',
    location: 'Oakland, CA',
    submittedAt: '1 day ago',
    documents: ['ID Verification', 'Background Check', 'Certifications'],
    skills: ['Samsung Repair', 'Android Phones', 'Tablets'],
    certifications: ['Samsung Certified Repair Tech'],
    experience: '3 years',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    phone: '+1 555-0203',
    location: 'San Jose, CA',
    submittedAt: '3 hours ago',
    documents: ['ID Verification', 'Background Check'],
    skills: ['TV Repair', 'Audio Equipment', 'Gaming Consoles'],
    certifications: ['Sony Authorized Service Tech'],
    experience: '7 years',
    status: 'pending',
  },
]

const recentVerifications = [
  { name: 'Emma Wilson', action: 'Approved', date: 'Dec 20, 2024', by: 'Admin' },
  { name: 'David Park', action: 'Approved', date: 'Dec 19, 2024', by: 'Admin' },
  { name: 'James Smith', action: 'Rejected', date: 'Dec 18, 2024', by: 'Admin' },
  { name: 'Lisa Kim', action: 'Approved', date: 'Dec 17, 2024', by: 'Admin' },
]

export function TechnicianVerification() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Technician Verification
          </h1>
          <p className="text-surface-400">
            Review and approve technician applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge-warning px-4 py-1.5">
            <Clock className="w-4 h-4 mr-1" />
            {pendingVerifications.length} Pending
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-warning-500" />
            <span className="text-sm text-surface-400">Pending</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">{pendingVerifications.length}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-success-500" />
            <span className="text-sm text-surface-400">Approved (30d)</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">24</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-accent-400" />
            <span className="text-sm text-surface-400">Rejected (30d)</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">3</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-surface-400">Avg. Processing</span>
          </div>
          <p className="text-2xl font-display font-bold text-white">1.5 days</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Applications */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-display font-semibold text-white">Pending Applications</h2>
          
          {pendingVerifications.map((tech) => (
            <div key={tech.id} className="card">
              {/* Header */}
              <div 
                className="p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === tech.id ? null : tech.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-semibold text-white">
                      {tech.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{tech.name}</h3>
                      <span className="badge-warning">Pending Review</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-surface-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {tech.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Submitted {tech.submittedAt}
                      </span>
                    </div>
                  </div>
                  {expandedId === tech.id ? (
                    <ChevronUp className="w-5 h-5 text-surface-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-surface-400" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === tech.id && (
                <div className="border-t border-surface-700/50 p-5 space-y-6 animate-fade-in">
                  {/* Contact */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-surface-300">
                      <Mail className="w-4 h-4 text-surface-500" />
                      {tech.email}
                    </div>
                    <div className="flex items-center gap-2 text-surface-300">
                      <Phone className="w-4 h-4 text-surface-500" />
                      {tech.phone}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-sm font-medium text-surface-400 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {tech.skills.map((skill) => (
                        <span key={skill} className="badge-primary">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <p className="text-sm font-medium text-surface-400 mb-2">Certifications</p>
                    <div className="space-y-2">
                      {tech.certifications.map((cert) => (
                        <div key={cert} className="flex items-center gap-2 text-surface-300">
                          <Award className="w-4 h-4 text-amber-400" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <p className="text-sm font-medium text-surface-400 mb-1">Experience</p>
                    <p className="text-white">{tech.experience}</p>
                  </div>

                  {/* Documents */}
                  <div>
                    <p className="text-sm font-medium text-surface-400 mb-2">Submitted Documents</p>
                    <div className="space-y-2">
                      {tech.documents.map((doc) => (
                        <button key={doc} className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
                          <FileText className="w-4 h-4" />
                          {doc}
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-surface-700/50">
                    <button className="btn-primary flex-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="btn-secondary flex-1">
                      Request More Info
                    </button>
                    <button className="btn-ghost text-accent-400 hover:bg-accent-600/20">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-display font-semibold text-white mb-4">Recent Verifications</h2>
            <div className="space-y-4">
              {recentVerifications.map((item, i) => (
                <div key={i} className="flex items-center gap-3 pb-4 border-b border-surface-700/50 last:pb-0 last:border-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.action === 'Approved' ? 'bg-success-500/20' : 'bg-accent-500/20'
                  }`}>
                    {item.action === 'Approved' ? (
                      <CheckCircle2 className="w-4 h-4 text-success-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-accent-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{item.name}</p>
                    <p className="text-xs text-surface-400">{item.date}</p>
                  </div>
                  <span className={`text-sm ${
                    item.action === 'Approved' ? 'text-success-500' : 'text-accent-400'
                  }`}>
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Guidelines */}
          <div className="card p-6 bg-primary-900/10 border-primary-500/30">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-400" />
              Verification Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-surface-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                Valid government-issued ID required
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                Background check must be clear
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                At least one valid certification
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                Minimum 1 year experience preferred
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}




