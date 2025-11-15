import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from '../components/header/Header.js';
import { Login } from '../views/auth/Login.js';
import { Register } from '../views/auth/Register.js';
import { PasswordRecover } from '../views/password/PasswordRecover.js';
import { PasswordReset } from '../views/password/PasswordReset.js';
import { DashboardRoutes } from './DashboardRoutes.js';
import { PrivateRoute } from './PrivateRoute.js';
import { PublicRoute } from './PublicRoute.js';

export const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="*"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login/*"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/password-recover"
          element={
            <PublicRoute>
              <PasswordRecover />
            </PublicRoute>
          }
        />
        <Route
          path="/password-reset/:token"
          element={
            <PublicRoute>
              <PasswordReset />
            </PublicRoute>
          }
        />

        {/* Rutas privadas */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
