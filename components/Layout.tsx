
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Cloud, 
  Award, 
  BookOpen, 
  Settings,
  Bell,
  Menu,
  X,
  PieChart
} from 'lucide-react';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; active: boolean }> = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                O
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">OpenLearn Hub</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
            <NavItem to="/" icon={<Home size={20} />} label="Dashboard" active={location.pathname === '/'} />
            <NavItem to="/hub" icon={<BookOpen size={20} />} label="Learning Hub" active={location.pathname.startsWith('/hub')} />
            <NavItem to="/drive" icon={<Cloud size={20} />} label="Drive Organizer" active={location.pathname === '/drive'} />
            <NavItem to="/heatmap" icon={<PieChart size={20} />} label="Topic Heatmap" active={location.pathname === '/heatmap'} />
            <NavItem to="/leaderboard" icon={<Award size={20} />} label="Contributors" active={location.pathname === '/leaderboard'} />
          </nav>

          <div className="p-4 border-t border-gray-100">
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" active={location.pathname === '/settings'} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 -ml-2 text-gray-600">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search subjects, topics or personal notes..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 rounded-full text-sm transition-all focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
              JD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
