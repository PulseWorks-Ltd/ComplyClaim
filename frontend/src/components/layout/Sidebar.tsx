import { Link, useLocation } from 'react-router-dom';
import { FileText, TrendingUp, FileCheck, Shield } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: FileText, label: 'Payment Claims' },
    { path: '/variations', icon: TrendingUp, label: 'Variations' },
    { path: '/tenders', icon: FileCheck, label: 'Tenders' },
    { path: '/health-safety', icon: Shield, label: 'Health & Safety' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">ComplyClaim</h1>
        <p className="text-sm text-gray-500 mt-1">NZ Subcontractor Portal</p>
      </div>
      
      <nav className="px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                isActive(item.path)
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="p-4 bg-primary-50 rounded-lg">
          <p className="text-xs text-primary-900 font-medium">🚀 AI Assistant Coming Soon</p>
          <p className="text-xs text-primary-700 mt-1">
            Modular design ready for future AI compliance features
          </p>
        </div>
      </div>
    </aside>
  );
};
