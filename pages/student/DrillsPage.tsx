
import React, { useState, useContext } from 'react';
import { Icons } from '../../components/icons';
import { VIRTUAL_DRILLS } from '../../constants/drillData';
import { ALL_BADGES } from '../../constants';
import type { DrillContent } from '../../constants/drillData';
import VirtualDrill from '../../components/drills/VirtualDrill';
import { AppContext } from '../../App';

interface CompletedDrill {
    id: string;
    score: number;
}

// Mock leaderboard data for display
const LEADERBOARD_DATA = [
    { name: 'Anika Sharma', score: 285, rank: 1 },
    { name: 'Kabir Gupta', score: 270, rank: 2 },
    { name: 'Rohan Sharma', score: 250, rank: 3 }, // Assuming this is the current user
    { name: 'Saanvi Desai', score: 240, rank: 4 },
    { name: 'Aarav Singh', score: 220, rank: 5 },
];

const DrillsPage: React.FC = () => {
    const { addBadge, earnedBadges, t, language } = useContext(AppContext);
    const [activeDrill, setActiveDrill] = useState<DrillContent | null>(null);
    const [completedDrills, setCompletedDrills] = useState<CompletedDrill[]>([]);
    
    const drillBadges = ALL_BADGES.filter(b => b.type === 'drill');

    const handleDrillComplete = (drillId: string, score: number) => {
        setCompletedDrills(prev => {
            const existing = prev.find(d => d.id === drillId);
            if (existing) {
                // Update score if it's higher
                return prev.map(d => d.id === drillId ? { ...d, score: Math.max(d.score, score) } : d);
            }
            return [...prev, { id: drillId, score }];
        });
        setActiveDrill(null);
    };
    
    const totalScore = completedDrills.reduce((acc, drill) => acc + drill.score, 0);

    return (
        <div className="animate-fade-in-up">
            {activeDrill && (
                <VirtualDrill 
                    drill={activeDrill} 
                    onComplete={handleDrillComplete} 
                    onClose={() => setActiveDrill(null)} 
                    addBadge={addBadge}
                />
            )}
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 text-center">
                 <h1 className="text-3xl font-bold mb-2">{t('drills.title')}</h1>
                 <p className="text-gray-600 dark:text-gray-400 mb-4">{t('drills.subtitle')}</p>
                 <div className="inline-block bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-full">
                    <span className="font-semibold">{t('drills.totalScore', { score: totalScore })}</span>
                 </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Drills List */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">{t('drills.upcoming')}</h2>
                    <div className="space-y-4 animate-stagger-children">
                        {VIRTUAL_DRILLS.map(drill => {
                             const completed = completedDrills.find(d => d.id === drill.id);
                             return (
                                <div key={drill.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center border-l-4 border-primary-500">
                                    <div>
                                        <p className="font-bold text-lg text-gray-800 dark:text-white">{drill.title[language]}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{drill.objective[language]}</p>
                                        {completed && (
                                            <p className="text-sm font-semibold text-success-600 dark:text-success-400 mt-2">
                                                {t('drills.bestScore', { score: completed.score })}
                                            </p>
                                        )}
                                    </div>
                                    <button 
                                        onClick={() => setActiveDrill(drill)}
                                        className="mt-3 sm:mt-0 px-6 py-2.5 text-sm font-semibold rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-transform transform hover:scale-105"
                                    >
                                        {completed ? t('drills.tryAgain') : t('drills.join')}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    {/* My Certifications Section */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4">{t('drills.certifications')}</h2>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                                {drillBadges.map(badge => (
                                    <Badge 
                                        key={badge.id}
                                        icon={badge.icon} 
                                        label={badge.label[language]} 
                                        achieved={earnedBadges.includes(badge.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                     <h2 className="text-2xl font-bold mb-4">{t('drills.leaderboard')}</h2>
                     <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                        <ul className="space-y-3">
                            {LEADERBOARD_DATA.map(({ name, score, rank }) => {
                                const isUser = name === 'Rohan Sharma';
                                const rankIcon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
                                return (
                                    <li key={rank} className={`flex items-center p-3 rounded-lg ${isUser ? 'bg-primary-100 dark:bg-primary-900/50' : ''}`}>
                                        <span className="font-bold text-lg w-10">{rankIcon}</span>
                                        <div className="flex-1">
                                            <p className={`font-semibold ${isUser ? 'text-primary-800 dark:text-primary-200' : ''}`}>{name}</p>
                                        </div>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">{score}</span>
                                    </li>
                                );
                            })}
                        </ul>
                     </div>
                </div>
            </div>
        </div>
    );
};


const Badge: React.FC<{icon: React.ComponentType<{className?: string}>; label: string; achieved: boolean}> = ({ icon: Icon, label, achieved }) => (
    <div className={`text-center transition-opacity w-28 ${achieved ? 'opacity-100' : 'opacity-40'}`}>
        <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center ${achieved ? 'bg-success-100 dark:bg-success-900' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <Icon className={`h-10 w-10 ${achieved ? 'text-success-500' : 'text-gray-500'}`} />
        </div>
        <p className="mt-2 text-sm font-semibold">{label}</p>
    </div>
)


export default DrillsPage;
