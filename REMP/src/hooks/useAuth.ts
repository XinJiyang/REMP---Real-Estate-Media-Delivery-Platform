import { useState, useEffect } from 'react';
import { AuthUser, UserRole } from '../interface/auth';
import cookieService from '../config/cookie';

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  hasRole: (requiredRole: UserRole | UserRole[]) => boolean;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initAuth = () => {
    const token = cookieService.getToken();
    const role = cookieService.getUserRole() as UserRole | undefined;

    if (token && role) {
      setUser({ token, role });
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initAuth();
  }, []);

  const hasRole = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    return user.role === requiredRole;
  };

  const logout = (): void => {
    cookieService.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    hasRole,
    logout
  };
};

export default useAuth;