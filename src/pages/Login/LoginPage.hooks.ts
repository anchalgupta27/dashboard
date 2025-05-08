import { useNavigate } from "react-router";
import { baseURL } from "../../BaseUrl";
import { AuthUsecase } from "../../features/usecase/AuthUsecase";
import { useState } from "react";

export const useLoginPage = () => {
  const navigate = useNavigate();
   const [role, setRole] = useState<'admin' | 'rider'>('admin'); // Default role is 'admin'

   const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as 'admin' | 'rider');
  };
  
  const handleSuccess = async (credentialResponse: any, role: string) => {
    const credential = credentialResponse?.credential;

    if (!credential) {
      console.error("Missing credential from Google login");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/google/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Login failed');
      }

      const data = await response.json();
      const { user } = data;

      // Save token for later API requests
    await AuthUsecase.login({name: user.name, email: user.email, userId: user._id})
      console.log('Login successful:', user);

      if(user?.roles?.includes(role)) {
        navigate('/');
      } else {
        window.alert("Not authorized to access admin dashboard")
      }

     
  
  
    } catch (error) {
      console.error('Backend login failed:', error);
      window.alert("Unable to login")
    }
  };

  const handleLogout = async () => {
      
  }

  return { handleSuccess, role, setRole, handleRoleChange, handleLogout}
}