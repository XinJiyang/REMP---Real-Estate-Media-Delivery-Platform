export type UserRole = 'Admin' | 'Agent' | 'PhotographyCompany';

export interface AuthUser {
  token: string;
  role: UserRole;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
}

export interface LoginResponse {
  token: string;
  role: UserRole;
}