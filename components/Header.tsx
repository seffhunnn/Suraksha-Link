
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext, ThemeContext } from '../App';
import type { User } from '../types';
import { Icons } from './icons';
import { ALL_BADGES } from '../constants';

interface HeaderProps {
    user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const { logout, earnedBadges, language, setLanguage, t } = useContext(AppContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const userBadges = ALL_BADGES.filter(badge => earnedBadges.includes(badge.id));
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <Icons.Shield className="h-8 w-8 text-primary-500" />
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">{t('header.title')}</h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 w-20 text-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 text-sm font-semibold"
                            aria-label="Toggle language"
                        >
                           {t('toggleLanguage')}
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Icons.Moon className="h-6 w-6" /> : <Icons.Sun className="h-6 w-6" />}
                        </button>
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                                <img src={user.avatarUrl} alt="User Avatar" className="h-9 w-9 rounded-full" />
                                <span className="hidden sm:inline text-gray-700 dark:text-gray-200 font-medium">{user.name}</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-3 border-b dark:border-gray-700">
                                        <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                                    </div>
                                    <div className="px-4 py-3 border-b dark:border-gray-700">
                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">{t('header.myBadges')}</p>
                                        {userBadges.length > 0 ? (
                                            <div className="grid grid-cols-5 gap-2">
                                                {userBadges.map(badge => (
                                                    <div key={badge.id} title={badge.label[language]} className="flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                                        <badge.icon className="h-6 w-6 text-primary-500" />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('header.noBadges')}</p>
                                        )}
                                    </div>
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); logout(); }}
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Icons.LogOut className="mr-3 h-5 w-5"/>
                                        {t('header.logout')}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
