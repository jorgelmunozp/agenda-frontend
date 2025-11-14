import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../services/auth/authContext.js';

// Para desarrollo (DEV)
const dbHost = process.env.REACT_APP_BACKEND_HOST ?? '';
const dbPort = process.env.REACT_APP_BACKEND_PORT ?? '';

// URL base según el entorno PROD o DEV
const urlBaseFrontend = process.env.REACT_APP_FRONTEND_BASE_PROD || `http://${dbHost}:${dbPort}`;

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  sessionStorage.setItem( 'lastPath', pathname + search );

  return user.logged ? children : <Navigate to={`/${urlBaseFrontend}`} />; 
}

export default PrivateRoute;