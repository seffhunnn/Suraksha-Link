
import React, { useState, useMemo, createContext, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { User, Module } from './types';
import { Role } from './types';
import { MOCK_USERS } from './constants';
import LoginPage from './pages/LoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentDashboard from './pages/StudentDashboard';
import ModulePage from './pages/ModulePage';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import StudentManagement from './pages/admin/StudentManagement';
import DrillManagement from './pages/admin/DrillManagement';
import AlertsPage from './pages/admin/AlertsPage';
import ReportsPage from './pages/admin/ReportsPage';
import { Icons } from './components/icons';

type Theme = 'light' | 'dark';
type Language = 'en' | 'hi';

export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'light',
  toggleTheme: () => {},
});

export const AppContext = createContext<{
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    setSelectedModule: (module: Module | null) => void;
    completedModuleIds: string[];
    completeModule: (moduleId: string) => void;
    earnedBadges: string[];
    addBadge: (badgeId: string) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, replacements?: Record<string, string | number>) => string;
}>({
    user: null,
    login: () => false,
    logout: () => {},
    setSelectedModule: () => {},
    completedModuleIds: [],
    completeModule: () => {},
    earnedBadges: [],
    addBadge: () => {},
    language: 'en',
    setLanguage: () => {},
    t: (key) => key,
});


function App() {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme || 'light');
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'en');
  const [user, setUser] = useState<User | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [translations, setTranslations] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enResponse, hiResponse] = await Promise.all([
          fetch('./translations/en.json'),
          fetch('./translations/hi.json'),
        ]);
        const enData = await enResponse.json();
        const hiData = await hiResponse.json();
        setTranslations({ en: enData, hi: hiData });
      } catch (error) {
        console.error("Failed to load translation files:", error);
        // Fallback to empty to prevent crash
        setTranslations({ en: {}, hi: {} }); 
      }
    };

    loadTranslations();
  }, []);
  
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
      if (!translations) {
          return ''; // Return empty string or a placeholder while loading
      }
      const langTranslations = translations[language] || translations.en;
      let translation = langTranslations[key] || key;
      if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            translation = translation.replace(`{${rKey}}`, String(replacements[rKey]));
        });
      }
      return translation;
  }, [language, translations]);
  
  const addBadge = (badgeId: string) => {
    setEarnedBadges(prev => {
        if (prev.includes(badgeId)) {
            return prev;
        }
        const newBadges = [...prev, badgeId];
        if (user) {
            localStorage.setItem(`earnedBadges_${user.id}`, JSON.stringify(newBadges));
        }
        return newBadges;
    });
  };

  const login = (email: string, password: string): boolean => {
    const userToLogin = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (userToLogin && userToLogin.password === password) {
        setUser(userToLogin);
        const savedBadges = localStorage.getItem(`earnedBadges_${userToLogin.id}`);
        if (savedBadges) {
            setEarnedBadges(JSON.parse(savedBadges));
        }
        return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setSelectedModule(null);
    setCompletedModuleIds([]);
    setEarnedBadges([]); 
  };
  
  const completeModule = (moduleId: string) => {
    if (!completedModuleIds.includes(moduleId)) {
        addBadge(moduleId); // Modules IDs are used as badge IDs
        setCompletedModuleIds(prev => [...prev, moduleId]);
    }
  };

  const appContextValue = useMemo(() => ({
      user,
      login,
      logout,
      setSelectedModule,
      completedModuleIds,
      completeModule,
      earnedBadges,
      addBadge,
      language,
      setLanguage,
      t,
  }), [user, completedModuleIds, earnedBadges, language, t]);

  const getRedirectPath = () => {
    if (!user) return "/login";
    if (user.role === Role.Admin) return "/admin/dashboard";
    if (user.role === Role.Student) {
      return selectedModule ? "/module" : "/dashboard";
    }
    return "/login";
  };
  
  if (!translations) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <Icons.Loader className="h-10 w-10 text-primary-500 animate-spin" />
        </div>
      );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppContext.Provider value={appContextValue}>
        <HashRouter>
          <Routes>
            {!user ? (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/student" element={<StudentLoginPage />} />
                <Route path="/login/admin" element={<AdminLoginPage />} />
              </>
            ) : user.role === Role.Student ? (
              <>
                {selectedModule ? (
                   <Route path="/module" element={<ModulePage module={selectedModule} />} />
                ) : (
                  <Route path="/dashboard" element={<StudentDashboard />} />
                )}
              </>
            ) : user.role === Role.Admin ? (
               <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardOverview />} />
                  <Route path="students" element={<StudentManagement />} />
                  <Route path="drills" element={<DrillManagement />} />
                  <Route path="alerts" element={<AlertsPage />} />
                  <Route path="reports" element={<ReportsPage />} />
               </Route>
            ) : null}
            <Route path="*" element={<Navigate to={getRedirectPath()} replace />} />
          </Routes>
        </HashRouter>
      </AppContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
