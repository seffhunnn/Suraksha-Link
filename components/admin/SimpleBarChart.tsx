import React from 'react';

interface ChartData {
  month: string;
  score: number;
}

interface SimpleBarChartProps {
  data: ChartData[];
  colorClass?: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, colorClass = 'bg-primary-500' }) => {
  const maxValue = 100; // Assuming preparedness score is out of 100

  return (
    <div className="h-64 flex items-end justify-around p-4 pt-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg relative">
        <div className="absolute top-4 left-12 text-sm text-gray-500 dark:text-gray-400">Score (%)</div>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-xs text-gray-400 dark:text-gray-500 pr-2 h-full py-4 text-right w-10">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
        </div>
         {/* Y-axis grid lines */}
        <div className="absolute left-10 right-4 top-0 bottom-10 flex flex-col justify-between h-full py-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-gray-200 dark:border-gray-600"></div>
            ))}
        </div>

        <div className="flex-1 h-full flex items-end justify-around ml-10">
            {data.map((item) => (
                <div key={item.month} className="flex flex-col items-center w-1/12 h-full justify-end z-10">
                    <div 
                        className={`w-full ${colorClass} rounded-t-md transition-all duration-500 ease-out hover:opacity-80`} 
                        style={{ height: `${(item.score / maxValue) * 100}%` }}
                        title={`Score: ${item.score}%`}
                    >
                    </div>
                    <span className="mt-2 text-xs font-semibold text-gray-600 dark:text-gray-300">{item.month}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default SimpleBarChart;