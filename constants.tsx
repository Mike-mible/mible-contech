
import React from 'react';
import { 
  HardHat, 
  LayoutDashboard, 
  ClipboardList, 
  Package, 
  FileText, 
  ShieldCheck, 
  Settings,
  CloudSun,
  Users,
  Wrench,
  Camera,
  MapPin,
  Calendar,
  ChevronRight,
  Plus,
  ArrowLeft,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export const COLORS = {
  primary: '#2563eb', // Blue 600
  secondary: '#f97316', // Orange 500
  bg: '#f8fafc', // Slate 50
  text: '#0f172a', // Slate 900
  textMuted: '#64748b' // Slate 500
};

export const MOCK_PROJECTS = [
  { id: '1', name: 'Skyline Tower A', location: 'Downtown, Sector 12', progress: 65, status: 'active', manager: 'John Doe' },
  { id: '2', name: 'Riverview Apartments', location: 'North Bank, Lot 4', progress: 42, status: 'active', manager: 'Sarah Smith' },
  { id: '3', name: 'Industrial Hub Phase 2', location: 'South Gate, Zone B', progress: 12, status: 'on-hold', manager: 'Mike Ross' },
  { id: '4', name: 'Metropolis Mall Extension', location: 'Central Plaza', progress: 88, status: 'active', manager: 'Emily White' },
];

export const MOCK_LOGS = [
  { id: 'L1', projectId: '1', date: '2023-10-24', weather: 'Sunny', temp: '24°C', manpower: 45, status: 'approved', activities: ['Foundation pouring', 'Steel fixing'] },
  { id: 'L2', projectId: '1', date: '2023-10-23', weather: 'Partly Cloudy', temp: '21°C', manpower: 38, status: 'approved', activities: ['Site clearing', 'Excavation'] },
  { id: 'L3', projectId: '2', date: '2023-10-24', weather: 'Rainy', temp: '18°C', manpower: 12, status: 'pending', activities: ['Interior plumbing'] },
  { id: 'L4', projectId: '2', date: '2023-10-23', weather: 'Sunny', temp: '25°C', manpower: 52, status: 'approved', activities: ['Brickwork Level 4'] },
];

export const ICONS = {
  Project: HardHat,
  Dashboard: LayoutDashboard,
  DailyLog: ClipboardList,
  Materials: Package,
  Reports: FileText,
  Inspections: ShieldCheck,
  Admin: Settings,
  Weather: CloudSun,
  Users: Users,
  Equipment: Wrench,
  Camera: Camera,
  Map: MapPin,
  Calendar: Calendar,
  ChevronRight: ChevronRight,
  Plus: Plus,
  Back: ArrowLeft,
  Search: Search,
  Success: CheckCircle2,
  Error: XCircle,
  Warning: AlertCircle
};
