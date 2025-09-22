import React, { useState, useContext } from 'react';
import { Icons } from '../../components/icons';
import GameModal from '../../components/games/GameModal';
import EmergencyKitBuilder from '../../components/games/EmergencyKitBuilder';
import ActionSequencer from '../../components/games/ActionSequencer';
import ImageRecognition from '../../components/games/ImageRecognition';
import HazardSpotter from '../../components/games/HazardSpotter';
import DecisionMaker from '../../components/games/DecisionMaker';
import QuickReaction from '../../components/games/QuickReaction';
import { AppContext } from '../../App';
import { ALL_BADGES } from '../../constants';
import type { Badge as BadgeType, MultilingualString } from '../../types';

type GameId = 'kit' | 'sequence' | 'recognition' | 'spotter' | 'decision' | 'reaction';
type Game = GameId | null;

const games: { id: GameId; title: MultilingualString; description: MultilingualString; icon: React.ComponentType<{ className?: string }>; image: string }[] = [
    { id: 'kit', title: { en: "Emergency Kit Builder", hi: "आपातकालीन किट बिल्डर" }, description: { en: "Pack your survival kit before time runs out.", hi: "समय समाप्त होने से पहले अपनी उत्तरजीविता किट पैक करें।" }, icon: Icons.Backpack, image: "https://img.freepik.com/premium-vector/emergency-kit-cartoon-survival-evacuation-equipment-with-medical-pills-flashlight-helmet-bottle-preparedness-first-aid-tools-vector-isolated-collection_102902-7086.jpg" },
    { id: 'sequence', title: { en: "Correct Action Sequencer", hi: "सही क्रिया अनुक्रमक" }, description: { en: "Order the actions for a fire drill correctly.", hi: "अग्नि अभ्यास के लिए क्रियाओं को सही ढंग से क्रमबद्ध करें।" }, icon: Icons.Move, image: "https://pmstudycircle.com/wp-content/uploads/2022/04/Corrective-Action.jpg" },
    { id: 'recognition', title: { en: "Image Recognition", hi: "छवि पहचान" }, description: { en: "Identify safe vs. unsafe actions in photos.", hi: "तस्वीरों में सुरक्षित बनाम असुरक्षित क्रियाओं को पहचानें।" }, icon: Icons.MousePointerClick, image: "https://picsum.photos/seed/recognition/400/200" },
    { id: 'spotter', title: { en: "Hazard Spotter", hi: "खतरा पहचानकर्ता" }, description: { en: "Find potential hazards in the room.", hi: "कमरे में संभावित खतरों का पता लगाएं।" }, icon: Icons.Eye, image: "https://www.upehs.com/wp-content/uploads/2024/12/Christmas-Themed-Home-Safety-1024x724.png" },
    { id: 'decision', title: { en: "Scenario Decision Maker", hi: "परिदृश्य निर्णय निर्माता" }, description: { en: "Choose the right action in an earthquake scenario.", hi: "भूकंप परिदृश्य में सही कार्रवाई चुनें।" }, icon: Icons.Puzzle, image: "https://static.vecteezy.com/system/resources/thumbnails/021/885/962/original/4k-animation-of-decision-making-contemplation-businessman-making-decision-where-to-go-next-free-video.jpg" },
    { id: 'reaction', title: { en: "Quick Reaction Challenge", hi: "त्वरित प्रतिक्रिया चुनौती" }, description: { en: "React to disaster alerts against the clock.", hi: "समय के विरुद्ध आपदा अलर्ट पर प्रतिक्रिया दें।" }, icon: Icons.Timer, image: "https://media.istockphoto.com/id/1195047669/vector/fast-stopwatch-icon-service-delivery-logo.jpg?s=612x612&w=0&k=20&c=nJbDxOoFe9N4bkW4Q8yQsn9hN7p5sLHqXh6Vm6_LK9A=" },
];

const SimulatePage: React.FC = () => {
    const { addBadge, earnedBadges, t, language } = useContext(AppContext);
    const [activeGame, setActiveGame] = useState<Game>(null);
    
    const gameBadges = ALL_BADGES.filter(b => b.type === 'game');
    
    const handleGameComplete = (gameId: GameId) => {
        addBadge(gameId); // Award badge
    };

    const renderGame = () => {
        const gameInfo = games.find(g => g.id === activeGame);
        if (!gameInfo) return null;

        const components: Record<GameId, JSX.Element> = {
            kit: <EmergencyKitBuilder onGameComplete={() => handleGameComplete('kit')} />,
            sequence: <ActionSequencer onGameComplete={() => handleGameComplete('sequence')} />,
            recognition: <ImageRecognition onGameComplete={() => handleGameComplete('recognition')} />,
            spotter: <HazardSpotter onGameComplete={() => handleGameComplete('spotter')} />,
            decision: <DecisionMaker onGameComplete={() => handleGameComplete('decision')} />,
            reaction: <QuickReaction onGameComplete={() => handleGameComplete('reaction')} />,
        };

        return (
            <GameModal title={gameInfo.title[language]} onClose={() => setActiveGame(null)}>
                {components[activeGame as GameId]}
            </GameModal>
        );
    };
    
    const currentCompletedGames = gameBadges.filter(b => earnedBadges.includes(b.id));
    const progress = Math.round((currentCompletedGames.length / gameBadges.length) * 100);

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-2">{t('simulate.title')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t('simulate.subtitle')}</p>

            {/* Progress and Rewards */}
            <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <h3 className="font-bold text-lg mb-3">{t('simulate.progressTitle', { completed: currentCompletedGames.length, total: gameBadges.length })}</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Game Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger-children">
                {games.map(game => (
                    <GameCard
                        key={game.id}
                        title={game.title[language]}
                        description={game.description[language]}
                        icon={game.icon}
                        image={game.image}
                        onPlay={() => setActiveGame(game.id as Game)}
                        isCompleted={earnedBadges.includes(game.id)}
                    />
                ))}
            </div>
            
             {/* Badges */}
            <div className="mt-10">
                 <h2 className="text-2xl font-bold mb-4">{t('simulate.badgesTitle')}</h2>
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                        {gameBadges.map(badge => (
                            <Badge 
                                key={badge.id}
                                icon={badge.icon} 
                                label={badge.label[language]} 
                                achieved={earnedBadges.includes(badge.id)} 
                            />
                        ))}
                    </div>
                 </div>
            </div>
            
            {activeGame && renderGame()}
        </div>
    );
};

interface GameCardProps {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    image: string;
    onPlay: () => void;
    isCompleted: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, icon: Icon, image, onPlay, isCompleted }) => {
    const { t } = useContext(AppContext);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
            <div className="relative">
                <img src={image} alt={title} className="h-40 w-full object-cover" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/80 p-2 rounded-full">
                    <Icon className="h-6 w-6 text-primary-500" />
                </div>
                 {isCompleted && (
                    <div className="absolute top-3 right-3 bg-success-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Icons.CheckCircle className="h-4 w-4 mr-1" />
                        {t('module.completed')}
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{description}</p>
                <button
                    onClick={onPlay}
                    className="mt-4 w-full bg-primary-600 text-white font-semibold py-2.5 rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    {isCompleted ? t('simulate.playAgain') : t('simulate.playNow')}
                </button>
            </div>
        </div>
    );
};

const Badge: React.FC<{icon: React.ComponentType<{className?: string}>; label: string; achieved: boolean}> = ({ icon: Icon, label, achieved }) => (
    <div className={`text-center transition-opacity w-28 ${achieved ? 'opacity-100' : 'opacity-40'}`}>
        <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center ${achieved ? 'bg-success-100 dark:bg-success-900' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <Icon className={`h-10 w-10 ${achieved ? 'text-success-500' : 'text-gray-500'}`} />
        </div>
        <p className="mt-2 text-sm font-semibold">{label}</p>
    </div>
)

export default SimulatePage;