
import type { User, Alert, Module, StudentProgress, Drill, EmergencyContact, Badge, Language } from './types';
import { Role, AlertSeverity, DisasterType } from './types';
import { Icons } from './components/icons';

// Helper to get date strings in YYYY-MM-DD format
const getFormattedDate = (offsetDays = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split('T')[0];
};

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Rohan Sharma', role: Role.Student, schoolId: 'S001', avatarUrl: 'https://i.pravatar.cc/150?u=student', email: 'student@school.com', password: 'password', location: 'Patna' },
  { id: '2', name: 'Priya Verma', role: Role.Admin, schoolId: 'S001', avatarUrl: 'https://i.pravatar.cc/150?u=admin', email: 'admin@school.com', password: 'password', location: 'Patna' },
];

export const CITIES_OPTIONS = [
    { value: 'Patna', label: 'Patna' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Shimla', label: 'Shimla' },
    { value: 'Kolkata', label: 'Kolkata' },
];

export const MASTER_ALERT_LIST: Alert[] = [
  // Patna
  {
    id: 'A01',
    title: { en: 'Flood Warning', hi: 'बाढ़ की चेतावनी' },
    severity: AlertSeverity.Warning,
    region: 'Patna, Bihar',
    message: { en: 'Heavy rainfall expected. Low-lying areas are at high risk of flooding. Move to higher ground.', hi: 'भारी वर्षा की उम्मीद है। निचले इलाकों में बाढ़ का खतरा अधिक है। ऊँचे स्थान पर चले जाएँ।' },
    timestamp: new Date().toISOString(),
    date: getFormattedDate(0), // Today
  },
   {
    id: 'A06',
    title: { en: 'Past Flood Alert', hi: 'पिछली बाढ़ चेतावनी' },
    severity: AlertSeverity.Warning,
    region: 'Patna, Bihar',
    message: { en: 'This was a flood warning from yesterday.', hi: 'यह कल की बाढ़ की चेतावनी थी।' },
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    date: getFormattedDate(-1), // Yesterday
  },
  // Delhi
  {
    id: 'A02',
    title: { en: 'Heatwave Advisory', hi: 'लू की सलाह' },
    severity: AlertSeverity.Advisory,
    region: 'Delhi NCR',
    message: { en: 'Extreme heat expected for the next 3 days. Stay hydrated, avoid direct sun between 11 AM and 4 PM.', hi: 'अगले 3 दिनों तक अत्यधिक गर्मी की उम्मीद है। हाइड्रेटेड रहें, सुबह 11 बजे से शाम 4 बजे के बीच सीधी धूप से बचें।' },
    timestamp: new Date().toISOString(),
    date: getFormattedDate(0), // Today
  },
   {
    id: 'A07',
    title: { en: 'Air Quality Warning', hi: 'वायु गुणवत्ता चेतावनी' },
    severity: AlertSeverity.Warning,
    region: 'Delhi NCR',
    message: { en: 'Air quality index has reached "Severe" levels. It is advised to stay indoors and use air purifiers.', hi: 'वायु गुणवत्ता सूचकांक "गंभीर" स्तर पर पहुंच गया है। घर के अंदर रहने और एयर प्यूरीफायर का उपयोग करने की सलाह दी जाती है।' },
    timestamp: new Date().toISOString(),
    date: getFormattedDate(0), // Today
  },
  // Mumbai
  {
    id: 'A04',
    title: { en: 'Thunderstorm & Heavy Rain Watch', hi: 'आंधी और भारी बारिश की निगरानी' },
    severity: AlertSeverity.Watch,
    region: 'Mumbai, Maharashtra',
    message: { en: 'Severe thunderstorms with heavy rainfall and gusty winds are possible this evening. Avoid coastal areas.', hi: 'आज शाम भारी वर्षा और तेज हवाओं के साथ गंभीर आंधी की संभावना है। तटीय क्षेत्रों से बचें।' },
    timestamp: new Date().toISOString(),
    date: getFormattedDate(0), // Today
  },
  {
    id: 'A08',
    title: { en: 'High Tide Alert', hi: 'उच्च ज्वार की चेतावनी' },
    severity: AlertSeverity.Advisory,
    region: 'Mumbai, Maharashtra',
    message: { en: 'High tide is expected at 2:00 PM. Low-lying coastal areas may experience minor water logging.', hi: 'दोपहर 2:00 बजे उच्च ज्वार की उम्मीद है। निचले तटीय क्षेत्रों में मामूली जलभराव हो सकता है।' },
    timestamp: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    date: getFormattedDate(1), // Tomorrow
  },
  // Chennai
  {
    id: 'A09',
    title: { en: 'Cyclone Watch', hi: 'चक्रवात की निगरानी' },
    severity: AlertSeverity.Watch,
    region: 'Chennai, Tamil Nadu',
    message: { en: 'A cyclone is forming in the Bay of Bengal. Be prepared for strong winds and heavy rain within 48 hours.', hi: 'बंगाल की खाड़ी में एक चक्रवात बन रहा है। 48 घंटों के भीतर तेज हवाओं और भारी बारिश के लिए तैयार रहें।' },
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    date: getFormattedDate(-1), // Yesterday
  },
  {
    id: 'A10',
    title: { en: 'Heavy Rainfall Warning', hi: 'भारी वर्षा की चेतावनी' },
    severity: AlertSeverity.Warning,
    region: 'Chennai, Tamil Nadu',
    message: { en: 'Intense rainfall likely to cause waterlogging in several parts of the city. Stay indoors.', hi: 'शहर के कई हिस्सों में तीव्र वर्षा से जलभराव की संभावना है। घर के अंदर रहें।' },
    timestamp: new Date().toISOString(),
    date: getFormattedDate(0), // Today
  },
  // Shimla
  {
    id: 'A05',
    title: { en: 'Landslide Advisory', hi: 'भूस्खलन की सलाह' },
    severity: AlertSeverity.Advisory,
    region: 'Shimla, Himachal Pradesh',
    message: { en: 'Increased risk of landslides due to continuous rainfall. Avoid unnecessary travel in hilly areas.', hi: 'लगातार वर्षा के कारण भूस्खलन का खतरा बढ़ गया है। पहाड़ी क्षेत्रों में अनावश्यक यात्रा से बचें।' },
    timestamp: new Date().toISOString(),
    date: getFormattedDate(0), // Today
  },
  {
    id: 'A11',
    title: { en: 'Heavy Snowfall Watch', hi: 'भारी बर्फबारी की निगरानी' },
    severity: AlertSeverity.Watch,
    region: 'Shimla, Himachal Pradesh',
    message: { en: 'Heavy snowfall is predicted over the next 24 hours. Roads may be blocked. Stock up on essentials.', hi: 'अगले 24 घंटों में भारी बर्फबारी की भविष्यवाणी की गई है। सड़कें अवरुद्ध हो सकती हैं। आवश्यक वस्तुओं का स्टॉक कर लें।' },
    timestamp: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    date: getFormattedDate(2), // In 2 days
  },
];


export const MOCK_ALERTS: Alert[] = MASTER_ALERT_LIST.slice(0, 3);

const createMultilingualText = (enText: string, hiText: string) => ({ en: enText, hi: hiText });

export const MOCK_MODULES: Module[] = [
    {
        id: 'M01',
        title: createMultilingualText('Earthquake Safety', 'भूकंप सुरक्षा'),
        disasterType: DisasterType.Earthquake,
        duration: 5,
        imageUrl: 'https://www.newsonair.gov.in/wp-content/uploads/2025/04/Japan-quake.jpg',
        content: {
            videoUrl: 'https://www.youtube.com/embed/E5wLV3Hl1Xc',
            dos: [
                createMultilingualText('Drop, Cover, and Hold On.', 'झुको, ढको, और कसकर पकड़ो।'),
                createMultilingualText('Stay away from windows and heavy objects.', 'खिड़कियों और भारी वस्तुओं से दूर रहें।'),
                createMultilingualText('If outside, move to an open area.', 'यदि बाहर हैं, तो खुले क्षेत्र में चले जाएँ।'),
            ],
            donts: [
                createMultilingualText('Do not use elevators.', 'लिफ्ट का प्रयोग न करें।'),
                createMultilingualText('Do not stand in doorways.', 'दरवाजों में खड़े न हों।'),
                createMultilingualText('Do not run outside during shaking.', 'कंपन के दौरान बाहर न दौड़ें।'),
            ],
            quiz: {
                questions: [
                    { 
                        question: createMultilingualText("What is the first thing you should do during an earthquake?", "भूकंप के दौरान आपको सबसे पहले क्या करना चाहिए?"), 
                        options: [
                            createMultilingualText("Run outside", "बाहर दौड़ें"), 
                            createMultilingualText("Stand in a doorway", "दरवाजे में खड़े हों"), 
                            createMultilingualText("Drop, Cover, and Hold On", "झुको, ढको, और कसकर पकड़ो"), 
                            createMultilingualText("Call for help", "मदद के लिए पुकारें")
                        ], 
                        correctAnswer: createMultilingualText("Drop, Cover, and Hold On", "झुको, ढको, और कसकर पकड़ो") 
                    },
                    { 
                        question: createMultilingualText("Where is the safest place to be during an earthquake if you are indoors?", "यदि आप घर के अंदर हैं तो भूकंप के दौरान सबसे सुरक्षित स्थान कौन सा है?"), 
                        options: [
                            createMultilingualText("Near a window", "खिड़की के पास"), 
                            createMultilingualText("Under a sturdy table", "एक मजबूत मेज के नीचे"), 
                            createMultilingualText("In an elevator", "लिफ्ट में"), 
                            createMultilingualText("Next to a tall bookshelf", "एक ऊंची किताबों की अलमारी के बगल में")
                        ], 
                        correctAnswer: createMultilingualText("Under a sturdy table", "एक मजबूत मेज के नीचे") 
                    },
                ]
            }
        }
    },
    {
        id: 'M02',
        title: createMultilingualText('Flood Preparedness', 'बाढ़ की तैयारी'),
        disasterType: DisasterType.Flood,
        duration: 6,
        imageUrl: 'https://www.ready.gov/sites/default/files/2020-04/Flooded-neighborhood_1.jpg',
        content: {
            videoUrl: 'https://www.youtube.com/embed/lb5bQDlCvtU',
            dos: [
                createMultilingualText('Move to higher ground immediately.', 'तुरंत ऊँचे स्थान पर चले जाएँ।'),
                createMultilingualText('Listen to emergency broadcasts.', 'आपातकालीन प्रसारण सुनें।'),
                createMultilingualText('Keep a supply of clean water and food.', 'साफ पानी और भोजन की आपूर्ति रखें।'),
            ],
            donts: [
                createMultilingualText("Don't walk or drive through floodwaters.", "बाढ़ के पानी में न चलें और न ही गाड़ी चलाएँ।"),
                createMultilingualText("Don't touch electrical equipment if you are wet.", "यदि आप गीले हैं तो बिजली के उपकरणों को न छुएं।"),
                createMultilingualText("Don't wait to be told to evacuate.", "निकासी के लिए कहे जाने का इंतजार न करें।"),
            ],
            quiz: {
                questions: [
                    { 
                        question: createMultilingualText("If you receive a flood warning, what is the first thing you should do?", "यदि आपको बाढ़ की चेतावनी मिलती है, तो आपको सबसे पहले क्या करना चाहिए?"), 
                        options: [
                            createMultilingualText("Wait and see", "इंतजार करें और देखें"), 
                            createMultilingualText("Move to a higher floor or higher ground", "ऊपरी मंजिल या ऊँचे स्थान पर चले जाएँ"), 
                            createMultilingualText("Go to the basement", "तहखाने में जाएँ"), 
                            createMultilingualText("Take a shower", "नहा लें")
                        ], 
                        correctAnswer: createMultilingualText("Move to a higher floor or higher ground", "ऊपरी मंजिल या ऊँचे स्थान पर चले जाएँ") 
                    },
                ]
            }
        }
    },
    {
        id: 'M03',
        title: createMultilingualText('Fire Safety Essentials', 'अग्नि सुरक्षा अनिवार्य'),
        disasterType: DisasterType.Fire,
        duration: 4,
        imageUrl: 'https://media.wired.com/photos/5be5baad89450468242a14ba/master/pass/CampFire-1059476842.jpg',
        content: {
            videoUrl: 'https://www.youtube.com/embed/84D0OpGHK5Y',
            dos: [
                createMultilingualText('Know your escape routes.', 'अपने भागने के रास्ते जानें।'),
                createMultilingualText('Crawl low under smoke.', 'धुएं के नीचे झुककर चलें।'),
                createMultilingualText('Have a designated meeting point outside.', 'बाहर एक निर्धारित मिलन स्थल रखें।'),
            ],
            donts: [
                createMultilingualText("Don't go back inside for any reason.", "किसी भी कारण से अंदर वापस न जाएँ।"),
                createMultilingualText("Don't try to fight a large fire yourself.", "बड़ी आग से खुद लड़ने की कोशिश न करें।"),
                createMultilingualText("Don't open hot doors.", "गर्म दरवाजे न खोलें।"),
            ],
            quiz: {
                questions: [
                    { 
                        question: createMultilingualText("If there is smoke, how should you move?", "यदि धुआं है, तो आपको कैसे चलना चाहिए?"), 
                        options: [
                            createMultilingualText("Walk upright", "सीधे चलें"), 
                            createMultilingualText("Run as fast as you can", "जितनी तेजी से हो सके दौड़ें"), 
                            createMultilingualText("Crawl low to the ground", "जमीन पर झुककर चलें"), 
                            createMultilingualText("Stay still", "स्थिर रहें")
                        ], 
                        correctAnswer: createMultilingualText("Crawl low to the ground", "जमीन पर झुककर चलें") 
                    },
                ]
            }
        }
    },
    {
        id: 'M04',
        title: createMultilingualText('Cyclone Awareness', 'चक्रवात जागरूकता'),
        disasterType: DisasterType.Cyclone,
        duration: 5,
        imageUrl: 'https://img.freepik.com/premium-vector/cyclone-hit-forest_1308-20529.jpg',
        content: {
            videoUrl: 'https://www.youtube.com/embed/H-nxT76l9Jc',
            dos: [
                createMultilingualText('Board up windows.', 'खिड़कियों पर तख्ते लगाएँ।'),
                createMultilingualText('Stay indoors in a strong part of the house.', 'घर के एक मजबूत हिस्से में अंदर रहें।'),
                createMultilingualText('Have an emergency kit ready.', 'एक आपातकालीन किट तैयार रखें।'),
            ],
            donts: [
                createMultilingualText("Don't go outside during the 'eye' of the storm.", "तूफान की 'आंख' के दौरान बाहर न जाएँ।"),
                createMultilingualText("Don't ignore evacuation orders.", "निकासी के आदेशों को नजरअंदाज न करें।"),
                createMultilingualText("Don't stand near windows or glass doors.", "खिड़कियों या कांच के दरवाजों के पास खड़े न हों।"),
            ],
            quiz: {
                questions: [
                    { 
                        question: createMultilingualText("What is the calm, center part of a cyclone called?", "चक्रवात के शांत, मध्य भाग को क्या कहते हैं?"), 
                        options: [
                            createMultilingualText("The Wall", "दीवार"), 
                            createMultilingualText("The Eye", "आंख"), 
                            createMultilingualText("The Funnel", "कीप"), 
                            createMultilingualText("The Core", "कोर")
                        ], 
                        correctAnswer: createMultilingualText("The Eye", "आंख") 
                    },
                ]
            }
        }
    },
    {
        id: 'M05',
        title: createMultilingualText('Landslide Safety', 'भूस्खलन सुरक्षा'),
        disasterType: DisasterType.Landslide,
        duration: 4,
        imageUrl: 'https://img.freepik.com/free-vector/landslide-natural-disaster-scene_1308-105221.jpg',
        content: {
            videoUrl: 'https://www.youtube.com/embed/un6HN7jCX0E',
            dos: [
                createMultilingualText('Learn the warning signs like new cracks in the ground.', 'चेतावनी के संकेतों को जानें जैसे जमीन में नई दरारें।'),
                createMultilingualText('Move away from the path of a landslide quickly.', 'भूस्खलन के रास्ते से जल्दी से दूर हट जाएँ।'),
                createMultilingualText('Report any signs to local authorities.', 'किसी भी संकेत की सूचना स्थानीय अधिकारियों को दें।'),
            ],
            donts: [
                createMultilingualText("Don't build your house at the base of a steep slope.", "अपना घर किसी खड़ी ढलान के आधार पर न बनाएँ।"),
                createMultilingualText("Don't travel in hilly areas during heavy rain.", "भारी बारिश के दौरान पहाड़ी इलाकों में यात्रा न करें।"),
                createMultilingualText("Don't ignore evacuation warnings.", "निकासी की चेतावनियों को नजरअंदाज न करें।"),
            ],
            quiz: {
                questions: [
                    { 
                        question: createMultilingualText("Which is a common trigger for landslides?", "भूस्खलन का एक सामान्य कारण क्या है?"), 
                        options: [
                            createMultilingualText("Sunny weather", "धूप का मौसम"), 
                            createMultilingualText("Intense rainfall", "तीव्र वर्षा"), 
                            createMultilingualText("Light winds", "हल्की हवाएँ"), 
                            createMultilingualText("Cold nights", "ठंडी रातें")
                        ], 
                        correctAnswer: createMultilingualText("Intense rainfall", "तीव्र वर्षा") 
                    },
                ]
            }
        }
    },
    {
        id: 'M06',
        title: createMultilingualText('Drought Resilience', 'सूखा लचीलापन'),
        disasterType: DisasterType.Drought,
        duration: 4,
        imageUrl: 'https://www.preventionweb.net/sites/default/files/styles/landscape_16_9/public/2022-05/shutterstock_585540035-min.jpg?itok=4QBcjK7x',
        content: {
            videoUrl: 'https://www.youtube.com/embed/4KdxnnU_oKk',
            dos: [
                createMultilingualText('Conserve water at all times.', 'हर समय पानी का संरक्षण करें।'),
                createMultilingualText('Use drought-resistant plants in gardens.', 'बगीचों में सूखा-प्रतिरोधी पौधे लगाएँ।'),
                createMultilingualText('Fix leaks in pipes and faucets immediately.', 'पाइपों और नलों में रिसाव को तुरंत ठीक करें।'),
            ],
            donts: [
                createMultilingualText("Don't leave taps running.", "नलों को चलता न छोड़ें।"),
                createMultilingualText("Don't water your lawn during the day.", "दिन के समय अपने लॉन में पानी न डालें।"),
                createMultilingualText("Don't ignore water usage restrictions from authorities.", "अधिकारियों से पानी के उपयोग पर प्रतिबंधों को नजरअंदाज न करें।"),
            ],
            quiz: {
                questions: [
                    { 
                        question: createMultilingualText("What is the primary characteristic of a drought?", "सूखे की प्राथमिक विशेषता क्या है?"), 
                        options: [
                            createMultilingualText("Too much rain", "बहुत अधिक बारिश"), 
                            createMultilingualText("A prolonged shortage of water", "पानी की लंबी कमी"), 
                            createMultilingualText("A big flood", "एक बड़ी बाढ़"), 
                            createMultilingualText("A strong wind", "एक तेज हवा")
                        ], 
                        correctAnswer: createMultilingualText("A prolonged shortage of water", "पानी की लंबी कमी") 
                    },
                ]
            }
        }
    }
];

export const MOCK_STUDENT_PROGRESS: StudentProgress[] = [
    { id: 'S01', studentName: 'Aarav Singh', class: '10A', preparednessScore: 85, drillsCompleted: 4, modulesCompleted: 5, certification: 'Certified' },
    { id: 'S02', studentName: 'Diya Patel', class: '9B', preparednessScore: 72, drillsCompleted: 3, modulesCompleted: 4, certification: 'In Progress' },
    { id: 'S03', studentName: 'Kabir Gupta', class: '11C', preparednessScore: 91, drillsCompleted: 5, modulesCompleted: 5, certification: 'Certified' },
    { id: 'S04', studentName: 'Mira Reddy', class: '10A', preparednessScore: 55, drillsCompleted: 2, modulesCompleted: 3, certification: 'In Progress' },
    { id: 'S05', studentName: 'Vihaan Kumar', class: '8A', preparednessScore: 20, drillsCompleted: 0, modulesCompleted: 1, certification: 'Not Started' },
    { id: 'S06', studentName: 'Anika Sharma', class: '10B', preparednessScore: 95, drillsCompleted: 5, modulesCompleted: 5, certification: 'Certified' },
    { id: 'S07', studentName: 'Rohan Mehra', class: '9A', preparednessScore: 68, drillsCompleted: 3, modulesCompleted: 4, certification: 'In Progress' },
    { id: 'S08', studentName: 'Saanvi Desai', class: '12A', preparednessScore: 88, drillsCompleted: 4, modulesCompleted: 5, certification: 'Certified' },
    { id: 'S09', studentName: 'Arjun Verma', class: '11B', preparednessScore: 40, drillsCompleted: 1, modulesCompleted: 2, certification: 'Not Started' },
    { id: 'S10', studentName: 'Ishaan Joshi', class: '10A', preparednessScore: 78, drillsCompleted: 4, modulesCompleted: 4, certification: 'In Progress' },
    { id: 'S11', studentName: 'Zara Khan', class: '9C', preparednessScore: 82, drillsCompleted: 4, modulesCompleted: 5, certification: 'Certified' },
    { id: 'S12', studentName: 'Aryan Malhotra', class: '8B', preparednessScore: 35, drillsCompleted: 1, modulesCompleted: 2, certification: 'Not Started' },
    { id: 'S13', studentName: 'Kiara Nair', class: '12B', preparednessScore: 90, drillsCompleted: 5, modulesCompleted: 5, certification: 'Certified' },
    { id: 'S14', studentName: 'Advik Iyer', class: '11A', preparednessScore: 65, drillsCompleted: 3, modulesCompleted: 3, certification: 'In Progress' },
    { id: 'S15', studentName: 'Myra Das', class: '10C', preparednessScore: 75, drillsCompleted: 3, modulesCompleted: 4, certification: 'In Progress' },
];

export const MOCK_DRILLS: Drill[] = [
    { id: 'D01', title: createMultilingualText('Campus Evacuation Drill', 'कैंपस निकासी ड्रिल'), type: createMultilingualText('Evacuation', 'निकासी'), scheduledAt: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000) },
    { id: 'D02', title: createMultilingualText('Fire Response Simulation', 'अग्नि प्रतिक्रिया सिमुलेशन'), type: createMultilingualText('Fire', 'आग'), scheduledAt: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000) },
    { id: 'D03', title: createMultilingualText('Earthquake "Drop, Cover, Hold On" Practice', 'भूकंप "झुको, ढको, पकड़ो" अभ्यास'), type: createMultilingualText('Earthquake', 'भूकंप'), scheduledAt: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000) },
];

export const MOCK_EMERGENCY_CONTACTS: EmergencyContact[] = [
    { category: 'National', name: 'National Emergency Number', number: '112' },
    { category: 'National', name: 'Police', number: '100' },
    { category: 'National', name: 'Fire', number: '101' },
    { category: 'National', name: 'Ambulance', number: '102' },
    { category: 'National', name: 'Disaster Management (NDMA)', number: '1078' },
    { category: 'Local', name: 'District Collector Office', number: '0612-2219810' },
    { category: 'Local', name: 'Local Hospital', number: '0612-2219811' },
    { category: 'School', name: 'School Admin Office', number: '011-45678901' },
    { category: 'School', name: 'Campus Security Head', number: '9876543210' },
];

export const ALL_BADGES: Badge[] = [
    // Module Badges (IDs match module IDs)
    { id: 'M01', label: createMultilingualText('Earthquake Pro', 'भूकंप विशेषज्ञ'), icon: Icons.ShieldAlert, type: 'module' },
    { id: 'M02', label: createMultilingualText('Flood Smart', 'बाढ़ स्मार्ट'), icon: Icons.Waves, type: 'module' },
    { id: 'M03', label: createMultilingualText('Fire Safe', 'अग्नि सुरक्षित'), icon: Icons.Flame, type: 'module' },
    { id: 'M04', label: createMultilingualText('Cyclone Ready', 'चक्रवात तैयार'), icon: Icons.Wind, type: 'module' },
    { id: 'M05', label: createMultilingualText('Landslide Aware', 'भूस्खलन जागरूक'), icon: Icons.Mountain, type: 'module' },
    { id: 'M06', label: createMultilingualText('Drought Resilient', 'सूखा प्रतिरोधी'), icon: Icons.Sun, type: 'module' },

    // Game Badges (IDs match game IDs)
    { id: 'kit', label: createMultilingualText('Kit Builder', 'किट निर्माता'), icon: Icons.Backpack, type: 'game' },
    { id: 'sequence', label: createMultilingualText('Sequencer', 'अनुक्रमक'), icon: Icons.Move, type: 'game' },
    { id: 'recognition', label: createMultilingualText('Safe Spotter', 'सुरक्षित स्थान पहचानकर्ता'), icon: Icons.MousePointerClick, type: 'game' },
    { id: 'spotter', label: createMultilingualText('Hazard Hunter', 'खतरा शिकारी'), icon: Icons.Eye, type: 'game' },
    { id: 'decision', label: createMultilingualText('Decision Maker', 'निर्णय निर्माता'), icon: Icons.Puzzle, type: 'game' },
    { id: 'reaction', label: createMultilingualText('Quick Thinker', 'त्वरित विचारक'), icon: Icons.Timer, type: 'game' },
    
    // Drill Badges (IDs match drill badge IDs)
    { id: 'evacuation-ready', label: createMultilingualText('Evacuation Ready', 'निकासी के लिए तैयार'), icon: Icons.Users, type: 'drill' },
    { id: 'fire-safety-hero', label: createMultilingualText('Fire Safety Hero', 'अग्नि सुरक्षा नायक'), icon: Icons.Flame, type: 'drill' },
    { id: 'earthquake-pro', label: createMultilingualText('Earthquake Pro', 'भूकंप विशेषज्ञ'), icon: Icons.ShieldAlert, type: 'drill' },
];