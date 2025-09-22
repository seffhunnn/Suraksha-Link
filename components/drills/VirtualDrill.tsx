import React, { useState, useEffect, useContext } from 'react';
import type { DrillContent } from '../../constants/drillData';
import type { MultilingualString } from '../../types';
import { Icons } from '../icons';
import { AppContext } from '../../App';

interface VirtualDrillProps {
  drill: DrillContent;
  onComplete: (drillId: string, score: number) => void;
  onClose: () => void;
  addBadge: (badgeId: string) => void;
}

interface Choice {
    text: MultilingualString;
    isCorrect: boolean;
}

const VirtualDrill: React.FC<VirtualDrillProps> = ({ drill, onComplete, onClose, addBadge }) => {
  const { language } = useContext(AppContext);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const currentStep = drill.steps[currentStepIndex];
  const isDrillFinished = currentStepIndex >= drill.steps.length;
  
  const totalChoices = drill.steps.filter(s => s.type === 'choice').length;
  const finalScore = totalChoices > 0 ? Math.round((score / totalChoices) * 100) : 100;
  const isBadgeUnlocked = finalScore >= 80;

  useEffect(() => {
      if(isDrillFinished && isBadgeUnlocked) {
          addBadge(drill.badgeId);
      }
  }, [isDrillFinished, isBadgeUnlocked, addBadge, drill.badgeId]);

  const handleNextStep = () => {
    setSelectedChoice(null);
    setFeedback(null);
    setCurrentStepIndex(prev => prev + 1);
  };

  const handleChoice = (choice: Choice) => {
    if (selectedChoice) return;

    setSelectedChoice(choice);
    if (choice.isCorrect) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    setTimeout(handleNextStep, 1500); // Auto-advance after feedback
  };

  if (isDrillFinished) {
    return (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md w-full animate-modal-in">
           {isBadgeUnlocked ? (
            <Icons.CheckCircle className="h-16 w-16 text-success-500 mx-auto mb-4" />
          ) : (
            <Icons.XCircle className="h-16 w-16 text-danger-500 mx-auto mb-4" />
          )}
          <h2 className="text-3xl font-bold mb-2">Drill Complete!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">You have successfully completed the {drill.title[language]}.</p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <p className="text-lg">Your Score</p>
            <p className={`text-4xl font-bold ${isBadgeUnlocked ? 'text-primary-500' : 'text-danger-500'}`}>{finalScore}%</p>
          </div>
           {isBadgeUnlocked ? (
            <div className="flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-lg">
                <drill.badgeIcon className="h-8 w-8 text-yellow-500 mr-3" />
                <p className="font-semibold">Badge Unlocked: {drill.badgeName}</p>
            </div>
          ) : (
             <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-600 p-3 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-gray-200">Score 80% or higher to unlock the badge. Try again!</p>
            </div>
          )}
          <button
            onClick={() => onComplete(drill.id, finalScore)}
            className="mt-6 w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Return to Drills Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full animate-fade-in relative">
         <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10"
            aria-label="Close Drill"
        >
            <Icons.X className="h-6 w-6" />
        </button>

        <div className="flex justify-between items-start mb-4">
            <div>
                 <h2 className="text-2xl font-bold">{drill.title[language]}</h2>
                 <p className="text-gray-500 dark:text-gray-400">Step {currentStepIndex + 1} of {drill.steps.length}</p>
            </div>
            <div className="font-bold text-lg pr-8">Score: {score}</div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center min-h-[250px] flex flex-col items-center justify-center">
            {currentStep.image && (
                <img src={currentStep.image} alt="Drill step illustration" className="mb-4 rounded-lg shadow-md max-h-48 w-full object-cover" />
            )}
            <p className="text-xl font-semibold">{currentStep.description[language]}</p>
        </div>

        <div className="mt-6">
            {currentStep.type === 'info' && (
                <button onClick={handleNextStep} className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 flex items-center justify-center">
                    Next <Icons.ChevronRight className="inline h-5 w-5 ml-2" />
                </button>
            )}
            {currentStep.type === 'choice' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStep.options?.map(option => {
                        const isSelected = selectedChoice?.text.en === option.text.en;
                        let buttonClass = "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600";
                        if (isSelected) {
                            buttonClass = feedback === 'correct' 
                                ? "bg-success-500 border-success-700 text-white" 
                                : "bg-danger-500 border-danger-700 text-white";
                        }
                        return (
                            <button
                                key={option.text.en}
                                onClick={() => handleChoice(option)}
                                disabled={!!selectedChoice}
                                className={`p-4 font-semibold text-lg border-2 rounded-lg transition-all text-left flex items-center justify-center ${buttonClass}`}
                            >
                                {isSelected && (
                                    feedback === 'correct' ? <Icons.CheckCircle className="h-6 w-6 mr-3" /> : <Icons.XCircle className="h-6 w-6 mr-3" />
                                )}
                                {option.text[language]}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default VirtualDrill;
