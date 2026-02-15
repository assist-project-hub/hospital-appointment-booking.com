import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, Stethoscope, Calendar, Users, Settings, Mail, ExternalLink, LogOut } from 'lucide-react';
import { setAdminLoggedIn } from '../lib/storage';

const links = [
  { to: 'departments', label: 'Departments', icon: Building2 },
  { to: 'doctors', label: 'Doctors', icon: Stethoscope },
  { to: 'bookings', label: 'Bookings', icon: Calendar },
  { to: 'customers', label: 'Customers', icon: Users },
  { to: 'settings', label: 'Settings', icon: Settings },
  { to: 'contacts', label: 'Contact List', icon: Mail },
];

export function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAdminLoggedIn(false);
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-red-400 transition-colors rounded-lg w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
