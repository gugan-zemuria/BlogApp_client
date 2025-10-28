import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        console.log('AuthContext: Initializing auth with token:', storedToken ? 'exists' : 'none');
        
        if (storedToken && AuthService.isTokenValid(storedToken)) {
          console.log('AuthContext: Token is valid, getting user data...');
          const userData = await AuthService.getCurrentUser();
          console.log('AuthContext: User data retrieved:', userData);
          setAuthData(storedToken, userData);
        } else {
          console.log('AuthContext: No valid token found');
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const setAuthData = (token, user) => {
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', token);
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      console.log('AuthContext: Calling AuthService.login...');
      const response = await AuthService.login(email, password);
      console.log('AuthContext: Login response:', response);
      setAuthData(response.token, response.user);
      console.log('AuthContext: Auth data set, isAuthenticated:', true);
      return response;
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await AuthService.signup(name, email, password);
      setAuthData(response.token, response.user);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    AuthService.logout();
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    setAuthData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};