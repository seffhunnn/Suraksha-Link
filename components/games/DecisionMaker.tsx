import React, { useState, useContext } from 'react';
import { Icons } from '../icons';
import type { MultilingualString } from '../../types';
import { AppContext } from '../../App';

const t = (en: string, hi: string): MultilingualString => ({ en, hi });

const SCENARIOS = [
    {
        id: 'fire',
        question: t("The fire alarm goes off. What do you do?", "आग का अलार्म बजता है। आप क्या करते हैं?"),
        options: [
            { id: 1, text: t("Hide under the bed", "बिस्तर के नीचे छिप जाएं"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOgFjvVTdi9UZpxWP4yxy7SK4XjlBkDlgBw&s", correct: false },
            { id: 2, text: t("Calmly exit using stairs", "शांति से सीढ़ियों का उपयोग करके बाहर निकलें"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbqwXRgr5ruTIqWq-Su7a001LmjrT9FCLv9g&s", correct: true },
            { id: 3, text: t("Take the elevator", "लिफ्ट लें"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlFOG5MgD-aVcfFhedobe_xE4qjNVcuJgOzg&s", correct: false },
        ]
    },
    {
        id: 'flood',
        question: t("You get a flood alert on your phone. What's your first move?", "आपको अपने फोन पर बाढ़ का अलर्ट मिलता है। आपकी पहली चाल क्या है?"),
        options: [
            { id: 1, text: t("Go to the basement", "तहखाने में जाएं"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzRzjz64e4dyHHnkY7BaS5LIHpNFYViWbMg&s", correct: false },
            { id: 2, text: t("Wait for more instructions", "और निर्देशों की प्रतीक्षा करें"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg_1w3Eb68Q5yif8DlxewS4mWfmilf4EE8Sw&s", correct: false },
            { id: 3, text: t("Move to the highest floor", "सबसे ऊंची मंजिल पर जाएं"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnGxSXmD6xWrgZkvS6xBBhUlKw9WbTli_XA&s", correct: true },
        ]
    },
    {
        id: 'powerout',
        question: t("The power goes out during a storm. What should you use for light?", "तूफान के दौरान बिजली चली जाती है। आपको रोशनी के लिए क्या उपयोग करना चाहिए?"),
        options: [
            { id: 1, text: t("Battery-powered torch", "बैटरी चालित टॉर्च"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA0MzGuZl9NNCqY9qFDwLscCtlqUi77VkQuw&s", correct: true },
            { id: 2, text: t("Scented candles", "सुगंधित मोमबत्तियाँ"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHouZgRpl8eWfgyVyFJYkyHVBWytu3DQPEHQ&s", correct: false },
            { id: 3, text: t("Light matches to see", "देखने के लिए माचिस जलाएं"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRiWriBd3rYGGTd96oJb4tfMTmWTymq0GjGw&s", correct: false },
        ]
    },
    {
        id: 'cyclone',
        question: t("During a cyclone, you hear a calm period. What does it mean?", "चक्रवात के दौरान, आपको एक शांत अवधि सुनाई देती है। इसका क्या मतलब है?"),
        options: [
            { id: 1, text: t("The storm is over", "तूफान खत्म हो गया है"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCeTqCSe0Qqmo_ZoAIWGTfjsUjz8Ur1Orm6g&s", correct: false },
            { id: 2, text: t("You are in the eye of the storm", "आप तूफान की आंख में हैं"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7KYtZKtdV_RJjd0o2eVpCNKWLsNAVKNyfUA&s", correct: true },
            { id: 3, text: t("It's safe to go outside now", "अब बाहर जाना सुरक्षित है"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJ3Dq4-qTdoTmur2IiOpsh2_Z_ufNvhF7fg&s", correct: false },
        ]
    },
     {
        id: 'landslide',
        question: t("You are driving and see a small landslide ahead. What do you do?", "आप गाड़ी चला रहे हैं और आगे एक छोटा भूस्खलन देखते हैं। आप क्या करते हैं?"),
        options: [
            { id: 1, text: t("Try to drive through it", "इसके माध्यम से ड्राइव करने का प्रयास करें"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbUgQ3_EHEyl9c8R7lge1uu-uYE2lcEKu4g&s", correct: false },
            { id: 2, text: t("Stop and wait", "रुकें और प्रतीक्षा करें"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpi0SzjwkrAMoUn6cc6DwbY_-p9rdWXT9L8w&s", correct: false },
            { id: 3, text: t("Turn around and take another route", "मुड़ें और दूसरा रास्ता अपनाएं"), image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcVAh-cTSFHoJDX0r4wV-_FafA8eFABpU4Rw&s", correct: true },
        ]
    }
];

interface Props {
  onGameComplete: () => void;
}

const DecisionMaker: React.FC<Props> = ({ onGameComplete }) => {
    const { language, t: translate } = useContext(AppContext);
    const [currentStage, setCurrentStage] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    const scenario = SCENARIOS[currentStage];
    const gameFinished = currentStage >= SCENARIOS.length;
    
    const handleSelect = (option: typeof scenario.options[0]) => {
        if (selectedOptionId !== null) return;
        setSelectedOptionId(option.id);
        if (option.correct) {
            setScore(s => s + 1);
        }
    };
    
    const handleNext = () => {
        if (currentStage < SCENARIOS.length - 1) {
            setCurrentStage(s => s + 1);
            setSelectedOptionId(null);
        } else {
            if(score >= 3) {
                onGameComplete();
            }
            setCurrentStage(s => s + 1);
        }
    }

     if (gameFinished) {
        const isSuccess = score >= 3;
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{translate('game.decision.gameOver')}</h2>
                <p className="text-lg mb-4">{translate('game.decision.finalScore', { score, total: SCENARIOS.length })}</p>
                <div className={`p-4 rounded-lg font-bold ${isSuccess ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'}`}>
                    {isSuccess ? translate('game.decision.success') : translate('game.decision.fail')}
                </div>
            </div>
        )
    }

    return (
        <div>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-2 font-semibold">
                {translate('game.decision.scenario', { currentStage: currentStage + 1, total: SCENARIOS.length })}
            </p>
            <p className="text-center font-bold text-lg mb-4">{scenario.question[language]}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenario.options.map(option => {
                    const isSelected = selectedOptionId === option.id;
                    return (
                        <div key={option.id} className="relative cursor-pointer" onClick={() => handleSelect(option)}>
                            <img src={option.image} alt={option.text[language]} className="w-full h-40 object-cover rounded-lg shadow-md" />
                            <div className="absolute inset-0 bg-black/30 flex items-end justify-center p-2 text-center">
                                <p className="text-white font-semibold">{option.text[language]}</p>
                            </div>
                            {isSelected && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    {option.correct
                                        ? <Icons.CheckCircle className="h-16 w-16 text-success-400" />
                                        : <Icons.XCircle className="h-16 w-16 text-danger-400" />
                                    }
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
             {selectedOptionId !== null && (
                <div className="mt-6 text-center">
                    <button onClick={handleNext} className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg">
                        {currentStage === SCENARIOS.length - 1 ? translate('game.decision.finish') : translate('game.decision.next')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default DecisionMaker;