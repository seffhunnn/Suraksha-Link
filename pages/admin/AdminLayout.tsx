
import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { AppContext, ThemeContext } from '../../App';
import { MOCK_USERS } from '../../constants';
import { Role } from '../../types';
import { Icons } from '../../components/icons';

const AdminLayout: React.FC = () => {
    const { user, language, setLanguage, t } = useContext(AppContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const adminUser = user || MOCK_USERS.find(u => u.role === Role.Admin)!;

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="hidden lg:flex no-print">
                <Sidebar user={adminUser} isSidebarOpen={isSidebarOpen} />
            </div>
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between lg:justify-end px-4 sm:px-6 h-16 flex-shrink-0 border-b border-gray-200 dark:border-gray-700 no-print">
                     <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hidden lg:block mr-auto">
                        {isSidebarOpen ? <Icons.ChevronLeft className="h-6 w-6" /> : <Icons.ChevronRight className="h-6 w-6" />}
                    </button>
                    {/* Mobile menu button can go here */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 w-20 text-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none text-sm font-semibold"
                            aria-label="Toggle language"
                        >
                            {t('toggleLanguage')}
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Icons.Moon className="h-6 w-6" /> : <Icons.Sun className="h-6 w-6" />}
                        </button>
                        {/* Mobile sidebar can be triggered from here */}
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="container mx-auto px-4 sm:px-6 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
