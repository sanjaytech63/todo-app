import { AuthForm, SocialAuth } from '@/imports';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white  px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-6 text-3xl  font-extrabold py-6 text-gray-900">Sign up</h2>
          <AuthForm mode="register" />
          <SocialAuth />
          <div className="text-center flex justify-center items-center py-6">
            <p className="mt-2 flex gap-1.5 text-sm  text-gray-600">
              <span> Or</span>
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                sign in to your existing account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;