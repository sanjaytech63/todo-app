"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import Loader from './Loader';

export const AuthInitializer = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkSession();
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [checkSession]);

  return isInitializing ? <Loader /> : null;
};