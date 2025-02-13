import { User, UserProfile } from '../types/user';

const STORAGE_KEYS = {
  USERS: 'xuan_yi_tong_users',
  CURRENT_USER: 'xuan_yi_tong_current_user',
  CALCULATIONS: 'xuan_yi_tong_calculations',
} as const;

// 用户相关操作
export const userService = {
  // 注册
  register: async (userData: { username: string; email: string; password: string }): Promise<User> => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    
    // 检查用户是否已存在
    if (users.some((u: User) => u.email === userData.email)) {
      throw new Error('用户已存在');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username: userData.username,
      email: userData.email,
      role: 'user',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    // 存储用户信息（实际项目中不应该存储密码，这里仅作演示）
    users.push({ ...newUser, password: userData.password });
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // 返回用户信息（不包含密码）
    return newUser;
  },

  // 登录
  login: async (credentials: { email: string; password: string }): Promise<User> => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find((u: any) => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('用户名或密码错误');
    }

    // 更新最后登录时间
    user.lastLoginAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // 存储当前用户信息
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  },

  // 获取用户资料
  getProfile: async (userId: string): Promise<UserProfile> => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find((u: User) => u.id === userId);
    
    if (!user) {
      throw new Error('用户不存在');
    }

    const calculations = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALCULATIONS) || '[]');
    const userCalculations = calculations.filter((c: any) => c.userId === userId);

    return {
      ...user,
      savedCalculations: userCalculations,
    };
  },

  // 更新用户资料
  updateProfile: async (userId: string, profileData: Partial<UserProfile>): Promise<UserProfile> => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const userIndex = users.findIndex((u: User) => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('用户不存在');
    }

    users[userIndex] = { ...users[userIndex], ...profileData };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    return users[userIndex];
  },
};

// 计算结果相关操作
export const calculationService = {
  saveCalculation: async (data: {
    userId: string;
    type: 'bazi' | 'fengshui' | 'ziweidoushu' | 'cezi';
    title: string;
    content: any;
  }) => {
    const calculations = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALCULATIONS) || '[]');
    
    const newCalculation = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    calculations.push(newCalculation);
    localStorage.setItem(STORAGE_KEYS.CALCULATIONS, JSON.stringify(calculations));

    return newCalculation;
  },

  getUserCalculations: async (userId: string) => {
    const calculations = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALCULATIONS) || '[]');
    return calculations.filter((c: any) => c.userId === userId);
  },
}; 