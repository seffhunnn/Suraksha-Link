
export enum Role {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
  Parent = 'parent',
}

export type Language = 'en' | 'hi';

export type MultilingualString = {
    [key in Language]: string;
};

export interface User {
  id: string;
  name: string;
  role: Role;
  schoolId: string;
  avatarUrl: string;
  email: string;
  password: string;
  location: string; // Added for location-based alerts
}

export enum DisasterType {
  Earthquake = 'earthquake',
  Flood = 'flood',
  Fire = 'fire',
  Cyclone = 'cyclone',
  Landslide = 'landslide',
  Drought = 'drought',
}

export interface Module {
  id: string;
  title: MultilingualString;
  disasterType: DisasterType;
  duration: number; // in minutes
  imageUrl: string;
  content: {
      videoUrl: string;
      dos: MultilingualString[];
      donts: MultilingualString[];
      quiz: Quiz;
  };
}

export interface Quiz {
    questions: {
        question: MultilingualString;
        options: MultilingualString[];
        correctAnswer: MultilingualString;
    }[];
}


export enum AlertSeverity {
    Advisory = 'Advisory',
    Watch = 'Watch',
    Warning = 'Warning',
}

export interface Alert {
    id: string;
    title: MultilingualString;
    severity: AlertSeverity;
    region: string;
    message: MultilingualString;
    timestamp: string;
    date: string; // Added for date-based filtering
}

export interface StudentProgress {
    id: string;
    studentName: string;
    class: string;
    preparednessScore: number;
    drillsCompleted: number;
    modulesCompleted: number;
    certification: 'Certified' | 'In Progress' | 'Not Started';
}

export interface Drill {
    id:string;
    title: MultilingualString;
    type: MultilingualString;
    scheduledAt: Date;
}

export interface EmergencyContact {
    category: 'National' | 'Local' | 'School';
    name: string;
    number: string;
}

export interface Badge {
  id: string;
  label: MultilingualString;
  icon: React.ComponentType<{ className?: string }>;
  type: 'module' | 'game' | 'drill';
}
