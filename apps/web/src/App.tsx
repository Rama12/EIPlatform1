import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import { CustomerLayout } from './layouts/CustomerLayout'
import { TechnicianLayout } from './layouts/TechnicianLayout'
import { OperationsLayout } from './layouts/OperationsLayout'
import { AdminLayout } from './layouts/AdminLayout'

// Customer Portal
import { CustomerLanding } from './features/customer/CustomerLanding'
import { CustomerDashboard } from './features/customer/CustomerDashboard'
import { NewRepairCall } from './features/customer/NewRepairCall'
import { CallTracking } from './features/customer/CallTracking'
import { CallHistory } from './features/customer/CallHistory'

// Technician Portal
import { TechnicianDashboard } from './features/technician/TechnicianDashboard'
import { JobDetail } from './features/technician/JobDetail'
import { WorkLog } from './features/technician/WorkLog'
import { TechnicianProfile } from './features/technician/TechnicianProfile'
import { AvailabilityCalendar } from './features/technician/AvailabilityCalendar'

// Operations Portal
import { OperationsDashboard } from './features/operations/OperationsDashboard'
import { CallQueue } from './features/operations/CallQueue'
import { TechnicianGrid } from './features/operations/TechnicianGrid'
import { Escalations } from './features/operations/Escalations'

// Admin Portal
import { AdminDashboard } from './features/admin/AdminDashboard'
import { UserManagement } from './features/admin/UserManagement'
import { TechnicianVerification } from './features/admin/TechnicianVerification'
import { SkillsManagement } from './features/admin/SkillsManagement'
import { SystemConfig } from './features/admin/SystemConfig'

// Portal Selector
import { PortalSelector } from './features/PortalSelector'

function App() {
  return (
    <div className="min-h-screen bg-surface-950">
      <Routes>
        {/* Portal Selector */}
        <Route path="/" element={<PortalSelector />} />
        
        {/* Customer Portal */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerLanding />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="new-call" element={<NewRepairCall />} />
          <Route path="track/:callId" element={<CallTracking />} />
          <Route path="history" element={<CallHistory />} />
        </Route>
        
        {/* Technician Portal */}
        <Route path="/technician" element={<TechnicianLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TechnicianDashboard />} />
          <Route path="job/:jobId" element={<JobDetail />} />
          <Route path="job/:jobId/log" element={<WorkLog />} />
          <Route path="profile" element={<TechnicianProfile />} />
          <Route path="availability" element={<AvailabilityCalendar />} />
        </Route>
        
        {/* Operations Portal */}
        <Route path="/operations" element={<OperationsLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<OperationsDashboard />} />
          <Route path="queue" element={<CallQueue />} />
          <Route path="technicians" element={<TechnicianGrid />} />
          <Route path="escalations" element={<Escalations />} />
        </Route>
        
        {/* Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="verification" element={<TechnicianVerification />} />
          <Route path="skills" element={<SkillsManagement />} />
          <Route path="config" element={<SystemConfig />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App




