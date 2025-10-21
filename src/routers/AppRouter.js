import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header.js";
import { Login } from '../modules/auth/login/Login.js';
import { Register } from '../modules/auth/register/Register.js';
import { PasswordRecover } from '../modules/password/recover/PasswordRecover.js';
import { PasswordReset } from '../modules/password/reset/PasswordReset.js';
import { PublicRoute } from "./PublicRoute.js";
import { PrivateRoute } from "./PrivateRoute.js";
import { DashboardRoutes } from "./DashboardRoutes.js";

export const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rutas públicas */}
        <Route path="*" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/password-recover" element={<PublicRoute><PasswordRecover /></PublicRoute>} />
        <Route path="/password-reset/:token" element={<PublicRoute><PasswordReset /></PublicRoute>} />
        
        {/* Rutas privadas */}
        <Route path="/*" element={ <PrivateRoute><DashboardRoutes /></PrivateRoute> } />
      </Routes>
    </Router>
  )
}

export default AppRouter;