import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'customer';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return <div>Cargando...</div>;

  if (!isAuthenticated) {
    return <Navigate to={`/auth?redirect=${location.pathname}`} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/store" replace />;
  }

  return <>{children}</>;
};