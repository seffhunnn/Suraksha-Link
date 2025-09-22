import React, { useState, useEffect, useContext } from 'react';
import { Icons } from '../icons';
import type { MultilingualString } from '../../types';
import { AppContext } from '../../App';

const t = (en: string, hi: string): MultilingualString => ({ en, hi });

const HAZARDS = [
    { id: 1, name: t("Blocked Exit", "अवरुद्ध निकास"), x: 85, y: 40, w: 10, h: 40 },
    { id: 2, name: t("Overloaded Socket", "ओवरलोडेड सॉकेट"), x: 18, y: 65, w: 5, h: 5 },
    { id: 3, name: t("Heavy frame over sofa", "सोफे के ऊपर भारी फ्रेम"), x: 30, y: 25, w: 35, h: 20 },
    { id: 4, name: t("Trip hazard rug", "फिसलने का खतरा वाला गलीचा"), x: 40, y: 85, w: 50, h: 10 },
    { id: 5, name: t("Unstable Items on Shelf", "शेल्फ पर अस्थिर वस्तुएं"), x: 0, y: 30, w: 15, h: 50 },
];

const ROOM_IMAGE_URL = "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=600&h=400&fit=crop";

interface Props {
  onGameComplete: () => void;
}

const HazardSpotter: React.FC<Props> = ({ onGameComplete }) => {
    const { language, t: translate } = useContext(AppContext);
    const [foundHazards, setFoundHazards] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);
    const [lastClick, setLastClick] = useState<{x: number, y: number, id: number} | null>(null);

    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !gameOver) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    useEffect(() => {
        if (foundHazards.length === HAZARDS.length && !gameOver) {
            setGameOver(true);
            onGameComplete();
        }
    }, [foundHazards, gameOver, onGameComplete]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (gameOver) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // Show feedback click
        const clickId = Date.now();
        setLastClick({ x, y, id: clickId });
        setTimeout(() => setLastClick(prev => (prev?.id === clickId ? null : prev)), 500);

        for (const hazard of HAZARDS) {
            if (
                x >= hazard.x && x <= hazard.x + hazard.w &&
                y >= hazard.y && y <= hazard.y + hazard.h
            ) {
                if (!foundHazards.includes(hazard.id)) {
                    setFoundHazards(prev => [...prev, hazard.id]);
                }
                return;
            }
        }
    };
    
    const isSuccess = foundHazards.length === HAZARDS.length;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg">{translate('game.spotter.findHazards', { count: HAZARDS.length })}</p>
                <div className="font-mono text-2xl font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md">{timeLeft}{translate('game.spotter.secondsUnit')}</div>
            </div>
            <div className="relative w-full max-w-lg mx-auto cursor-crosshair" onClick={handleClick}>
                <img src={ROOM_IMAGE_URL} alt="Room with hazards" className="w-full rounded-lg select-none" />
                {foundHazards.map(id => {
                    const hazard = HAZARDS.find(h => h.id === id)!;
                    return (
                        <div
                            key={id}
                            className="absolute border-4 border-red-500 rounded-lg animate-ping pointer-events-none"
                            style={{
                                left: `${hazard.x}%`,
                                top: `${hazard.y}%`,
                                width: `${hazard.w}%`,
                                height: `${hazard.h}%`,
                            }}
                        />
                    );
                })}
                {lastClick && !HAZARDS.some(h => foundHazards.includes(h.id) && lastClick.x >= h.x && lastClick.x <= h.x + h.w && lastClick.y >= h.y && lastClick.y <= h.y + h.h) && (
                    <div
                        className="absolute w-4 h-4 bg-yellow-400/80 rounded-full pointer-events-none animate-ping"
                        style={{
                            left: `${lastClick.x}%`,
                            top: `${lastClick.y}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                )}
            </div>
            <div className="mt-4">
                <h4 className="font-bold mb-2">{translate('game.spotter.hazardsFound')}</h4>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {HAZARDS.map(h => (
                        <li key={h.id} className={`flex items-center p-2 rounded-md ${foundHazards.includes(h.id) ? 'bg-success-100 text-success-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                           {foundHazards.includes(h.id) 
                                ? <Icons.CheckCircle className="h-5 w-5 mr-2 text-success-500" />
                                : <Icons.Eye className="h-5 w-5 mr-2 text-gray-400" />
                           }
                           <span className={`${foundHazards.includes(h.id) ? 'line-through' : ''}`}>{h.name[language]}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {gameOver && (
                <div className={`mt-4 p-3 rounded-lg font-bold text-center ${isSuccess ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'}`}>
                    {isSuccess ? translate('game.spotter.success') : translate('game.spotter.fail')}
                </div>
            )}
        </div>
    );
};

export default HazardSpotter;