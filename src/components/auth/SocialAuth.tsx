"use client";

import { FaGithub, FaGoogle } from 'react-icons/fa';

const SocialAuth = () => {
  const handleSocialLogin = (provider: string) => {
    // Replace with actual social login implementation
    window.location.href = `/api/auth/social/${provider}`;
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSocialLogin('google')}
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <FaGoogle className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleSocialLogin('github')}
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <FaGithub className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;