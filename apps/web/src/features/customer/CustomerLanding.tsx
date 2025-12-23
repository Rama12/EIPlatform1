import { Link } from 'react-router-dom'
import { 
  Zap, 
  ArrowRight, 
  Shield, 
  Clock, 
  MapPin, 
  Star,
  Smartphone,
  Laptop,
  Tv,
  Headphones
} from 'lucide-react'

const features = [
  { icon: Clock, title: 'Fast Response', description: 'Average 2-hour response time for urgent repairs' },
  { icon: Shield, title: 'Verified Technicians', description: 'All technicians are background-checked and certified' },
  { icon: MapPin, title: 'GPS Tracking', description: 'Track your technician in real-time' },
  { icon: Star, title: 'Quality Guaranteed', description: '90-day warranty on all repairs' },
]

const devices = [
  { icon: Smartphone, label: 'Smartphones' },
  { icon: Laptop, label: 'Laptops' },
  { icon: Tv, label: 'TVs' },
  { icon: Headphones, label: 'Audio' },
]

export function CustomerLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-surface-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-100/50 rounded-full blur-3xl" />
        
        {/* Navigation */}
        <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-surface-900">EI Platform</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/customer/dashboard" className="btn-ghost">Sign In</Link>
            <Link to="/customer/dashboard" className="btn-primary">Get Started</Link>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-32">
          <div className="max-w-3xl">
            <div className="badge-primary mb-6 animate-fade-in">
              Trusted by 10,000+ customers
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-surface-900 leading-tight mb-6 animate-slide-up">
              Expert Electronics
              <span className="block text-gradient">Repair On Demand</span>
            </h1>
            <p className="text-xl text-surface-600 mb-10 max-w-xl animate-slide-up" style={{ animationDelay: '100ms' }}>
              Connect with certified technicians for fast, reliable repairs. 
              From smartphones to smart TVs — we fix it all at your doorstep.
            </p>
            <div className="flex flex-wrap items-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Link to="/customer/new-call" className="btn-primary btn-lg group">
                Request Repair
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/customer/history" className="btn-secondary btn-lg">
                Track Existing Call
              </Link>
            </div>
          </div>

          {/* Device Icons */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:grid grid-cols-2 gap-4">
            {devices.map((device, i) => (
              <div 
                key={device.label}
                className="w-24 h-24 rounded-2xl bg-white shadow-lg border border-surface-200 flex flex-col items-center justify-center gap-2 animate-fade-in"
                style={{ animationDelay: `${i * 100 + 300}ms` }}
              >
                <device.icon className="w-8 h-8 text-primary-600" />
                <span className="text-xs text-surface-600">{device.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-12 bg-surface-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-surface-900 mb-4">
              Why Choose EI Platform?
            </h2>
            <p className="text-surface-600 max-w-xl mx-auto">
              We've reimagined electronics repair to be seamless, transparent, and reliable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={feature.title}
                className="card-hover p-6 text-center animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-12 bg-gradient-to-br from-primary-50 to-white border-primary-200">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-surface-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-surface-600 mb-8 max-w-xl mx-auto">
              Join thousands of satisfied customers who trust EI Platform for their electronics repair needs.
            </p>
            <Link to="/customer/dashboard" className="btn-primary btn-lg">
              Create Your Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-surface-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-600" />
            <span className="text-surface-600 text-sm">EI Platform &copy; 2024</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-surface-500">
            <a href="#" className="hover:text-surface-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-surface-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-surface-900 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
