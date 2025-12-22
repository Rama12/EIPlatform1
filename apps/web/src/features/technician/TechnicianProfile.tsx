import { 
  User, 
  Star, 
  Award, 
  MapPin, 
  Phone, 
  Mail,
  Edit3,
  Shield,
  Smartphone,
  Laptop,
  Tv,
  Headphones,
  CheckCircle2,
  Camera
} from 'lucide-react'

const skills = [
  { name: 'Smartphone Repair', icon: Smartphone, level: 'Expert', verified: true },
  { name: 'Laptop Repair', icon: Laptop, level: 'Advanced', verified: true },
  { name: 'TV/Display', icon: Tv, level: 'Intermediate', verified: false },
  { name: 'Audio Equipment', icon: Headphones, level: 'Advanced', verified: true },
]

const certifications = [
  { name: 'Apple Certified iOS Technician', issuer: 'Apple', year: '2023' },
  { name: 'Samsung Mobile Certified', issuer: 'Samsung', year: '2023' },
  { name: 'CompTIA A+ Certified', issuer: 'CompTIA', year: '2022' },
]

const stats = [
  { label: 'Total Jobs', value: '847' },
  { label: 'This Month', value: '34' },
  { label: 'Avg Rating', value: '4.9' },
  { label: 'On-Time %', value: '98%' },
]

export function TechnicianProfile() {
  return (
    <div className="p-6 lg:p-10">
      {/* Profile Header */}
      <div className="card p-8 mb-6">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">MJ</span>
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center shadow-lg hover:bg-primary-500 transition-colors">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-display font-bold text-white mb-1">
                  Mike Johnson
                </h1>
                <p className="text-surface-400">Expert Electronics Technician</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-white">4.9</span>
                    <span className="text-surface-500">(423 reviews)</span>
                  </div>
                  <span className="badge-success">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </span>
                </div>
              </div>
              <button className="btn-secondary btn-sm">
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-surface-400">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2 text-surface-400">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 987-6543</span>
              </div>
              <div className="flex items-center gap-2 text-surface-400">
                <Mail className="w-4 h-4" />
                <span>mike.j@email.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-surface-700/50">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
              <p className="text-sm text-surface-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-semibold text-white">
              Skills & Expertise
            </h2>
            <button className="text-sm text-primary-400 hover:text-primary-300">
              + Add Skill
            </button>
          </div>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/50">
                <div className="w-12 h-12 rounded-lg bg-surface-700 flex items-center justify-center">
                  <skill.icon className="w-6 h-6 text-surface-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{skill.name}</h3>
                    {skill.verified && (
                      <CheckCircle2 className="w-4 h-4 text-success-500" />
                    )}
                  </div>
                  <p className="text-sm text-surface-400">{skill.level}</p>
                </div>
                <span className={`badge ${skill.verified ? 'badge-success' : 'badge-warning'}`}>
                  {skill.verified ? 'Verified' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-semibold text-white">
              Certifications
            </h2>
            <button className="text-sm text-primary-400 hover:text-primary-300">
              + Add Certification
            </button>
          </div>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/50">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{cert.name}</h3>
                  <p className="text-sm text-surface-400">{cert.issuer} • {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Area */}
        <div className="card p-6">
          <h2 className="text-lg font-display font-semibold text-white mb-4">
            Service Area
          </h2>
          <div className="h-48 rounded-xl bg-surface-700 flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-surface-500 mx-auto mb-2" />
              <p className="text-surface-400">Service Area Map</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-surface-400 text-sm">Current Radius</p>
              <p className="text-white font-medium">25 km</p>
            </div>
            <button className="btn-secondary btn-sm">
              <Edit3 className="w-4 h-4" />
              Adjust Area
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-display font-semibold text-white mb-4">
            Account Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-surface-700/50">
              <div>
                <p className="font-medium text-white">Notifications</p>
                <p className="text-sm text-surface-400">Push, email, and SMS alerts</p>
              </div>
              <button className="btn-ghost btn-sm">Configure</button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-surface-700/50">
              <div>
                <p className="font-medium text-white">Payment Methods</p>
                <p className="text-sm text-surface-400">Bank account ending in 4521</p>
              </div>
              <button className="btn-ghost btn-sm">Manage</button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-surface-700/50">
              <div>
                <p className="font-medium text-white">Privacy Settings</p>
                <p className="text-sm text-surface-400">Profile visibility and data</p>
              </div>
              <button className="btn-ghost btn-sm">Edit</button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-white">Security</p>
                <p className="text-sm text-surface-400">Password and 2FA</p>
              </div>
              <button className="btn-ghost btn-sm">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



