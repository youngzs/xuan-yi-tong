export const Permissions = {
  // 用户权限
  USER_VIEW: 'user:view',
  USER_EDIT: 'user:edit',
  
  // 计算结果权限
  CALC_CREATE: 'calculation:create',
  CALC_VIEW: 'calculation:view',
  CALC_EDIT: 'calculation:edit',
  CALC_DELETE: 'calculation:delete',
  
  // VIP 功能权限
  VIP_FEATURES: 'vip:features',
  
  // 管理员权限
  ADMIN_ACCESS: 'admin:access',
} as const;

export type Permission = keyof typeof Permissions;

const RolePermissions: Record<string, Permission[]> = {
  user: [
    'user:view',
    'calculation:create',
    'calculation:view',
    'calculation:edit',
    'calculation:delete',
  ],
  vip: [
    'user:view',
    'calculation:create',
    'calculation:view',
    'calculation:edit',
    'calculation:delete',
    'vip:features',
  ],
  admin: Object.values(Permissions),
};

export const hasPermission = (role: string, permission: Permission): boolean => {
  return RolePermissions[role]?.includes(permission) ?? false;
}; 