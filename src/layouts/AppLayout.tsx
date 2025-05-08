import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../components/Nav';

const AppLayout: React.FC = () => {
  
  return (
    <div>
      <header>
        <Nav/>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
