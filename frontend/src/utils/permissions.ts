export const Permissions = {
  // 用户权限
  USER_VIEW: 'USER_VIEW',
  USER_EDIT: 'USER_EDIT',
  
  // 计算结果权限
  CALC_CREATE: 'CALC_CREATE',
  CALC_VIEW: 'CALC_VIEW',
  CALC_EDIT: 'CALC_EDIT',
  CALC_DELETE: 'CALC_DELETE',
  
  // VIP 功能权限
  VIP_FEATURES: 'VIP_FEATURES',
  
  // 管理员权限
  ADMIN_ACCESS: 'ADMIN_ACCESS',
} as const;

export type Permission = keyof typeof Permissions;

const RolePermissions: Record<string, Permission[]> = {
  user: [
    'USER_VIEW',
    'CALC_CREATE',
    'CALC_VIEW',
    'CALC_EDIT',
    'CALC_DELETE',
  ],
  vip: [
    'USER_VIEW',
    'CALC_CREATE',
    'CALC_VIEW',
    'CALC_EDIT',
    'CALC_DELETE',
    'VIP_FEATURES',
  ],
  admin: Object.values(Permissions) as Permission[],
};

export const hasPermission = (role: string, permission: Permission): boolean => {
  return RolePermissions[role]?.includes(permission) ?? false;
};