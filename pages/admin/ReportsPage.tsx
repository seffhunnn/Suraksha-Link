
import React, { useContext } from 'react';
import { Icons } from '../../components/icons';
import { MOCK_STUDENT_PROGRESS, MOCK_MODULES } from '../../constants';
import type { StudentProgress } from '../../types';
import { AppContext } from '../../App';

const ReportsPage: React.FC = () => {
    const { language, t } = useContext(AppContext);
    const totalStudents = MOCK_STUDENT_PROGRESS.length;
    
    // Calculate Key Metrics
    const avgPreparedness = Math.round(MOCK_STUDENT_PROGRESS.reduce((acc, s) => acc + s.preparednessScore, 0) / totalStudents) || 0;
    const certifiedCount = MOCK_STUDENT_PROGRESS.filter(s => s.certification === 'Certified').length;
    const certificationRate = Math.round((certifiedCount / totalStudents) * 100) || 0;
    const totalModulesCompleted = MOCK_STUDENT_PROGRESS.reduce((acc, s) => acc + s.modulesCompleted, 0);

    // Calculate Certification Distribution
    const certDistribution = MOCK_STUDENT_PROGRESS.reduce((acc, student) => {
        acc[student.certification] = (acc[student.certification] || 0) + 1;
        return acc;
    }, {} as Record<StudentProgress['certification'], number>);

    // Calculate Module Completion
    const moduleCompletion = MOCK_MODULES.map(module => {
        const completions = MOCK_STUDENT_PROGRESS.filter(s => s.modulesCompleted >= parseInt(module.id.replace('M0', ''))).length; // Simplified logic for demo
        return {
            name: module.title[language],
            completions: completions,
            rate: Math.round((completions / totalStudents) * 100)
        };
    });

    const handlePrint = () => {
        const now = new Date();
        const formattedDateTime = now.toLocaleString('en-IN', {
            dateStyle: 'long',
            timeStyle: 'short',
        });
        document.body.setAttribute('data-datetime', formattedDateTime);
        window.print();
    };

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{t('admin.reports.title')}</h1>
                <button 
                    onClick={handlePrint}
                    className="flex items-center justify-center px-4 py-2 text-md font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 no-print"
                >
                    <Icons.FileDown className="h-5 w-5 mr-2" />
                    {t('admin.reports.export')}
                </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <MetricCard icon={Icons.Shield} title={t('admin.reports.avgPreparedness')} value={`${avgPreparedness}%`} />
                <MetricCard icon={Icons.ClipboardCheck} title={t('admin.reports.certRate')} value={`${certificationRate}%`} />
                <MetricCard icon={Icons.BookOpen} title={t('admin.reports.modulesCompleted')} value={totalModulesCompleted.toLocaleString()} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">{t('admin.reports.moduleStatus')}</h3>
                    <div className="space-y-4">
                        {moduleCompletion.map(item => (
                            <div key={item.name}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                                    <span className="text-sm font-semibold">{item.rate}% ({item.completions}/{totalStudents})</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${item.rate}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">{t('admin.reports.certDistribution')}</h3>
                    <div className="space-y-3">
                         {Object.entries(certDistribution).map(([status, count]) => {
                            const percentage = Math.round((count / totalStudents) * 100);
                            const statusTyped = status as StudentProgress['certification'];
                            const colors = {
                                'Certified': 'bg-success-500',
                                'In Progress': 'bg-warning-500',
                                'Not Started': 'bg-gray-400',
                            };
                            return (
                                <div key={status} className="flex items-center">
                                    <div className={`w-4 h-4 rounded-full mr-3 ${colors[statusTyped]}`}></div>
                                    <span className="font-semibold flex-1">{status}</span>
                                    <span className="text-gray-600 dark:text-gray-400">{count} students ({percentage}%)</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface MetricCardProps {
    icon: React.ComponentType<{className?: string}>;
    title: string;
    value: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg">
             <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-500 mr-4">
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
