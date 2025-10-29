import axios from 'axios';
import config from '../config';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email, password) {
    try {
      console.log('AuthService: Making login request to:', `${this.api.defaults.baseURL}/login`);
      const response = await this.api.post('/login', { email, password });
      console.log('AuthService: Login response:', response.data);
      return {
        token: response.data.token,
        user: response.data.user || { email }
      };
    } catch (error) {
      console.error('AuthService: Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  }

  async signup(name, email, password) {
    try {
      const response = await this.api.post('/signup', { name, email, password });
      return {
        token: response.data.token,
        user: response.data.user
      };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Signup failed');
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.api.get('/profile');
      return response.data.user;
    } catch (error) {
      throw new Error('Failed to get user profile');
    }
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isTokenValid(token) {
    if (!token) return false;

    try {
      // Basic JWT structure check
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload to check expiry
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Date.now() / 1000;

      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  getGoogleAuthUrl() {
    return `${config.API_URL}/auth/google`;
  }
}

export default new AuthService();