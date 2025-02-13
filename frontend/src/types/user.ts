export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'vip';
  createdAt: string;
  lastLoginAt: string;
}

export interface UserProfile extends User {
  phone?: string;
  birthday?: string;
  birthTime?: string;
  gender?: 'male' | 'female';
  location?: string;
  savedCalculations: {
    type: 'bazi' | 'fengshui' | 'ziweidoushu' | 'cezi';
    id: string;
    title: string;
    createdAt: string;
  }[];
} 