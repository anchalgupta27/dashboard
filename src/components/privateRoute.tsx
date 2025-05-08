// src/components/PrivateRoute.tsx
import React, { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router';

interface PrivateRouteProps {
  user: any;
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const user = localStorage.getItem("currentUser");

  if (!user) {
    console.log("No user")
    // Redirect them to the login page if not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
