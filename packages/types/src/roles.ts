import type { UserRole } from './user';

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

export type Permission =
  | 'student:read'
  | 'student:write'
  | 'teacher:read'
  | 'teacher:write'
  | 'institution:read'
  | 'institution:write'
  | 'institution:admin'
  | 'government:read'
  | 'government:write'
  | 'admin:full';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  student: ['student:read', 'student:write'],
  teacher: ['student:read', 'teacher:read', 'teacher:write'],
  institution_admin: [
    'student:read',
    'teacher:read',
    'teacher:write',
    'institution:read',
    'institution:write',
    'institution:admin',
  ],
  government: ['government:read', 'government:write'],
  admin: ['admin:full'],
};