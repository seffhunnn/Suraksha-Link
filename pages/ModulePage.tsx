
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import type { Module } from '../types';
import { Icons } from '../components/icons';

interface ModulePageProps {
  module: Module;
}

const PASSING_SCORE = 1; // Simplified for the 2-question demo

const ModulePage: React.FC<ModulePageProps> = ({ module }) => {
    const { setSelectedModule, completeModule, language, t } = useContext(AppContext);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswerSelect = (questionIndex: number, option: string) => {
        setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
    };
    
    const quizScore = module.content.quiz.questions.reduce((score, q, index) => {
        return score + (selectedAnswers[index] === q.correctAnswer[language] ? 1 : 0);
    }, 0);

    const handleSubmitQuiz = () => {
        setShowResults(true);
        if (quizScore >= PASSING_SCORE) {
            completeModule(module.id);
        }
    };

    const isQuizPassed = quizScore >= PASSING_SCORE;
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
                <div className="container mx-auto p-4 flex items-center justify-between">
                    <button onClick={() => setSelectedModule(null)} className="flex items-center text-primary-500 hover:text-primary-700">
                        <Icons.ArrowLeft className="h-5 w-5 mr-2" />
                        {t('module.back')}
                    </button>
                     <h1 className="text-xl font-bold text-gray-800 dark:text-white">{module.title[language]}</h1>
                </div>
            </header>
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                {/* Video Player */}
                <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe 
                            src={module.content.videoUrl}
                            title={module.title[language]} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>

                {/* Do's and Don'ts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-success-500 mb-4">{t('module.dos')}</h3>
                        <ul className="space-y-3">
                            {module.content.dos.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-success-500 mr-3 mt-1">&#10003;</span>
                                    <span>{item[language]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-danger-500 mb-4">{t('module.donts')}</h3>
                         <ul className="space-y-3">
                            {module.content.donts.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-danger-500 mr-3 mt-1">&#10007;</span>
                                    <span>{item[language]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Quiz Section */}
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-6">{t('module.quizTitle')}</h3>
                    {module.content.quiz.questions.map((q, index) => (
                        <div key={index} className="mb-6">
                            <p className="font-semibold mb-3">{index + 1}. {q.question[language]}</p>
                            <div className="space-y-2">
                                {q.options.map(option => {
                                    const isSelected = selectedAnswers[index] === option[language];
                                    let optionClass = "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700";
                                    if (showResults) {
                                        if (option[language] === q.correctAnswer[language]) {
                                            optionClass = "border-success-500 bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-100";
                                        } else if (isSelected) {
                                            optionClass = "border-danger-500 bg-danger-100 dark:bg-danger-900 text-danger-800 dark:text-danger-100";
                                        }
                                    } else if (isSelected) {
                                        optionClass = "border-primary-500 bg-primary-100 dark:bg-primary-900";
                                    }
                                    return <button 
                                            key={option.en} 
                                            onClick={() => !showResults && handleAnswerSelect(index, option[language])}
                                            className={`w-full text-left p-3 border rounded-lg transition-all ${optionClass}`}
                                            disabled={showResults}
                                        >
                                            {option[language]}
                                        </button>;
                                })}
                            </div>
                        </div>
                    ))}
                    {!showResults ? (
                        <button
                            onClick={handleSubmitQuiz}
                            disabled={Object.keys(selectedAnswers).length !== module.content.quiz.questions.length}
                            className="px-6 py-3 bg-primary-600 text-white font-bold rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-primary-700"
                        >
                            {t('module.submitQuiz')}
                        </button>
                    ) : (
                         <div className={`mt-6 p-4 rounded-lg text-center ${isQuizPassed ? 'bg-success-100 dark:bg-success-900' : 'bg-danger-100 dark:bg-danger-900'}`}>
                            <p className={`text-xl font-bold ${isQuizPassed ? 'text-success-800 dark:text-success-200' : 'text-danger-800 dark:text-danger-200'}`}>
                                {t('module.quizResult', {score: quizScore, total: module.content.quiz.questions.length})}
                            </p>
                            {isQuizPassed ? (
                                <p className="mt-2 text-success-700 dark:text-success-300">{t('module.quizPass')}</p>
                            ) : (
                                <p className="mt-2 text-danger-700 dark:text-danger-300">{t('module.quizFail')}</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ModulePage;
