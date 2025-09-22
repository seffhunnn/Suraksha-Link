
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../components/icons';
import { MOCK_STUDENT_PROGRESS } from '../../constants';
import SimpleBarChart from '../../components/admin/SimpleBarChart';
import { AppContext } from '../../App';

// Mock data for the preparedness chart
const preparednessHistory = [
  { month: 'Jan', score: 45 },
  { month: 'Feb', score: 52 },
  { month: 'Mar', score: 68 },
  { month: 'Apr', score: 65 },
  { month: 'May', score: 75 },
  { month: 'Jun', score: 82 },
];

const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useContext(AppContext);
  const totalStudents = MOCK_STUDENT_PROGRESS.length;
  const avgPreparedness = Math.round(MOCK_STUDENT_PROGRESS.reduce((acc, s) => acc + s.preparednessScore, 0) / totalStudents);
  const drillParticipation = 75; // Mock data
  const activeCertifications = MOCK_STUDENT_PROGRESS.filter(s => s.certification === 'Certified').length;

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold mb-2">{t('admin.dashboard.title')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{t('admin.dashboard.subtitle')}</p>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-stagger-children">
        <MetricCard icon={Icons.Users} title={t('admin.dashboard.totalStudents')} value={totalStudents.toString()} color="text-primary-500" />
        <MetricCard icon={Icons.Shield} title={t('admin.dashboard.avgPreparedness')} value={`${avgPreparedness}%`} color="text-success-500" />
        <MetricCard icon={Icons.Bell} title={t('admin.dashboard.drillParticipation')} value={`${drillParticipation}%`} color="text-warning-500" />
        <MetricCard icon={Icons.BookOpen} title={t('admin.dashboard.certifications')} value={activeCertifications.toString()} color="text-purple-500" />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t('admin.dashboard.quickActions')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-stagger-children" style={{animationDelay: '0.2s'}}>
              <QuickActionButton icon={Icons.CalendarPlus} label={t('admin.dashboard.scheduleDrill')} onClick={() => navigate('/admin/drills')} />
              <QuickActionButton icon={Icons.Siren} label={t('admin.dashboard.sendAlert')} onClick={() => navigate('/admin/alerts')} />
              <QuickActionButton icon={Icons.FileDown} label={t('admin.dashboard.exportReport')} onClick={() => navigate('/admin/reports')} />
          </div>
      </div>

       {/* Preparedness Over Time Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">{t('admin.dashboard.preparednessOverTime')}</h3>
          <SimpleBarChart data={preparednessHistory} colorClass="bg-success-500" />
      </div>
    </div>
  );
};

interface MetricCardProps {
    icon: React.ComponentType<{className?: string}>;
    title: string;
    value: string;
    color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, color }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg flex items-center space-x-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${color}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
            </div>
        </div>
    );
};

interface QuickActionButtonProps {
    icon: React.ComponentType<{className?: string}>;
    label: string;
    onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon: Icon, label, onClick }) => {
    return (
        <button onClick={onClick} className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-1">
            <Icon className="h-6 w-6 mr-3 text-primary-500" />
            <span className="font-semibold">{label}</span>
        </button>
    );
};

export default DashboardOverview;
