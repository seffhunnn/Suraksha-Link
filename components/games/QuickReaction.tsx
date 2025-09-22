import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { Icons } from '../icons';
import type { MultilingualString } from '../../types';
import { AppContext } from '../../App';

const t = (en: string, hi: string): MultilingualString => ({ en, hi });

const ALERTS = [
    { type: t('Fire', 'आग'), icon: Icons.Flame, color: 'text-danger-500', correctAction: 'evacuate' },
    { type: t('Earthquake', 'भूकंप'), icon: Icons.ShieldAlert, color: 'text-yellow-500', correctAction: 'cover' },
    { type: t('Flood', 'बाढ़'), icon: Icons.Waves, color: 'text-blue-500', correctAction: 'high_ground' },
    { type: t('Cyclone', 'चक्रवात'), icon: Icons.Wind, color: 'text-purple-500', correctAction: 'shelter' },
    { type: t('Landslide', 'भूस्खलन'), icon: Icons.Mountain, color: 'text-orange-500', correctAction: 'move_away' },
];

const ACTIONS = [
    { id: 'evacuate', text: t('Evacuate', 'निकासी'), icon: Icons.Users },
    { id: 'cover', text: t('Take Cover', 'आड़ लें'), icon: Icons.Shield },
    { id: 'high_ground', text: t('Seek High Ground', 'ऊंची जगह ढूंढे'), icon: Icons.Mountain },
    { id: 'shelter', text: t('Go to Shelter', 'आश्रय में जाएं'), icon: Icons.Box },
    { id: 'move_away', text: t('Move Away', 'दूर जाएं'), icon: Icons.Wind },
];

const TOTAL_ROUNDS = 5;

interface Props {
  onGameComplete: () => void;
}

const QuickReaction: React.FC<Props> = ({ onGameComplete }) => {
    const { language, t: translate } = useContext(AppContext);
    const [shuffledAlerts, setShuffledAlerts] = useState<typeof ALERTS>([]);
    const [timeLeft, setTimeLeft] = useState(5);
    const [result, setResult] = useState<'correct' | 'incorrect' | 'timeup' | null>(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);

    const currentAlert = useMemo(() => shuffledAlerts[round], [shuffledAlerts, round]);

    const nextRound = useCallback(() => {
        if (round + 1 >= TOTAL_ROUNDS) {
            if (score >= 3) { 
                onGameComplete();
            }
            setRound(r => r + 1);
            return;
        }
        setRound(r => r + 1);
        setResult(null);
        setTimeLeft(5);
    }, [round, score, onGameComplete]);


    useEffect(() => {
        let timer: number;
        if (gameStarted && round < TOTAL_ROUNDS && timeLeft > 0 && result === null) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000) as unknown as number;
        } else if (timeLeft === 0 && result === null) {
            setResult('timeup');
             setTimeout(nextRound, 1500);
        }
        return () => clearTimeout(timer);
    }, [timeLeft, gameStarted, result, round, nextRound]);

    const handleActionClick = (actionId: string) => {
        if (result || !currentAlert) return;
        const isCorrect = actionId === currentAlert.correctAction;
        setResult(isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            setScore(s => s + 1);
        }
        setTimeout(nextRound, 1500);
    };
    
    const startGame = () => {
        const shuffled = [...ALERTS].sort(() => Math.random() - 0.5);
        setShuffledAlerts(shuffled);
        setRound(0);
        setScore(0);
        setResult(null);
        setTimeLeft(5);
        setGameStarted(true);
    }
    
    if(!gameStarted) {
        return (
             <div className="text-center">
                <p className="mb-4">{translate('game.reaction.instruction')}</p>
                <button onClick={startGame} className="px-6 py-3 bg-primary-600 text-white font-bold rounded-lg">{translate('game.reaction.start')}</button>
            </div>
        )
    }
    
    if (round >= TOTAL_ROUNDS) {
        const isSuccess = score >= 3;
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{translate('game.reaction.complete')}</h2>
                <p className="text-lg mb-4">{translate('game.reaction.finalScore', { score, total: TOTAL_ROUNDS })}</p>
                <div className={`p-4 rounded-lg font-bold ${isSuccess ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'}`}>
                    {isSuccess ? translate('game.reaction.success') : translate('game.reaction.fail')}
                </div>
                <button onClick={startGame} className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-sm rounded-lg">{translate('game.reaction.playAgain')}</button>
            </div>
        )
    }

    return (
        <div className="text-center">
            <p className="font-bold text-lg mb-2">{translate('game.reaction.round', { round: round + 1, total: TOTAL_ROUNDS })} | {translate('game.reaction.score', { score })}</p>
            {/* Alert Banner */}
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 min-h-[100px] flex items-center justify-center">
                {!result && currentAlert ? (
                    <div className="flex items-center justify-center animate-pulse">
                        <currentAlert.icon className={`h-12 w-12 mr-4 ${currentAlert.color}`} />
                        <h3 className={`text-3xl font-bold ${currentAlert.color}`}>{translate('game.reaction.alert', { type: currentAlert.type[language] })}</h3>
                    </div>
                ) : (
                    <div className="font-bold text-2xl">
                        {result === 'correct' && <p className="text-success-500">{translate('game.reaction.correct')}</p>}
                        {result === 'incorrect' && <p className="text-danger-500">{translate('game.reaction.incorrect')}</p>}
                        {result === 'timeup' && <p className="text-warning-500">{translate('game.reaction.timeup')}</p>}
                    </div>
                )}
            </div>
            
            {/* Timer */}
            <div className="mb-6">
                <p className="font-mono text-5xl font-bold">{timeLeft}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 flex-wrap">
                {ACTIONS.map(action => (
                    <button 
                        key={action.id} 
                        onClick={() => handleActionClick(action.id)}
                        disabled={result !== null}
                        className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md w-32 h-32 justify-center hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                        <action.icon className="h-10 w-10 mb-2 text-primary-500" />
                        <span className="font-semibold">{action.text[language]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickReaction;