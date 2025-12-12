import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';

export const AdminLayout = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex">
        <AdminSidebar />
        <div className="w-full ml-16 lg:ml-64 transition-all duration-300">

          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};
