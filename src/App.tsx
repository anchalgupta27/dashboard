// src/App.tsx (updated)
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import AppLayout from './layouts/AppLayout';
import { LoginPage } from './pages/Login/LoginPage';
import { AuthRepository } from './features/repository/AuthRepository';
import type { User } from './features/entity/user';
import OrderPage  from './pages/Order/OrderPage';
import PrivateRoute from './components/privateRoute';
import RiderPage  from './pages/Rider/RiderPage';
import OrderDetailPage from './pages/OrderDetail/OrderDetail';

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(); // You can later replace this with actual login state

  useEffect(() => {
    const storedUser = AuthRepository.currentUser();
    setUser(storedUser);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<PrivateRoute user={user}>
                <OrderPage />
              </PrivateRoute>} />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path="/order"
            element={
              <PrivateRoute user={user}>
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/riders"
            element={
              <PrivateRoute user={user}>
                <RiderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/:id/detail"
            element={
              <PrivateRoute user={user}>
                <OrderDetailPage />
              </PrivateRoute>
            }
          />
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
