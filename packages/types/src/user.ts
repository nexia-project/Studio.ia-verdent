export type UserRole = 'student' | 'teacher' | 'institution_admin' | 'government' | 'admin';
export type UserPlan = 'free' | 'premium' | 'institution';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  plan: UserPlan;
  institutionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  userId: string;
  bio?: string;
  school?: string;
  grade?: string;
  subjects: string[];
  goals: string[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
}