import { Icons } from '../components/icons';
import type { MultilingualString } from '../types';

export interface DrillStep {
  description: MultilingualString;
  type: 'info' | 'choice';
  image?: string;
  options?: { text: MultilingualString; isCorrect: boolean }[];
}

export interface DrillContent {
  id: string;
  title: MultilingualString;
  objective: MultilingualString;
  badgeId: string;
  badgeName: string;
  badgeIcon: React.ComponentType<{ className?: string }>;
  steps: DrillStep[];
}

const t = (en: string, hi: string): MultilingualString => ({ en, hi });

export const VIRTUAL_DRILLS: DrillContent[] = [
  {
    id: 'D01',
    title: t('Campus Evacuation Drill', 'कैंपस निकासी ड्रिल'),
    objective: t('Practice safe and calm evacuation during emergencies.', 'आपात स्थिति के दौरान सुरक्षित और शांत निकासी का अभ्यास करें।'),
    badgeId: 'evacuation-ready',
    badgeName: 'Evacuation Ready',
    badgeIcon: Icons.Users,
    steps: [
      { type: 'info', description: t('An alarm bell sounds. Stay calm and stop all activities.', 'एक अलार्म बजता है। शांत रहें और सभी गतिविधियाँ बंद कर दें।'), image: 'https://picsum.photos/seed/alarmbell/600/300' },
      { type: 'info', description: t('Form a line with your classmates.', 'अपने सहपाठियों के साथ एक पंक्ति बनाएं।'), image: 'https://picsum.photos/seed/lineup/600/300' },
      { 
        type: 'choice', 
        description: t('Which way should you exit the building?', 'आपको इमारत से किस रास्ते से बाहर निकलना चाहिए?'),
        options: [
          { text: t('Use the Elevator', 'लिफ्ट का प्रयोग करें'), isCorrect: false },
          { text: t('Use the Stairs', 'सीढ़ियों का प्रयोग करें'), isCorrect: true },
        ]
      },
      { type: 'info', description: t('Move to a safe assembly point outside (e.g., the playground).', 'बाहर एक सुरक्षित सभा स्थल पर जाएँ (जैसे, खेल का मैदान)।'), image: 'https://picsum.photos/seed/assembly/600/300' },
      { type: 'info', description: t('Report your attendance to the teacher.', 'शिक्षक को अपनी उपस्थिति की रिपोर्ट करें।'), image: 'https://picsum.photos/seed/attendance/600/300' },
    ],
  },
  {
    id: 'D02',
    title: t('Fire Response Simulation', 'अग्नि प्रतिक्रिया सिमुलेशन'),
    objective: t('Train on the correct response during a fire.', 'आग लगने पर सही प्रतिक्रिया का प्रशिक्षण दें।'),
    badgeId: 'fire-safety-hero',
    badgeName: 'Fire Safety Hero',
    badgeIcon: Icons.Flame,
    steps: [
      { 
        type: 'choice', 
        description: t('An alarm sounds. What is your immediate reaction?', 'एक अलार्म बजता है। आपकी तत्काल प्रतिक्रिया क्या है?'),
        options: [
          { text: t('Panic and run', 'घबराकर भागें'), isCorrect: false },
          { text: t('Stay calm and assess', 'शांत रहें और मूल्यांकन करें'), isCorrect: true },
        ]
      },
      { type: 'info', description: t('You see smoke in the hallway. Crawl low to stay below it.', 'आपको दालान में धुआं दिखाई देता है। धुएं के नीचे रहने के लिए झुककर चलें।'), image: 'https://picsum.photos/seed/crawling/600/300' },
      { 
        type: 'choice', 
        description: t('You see a small fire in a wastebasket. What do you do?', 'आपको कूड़ेदान में एक छोटी सी आग दिखाई देती है। आप क्या करते हैं?'),
        options: [
          { text: t('Try to use a fire extinguisher', 'अग्निशामक यंत्र का उपयोग करने का प्रयास करें'), isCorrect: true },
          { text: t('Ignore it and run', 'इसे अनदेखा करें और भागें'), isCorrect: false },
        ]
      },
      { type: 'info', description: t('You have successfully exited the building. Proceed to the assembly point.', 'आप सफलतापूर्वक इमारत से बाहर निकल गए हैं। सभा स्थल की ओर बढ़ें।'), image: 'https://picsum.photos/seed/assemblyfire/600/300' },
    ],
  },
  {
    id: 'D03',
    title: t('Earthquake Drill (Drop, Cover, Hold On)', 'भूकंप ड्रिल (झुको, ढको, पकड़ो)'),
    objective: t('Train in immediate earthquake survival steps.', 'भूकंप से बचने के तत्काल कदमों का प्रशिक्षण दें।'),
    badgeId: 'earthquake-pro',
    badgeName: 'Earthquake Pro',
    badgeIcon: Icons.ShieldAlert,
    steps: [
      { type: 'info', description: t('You feel the ground shaking. Drop to the ground immediately.', 'आपको जमीन हिलती हुई महसूस होती है। तुरंत जमीन पर झुक जाएं।'), image: 'https://picsum.photos/seed/drop/600/300' },
      { type: 'info', description: t('Take cover under a sturdy desk or table.', 'एक मजबूत डेस्क या मेज के नीचे छिप जाएं।'), image: 'https://picsum.photos/seed/coverdesk/600/300' },
      { type: 'info', description: t('Hold on to the leg of the desk/table until the shaking stops.', 'कंपन बंद होने तक डेस्क/मेज के पैर को पकड़ें।'), image: 'https://picsum.photos/seed/holdon/600/300' },
      { 
        type: 'choice', 
        description: t('The shaking has stopped. What do you do now?', 'कंपन बंद हो गया है। अब आप क्या करेंगे?'),
        options: [
          { text: t('Run outside immediately', 'तुरंत बाहर भागें'), isCorrect: false },
          { text: t('Evacuate calmly, avoiding windows and elevators', 'खिड़कियों और लिफ्ट से बचते हुए शांति से बाहर निकलें'), isCorrect: true },
        ]
      },
      { type: 'info', description: t('You have gathered safely at the outdoor assembly point.', 'आप बाहरी सभा स्थल पर सुरक्षित रूप से एकत्र हो गए हैं।'), image: 'https://picsum.photos/seed/assemblyquake/600/300' },
    ],
  },
];
