
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/icons';
import { ThemeContext, AppContext } from '../App';

const LoginPage: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, setLanguage, t } = useContext(AppContext);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 relative">
            <div className="absolute top-6 right-6 flex items-center space-x-2">
                 <button
                    onClick={toggleLanguage}
                    className="p-2 w-20 text-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 focus:ring-primary-500 font-semibold"
                    aria-label="Toggle language"
                >
                    {t('toggleLanguage')}
                </button>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 focus:ring-primary-500"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <Icons.Moon className="h-6 w-6" /> : <Icons.Sun className="h-6 w-6" />}
                </button>
            </div>

            <div className="w-full max-w-md mx-auto text-center">
                <div className="flex justify-center items-center mb-6" style={{ perspective: '800px' }}>
                    <Icons.Shield className="h-16 w-16 text-primary-500 animate-glow animate-spin-y" style={{ transformStyle: 'preserve-3d' }} />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                    {t('login.title')}
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                    {t('login.subtitle')}
                </p>
            </div>
            
            <div className="mt-12 w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">{t('login.chooseRole')}</h2>
                <div className="space-y-6">
                    <Link
                        to="/login/student"
                        className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-transform transform hover:scale-105"
                    >
                        <Icons.User className="h-6 w-6 mr-3"/>
                        {t('login.studentBtn')}
                    </Link>
                    <Link
                        to="/login/admin"
                        className="w-full flex items-center justify-center py-4 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-lg font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                    >
                        <Icons.ShieldAlert className="h-6 w-6 mr-3" />
                        {t('login.adminBtn')}
                    </Link>
                </div>
            </div>

            <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>{t('login.footer.copyright', { year: new Date().getFullYear() })}</p>
                <p>{t('login.footer.motto')}</p>
            </footer>
        </div>
    );
};

export default LoginPage;
