
export enum Platform {
  MOBILE = 'MOBILE',
  WEB = 'WEB'
}

export enum MobileScreen {
  ONBOARDING = 'ONBOARDING',
  LOGIN = 'LOGIN',
  PROJECT_SELECT = 'PROJECT_SELECT',
  DASHBOARD = 'DASHBOARD',
  DAILY_LOG = 'DAILY_LOG',
  MATERIALS = 'MATERIALS',
  INSPECTIONS = 'INSPECTIONS',
  REPORTS = 'REPORTS'
}

export enum WebScreen {
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  OVERVIEW = 'OVERVIEW',
  DAILY_LOGS = 'DAILY_LOGS',
  MATERIALS = 'MATERIALS',
  INSPECTIONS = 'INSPECTIONS',
  ADMIN = 'ADMIN'
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'supervisor' | 'inspector' | 'manager';
  avatarUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  progress: number;
  status: 'active' | 'on-hold' | 'completed';
  manager: string;
}

export interface DailyLog {
  id: string;
  projectId: string;
  date: string;
  weather: string;
  temp: string;
  manpower: number;
  status: 'pending' | 'approved' | 'rejected';
  activities: string[];
}
