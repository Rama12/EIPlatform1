import { useState } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Calendar as CalendarIcon,
  CheckCircle2,
  X,
  Plus
} from 'lucide-react'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = Array.from({ length: 13 }, (_, i) => i + 7) // 7 AM to 7 PM

const scheduledJobs = [
  { day: 1, start: 9, duration: 2, title: 'iPhone Screen', color: 'bg-primary-600' },
  { day: 1, start: 14, duration: 1.5, title: 'MacBook Battery', color: 'bg-emerald-600' },
  { day: 2, start: 10, duration: 2, title: 'Samsung Repair', color: 'bg-violet-600' },
  { day: 3, start: 13, duration: 3, title: 'TV Installation', color: 'bg-amber-600' },
  { day: 4, start: 9, duration: 1, title: 'AirPods Fix', color: 'bg-pink-600' },
]

const timeBlocks = [
  { day: 5, start: 7, end: 12, type: 'available' },
  { day: 5, start: 12, end: 19, type: 'unavailable' },
]

export function AvailabilityCalendar() {
  const [currentWeek, setCurrentWeek] = useState(0)
  const [isEditing, setIsEditing] = useState(false)

  const getWeekDates = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + currentWeek * 7)
    
    return days.map((_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return date
    })
  }

  const weekDates = getWeekDates()
  const monthYear = weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Availability Calendar
          </h1>
          <p className="text-surface-400">
            Manage your working hours and view scheduled jobs
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? 'btn-accent' : 'btn-primary'}
          >
            {isEditing ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Clock className="w-4 h-4" />
                Edit Hours
              </>
            )}
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="btn-ghost btn-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-primary-400" />
            <span className="text-lg font-medium text-white">{monthYear}</span>
          </div>
          <button 
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="btn-ghost btn-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <button className="card p-4 text-left hover:bg-surface-800/80 transition-colors">
          <h3 className="font-medium text-white mb-1">Set Working Hours</h3>
          <p className="text-sm text-surface-400">Define your regular schedule</p>
        </button>
        <button className="card p-4 text-left hover:bg-surface-800/80 transition-colors">
          <h3 className="font-medium text-white mb-1">Block Time Off</h3>
          <p className="text-sm text-surface-400">Mark unavailable periods</p>
        </button>
        <button className="card p-4 text-left hover:bg-surface-800/80 transition-colors">
          <h3 className="font-medium text-white mb-1">Copy Week</h3>
          <p className="text-sm text-surface-400">Apply schedule to other weeks</p>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-8 border-b border-surface-700">
              <div className="p-4 text-sm font-medium text-surface-500">Time</div>
              {weekDates.map((date, i) => {
                const isToday = date.toDateString() === new Date().toDateString()
                return (
                  <div key={i} className={`p-4 text-center border-l border-surface-700 ${isToday ? 'bg-primary-900/20' : ''}`}>
                    <p className="text-sm font-medium text-surface-400">{days[i]}</p>
                    <p className={`text-lg font-semibold ${isToday ? 'text-primary-400' : 'text-white'}`}>
                      {date.getDate()}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Time Slots */}
            <div className="relative">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b border-surface-700/50">
                  <div className="p-3 text-sm text-surface-500">
                    {hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? '12:00 PM' : `${hour}:00 AM`}
                  </div>
                  {days.map((_, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className={`h-12 border-l border-surface-700/50 ${
                        isEditing ? 'hover:bg-primary-900/20 cursor-pointer' : ''
                      }`}
                    />
                  ))}
                </div>
              ))}

              {/* Scheduled Jobs Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="grid grid-cols-8 h-full">
                  <div /> {/* Time column spacer */}
                  {days.map((_, dayIndex) => (
                    <div key={dayIndex} className="relative border-l border-transparent">
                      {scheduledJobs
                        .filter(job => job.day === dayIndex)
                        .map((job, i) => (
                          <div
                            key={i}
                            className={`absolute left-1 right-1 ${job.color} rounded-lg p-2 pointer-events-auto cursor-pointer hover:opacity-90 transition-opacity`}
                            style={{
                              top: `${(job.start - 7) * 48}px`,
                              height: `${job.duration * 48 - 4}px`,
                            }}
                          >
                            <p className="text-xs font-medium text-white truncate">{job.title}</p>
                          </div>
                        ))}
                      
                      {/* Time blocks */}
                      {timeBlocks
                        .filter(block => block.day === dayIndex)
                        .map((block, i) => (
                          <div
                            key={`block-${i}`}
                            className={`absolute left-0 right-0 ${
                              block.type === 'available' 
                                ? 'bg-success-500/10 border-l-2 border-success-500' 
                                : 'bg-surface-700/50 border-l-2 border-surface-500'
                            }`}
                            style={{
                              top: `${(block.start - 7) * 48}px`,
                              height: `${(block.end - block.start) * 48}px`,
                            }}
                          />
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success-500/30 border-l-2 border-success-500" />
          <span className="text-sm text-surface-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-surface-600" />
          <span className="text-sm text-surface-400">Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary-600" />
          <span className="text-sm text-surface-400">Scheduled Job</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <div className="card p-4">
          <p className="text-surface-400 text-sm mb-1">This Week</p>
          <p className="text-2xl font-display font-bold text-white">6 Jobs</p>
        </div>
        <div className="card p-4">
          <p className="text-surface-400 text-sm mb-1">Available Hours</p>
          <p className="text-2xl font-display font-bold text-emerald-400">42 hrs</p>
        </div>
        <div className="card p-4">
          <p className="text-surface-400 text-sm mb-1">Booked Hours</p>
          <p className="text-2xl font-display font-bold text-white">12.5 hrs</p>
        </div>
      </div>
    </div>
  )
}



