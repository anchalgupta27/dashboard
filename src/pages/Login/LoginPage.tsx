import type { FC } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useLoginPage } from './LoginPage.hooks';

export const LoginPage: FC = () => {
  const { handleSuccess, role, handleRoleChange } = useLoginPage();
 
 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-semibold mb-6">Login Page</h2>

      <div className="flex space-x-4 mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="admin"
            checked={role === 'admin'}
            onChange={handleRoleChange}
            className="h-4 w-4 text-blue-500"
          />
          <span className="text-lg">Admin</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="rider"
            checked={role === 'rider'}
            onChange={handleRoleChange}
            className="h-4 w-4 text-blue-500"
          />
          <span className="text-lg">Rider</span>
        </label>
      </div>

      <div className="w-full max-w-xs">
        <div className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
        <GoogleLogin
          onSuccess={(response) => handleSuccess(response, role)} // Pass role to the success handler
          onError={() => {
            console.log('Google login failed');
          }}
          useOneTap
        />
        </div>
      </div>
    </div>
  );
};
