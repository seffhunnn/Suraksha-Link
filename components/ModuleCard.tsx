
import React, { useContext } from 'react';
import type { Module } from '../types';
import { DisasterType } from '../types';
import { Icons } from './icons';
import { AppContext } from '../App';

interface ModuleCardProps {
  module: Module;
  onSelect: (module: Module) => void;
  isCompleted: boolean;
}

const disasterIcons: Record<DisasterType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    [DisasterType.Earthquake]: Icons.ShieldAlert,
    [DisasterType.Flood]: Icons.Waves,
    [DisasterType.Fire]: Icons.Flame,
    [DisasterType.Cyclone]: Icons.Wind,
    [DisasterType.Landslide]: Icons.Mountain,
    [DisasterType.Drought]: Icons.Sun,
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onSelect, isCompleted }) => {
  const Icon = disasterIcons[module.disasterType];
  const { language, t } = useContext(AppContext);

  return (
    <div 
        onClick={() => onSelect(module)}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer group transform hover:-translate-y-1 transition-all duration-300">
      <div className="relative">
        <img src={module.imageUrl} alt={module.title[language]} className="h-40 w-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
        <div className="absolute top-3 right-3 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {module.duration} min
        </div>
        {isCompleted && (
          <div className="absolute top-3 left-3 bg-success-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <Icons.ClipboardCheck className="h-4 w-4 mr-1" />
            {t('module.completed')}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 capitalize">
          <Icon className="h-4 w-4 mr-2" />
          {module.disasterType}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white group-hover:text-primary-500 transition-colors">
          {module.title[language]}
        </h3>
      </div>
    </div>
  );
};

export default ModuleCard;
