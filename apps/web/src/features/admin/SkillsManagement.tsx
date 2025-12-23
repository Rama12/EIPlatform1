import { useState } from 'react'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search,
  Smartphone,
  Laptop,
  Tv,
  Headphones,
  Camera,
  Gamepad2,
  ChevronRight,
  Users
} from 'lucide-react'

const deviceCategories = [
  { 
    id: 1, 
    name: 'Smartphones', 
    icon: Smartphone, 
    skills: ['Screen Repair', 'Battery Replacement', 'Water Damage', 'Software Issues', 'Camera Repair'],
    technicians: 45,
    color: 'from-blue-500 to-cyan-500',
  },
  { 
    id: 2, 
    name: 'Laptops & PCs', 
    icon: Laptop, 
    skills: ['Screen Replacement', 'Keyboard Repair', 'Battery Issues', 'Hardware Upgrades', 'Data Recovery'],
    technicians: 38,
    color: 'from-violet-500 to-purple-500',
  },
  { 
    id: 3, 
    name: 'TVs & Displays', 
    icon: Tv, 
    skills: ['Screen Repair', 'Power Issues', 'Audio Problems', 'Smart TV Setup', 'Panel Replacement'],
    technicians: 22,
    color: 'from-emerald-500 to-teal-500',
  },
  { 
    id: 4, 
    name: 'Audio Equipment', 
    icon: Headphones, 
    skills: ['Speaker Repair', 'Driver Replacement', 'Bluetooth Issues', 'Cable Repair'],
    technicians: 18,
    color: 'from-amber-500 to-orange-500',
  },
  { 
    id: 5, 
    name: 'Cameras', 
    icon: Camera, 
    skills: ['Lens Repair', 'Sensor Cleaning', 'Shutter Replacement', 'LCD Repair'],
    technicians: 12,
    color: 'from-pink-500 to-rose-500',
  },
  { 
    id: 6, 
    name: 'Gaming Consoles', 
    icon: Gamepad2, 
    skills: ['Disc Drive Repair', 'HDMI Port', 'Overheating Issues', 'Controller Repair'],
    technicians: 15,
    color: 'from-red-500 to-orange-500',
  },
]

const brands = [
  { name: 'Apple', categories: ['Smartphones', 'Laptops', 'Tablets', 'Wearables', 'Audio'] },
  { name: 'Samsung', categories: ['Smartphones', 'TVs', 'Tablets', 'Wearables'] },
  { name: 'Sony', categories: ['TVs', 'Audio', 'Cameras', 'Gaming'] },
  { name: 'Dell', categories: ['Laptops', 'Monitors'] },
  { name: 'HP', categories: ['Laptops', 'Printers'] },
  { name: 'LG', categories: ['TVs', 'Audio', 'Smartphones'] },
]

export function SkillsManagement() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">
            Skills & Categories
          </h1>
          <p className="text-surface-400">
            Manage device categories, skills, and brand certifications
          </p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
        <input 
          type="text" 
          className="input pl-11" 
          placeholder="Search categories, skills, or brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Device Categories */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-display font-semibold text-white mb-4">Device Categories</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {deviceCategories.map((category) => (
              <div 
                key={category.id} 
                className={`card p-5 cursor-pointer transition-all ${
                  selectedCategory === category.id 
                    ? 'ring-2 ring-primary-500 bg-primary-900/10' 
                    : 'hover:bg-surface-800/80'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-surface-500 hover:text-white transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-surface-500 hover:text-accent-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-2">{category.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-400">{category.skills.length} skills</span>
                  <div className="flex items-center gap-1 text-surface-400">
                    <Users className="w-4 h-4" />
                    {category.technicians}
                  </div>
                </div>
                
                {/* Expanded Skills */}
                {selectedCategory === category.id && (
                  <div className="mt-4 pt-4 border-t border-surface-700/50 animate-fade-in">
                    <p className="text-sm font-medium text-surface-400 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span key={skill} className="badge-neutral text-xs">{skill}</span>
                      ))}
                      <button className="badge bg-primary-600/20 text-primary-400 border border-primary-500/30 text-xs hover:bg-primary-600/30 transition-colors">
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add New Category Button */}
          <button className="w-full mt-4 p-4 rounded-xl border-2 border-dashed border-surface-600 text-surface-400 hover:border-primary-500 hover:text-primary-400 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Category
          </button>
        </div>

        {/* Brands */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-white">Brands</h2>
            <button className="btn-ghost btn-sm">
              <Plus className="w-4 h-4" />
              Add Brand
            </button>
          </div>
          <div className="card p-4 space-y-2">
            {brands.map((brand) => (
              <div 
                key={brand.name} 
                className="p-3 rounded-lg bg-surface-800/50 hover:bg-surface-700 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{brand.name}</span>
                  <ChevronRight className="w-4 h-4 text-surface-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-surface-500 mt-1">
                  {brand.categories.join(', ')}
                </p>
              </div>
            ))}
          </div>

          {/* Skill Stats */}
          <div className="card p-6 mt-6">
            <h3 className="font-semibold text-white mb-4">Skill Coverage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-surface-400">Smartphones</span>
                  <span className="text-white">92%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-700">
                  <div className="h-full w-[92%] rounded-full bg-blue-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-surface-400">Laptops</span>
                  <span className="text-white">85%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-700">
                  <div className="h-full w-[85%] rounded-full bg-violet-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-surface-400">TVs</span>
                  <span className="text-white">68%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-700">
                  <div className="h-full w-[68%] rounded-full bg-emerald-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-surface-400">Audio</span>
                  <span className="text-white">54%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-700">
                  <div className="h-full w-[54%] rounded-full bg-amber-500" />
                </div>
              </div>
            </div>
            <p className="text-xs text-surface-500 mt-4">
              Coverage shows % of technicians certified in each category
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}




