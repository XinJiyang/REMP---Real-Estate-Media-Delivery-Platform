import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';
const USER_ROLE_KEY = 'user_role';
const TOKEN_EXPIRES_DAYS = 7;

export const cookieService = {
  setToken(token: string): void {
    Cookies.set(TOKEN_KEY, token, { 
      expires: TOKEN_EXPIRES_DAYS, 
      path: '/', 
      sameSite: 'strict',
      secure: window.location.protocol === 'https:'
    });
  },

  getToken(): string | undefined {
    return Cookies.get(TOKEN_KEY);
  },

  removeToken(): void {
    Cookies.remove(TOKEN_KEY, { path: '/' });
  },

  setUserRole(role: string): void {
    Cookies.set(USER_ROLE_KEY, role, { 
      expires: TOKEN_EXPIRES_DAYS, 
      path: '/', 
      sameSite: 'strict',
      secure: window.location.protocol === 'https:'
    });
  },

  getUserRole(): string | undefined {
    return Cookies.get(USER_ROLE_KEY);
  },

  removeUserRole(): void {
    Cookies.remove(USER_ROLE_KEY, { path: '/' });
  },

  clearAuth(): void {
    this.removeToken();
    this.removeUserRole();
  },

  setCookie(name: string, value: string, days = 7): void {
    Cookies.set(name, value, { 
      expires: days, 
      path: '/', 
      sameSite: 'strict',
      secure: window.location.protocol === 'https:'
    });
  },

  getCookie(name: string): string | undefined {
    return Cookies.get(name);
  },

  removeCookie(name: string): void {
    Cookies.remove(name, { path: '/' });
  }
};

export default cookieService;