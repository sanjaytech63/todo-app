import { create } from 'zustand';
import api from '@/app/utils/api';
import { showErrorToast, showSuccessToast } from '@/app/utils/toast';

interface User {
    id: string;
    name: string;
    email: string;
    provider?: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/login', { email, password });

            if (response.status !== 200) {
                return showErrorToast("Login failed. Please try again.");
            }

            if (response.status === 200) {
                return showSuccessToast("Login Successfully!");
            }

            set({ user: response.data.user });
        } catch (error: any) {
            set({ error: error.message || 'Login failed' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/register', { name, email, password });

            if (response.status !== 200) {
                return showErrorToast("Registration failed. Please try again.");
            }

            if (response.status === 200) {
                return showSuccessToast("Register Successfully!");
            }

            set({ user: response.data.user });

        } catch (error: any) {
            set({ error: error.message || 'Registration failed' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            const response = await api.post('/logout');
            if (response.status !== 200) {
                return showErrorToast("Logout failed. Please try again.");
            }

            if (response.status === 200) {
                return showSuccessToast("Logout Successfully!");
            }

            set({ user: null });
        } catch (error: any) {
            set({ error: error.message || 'Logout failed' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    checkSession: async () => {
        try {
            const response = await api.get('/session');
            if (response.data?.user) {
                set({ user: response.data.user });
            }
        } catch (error) {
            // Silent error - session might not exist
        }
    },

    clearError: () => set({ error: null }),
}));