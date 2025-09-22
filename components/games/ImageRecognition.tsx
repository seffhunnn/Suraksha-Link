import React, { useState, useContext } from 'react';
import { Icons } from '../icons';
import type { MultilingualString } from '../../types';
import { AppContext } from '../../App';

const t = (en: string, hi: string): MultilingualString => ({ en, hi });

const SCENARIOS = [
    { 
        id: 1, 
        disaster: t('Earthquake', 'भूकंप'),
        instruction: t("An earthquake is happening. Click the image showing the SAFE action.", "भूकंप आ रहा है। सुरक्षित कार्रवाई दिखाने वाली छवि पर क्लिक करें।"),
        images: [
            { id: '1a', src: 'https://media.istockphoto.com/id/827580726/photo/landscape-of-grass-field-and-green-environment-public-park-use-as-natural-background-backdrop.jpg?s=612x612&w=0&k=20&c=qUacNPfzvoW-20ELsIb9AnFeW4yOhqs5xZqjOlBODl4=', safe: true },
            { id: '1b', src: 'https://freerangestock.com/sample/45972/urban-city-street-with-tall-buildings.jpg', safe: false },
        ]
    },
    { 
        id: 2, 
        disaster: t('Flood', 'बाढ़'),
        instruction: t("Floodwaters are rising. Which action is SAFE?", "बाढ़ का पानी बढ़ रहा है। कौन सी कार्रवाई सुरक्षित है?"),
        images: [
            { id: '2a', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWMtIPY5iSqJtQNGjYasjaq6wFP7CxLmTtcg&s', safe: false },
            { id: '2b', src: 'https://live.staticflickr.com/3509/3905393506_ca1fabecb4_b.jpg', safe: true },
        ]
    },
    { 
        id: 3, 
        disaster: t('Fire', 'आग'),
        instruction: t("You see smoke in a hallway. What is the SAFE way to move?", "आपको एक दालान में धुआं दिखाई देता है। चलने का सुरक्षित तरीका क्या है?"),
        images: [
            { id: '3a', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS00LwdQCLKRzT3aX1ytVlsrybPxr1a3zmiVw&s', safe: true },
            { id: '3b', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjHdA3n7FN5KBNBF1DKjdRsJYQDtledBEdGw&s', safe: false },
        ]
    },
     { 
        id: 4, 
        disaster: t('Cyclone', 'चक्रवात'),
        instruction: t("A cyclone warning is issued. What is the SAFE place to be?", "चक्रवात की चेतावनी जारी की गई है। सुरक्षित स्थान कौन सा है?"),
        images: [
            { id: '4a', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSRVtGq3OvXGPp-aDyIof1d6BUCk35UYSvKg&s', safe: false },
            { id: '4b', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB1fkDT1y-S9mpRT1SEijox869epfd1eBWTQ&s', safe: true },
        ]
    },
    { 
        id: 5, 
        disaster: t('Landslide', 'भूस्खलन'),
        instruction: t("You hear a rumble on a hill. Which way is SAFE to run?", "आपको एक पहाड़ी पर गड़गड़ाहट सुनाई देती है। दौड़ने का सुरक्षित तरीका कौन सा है?"),
        images: [
            { id: '5a', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffX-m6f2vIsqkviMR6EmG9nV6UoAK_qzPmA&s', safe: true },
            { id: '5b', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2-z3OxHXNqomJVKZ3ttVdwv_PnAqx7hWEQA&s', safe: false },
        ]
    },
];

interface Props {
  onGameComplete: () => void;
}

const ImageRecognition: React.FC<Props> = ({ onGameComplete }) => {
    const { language, t: translate } = useContext(AppContext);
    const [currentStage, setCurrentStage] = useState(0);
    const [selection, setSelection] = useState<{ id: string, safe: boolean } | null>(null);
    const [score, setScore] = useState(0);

    const currentScenario = SCENARIOS[currentStage];
    const gameFinished = currentStage >= SCENARIOS.length;

    const handleSelect = (image: { id: string, safe: boolean }) => {
        if (selection) return; // Prevent changing answer
        setSelection(image);
        if (image.safe) {
            setScore(s => s + 1);
        }
    };
    
    const handleNext = () => {
        const isLastStage = currentStage === SCENARIOS.length - 1;
        if (!isLastStage) {
            setCurrentStage(s => s + 1);
            setSelection(null);
        } else {
            // Game finished, check for completion on the final click
            if (score >= 3) { // Pass if 3 or more correct
                 onGameComplete();
            }
            setCurrentStage(s => s + 1); // Move to final screen
        }
    }

    if (gameFinished) {
        const isSuccess = score >= 3;
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{translate('game.recognition.gameOver')}</h2>
                <p className="text-lg mb-4">{translate('game.recognition.finalScore', { score, total: SCENARIOS.length })}</p>
                <div className={`p-4 rounded-lg font-bold ${isSuccess ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'}`}>
                    {isSuccess ? translate('game.recognition.success') : translate('game.recognition.fail')}
                </div>
            </div>
        )
    }

    return (
        <div>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-2 font-semibold">
                {translate('game.recognition.scenario', { currentStage: currentStage + 1, total: SCENARIOS.length, disaster: currentScenario.disaster[language] })}
            </p>
            <p className="text-center text-lg mb-4">{currentScenario.instruction[language]}</p>
            <div className="grid grid-cols-2 gap-4">
                {currentScenario.images.map(image => {
                    const isSelected = selection?.id === image.id;
                    let borderClass = 'border-transparent hover:border-primary-500';
                    if (isSelected) {
                        borderClass = image.safe ? 'border-success-500' : 'border-danger-500';
                    }
                    return (
                        <div key={image.id} className="relative cursor-pointer" onClick={() => handleSelect(image)}>
                            <img src={image.src} alt="Scenario option" className={`w-full h-auto rounded-lg border-4 ${borderClass} transition-all`} />
                             {isSelected && (
                                <div className="absolute top-2 right-2">
                                    {image.safe 
                                        ? <Icons.CheckCircle className="h-8 w-8 text-white bg-success-500 rounded-full" /> 
                                        : <Icons.XCircle className="h-8 w-8 text-white bg-danger-500 rounded-full" />
                                    }
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {selection && (
                <div className="mt-6 text-center">
                    <button onClick={handleNext} className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg">
                        {currentStage === SCENARIOS.length - 1 ? translate('game.recognition.finish') : translate('game.recognition.next')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageRecognition;