"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import InputField from '../InputField';
import Loader from '../Loader';

interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const {
    isLoading,
    error,
    login,
    register,
    clearError
  } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) clearError();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      router.push('/');
    } catch (error) {
      console.log(error, "authntications");

    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="text-red-700 text-sm">{error}</div>
          </div>
        </div>
      )}

      {mode === 'register' && (
        <InputField
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full name"
          required
        />
      )}

      <InputField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        value={formData.password}
        onChange={handleChange}
        required
        minLength={6}
        placeholder="Password"
      />

      {mode === 'login' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2" aria-live="polite" aria-busy={isLoading}>
              <Loader />
              <span>{mode === "register" ? "Registering..." : "Logging in..."}</span>
            </div>
          ) : mode === 'login' ? (
            'Sign in'
          ) : (
            'Sign up'
          )}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;