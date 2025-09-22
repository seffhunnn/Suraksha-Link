
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import type { User } from '../../types';
import { Icons } from '../icons';

interface SidebarProps {
  user: User;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ user, isSidebarOpen }) => {
  const { logout, t } = useContext(AppContext);

  const navItems = [
    { to: '/admin/dashboard', icon: Icons.LayoutDashboard, label: t('sidebar.dashboard') },
    { to: '/admin/students', icon: Icons.Users, label: t('sidebar.students') },
    { to: '/admin/drills', icon: Icons.Bell, label: t('sidebar.drills') },
    { to: '/admin/alerts', icon: Icons.Siren, label: t('sidebar.alerts') },
    { to: '/admin/reports', icon: Icons.BarChart, label: t('sidebar.reports') },
  ];

  const baseLinkClasses = "flex items-center py-3 px-4 rounded-lg transition-colors duration-200";
  const inactiveLinkClasses = "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
  const activeLinkClasses = "bg-primary-500 text-white font-semibold shadow-md";

  return (
    <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} overflow-hidden`}>
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 px-4">
        <Icons.Shield className={`h-8 w-8 text-primary-500 transition-all duration-300`} />
        {isSidebarOpen && <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">{t('header.title')}</span>}
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
            title={item.label}
          >
            <item.icon className="h-6 w-6 flex-shrink-0" />
            {isSidebarOpen && <span className="ml-4 whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className={`p-3 rounded-lg ${isSidebarOpen ? 'bg-gray-100 dark:bg-gray-900' : ''}`}>
            <div className="flex items-center">
                <img src={user.avatarUrl} alt="Admin" className="h-10 w-10 rounded-full" />
                {isSidebarOpen && (
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                    </div>
                )}
            </div>
        </div>
        <button
            onClick={logout}
            className={`${baseLinkClasses} ${inactiveLinkClasses} w-full mt-2`}
            title={t('header.logout')}
        >
            <Icons.LogOut className="h-6 w-6"/>
            {isSidebarOpen && <span className="ml-4 whitespace-nowrap">{t('header.logout')}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
