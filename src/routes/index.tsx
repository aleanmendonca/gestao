import React from 'react';
    import { Routes, Route, Navigate } from 'react-router-dom';
    import { DashboardLayout } from '../layouts/DashboardLayout';
    import { Dashboard } from '../pages/Dashboard';
    import { Sales } from '../pages/dashboard/Sales';
    import { Products } from '../pages/dashboard/sales/Products';
    import { Quotes } from '../pages/dashboard/sales/Quotes';
    import { Services } from '../pages/dashboard/sales/Services';
    import { Clients } from '../pages/dashboard/registers/Clients';
    import { Suppliers } from '../pages/dashboard/registers/Suppliers';
    import { RegisterServices } from '../pages/dashboard/registers/RegisterServices';
    import { Professionals } from '../pages/dashboard/registers/Professionals';
    import { Accounts } from '../pages/dashboard/registers/Accounts';
    import { Financial } from '../pages/dashboard/Financial';
    import { Income } from '../pages/dashboard/financial/Income';
    import { Expenses } from '../pages/dashboard/financial/Expenses';
    import { Stock } from '../pages/dashboard/controls/Stock';
    import { Supplies } from '../pages/dashboard/controls/Supplies';
    import { Settings } from '../pages/dashboard/Settings';
    import { Login } from '../pages/auth/Login';
    import { Register } from '../pages/auth/Register';
    import { SelectPlan } from '../pages/auth/SelectPlan';
    import { useClerk } from '@clerk/clerk-react';
    import { useUserStore } from '../store/user';
    import { Plans } from '../pages/dashboard/Plans';

    export function AppRoutes() {
      const { isSignedIn } = useClerk();
      const planId = useUserStore((state) => state.planId);

      return (
        <Routes>
          <Route
            path="/"
            element={
              isSignedIn && planId ? (
                <Navigate to="/dashboard" replace />
              ) : isSignedIn ? (
                <Navigate to="/select-plan" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/select-plan" element={<SelectPlan />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            
            {/* Sales Routes */}
            <Route path="sales">
              <Route index element={<Sales />} />
              <Route path="products" element={<Products />} />
              <Route path="quotes" element={<Quotes />} />
              <Route path="services" element={<Services />} />
            </Route>

            {/* Register Routes */}
            <Route path="registers">
              <Route path="clients" element={<Clients />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="services" element={<RegisterServices />} />
              <Route path="professionals" element={<Professionals />} />
              <Route path="accounts" element={<Accounts />} />
            </Route>

            {/* Financial Routes */}
            <Route path="financial">
              <Route index element={<Financial />} />
              <Route path="income" element={<Income />} />
              <Route path="expenses" element={<Expenses />} />
            </Route>

            {/* Control Routes */}
            <Route path="controls">
              <Route path="stock" element={<Stock />} />
              <Route path="supplies" element={<Supplies />} />
            </Route>

            {/* Settings Route */}
            <Route path="settings" element={<Settings />} />
            <Route path="plans" element={<Plans />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      );
    }
