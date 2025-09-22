import React, { useState, useContext } from 'react';
import { Icons } from '../icons';
import type { MultilingualString } from '../../types';
import { AppContext } from '../../App';

const t = (en: string, hi: string): MultilingualString => ({ en, hi });

const SEQUENCES = [
    {
        title: t("A fire alarm sounds! What's the correct procedure?", "आग का अलार्म बजता है! सही प्रक्रिया क्या है?"),
        actions: [
            { id: 'f1', text: t('Activate nearest fire alarm', 'निकटतम फायर अलार्म सक्रिय करें'), icon: Icons.Bell, correctOrder: 0 },
            { id: 'f2', text: t('Crawl low if there is smoke', 'अगर धुआं हो तो नीचे झुककर चलें'), icon: Icons.User, correctOrder: 1 },
            { id: 'f3', text: t('Evacuate using the stairs', 'सीढ़ियों का उपयोग करके बाहर निकलें'), icon: Icons.Users, correctOrder: 2 },
            { id: 'f4', text: t('Go to the designated assembly point', 'निर्दिष्ट सभा स्थल पर जाएं'), icon: Icons.MapPin, correctOrder: 3 },
            { id: 'f5', text: t('Do not re-enter the building', 'इमारत में दोबारा प्रवेश न करें'), icon: Icons.XCircle, correctOrder: 4 },
        ]
    },
    {
        title: t("An earthquake starts! What should you do?", "भूकंप शुरू हो गया है! आपको क्या करना चाहिए?"),
        actions: [
            { id: 'e1', text: t('Evacuate to an open area', 'एक खुले क्षेत्र में खाली करें'), icon: Icons.Users, correctOrder: 3 },
            { id: 'e2', text: t('Drop, Cover, and Hold On', 'झुको, ढको, और कसकर पकड़ो'), icon: Icons.Shield, correctOrder: 0 },
            { id: 'e3', text: t('Go to the Assembly Point', 'सभा स्थल पर जाएं'), icon: Icons.MapPin, correctOrder: 4 },
            { id: 'e4', text: t('Check for injuries and hazards', 'चोटों और खतरों की जांच करें'), icon: Icons.ClipboardCheck, correctOrder: 2 },
            { id: 'e5', text: t('Wait for the shaking to stop', 'कंपन रुकने तक प्रतीक्षा करें'), icon: Icons.Timer, correctOrder: 1 },
        ]
    },
    {
        title: t("A flood warning is issued for your area. How do you prepare?", "आपके क्षेत्र के लिए बाढ़ की चेतावनी जारी की गई है। आप कैसे तैयारी करते हैं?"),
        actions: [
            { id: 'fl1', text: t('Move essentials to an upper floor', 'आवश्यक वस्तुओं को ऊपरी मंजिल पर ले जाएं'), icon: Icons.Box, correctOrder: 0 },
            { id: 'fl2', text: t('Secure your home and turn off utilities', 'अपने घर को सुरक्षित करें और उपयोगिताओं को बंद कर दें'), icon: Icons.Settings, correctOrder: 1 },
            { id: 'fl3', text: t('Monitor emergency broadcasts', 'आपातकालीन प्रसारण की निगरानी करें'), icon: Icons.Bell, correctOrder: 2 },
            { id: 'fl4', text: t('Evacuate if instructed by authorities', 'अधिकारियों द्वारा निर्देश दिए जाने पर खाली करें'), icon: Icons.Siren, correctOrder: 3 },
            { id: 'fl5', text: t('Avoid walking or driving in floodwater', 'बाढ़ के पानी में चलने या गाड़ी चलाने से बचें'), icon: Icons.XCircle, correctOrder: 4 },
        ]
    },
    {
        title: t("Someone has a minor cut. What are the first aid steps?", "किसी को मामूली कट लगा है। प्राथमिक उपचार के चरण क्या हैं?"),
        actions: [
            { id: 'a1', text: t('Wash your hands', 'अपने हाथ धोएं'), icon: Icons.User, correctOrder: 0 },
            { id: 'a2', text: t('Apply gentle pressure to stop bleeding', 'रक्तस्राव को रोकने के लिए हल्का दबाव डालें'), icon: Icons.Shield, correctOrder: 1 },
            { id: 'a3', text: t('Clean the wound with water', 'घाव को पानी से साफ करें'), icon: Icons.Waves, correctOrder: 2 },
            { id: 'a4', text: t('Apply antibiotic ointment', 'एंटीबायोटिक मरहम लगाएं'), icon: Icons.ClipboardCheck, correctOrder: 3 },
            { id: 'a5', text: t('Cover with a sterile bandage', 'एक जीवाणुरहित पट्टी से ढकें'), icon: Icons.Box, correctOrder: 4 },
        ]
    },
    {
        title: t("A cyclone is approaching. How do you stay safe?", "एक चक्रवात आ रहा है। आप कैसे सुरक्षित रहते हैं?"),
        actions: [
            { id: 'c1', text: t('Board up windows and secure loose items outside', 'खिड़कियों पर तख्ते लगाएं और बाहर ढीली वस्तुओं को सुरक्षित करें'), icon: Icons.Shield, correctOrder: 0 },
            { id: 'c2', text: t('Prepare an emergency kit', 'एक आपातकालीन किट तैयार करें'), icon: Icons.Backpack, correctOrder: 1 },
            { id: 'c3', text: t('Stay indoors, away from windows', 'घर के अंदर, खिड़कियों से दूर रहें'), icon: Icons.Home, correctOrder: 2 },
            { id: 'c4', text: t("Don't go out during the 'eye' of the storm", "तूफान की 'आंख' के दौरान बाहर न जाएं"), icon: Icons.Eye, correctOrder: 3 },
            { id: 'c5', text: t('Listen to authorities for the all-clear signal', 'अधिकारियों से ऑल-क्लियर सिग्नल सुनें'), icon: Icons.Bell, correctOrder: 4 },
        ]
    }
];

interface Props {
  onGameComplete: () => void;
}

const ActionSequencer: React.FC<Props> = ({ onGameComplete }) => {
    const { language, t: translate } = useContext(AppContext);
    const [currentStage, setCurrentStage] = useState(0);
    const [score, setScore] = useState(0);
    const [actions, setActions] = useState(SEQUENCES[currentStage].actions.sort(() => Math.random() - 0.5));
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);

    const currentSequence = SEQUENCES[currentStage];
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        setDraggedId(id);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropId: string) => {
        if (draggedId === null || showResult) return;
        
        const draggedIndex = actions.findIndex(a => a.id === draggedId);
        const dropIndex = actions.findIndex(a => a.id === dropId);
        
        const newActions = [...actions];
        const [draggedItem] = newActions.splice(draggedIndex, 1);
        newActions.splice(dropIndex, 0, draggedItem);
        
        setActions(newActions);
        setDraggedId(null);
    };

    const handleNextStage = () => {
        if (currentStage < SEQUENCES.length - 1) {
            const nextStage = currentStage + 1;
            setCurrentStage(nextStage);
            setActions(SEQUENCES[nextStage].actions.sort(() => Math.random() - 0.5));
            setShowResult(false);
        } else {
            setGameFinished(true);
            if (score >= 3) { // Pass if 3 or more correct
                onGameComplete();
            }
        }
    };

    const checkSequence = () => {
        setShowResult(true);
        const isCorrect = actions.every((action, index) => action.correctOrder === index);
        if (isCorrect) {
            setScore(s => s + 1);
        }
        setTimeout(handleNextStage, 2500); // Wait before moving to the next stage
    };

    const resetCurrentSequence = () => {
        setActions(currentSequence.actions.sort(() => Math.random() - 0.5));
        setShowResult(false);
    };
    
    if (gameFinished) {
        const isSuccess = score >= 3;
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{translate('game.sequencer.gameOver')}</h2>
                <p className="text-lg mb-4">{translate('game.sequencer.finalScore', { score, total: SEQUENCES.length })}</p>
                <div className={`p-4 rounded-lg font-bold ${isSuccess ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'}`}>
                    {isSuccess ? translate('game.sequencer.success') : translate('game.sequencer.fail')}
                </div>
            </div>
        )
    }

    return (
        <div>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-2 font-semibold">
                {translate('game.sequencer.scenario', { currentStage: currentStage + 1, total: SEQUENCES.length })} | {translate('game.sequencer.score', { score })}
            </p>
            <p className="text-center text-lg mb-4">{currentSequence.title[language]}</p>
            <div className="space-y-3">
                {actions.map((action, index) => {
                    const correctAction = currentSequence.actions.find(a => a.correctOrder === index)!;
                    const displayedAction = showResult ? correctAction : action;
                    const isCorrectOrder = action.correctOrder === index;

                    let resultClass = '';
                    if (showResult) {
                        resultClass = isCorrectOrder ? 'bg-success-100 dark:bg-success-900 border-success-500' : 'bg-danger-100 dark:bg-danger-900 border-danger-500';
                    }
                    return (
                        <div
                            key={displayedAction.id}
                            draggable={!showResult}
                            onDragStart={(e) => handleDragStart(e, displayedAction.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, displayedAction.id)}
                            className={`flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm ${!showResult ? 'cursor-grab' : 'cursor-default'} border-2 ${showResult ? resultClass : 'border-transparent'} transition-colors`}
                        >
                            <span className="text-2xl font-bold text-gray-400 dark:text-gray-500 mr-4">{index + 1}</span>
                            <displayedAction.icon className="h-8 w-8 text-primary-500 mr-4" />
                            <span className="font-semibold">{displayedAction.text[language]}</span>
                        </div>
                    );
                })}
            </div>
             <div className="mt-6 flex flex-col items-center gap-4">
                <div className="flex gap-4">
                     <button onClick={checkSequence} disabled={showResult} className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg disabled:bg-gray-400">{translate('game.sequencer.check')}</button>
                     <button onClick={resetCurrentSequence} disabled={showResult} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 font-semibold rounded-lg disabled:bg-gray-400">{translate('game.kit.reset')}</button>
                </div>
                 {showResult && (
                    <div className="mt-4 p-3 rounded-lg font-bold text-center">
                       {actions.every((action, index) => action.correctOrder === index) ? 
                         <span className="text-success-700 dark:text-success-300">{translate('game.sequencer.correctFeedback')}</span> :
                         <span className="text-danger-700 dark:text-danger-300">{translate('game.sequencer.incorrectFeedback')}</span>
                       }
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActionSequencer;