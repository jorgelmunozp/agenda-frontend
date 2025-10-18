import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";
import { AuthContext } from '../auth/authContext.js';
import "../assets/styles/scss/components/AppMenu.scss";

export const AppMenu = () => {
      const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate(urlBaseFrontend, { replace: true });
    }

  return (
    <Menu left>
      <a className="menu-item" href="/home">
        <FiHome /> Tareas
      </a>
      <a className="menu-item" href="/about-us">
        <FiUser /> Nosotros
      </a>
      <a className="menu-item" href="/contact">
        <FiLogOut /> Contacto
      </a>
      <a className="menu-item" href="/login">
        <FiLogOut /> Cerrar sesión
      </a>
    </Menu>
  );
};

export default AppMenu;