import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, X } from 'lucide-react'

interface LogoutButtonProps {
  className?: string
  iconOnly?: boolean
  variant?: 'icon' | 'full'
}

export function LogoutButton({ className = '', iconOnly = false, variant = 'icon' }: LogoutButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('userType')
    sessionStorage.removeItem('userName')
    
    // Navigate to login page
    navigate('/login')
    setShowConfirm(false)
  }

  return (
    <>
      {variant === 'full' && !iconOnly ? (
        <button 
          onClick={() => setShowConfirm(true)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-100 hover:text-surface-900 transition-all ${className}`}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      ) : (
        <button 
          onClick={() => setShowConfirm(true)}
          className={`p-2 text-surface-400 hover:text-surface-700 transition-colors ${className}`}
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-surface-200">
              <h3 className="text-xl font-display font-semibold text-surface-900">
                Confirm Logout
              </h3>
              <button
                onClick={() => setShowConfirm(false)}
                className="p-2 text-surface-400 hover:text-surface-700 rounded-lg hover:bg-surface-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-surface-600">
                Are you sure you want to logout? You will need to sign in again to access your account.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 p-6 border-t border-surface-200">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-error-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-error-700 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

