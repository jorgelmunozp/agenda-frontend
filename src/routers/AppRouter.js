import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Header } from "../components/Header.js";
import { Login } from '../pages/Login.js';
import { Register } from '../pages/Register.js';
import { PasswordRecover } from '../pages/PasswordRecover.js';

// import { Navbar } from "../components/menu/Navbar.js";
import { PublicRoute } from "./PublicRoute.js";
import { PrivateRoute } from "./PrivateRoute.js";
import { DashboardRoutes } from "./DashboardRoutes.js";

export const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/password-reset" element={<PublicRoute><PasswordRecover /></PublicRoute>} />
        <Route path="/*" element={ <PrivateRoute><DashboardRoutes /></PrivateRoute> } />
      </Routes>
    </Router>
  )
}

export default AppRouter;