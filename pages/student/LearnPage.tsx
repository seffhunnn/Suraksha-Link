
import React, { useContext } from 'react';
import ModuleCard from '../../components/ModuleCard';
import { MOCK_MODULES, ALL_BADGES } from '../../constants';
import type { Module } from '../../types';
import { Icons } from '../../components/icons';
import { AppContext } from '../../App';

interface LearnPageProps {
    setSelectedModule: (module: Module | null) => void;
}

const LearnPage: React.FC<LearnPageProps> = ({ setSelectedModule }) => {
    const { completedModuleIds, language, t } = useContext(AppContext);
    
    const completedModules = completedModuleIds.length;
    const totalModules = MOCK_MODULES.length;
    const progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    const moduleBadges = ALL_BADGES.filter(b => b.type === 'module');

    return (
        <div className="animate-fade-in-up">
            {/* Progress Bar */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-3">{t('learn.progressTitle')}</h2>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-primary-600 dark:text-primary-400">{t('learn.overallProgress')}</span>
                        <span className="text-lg font-bold text-gray-700 dark:text-gray-200">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div className="bg-primary-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('learn.modulesCompleted', { completed: completedModules, total: totalModules })}</p>
                </div>
            </div>

            {/* Modules */}
            <div>
                <h2 className="text-2xl font-bold mb-4">{t('learn.allModules')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger-children">
                    {MOCK_MODULES.map(module => (
                        <ModuleCard 
                            key={module.id} 
                            module={module} 
                            onSelect={() => setSelectedModule(module)}
                            isCompleted={completedModuleIds.includes(module.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Badges */}
            <div className="mt-10">
                 <h2 className="text-2xl font-bold mb-4">{t('learn.myBadges')}</h2>
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                        {moduleBadges.map(badge => (
                            <Badge 
                                key={badge.id}
                                icon={badge.icon} 
                                label={badge.label[language]} 
                                achieved={completedModuleIds.includes(badge.id)} 
                            />
                        ))}
                    </div>
                 </div>
            </div>
        </div>
    );
};

const Badge: React.FC<{icon: React.ComponentType<{className?: string}>; label: string; achieved: boolean}> = ({ icon: Icon, label, achieved }) => (
    <div className={`text-center transition-opacity ${achieved ? 'opacity-100' : 'opacity-40'}`}>
        <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center ${achieved ? 'bg-success-100 dark:bg-success-900' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <Icon className={`h-10 w-10 ${achieved ? 'text-success-500' : 'text-gray-500'}`} />
        </div>
        <p className="mt-2 text-sm font-semibold">{label}</p>
    </div>
)

export default LearnPage;
