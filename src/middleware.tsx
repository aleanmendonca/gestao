import React from 'react';
    import { useAuth } from '@clerk/clerk-react';
    import { Navigate, useLocation } from 'react-router-dom';
    import { useUserStore } from './store/user';

    interface MiddlewareProps {
      children: React.ReactNode;
    }

    export function Middleware({ children }: MiddlewareProps) {
      const { isSignedIn, isLoaded } = useAuth();
      const location = useLocation();
      const planId = useUserStore((state) => state.planId);

      if (!isLoaded) {
        return <div>Loading...</div>;
      }

      const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
      const isSelectPlanPage = location.pathname === '/select-plan';

      if (isSignedIn && isAuthPage) {
        return <Navigate to="/dashboard" replace />;
      }

      if (!isSignedIn && !isAuthPage && !isSelectPlanPage) {
        return <Navigate to="/login" replace />;
      }

      if (isSignedIn && !planId && !isSelectPlanPage && location.pathname !== '/dashboard') {
        return <Navigate to="/select-plan" replace />;
      }

      return <>{children}</>;
    }
