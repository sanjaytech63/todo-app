import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name?: string;
}
interface RegisterParams {
  fullName: string;
  email: string;
  password: string;
}
interface LoginParams {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (params: LoginParams) => Promise<void>;
  register: (params: RegisterParams) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async ({email, password}) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post('/api/auth/login', { email, password });

          if (res.data.user) {
            set({
              user: res.data.user,
              isLoading: false,
              isAuthenticated: true,
              error: null
            });
          } else {
            throw new Error('Invalid response from server');
          }
        } catch (error) {
          let errorMessage = 'Login failed. Please try again.';

          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.error ||
              error.response?.data?.message ||
              errorMessage;
          }

          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      register: async ({fullName, email, password}) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post('/api/auth/register', { fullName, email, password });

          if (res.data.user) {
            set({
              user: res.data.user,
              isLoading: false,
              isAuthenticated: true,
              error: null
            });
          } else {
            throw new Error('Invalid response from server');
          }
        } catch (error) {
          let errorMessage = 'Registration failed. Please try again.';

          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.error ||
              error.response?.data?.message ||
              errorMessage;

            // Handle duplicate email case
            if (error.response?.status === 409) {
              errorMessage = 'Email already exists. Please use a different email.';
            }
          }

          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await axios.post('/api/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      },

      initialize: async () => {
        try {
          set({ isLoading: true });
          const res = await axios.get('/api/auth/session');

          if (res.data.user) {
            set({
              user: res.data.user,
              isAuthenticated: true,
              isLoading: false
            });
          }
        } catch (error) {
          console.error('Session initialization failed:', error);
          set({ isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);