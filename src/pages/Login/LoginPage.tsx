import type { FC } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useLoginPage } from './LoginPage.hooks';

export const LoginPage: FC = () => {
  const { handleSuccess, role, handleRoleChange } = useLoginPage();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transition duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <p className="text-center text-gray-600 mb-4">Please select your role:</p>
        <div className="flex justify-center space-x-6 mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={handleRoleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Admin</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="rider"
              checked={role === 'rider'}
              onChange={handleRoleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Rider</span>
          </label>
        </div>

        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <GoogleLogin
              onSuccess={(response) => handleSuccess(response, role)}
              onError={() => {
                console.log('Google login failed');
              }}
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
};
