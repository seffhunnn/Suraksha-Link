
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import Header from '../components/Header';
import Chatbot from '../components/Chatbot';
import { MOCK_USERS } from '../constants';
import { Role } from '../types';
import { Icons } from '../components/icons';
import LearnPage from './student/LearnPage';
import SimulatePage from './student/SimulatePage';
import DrillsPage from './student/DrillsPage';
import DirectoryPage from './student/DirectoryPage';

type ActiveTab = 'learn' | 'simulate' | 'drills' | 'directory';

const StudentDashboard: React.FC = () => {
    const { user, setSelectedModule, t } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState<ActiveTab>('learn');
    const studentUser = user || MOCK_USERS.find(u => u.role === Role.Student)!;

    const tabs = [
        { id: 'learn', label: t('tabs.learn'), icon: Icons.BookOpen },
        { id: 'simulate', label: t('tabs.simulate'), icon: Icons.Gamepad2 },
        { id: 'drills', label: t('tabs.drills'), icon: Icons.Bell },
        { id: 'directory', label: t('tabs.directory'), icon: Icons.Siren },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'learn':
                return <LearnPage setSelectedModule={setSelectedModule} />;
            case 'simulate':
                return <SimulatePage />;
            case 'drills':
                return <DrillsPage />;
            case 'directory':
                return <DirectoryPage />;
            default:
                return <LearnPage setSelectedModule={setSelectedModule} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header user={studentUser} />
            
            <main className="container mx-auto">
                {/* Tab Navigation */}
                <div className="sticky top-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-30 shadow-sm">
                    <div className="p-2 sm:p-4">
                        <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-xl">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as ActiveTab)}
                                    className={`flex flex-col sm:flex-row items-center justify-center p-2 sm:py-3 sm:px-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                                        activeTab === tab.id
                                            ? 'bg-primary-500 text-white shadow-md'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'
                                    }`}
                                >
                                    <tab.icon className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                    {renderContent()}
                </div>
            </main>
            
            <Chatbot />
        </div>
    );
};

export default StudentDashboard;
