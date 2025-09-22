import React, { useState, useContext } from 'react';
import { Icons } from '../icons';
import type { MultilingualString } from '../../types';
import { AppContext } from '../../App';

interface Item {
    id: string;
    name: MultilingualString;
    correct: boolean;
    image: string;
}

const t = (en: string, hi: string): MultilingualString => ({ en, hi });

const ALL_ITEMS: Item[] = [
    { id: '1', name: t('Water Bottle', 'पानी की बोतल'), correct: true, image: 'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/JANUARY/29/PHYK2DMZ_2461e491b516408fb95d6b93a3617029.jpg' },
    { id: '2', name: t('First-Aid Kit', 'प्राथमिक चिकित्सा किट'), correct: true, image: 'https://images-cdn.ubuy.co.in/6365f1d57b30fc163b01e645-first-aid-kit-230pieces-car-first-aid.jpg' },
    { id: '3', name: t('Video Game', 'वीडियो गेम'), correct: false, image: 'https://catnessgames.com/wp-content/uploads/2024/12/tipos-videojuegos-consolas-y-plataformas.jpg' },
    { id: '4', name: t('Torch', 'टॉर्च'), correct: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/LED_Flashlights.jpg/330px-LED_Flashlights.jpg' },
    { id: '5', name: t('Snacks', 'नाश्ता'), correct: true, image: 'https://img.freepik.com/free-vector/collection-delicious-snacks_23-2147914461.jpg?semt=ais_incoming&w=740&q=80' },
    { id: '6', name: t('Jewelry', 'आभूषण'), correct: false, image: 'https://www.urvaa.com/wp-content/uploads/2024/11/antique-bridal-jewellery.jpg' },
    { id: '7', name: t('Whistle', 'सीटी'), correct: true, image: 'https://media.istockphoto.com/id/614150262/vector/whistle.jpg?s=612x612&w=0&k=20&c=8SevK92ekUS8R_udx1ofYTak1pw81zw63a8Zfj6vr1Q=' },
    { id: '8', name: t('Radio', 'रेडियो'), correct: true, image: 'https://images.jdmagicbox.com/rep/b2b/fm-am-radio/fm-am-radio-1.jpg' },
    { id: '9', name: t('Toys', 'खिलौने'), correct: false, image: 'https://s7.orientaltrading.com/is/image/OrientalTrading/13942376-a01?$1x1main$&$NOWA$' },
];

const CORRECT_ITEM_COUNT = ALL_ITEMS.filter(i => i.correct).length;

interface Props {
  onGameComplete: () => void;
}

const EmergencyKitBuilder: React.FC<Props> = ({ onGameComplete }) => {
    const { language, t: translate } = useContext(AppContext);
    const [kitItems, setKitItems] = useState<Item[]>([]);
    const [availableItems, setAvailableItems] = useState(ALL_ITEMS);
    const [showResult, setShowResult] = useState(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Item) => {
        e.dataTransfer.setData("itemId", item.id);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (showResult) return;
        const itemId = e.dataTransfer.getData("itemId");
        const item = availableItems.find(i => i.id === itemId);
        if (item) {
            setKitItems(prev => [...prev, item]);
            setAvailableItems(prev => prev.filter(i => i.id !== itemId));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const checkKit = () => {
        setShowResult(true);
        const correctItemsInKit = kitItems.filter(i => i.correct).length;
        const incorrectItemsInKit = kitItems.filter(i => !i.correct).length;
        if(correctItemsInKit === CORRECT_ITEM_COUNT && incorrectItemsInKit === 0) {
            onGameComplete();
        }
    };
    const resetGame = () => {
        setKitItems([]);
        setAvailableItems(ALL_ITEMS);
        setShowResult(false);
    };
    
    const correctItemsInKit = kitItems.filter(i => i.correct).length;
    const incorrectItemsInKit = kitItems.filter(i => !i.correct).length;
    const isSuccess = correctItemsInKit === CORRECT_ITEM_COUNT && incorrectItemsInKit === 0;

    return (
        <div>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{translate('game.kit.instruction')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Available Items */}
                <div>
                    <h3 className="font-bold text-lg mb-3 text-center">{translate('game.kit.availableItems')}</h3>
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[200px] grid grid-cols-3 gap-4">
                        {availableItems.map(item => (
                            <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item)} className="cursor-grab p-2 flex flex-col items-center bg-white dark:bg-gray-800 rounded-md shadow-sm">
                                <img src={item.image} alt={item.name[language]} className="h-16 w-16 object-cover rounded-md" />
                                <p className="text-xs mt-1 text-center">{item.name[language]}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Backpack */}
                <div onDrop={handleDrop} onDragOver={handleDragOver} className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg min-h-[200px] flex flex-col items-center">
                    <Icons.Backpack className="h-12 w-12 text-blue-500 mb-4" />
                    <h3 className="font-bold text-lg mb-3 text-center">{translate('game.kit.yourKit')}</h3>
                    <div className="w-full grid grid-cols-3 gap-4">
                         {kitItems.map(item => (
                            <div key={item.id} className="p-2 flex flex-col items-center bg-white/70 dark:bg-gray-800/70 rounded-md relative">
                                <img src={item.image} alt={item.name[language]} className="h-16 w-16 object-cover rounded-md" />
                                <p className="text-xs mt-1 text-center">{item.name[language]}</p>
                                {showResult && (
                                    <div className="absolute -top-2 -right-2">
                                        {item.correct 
                                            ? <Icons.CheckCircle className="h-6 w-6 text-white bg-success-500 rounded-full" /> 
                                            : <Icons.XCircle className="h-6 w-6 text-white bg-danger-500 rounded-full" />
                                        }
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex flex-col items-center gap-4">
                <div className="flex gap-4">
                    <button onClick={checkKit} disabled={showResult} className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg disabled:bg-gray-400">{translate('game.kit.checkKit')}</button>
                    <button onClick={resetGame} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 font-semibold rounded-lg">{translate('game.kit.reset')}</button>
                </div>
                {showResult && (
                    <div className={`mt-4 p-3 rounded-lg font-bold text-center ${isSuccess ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'}`}>
                        {isSuccess ? translate('game.kit.success') : translate('game.kit.fail')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmergencyKitBuilder;