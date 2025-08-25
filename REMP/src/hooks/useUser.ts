import { useState } from 'react';
import { LoginRequestDto, PhotographyCompanyRegisterDto, UserRegisterRequestDto } from '../interface/user';
import userApi from '../apis/userAPIs';
import cookieService from '../config/cookie';
import { UserRole } from '../interface/auth';
import { useNavigate } from 'react-router-dom';

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const createAdmin = async (data: UserRegisterRequestDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.createAdmin(data);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  const createPhotographyCompany = async (data: PhotographyCompanyRegisterDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.createPhotographyCompany(data);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  const createAgent = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.createAgent(data);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  const findAgentByEmail = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.findAgentByEmail(email);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  const login = async (data: LoginRequestDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.login(data);
      const { token, user } = response.data.data;
      
      let role: UserRole;
      
      switch(user?.role?.toLowerCase()) {
        case 'admin':
          role = 'Admin';
          break;
        case 'photographycompany':
        case 'photography_company':
        case 'photography company':
          role = 'PhotographyCompany';
          break;
        case 'agent':
        default:
          role = 'Agent';
          break;
      }
      
      cookieService.setToken(token);
      cookieService.setUserRole(role);
      
      setLoading(false);

      if (role === 'Agent') {
        navigate('/my-property');
      } else {
        navigate('/dashboard');
      }

      
      return { token, user, role };
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
      setLoading(false);
      throw err;
    }
  };

  const getCurrentUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.getCurrentUser();
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to get user information');
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    // Remove token and role from cookies
    cookieService.clearAuth();
  };

  return {
    loading,
    error,
    createAdmin,
    createPhotographyCompany,
    createAgent,
    findAgentByEmail,
    login,
    getCurrentUser,
    logout
  };
};

export default useUser;