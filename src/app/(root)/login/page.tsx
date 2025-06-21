import { AuthForm, SocialAuth } from '@/imports';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white py-0 px-4 shadow-sm rounded-xl sm:px-10">
          <h2 className="mt-6 text-3xl  font-extrabold py-4 text-gray-900">Sign in</h2>
          <AuthForm mode="login" />
          <SocialAuth />
          <div className="text-center flex justify-center items-center py-4">
            <p className="mt-2 flex gap-1.5 text-sm  text-gray-600">
              <span> Or</span>
              <Link href="/register" className="font-medium text-indigo-600  hover:text-indigo-500">
                create a new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;