"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import InputField from '../InputField';
import Loader from '../Loader';
import { validateEmail, validatePassword } from '@/app/lib/validators';
import { showErrorToast, showSuccessToast } from '@/app/utils/toast';

interface AuthFormProps {
  mode: 'login' | 'register';
  redirectAfterAuth?: string;
}

const AuthForm = ({ mode, redirectAfterAuth = '/' }: AuthFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoading, error, login, register, clearError } = useAuthStore();

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [mode, clearError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (error) clearError();
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (mode === 'register' && !formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      showErrorToast("Please fill in all required fields correctly.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (mode === 'login') {
        await login({
          email: formData.email,
          password: formData.password
        });
        showSuccessToast("Login successful!");
      } else {
        await register({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        });
        showSuccessToast("Registration successful!");
      }
      router.push(redirectAfterAuth);
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const isSubmitDisabled = isSubmitting || isLoading;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {mode === 'register' && (
        <InputField
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          error={formErrors.fullName}
          placeholder="Enter your full name"
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
        error={formErrors.email}
        placeholder="Enter your email"
        required
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        value={formData.password}
        onChange={handleChange}
        error={formErrors.password}
        required
        minLength={6}
        placeholder="Enter your password"
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
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <button
              type="button"
              onClick={() => router.push('/forgot-password')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </button>
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isSubmitDisabled ? 'opacity-70 cursor-not-allowed' : ''
            }`}
        >
          {isSubmitDisabled ? (
            <div className="flex items-center gap-2" aria-live="polite">
              <Loader />
              <span>{mode === "register" ? "Creating account..." : "Signing in..."}</span>
            </div>
          ) : mode === 'login' ? (
            'Sign in'
          ) : (
            'Create account'
          )}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;