
import React from 'react';
import type { LucideProps } from 'lucide-react';
import { Icons } from './icons';

interface DashboardCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
  onClick: () => void;
  colorClass: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, description, onClick, colorClass }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className={`p-4 ${colorClass} text-white flex items-center`}>
        <Icon className="h-8 w-8 mr-4" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="p-5">
        <p className="text-gray-600 dark:text-gray-300 mb-4 h-12">{description}</p>
        <button
          onClick={onClick}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Explore
          <Icons.ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DashboardCard;
