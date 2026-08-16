import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect } from 'react';

const ManagementLayout = () => {
  // Ensure the body has the right background color for the management area
  useEffect(() => {
    document.body.style.backgroundColor = '#F6F0E4'; // Cream background
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-cream font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-cream p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ManagementLayout;
