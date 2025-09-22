
import React, { useContext } from 'react';
import type { Alert } from '../types';
import { AlertSeverity } from '../types';
import { Icons } from './icons';
import { AppContext } from '../App';

interface AlertCardProps {
  alert: Alert;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const { language } = useContext(AppContext);

  const getSeverityStyles = () => {
    switch (alert.severity) {
      case AlertSeverity.Warning:
        return 'bg-danger-500 border-danger-700';
      case AlertSeverity.Watch:
        return 'bg-warning-500 border-warning-700';
      case AlertSeverity.Advisory:
        return 'bg-primary-500 border-primary-700';
      default:
        return 'bg-gray-500 border-gray-700';
    }
  };

  return (
    <div className={`text-white rounded-lg shadow-lg overflow-hidden border-l-4 ${getSeverityStyles()}`}>
      <div className="p-4 bg-white/10 backdrop-blur-sm">
        <div className="flex items-start">
            <Icons.ShieldAlert className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
            <div>
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-lg">{alert.title[language]} - {alert.region}</h4>
                </div>
                <p className="text-sm font-semibold opacity-80">{alert.severity}</p>
                <p className="mt-2 text-white/90">{alert.message[language]}</p>
                 <p className="text-xs mt-3 opacity-70">
                    {new Date(alert.timestamp).toLocaleString()}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
