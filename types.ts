
export enum Platform {
  MOBILE = 'MOBILE',
  WEB = 'WEB'
}

export enum MobileScreen {
  LOGIN = 'LOGIN',
  PROJECT_SELECT = 'PROJECT_SELECT',
  DASHBOARD = 'DASHBOARD',
  DAILY_LOG = 'DAILY_LOG',
  MATERIALS = 'MATERIALS',
  INSPECTIONS = 'INSPECTIONS',
  REPORTS = 'REPORTS'
}

export enum WebScreen {
  LOGIN = 'LOGIN',
  OVERVIEW = 'OVERVIEW',
  DAILY_LOGS = 'DAILY_LOGS',
  MATERIALS = 'MATERIALS',
  INSPECTIONS = 'INSPECTIONS',
  ADMIN = 'ADMIN'
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
