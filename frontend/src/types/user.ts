export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface UserProfile extends User {
  birthday?: string;
  birthTime?: string;
  location?: string;
  phone?: string;
  savedCalculations: Array<{
    id: string;
    title: string;
    type: string;
    createdAt: string;
  }>;
}