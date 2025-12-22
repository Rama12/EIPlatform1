import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
  Shield,
  User,
  Wrench,
  Building,
  Mail,
  Phone,
  Calendar
} from 'lucide-react'

const users = [
  {
    id: 1,
    name: 'John Davis',
    email: 'john.d@email.com',
    phone: '+1 555-0101',
    role: 'customer',
    status: 'active',
    createdAt: 'Dec 15, 2024',
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    name: 'Mike Johnson',
    email: 'mike.j@email.com',
    phone: '+1 555-0102',
    role: 'technician',
    status: 'active',
    createdAt: 'Nov 20, 2024',
    lastActive: 'Just now',
  },
  {
    id: 3,
    name: 'Sarah Chen',
    email: 'sarah.c@email.com',
    phone: '+1 555-0103',
    role: 'technician',
    status: 'active',
    createdAt: 'Oct 10, 2024',
    lastActive: '1 hour ago',
  },
  {
    id: 4,
    name: 'Emily Parker',
    email: 'emily.p@email.com',
    phone: '+1 555-0104',
    role: 'customer',
    status: 'inactive',
    createdAt: 'Sep 5, 2024',
    lastActive: '2 weeks ago',
  },
  {
    id: 5,
    name: 'Acme Corp',
    email: 'support@acme.com',
    phone: '+1 555-0105',
    role: 'retailer',
    status: 'active',
    createdAt: 'Aug 12, 2024',
    lastActive: '3 days ago',
  },
  {
    id: 6,
    name: 'Operations Team',
    email: 'ops@eiplatform.com',
    phone: '+1 555-0106',
    role: 'operations',
    status: 'active',
    createdAt: 'Jul 1, 2024',
    lastActive: 'Just now',
  },
]

const roleConfig = {
  customer: { label: 'Customer', icon: User, class: 'badge-primary' },
  technician: { label: 'Technician', icon: Wrench, class: 'badge-success' },
  retailer: { label: 'Retailer', icon: Building, class: 'badge-warning' },
  operations: { label: 'Operations', icon: Shield, class: 'badge-accent' },
  admin: { label: 'Admin', icon: Shield, class: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
}

export function UserManagement() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                          user.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const toggleSelectUser = (id: number) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    )
  }

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            User Management
          </h1>
          <p className="text-surface-400">
            Manage all users across the platform
          </p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
          <input 
            type="text" 
            className="input pl-11" 
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-surface-500" />
          <select 
            className="input w-auto"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="technician">Technicians</option>
            <option value="retailer">Retailers</option>
            <option value="operations">Operations</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-4 mb-4 p-4 rounded-xl bg-primary-900/20 border border-primary-500/30">
          <span className="text-sm text-primary-300">
            {selectedUsers.length} users selected
          </span>
          <button className="btn-ghost btn-sm text-primary-400">
            Change Role
          </button>
          <button className="btn-ghost btn-sm text-primary-400">
            Deactivate
          </button>
          <button className="btn-ghost btn-sm text-accent-400">
            Delete
          </button>
          <button 
            className="ml-auto text-sm text-surface-400 hover:text-white"
            onClick={() => setSelectedUsers([])}
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="w-12">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-surface-600"
                  checked={selectedUsers.length === filteredUsers.length}
                  onChange={() => {
                    if (selectedUsers.length === filteredUsers.length) {
                      setSelectedUsers([])
                    } else {
                      setSelectedUsers(filteredUsers.map(u => u.id))
                    }
                  }}
                />
              </th>
              <th>User</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last Active</th>
              <th className="w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const role = roleConfig[user.role as keyof typeof roleConfig]
              const RoleIcon = role.icon
              
              return (
                <tr key={user.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-surface-600"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-white">{user.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-surface-400 text-xs">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1 text-surface-400 text-xs">
                        <Phone className="w-3 h-3" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${role.class} flex items-center gap-1.5 w-fit`}>
                      <RoleIcon className="w-3 h-3" />
                      {role.label}
                    </span>
                  </td>
                  <td>
                    <span className={`flex items-center gap-2 ${
                      user.status === 'active' ? 'text-success-500' : 'text-surface-500'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        user.status === 'active' ? 'bg-success-500' : 'bg-surface-500'
                      }`} />
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-surface-400 text-sm">
                      <Calendar className="w-3 h-3" />
                      {user.createdAt}
                    </div>
                  </td>
                  <td className="text-surface-400 text-sm">{user.lastActive}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-surface-500 hover:text-white transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-surface-500 hover:text-accent-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-surface-500 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-700/50">
        <p className="text-sm text-surface-500">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        <div className="flex gap-2">
          <button className="btn-ghost btn-sm" disabled>Previous</button>
          <button className="btn-ghost btn-sm">Next</button>
        </div>
      </div>
    </div>
  )
}



